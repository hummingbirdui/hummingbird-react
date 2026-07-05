import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItemText,
} from './dropdown';

// Radix DropdownMenu is modal by default and sets `pointer-events: none` on the
// body while open; disable user-event's pointer-events check so clicks on the
// portaled menu items work in jsdom.
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

// A complete menu used across the behavioral tests. Opens by default so the
// portaled content is available synchronously; pass `defaultOpen={false}` for
// the open/close interaction tests.
function Example(
  props: React.ComponentProps<typeof DropdownMenuContent> & {
    triggerLabel?: string;
    defaultOpen?: boolean;
  }
) {
  const { triggerLabel = 'Open', defaultOpen = true, children, ...contentProps } = props;
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger>{triggerLabel}</DropdownMenuTrigger>
      <DropdownMenuContent {...contentProps}>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe('DropdownMenu', () => {
  describe('Rendering', () => {
    it('renders the trigger', () => {
      render(<Example defaultOpen={false} triggerLabel="Open menu" />);
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example defaultOpen={false} />);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('opens when the trigger is clicked', async () => {
      const user = setupUser();
      render(<Example defaultOpen={false} triggerLabel="Open menu" />);

      await user.click(screen.getByRole('button', { name: /open menu/i }));
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('renders label, group, items and separator when open', () => {
      render(<Example />);
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Log out' })).toBeInTheDocument();
      expect(document.querySelector('[data-slot="dropdown-menu-separator"]')).toBeInTheDocument();
    });

    it('portals the content to the document body', () => {
      const { container } = render(<Example />);
      const content = document.querySelector('[data-slot="dropdown-menu-content"]');
      expect(content).toBeInTheDocument();
      expect(container.contains(content)).toBe(false);
    });
  });

  describe('Structure & classes', () => {
    it('applies dropdown-menu and show to the content', () => {
      render(<Example />);
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('dropdown-menu', 'show');
      expect(menu).toHaveAttribute('data-slot', 'dropdown-menu-content');
    });

    it('exposes Radix open state for the data-[state] animation utilities', () => {
      render(<Example />);
      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('data-state', 'open');
      expect(menu).toHaveClass(
        'origin-[var(--radix-popper-transform-origin)]',
        'duration-150',
        'data-[state=open]:animate-in',
        'data-[state=open]:fade-in-0',
        'data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=closed]:zoom-out-95'
      );
    });

    it('applies dropdown-item to items', () => {
      render(<Example />);
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(item).toHaveClass('dropdown-item', 'cursor-pointer', 'focus-visible:ring-0');
      expect(item).toHaveAttribute('data-slot', 'dropdown-menu-item');
    });

    it('applies dropdown-header to the label', () => {
      render(<Example />);
      const label = screen.getByText('Account');
      expect(label).toHaveClass('dropdown-header');
      expect(label).toHaveAttribute('data-slot', 'dropdown-menu-label');
    });

    it('applies dropdown-divider to the separator', () => {
      render(<Example />);
      const separator = document.querySelector(
        '[data-slot="dropdown-menu-separator"]'
      ) as HTMLElement;
      expect(separator).toHaveClass('dropdown-divider');
    });

    it('marks the group with its data-slot', () => {
      render(<Example />);
      expect(screen.getByRole('group')).toHaveAttribute('data-slot', 'dropdown-menu-group');
    });

    it('renders DropdownMenuItemText as a span with dropdown-item-text', () => {
      render(<DropdownMenuItemText>Plain text</DropdownMenuItemText>);
      const text = screen.getByText('Plain text');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('dropdown-item-text');
      expect(text).toHaveAttribute('data-slot', 'dropdown-menu-item-text');
    });
  });

  describe('Interactions', () => {
    it('fires onOpenChange when the trigger is clicked', async () => {
      const onOpenChange = vi.fn();
      const user = setupUser();
      render(
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled open', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <DropdownMenu open={false} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      rerender(
        <DropdownMenu open onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('closes on Escape', async () => {
      const user = setupUser();
      render(<Example defaultOpen={false} />);

      await user.click(screen.getByRole('button', { name: /^open$/i }));
      await screen.findByRole('menu');

      await user.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });

    it('calls onSelect and closes when an item is selected', async () => {
      const onSelect = vi.fn();
      const user = setupUser();
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('menuitem', { name: 'Log out' }));
      expect(onSelect).toHaveBeenCalledOnce();
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });

    it('stays open when onSelect prevents the default', async () => {
      const user = setupUser();
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              Keep open
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('menuitem', { name: 'Keep open' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('marks disabled items and does not select them', async () => {
      const onSelect = vi.fn();
      const user = setupUser();
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled onSelect={onSelect}>
              Disabled item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByRole('menuitem', { name: 'Disabled item' });
      expect(item).toHaveClass('dropdown-item', 'disabled');
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).toHaveAttribute('data-disabled');

      await user.click(item);
      expect(onSelect).not.toHaveBeenCalled();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('does not open when the root is closed and the trigger is disabled', async () => {
      const onOpenChange = vi.fn();
      const user = setupUser();
      render(
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger disabled>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toBeDisabled();
      await user.click(trigger);
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard', () => {
    it('opens with Enter on the trigger', async () => {
      const user = setupUser();
      render(<Example defaultOpen={false} />);

      screen.getByRole('button', { name: /^open$/i }).focus();
      await user.keyboard('{Enter}');
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('opens with ArrowDown on the trigger', async () => {
      const user = setupUser();
      render(<Example defaultOpen={false} />);

      screen.getByRole('button', { name: /^open$/i }).focus();
      await user.keyboard('{ArrowDown}');
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('selects a highlighted item with Enter', async () => {
      const onSelect = vi.fn();
      const user = setupUser();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>First</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      screen.getByRole('button', { name: /open/i }).focus();
      await user.keyboard('{Enter}');
      await screen.findByRole('menu');

      await user.keyboard('{ArrowDown}{Enter}');
      expect(onSelect).toHaveBeenCalledOnce();
    });
  });

  describe('Placement', () => {
    it('exposes side and align on the content', async () => {
      render(<Example side="right" align="end" avoidCollisions={false} />);
      const menu = screen.getByRole('menu');
      await waitFor(() => {
        expect(menu).toHaveAttribute('data-side', 'right');
        expect(menu).toHaveAttribute('data-align', 'end');
      });
    });

    it('defaults to bottom placement', async () => {
      render(<Example avoidCollisions={false} />);
      const menu = screen.getByRole('menu');
      await waitFor(() => expect(menu).toHaveAttribute('data-side', 'bottom'));
    });
  });

  describe('Class Merging', () => {
    it('merges className onto the content', () => {
      render(<Example className="custom-menu" />);
      expect(screen.getByRole('menu')).toHaveClass('dropdown-menu', 'show', 'custom-menu');
    });

    it('merges className onto items, labels and separators', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="custom-label">Label</DropdownMenuLabel>
            <DropdownMenuItem className="custom-item">Item</DropdownMenuItem>
            <DropdownMenuSeparator className="custom-separator" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.getByText('Label')).toHaveClass('dropdown-header', 'custom-label');
      expect(screen.getByRole('menuitem', { name: 'Item' })).toHaveClass(
        'dropdown-item',
        'custom-item'
      );
      expect(document.querySelector('[data-slot="dropdown-menu-separator"]')).toHaveClass(
        'dropdown-divider',
        'custom-separator'
      );
    });

    it('merges className onto DropdownMenuItemText', () => {
      render(<DropdownMenuItemText className="custom-text">Text</DropdownMenuItemText>);
      expect(screen.getByText('Text')).toHaveClass('dropdown-item-text', 'custom-text');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the content element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent ref={ref}>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('dropdown-menu');
    });

    it('forwards ref to an item element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem ref={ref}>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('dropdown-item');
    });

    it('forwards ref to the DropdownMenuItemText span', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<DropdownMenuItemText ref={ref}>Text</DropdownMenuItemText>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a href="/menu">Open link</a>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      const link = screen.getByRole('link', { name: /open link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveAttribute('href', '/menu');
      expect(link).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('renders an item as the supplied child with the item classes', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a href="/profile">Profile</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(item).toBeInstanceOf(HTMLAnchorElement);
      expect(item).toHaveAttribute('href', '/profile');
      expect(item).toHaveClass('dropdown-item');
    });
  });

  describe('Display Name', () => {
    it.each([
      [DropdownMenu, 'DropdownMenu'],
      [DropdownMenuPortal, 'DropdownMenuPortal'],
      [DropdownMenuTrigger, 'DropdownMenuTrigger'],
      [DropdownMenuContent, 'DropdownMenuContent'],
      [DropdownMenuGroup, 'DropdownMenuGroup'],
      [DropdownMenuItem, 'DropdownMenuItem'],
      [DropdownMenuLabel, 'DropdownMenuLabel'],
      [DropdownMenuSeparator, 'DropdownMenuSeparator'],
      [DropdownMenuItemText, 'DropdownMenuItemText'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('wires aria-haspopup and aria-expanded on the trigger', async () => {
      const user = setupUser();
      render(<Example defaultOpen={false} />);

      const trigger = screen.getByRole('button', { name: /^open$/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      await screen.findByRole('menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('exposes the menu and menuitem roles', () => {
      render(<Example />);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getAllByRole('menuitem')).toHaveLength(3);
    });

    it('labels the menu with the trigger', () => {
      render(<Example />);
      const menu = screen.getByRole('menu');
      const labelledby = menu.getAttribute('aria-labelledby');
      expect(labelledby).toBeTruthy();
      expect(document.getElementById(labelledby as string)).toHaveTextContent('Open');
    });

    it('marks the separator as presentational', () => {
      render(<Example />);
      const separator = document.querySelector(
        '[data-slot="dropdown-menu-separator"]'
      ) as HTMLElement;
      expect(separator).toHaveAttribute('role', 'separator');
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });
  });
});
