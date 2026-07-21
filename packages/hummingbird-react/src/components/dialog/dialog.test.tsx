import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, dialogVariants } from './dialog';

// A complete dialog used across the behavioral tests. Opens by default so the
// portaled content is available synchronously; pass `defaultOpen={false}` for
// the open/close interaction tests.
function Example(
  props: React.ComponentProps<typeof Dialog.Content> & {
    triggerLabel?: string;
    defaultOpen?: boolean;
  }
) {
  const { triggerLabel = 'Open', defaultOpen = true, children, ...contentProps } = props;
  return (
    <Dialog defaultOpen={defaultOpen}>
      <Dialog.Trigger>{triggerLabel}</Dialog.Trigger>
      <Dialog.Content {...contentProps}>
        <Dialog.Header>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.Description>Description</Dialog.Description>
          {children}
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

describe('Dialog', () => {
  describe('Rendering', () => {
    it('renders the trigger', () => {
      render(<Example defaultOpen={false} triggerLabel="Open dialog" />);
      expect(screen.getByRole('button', { name: /open dialog/i })).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example defaultOpen={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens when the trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<Example defaultOpen={false} triggerLabel="Open dialog" />);

      await user.click(screen.getByRole('button', { name: /open dialog/i }));
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });

    it('renders the supplied content parts', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>My title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Body copy</Dialog.Body>
            <Dialog.Footer>Footer</Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      );
      expect(screen.getByText('My title')).toBeInTheDocument();
      expect(screen.getByText('Body copy')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    function open() {
      render(<Example />);
      const content = screen.getByRole('dialog');
      const modalDialog = content.parentElement as HTMLElement;
      const modal = modalDialog.parentElement as HTMLElement;
      const backdrop = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      return { content, modalDialog, modal, backdrop };
    }

    it('applies modal-content to the content box', () => {
      const { content } = open();
      expect(content).toHaveClass('modal-content');
    });

    it('wraps the content in a modal-dialog', () => {
      const { modalDialog } = open();
      expect(modalDialog).toHaveClass('modal-dialog');
    });

    it('renders the full-screen modal container', () => {
      const { modal } = open();
      expect(modal).toHaveClass('modal', 'block');
    });

    it('renders the modal-backdrop overlay', () => {
      const { backdrop } = open();
      expect(backdrop).toHaveClass('modal-backdrop');
    });

    it('applies the modal-header/body/footer classes', () => {
      render(<Example />);
      expect(document.querySelector('[data-slot="dialog-header"]')).toHaveClass('modal-header');
      expect(document.querySelector('[data-slot="dialog-body"]')).toHaveClass('modal-body');
      expect(document.querySelector('[data-slot="dialog-footer"]')).toHaveClass('modal-footer');
      expect(document.querySelector('[data-slot="dialog-title"]')).toHaveClass('modal-title');
    });

    it('exposes Radix open state for the data-[state] animation utilities', () => {
      const { content, backdrop } = open();
      // The fade/zoom transition keys off Radix's `data-state`; no JS-toggled
      // `.show` class is involved anymore.
      expect(content).toHaveAttribute('data-state', 'open');
      expect(backdrop).toHaveAttribute('data-state', 'open');
      expect(content).toHaveClass('data-[state=open]:animate-in');
      expect(backdrop).toHaveClass('data-[state=open]:animate-in');
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm', expected: 'modal-sm' },
      { size: 'md', expected: '' },
      { size: 'lg', expected: 'modal-lg' },
      { size: 'xl', expected: 'modal-xl' },
    ] as const;

    it('applies size classes to the modal-dialog', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(<Example size={size} />);
        const modalDialog = screen.getByRole('dialog').parentElement as HTMLElement;
        expect(modalDialog).toHaveClass('modal-dialog');
        if (expected) {
          expect(modalDialog).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Modifiers', () => {
    it('applies centered', () => {
      render(<Example centered />);
      const modalDialog = screen.getByRole('dialog').parentElement as HTMLElement;
      expect(modalDialog).toHaveClass('modal-dialog-centered');
    });

    it('applies scrollable', () => {
      render(<Example scrollable />);
      const modalDialog = screen.getByRole('dialog').parentElement as HTMLElement;
      expect(modalDialog).toHaveClass('modal-dialog-scrollable');
    });

    it('applies fullscreen variants', () => {
      const cases = [
        { fullscreen: true, expected: 'modal-fullscreen' },
        { fullscreen: 'sm-down', expected: 'modal-fullscreen-sm-down' },
        { fullscreen: 'md-down', expected: 'modal-fullscreen-md-down' },
        { fullscreen: 'lg-down', expected: 'modal-fullscreen-lg-down' },
        { fullscreen: 'xl-down', expected: 'modal-fullscreen-xl-down' },
        { fullscreen: '2xl-down', expected: 'modal-fullscreen-2xl-down' },
      ] as const;

      cases.forEach(({ fullscreen, expected }) => {
        const { unmount } = render(<Example fullscreen={fullscreen} />);
        const modalDialog = screen.getByRole('dialog').parentElement as HTMLElement;
        expect(modalDialog).toHaveClass(expected);
        unmount();
      });
    });
  });

  describe('Interactions', () => {
    it('closes when a Dialog.Close is clicked', async () => {
      const user = userEvent.setup();
      render(<Example defaultOpen={false} />);

      await user.click(screen.getByRole('button', { name: /^open$/i }));
      await screen.findByRole('dialog');

      await user.click(screen.getByRole('button', { name: /cancel/i }));
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('closes on Escape', async () => {
      const user = userEvent.setup();
      render(<Example defaultOpen={false} />);

      await user.click(screen.getByRole('button', { name: /^open$/i }));
      await screen.findByRole('dialog');

      await user.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('fires onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Dialog onOpenChange={onOpenChange}>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled open', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Dialog open={false} onOpenChange={onOpenChange}>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(
        <Dialog open onOpenChange={onOpenChange}>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog>
      );
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Class Merging', () => {
    it('merges className onto the modal-content box', () => {
      render(<Example className="custom-content" />);
      const content = screen.getByRole('dialog');
      expect(content).toHaveClass('modal-content', 'custom-content');
    });

    it('merges dialogClassName onto the modal-dialog wrapper', () => {
      render(<Example dialogClassName="custom-dialog" />);
      const modalDialog = screen.getByRole('dialog').parentElement as HTMLElement;
      expect(modalDialog).toHaveClass('modal-dialog', 'custom-dialog');
    });

    it('forwards overlayProps to the modal-backdrop', () => {
      render(<Example overlayProps={{ className: 'custom-backdrop' }} />);
      const backdrop = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      expect(backdrop).toHaveClass('modal-backdrop', 'custom-backdrop');
    });
  });

  describe('Portal', () => {
    it('renders into a custom container', () => {
      const host = document.createElement('div');
      host.id = 'dialog-host';
      document.body.appendChild(host);

      render(<Example container={host} />);
      expect(host.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();

      host.remove();
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child', () => {
      render(
        <Dialog>
          <Dialog.Trigger asChild>
            <a href="/open">Open link</a>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog>
      );
      const link = screen.getByRole('link', { name: /open link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveAttribute('href', '/open');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Dialog, 'Dialog'],
      [Dialog.Trigger, 'Dialog.Trigger'],
      [Dialog.Portal, 'Dialog.Portal'],
      [Dialog.Close, 'Dialog.Close'],
      [Dialog.Overlay, 'Dialog.Overlay'],
      [Dialog.Content, 'Dialog.Content'],
      [Dialog.Header, 'Dialog.Header'],
      [Dialog.Title, 'Dialog.Title'],
      [Dialog.Description, 'Dialog.Description'],
      [Dialog.Body, 'Dialog.Body'],
      [Dialog.Footer, 'Dialog.Footer'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes the dialog role', () => {
      render(<Example />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('labels the dialog with its title', () => {
      render(<Example />);
      const dialog = screen.getByRole('dialog');
      const labelledby = dialog.getAttribute('aria-labelledby');
      expect(labelledby).toBeTruthy();
      expect(document.getElementById(labelledby as string)).toHaveTextContent('Title');
    });

    it('describes the dialog with its description', () => {
      render(<Example />);
      const dialog = screen.getByRole('dialog');
      const describedby = dialog.getAttribute('aria-describedby');
      expect(describedby).toBeTruthy();
      expect(document.getElementById(describedby as string)).toHaveTextContent('Description');
    });
  });
});

describe('dialogVariants', () => {
  it('generates the base class by default', () => {
    expect(dialogVariants()).toContain('modal-dialog');
  });

  it('generates size classes', () => {
    expect(dialogVariants({ size: 'sm' })).toContain('modal-sm');
    expect(dialogVariants({ size: 'lg' })).toContain('modal-lg');
    expect(dialogVariants({ size: 'xl' })).toContain('modal-xl');
  });

  it('generates modifier classes', () => {
    expect(dialogVariants({ centered: true })).toContain('modal-dialog-centered');
    expect(dialogVariants({ scrollable: true })).toContain('modal-dialog-scrollable');
    expect(dialogVariants({ fullscreen: true })).toContain('modal-fullscreen');
    expect(dialogVariants({ fullscreen: 'lg-down' })).toContain('modal-fullscreen-lg-down');
  });

  it('combines multiple options', () => {
    const classes = dialogVariants({ size: 'lg', centered: true, scrollable: true });
    expect(classes).toContain('modal-dialog');
    expect(classes).toContain('modal-lg');
    expect(classes).toContain('modal-dialog-centered');
    expect(classes).toContain('modal-dialog-scrollable');
  });
});
