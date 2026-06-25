import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
} from './drawer';

// A complete drawer used across the behavioral tests. `direction` is forwarded
// to the Vaul root so the per-edge positioning can be exercised.
function Example(
  props: React.ComponentProps<typeof Drawer> & { triggerLabel?: string }
) {
  const { triggerLabel = 'Open', children, ...rootProps } = props;
  return (
    <Drawer {...rootProps}>
      <DrawerTrigger>{triggerLabel}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerClose>Close</DrawerClose>
        </DrawerHeader>
        <DrawerBody>
          <DrawerDescription>Description</DrawerDescription>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// Opens the drawer via its trigger and resolves once the panel is on screen.
async function openDrawer(ui: React.ReactElement) {
  const user = userEvent.setup();
  render(ui);
  await user.click(screen.getByRole('button', { name: /^open$/i }));
  const content = await screen.findByRole('dialog');
  return { user, content };
}

describe('Drawer', () => {
  describe('Rendering', () => {
    it('renders the trigger', () => {
      render(<Example triggerLabel="Open drawer" />);
      expect(screen.getByRole('button', { name: /open drawer/i })).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens when the trigger is clicked', async () => {
      const { content } = await openDrawer(<Example triggerLabel="Open" />);
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-state', 'open');
    });

    it('renders the supplied content parts', async () => {
      await openDrawer(<Example>extra body content</Example>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('extra body content')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies the offcanvas panel classes to the content', async () => {
      const { content } = await openDrawer(<Example />);
      // `.offcanvas` (look) + `.show` (on-screen resting state); Vaul drives the
      // slide via its own injected `transform` keyframes.
      expect(content).toHaveClass('offcanvas', 'show');
    });

    it('positions per direction via the offcanvas-* data-variant utilities', async () => {
      const { content } = await openDrawer(<Example />);
      // The literal Tailwind classes are always present; the active one is
      // selected at runtime by Vaul's `data-vaul-drawer-direction`.
      expect(content).toHaveClass(
        'data-[vaul-drawer-direction=left]:offcanvas-start',
        'data-[vaul-drawer-direction=right]:offcanvas-end',
        'data-[vaul-drawer-direction=top]:offcanvas-top',
        'data-[vaul-drawer-direction=bottom]:offcanvas-bottom'
      );
    });

    it('renders the offcanvas-backdrop overlay', async () => {
      await openDrawer(<Example />);
      const backdrop = document.querySelector('[data-slot="drawer-overlay"]') as HTMLElement;
      expect(backdrop).toHaveClass('offcanvas-backdrop');
    });

    it('applies the offcanvas header/title/body classes', async () => {
      await openDrawer(<Example />);
      expect(document.querySelector('[data-slot="drawer-header"]')).toHaveClass('offcanvas-header');
      expect(document.querySelector('[data-slot="drawer-title"]')).toHaveClass('offcanvas-title');
      expect(document.querySelector('[data-slot="drawer-body"]')).toHaveClass('offcanvas-body');
    });

    it('renders a drag handle', async () => {
      await openDrawer(<Example />);
      expect(document.querySelector('[data-slot="drawer-handle"]')).toBeInTheDocument();
    });
  });

  describe('Direction', () => {
    const directions = ['top', 'bottom', 'left', 'right'] as const;

    it('sets data-vaul-drawer-direction on the content', async () => {
      for (const direction of directions) {
        const { content } = await openDrawer(<Example direction={direction} />);
        expect(content).toHaveAttribute('data-vaul-drawer-direction', direction);
        // Reset for the next iteration.
        await userEvent.setup().keyboard('{Escape}');
      }
    });
  });

  describe('Interactions', () => {
    it('closes when a DrawerClose is clicked', async () => {
      const { user, content } = await openDrawer(<Example />);
      await user.click(screen.getByRole('button', { name: /close/i }));
      // Vaul plays its exit animation, then keeps the node with data-state=closed.
      await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
    });

    it('closes on Escape', async () => {
      const { user, content } = await openDrawer(<Example />);
      await user.keyboard('{Escape}');
      await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
    });

    it('fires onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onOpenChange={onOpenChange} />);

      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled open', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Drawer open={false} onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(
        <Drawer open onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Class Merging', () => {
    it('merges className onto the content panel', async () => {
      const user = userEvent.setup();
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent className="custom-panel">
            <DrawerTitle>Title</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );
      await user.click(screen.getByRole('button', { name: /open/i }));
      const content = await screen.findByRole('dialog');
      expect(content).toHaveClass('offcanvas', 'custom-panel');
    });
  });

  describe('Portal', () => {
    it('exposes a composable portal/overlay/content set', async () => {
      const user = userEvent.setup();
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="custom-backdrop" />
            <DrawerContent>
              <DrawerTitle>Composed</DrawerTitle>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      );
      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(await screen.findByText('Composed')).toBeInTheDocument();
      const backdrop = document.querySelector('[data-slot="drawer-overlay"]') as HTMLElement;
      expect(backdrop).toHaveClass('offcanvas-backdrop', 'custom-backdrop');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Drawer, 'Drawer'],
      [DrawerTrigger, 'DrawerTrigger'],
      [DrawerPortal, 'DrawerPortal'],
      [DrawerClose, 'DrawerClose'],
      [DrawerOverlay, 'DrawerOverlay'],
      [DrawerContent, 'DrawerContent'],
      [DrawerHeader, 'DrawerHeader'],
      [DrawerTitle, 'DrawerTitle'],
      [DrawerDescription, 'DrawerDescription'],
      [DrawerBody, 'DrawerBody'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes the dialog role', async () => {
      const { content } = await openDrawer(<Example />);
      expect(content).toBeInTheDocument();
    });

    it('labels the drawer with its title', async () => {
      const { content } = await openDrawer(<Example />);
      const labelledby = content.getAttribute('aria-labelledby');
      expect(labelledby).toBeTruthy();
      expect(document.getElementById(labelledby as string)).toHaveTextContent('Title');
    });

    it('describes the drawer with its description', async () => {
      const { content } = await openDrawer(<Example />);
      const describedby = content.getAttribute('aria-describedby');
      expect(describedby).toBeTruthy();
      expect(document.getElementById(describedby as string)).toHaveTextContent('Description');
    });
  });
});
