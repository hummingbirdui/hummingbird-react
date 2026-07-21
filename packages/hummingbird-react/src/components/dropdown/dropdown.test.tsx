import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './dropdown';

// Radix Dropdown is modal by default and sets `pointer-events: none` on the
// body while open; disable user-event's pointer-events check so clicks on the
// portaled menu items work in jsdom.
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

// A complete menu used across the behavioral tests. Opens by default so the
// portaled content is available synchronously; pass `defaultOpen={false}` for
// the open/close interaction tests.
function Example(
  props: React.ComponentProps<typeof Dropdown.Content> & {
    triggerLabel?: string;
    defaultOpen?: boolean;
  }
) {
  const { triggerLabel = 'Open', defaultOpen = true, children, ...contentProps } = props;
  return (
    <Dropdown defaultOpen={defaultOpen}>
      <Dropdown.Trigger>{triggerLabel}</Dropdown.Trigger>
      <Dropdown.Content {...contentProps}>
        <Dropdown.Label>Account</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Item>Log out</Dropdown.Item>
        {children}
      </Dropdown.Content>
    </Dropdown>
  );
}

describe('Dropdown', () => {
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

    it('renders Dropdown.ItemText as a span with dropdown-item-text', () => {
      render(<Dropdown.ItemText>Plain text</Dropdown.ItemText>);
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
        <Dropdown onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled open', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Dropdown open={false} onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      rerender(
        <Dropdown open onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
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
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onSelect={onSelect}>Log out</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await user.click(screen.getByRole('menuitem', { name: 'Log out' }));
      expect(onSelect).toHaveBeenCalledOnce();
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });

    it('stays open when onSelect prevents the default', async () => {
      const user = setupUser();
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onSelect={(event) => event.preventDefault()}>Keep open</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await user.click(screen.getByRole('menuitem', { name: 'Keep open' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('marks disabled items and does not select them', async () => {
      const onSelect = vi.fn();
      const user = setupUser();
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item disabled onSelect={onSelect}>
              Disabled item
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
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
        <Dropdown onOpenChange={onOpenChange}>
          <Dropdown.Trigger disabled>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
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
        <Dropdown>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onSelect={onSelect}>First</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
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
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Label className="custom-label">Label</Dropdown.Label>
            <Dropdown.Item className="custom-item">Item</Dropdown.Item>
            <Dropdown.Separator className="custom-separator" />
          </Dropdown.Content>
        </Dropdown>
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

    it('merges className onto Dropdown.ItemText', () => {
      render(<Dropdown.ItemText className="custom-text">Text</Dropdown.ItemText>);
      expect(screen.getByText('Text')).toHaveClass('dropdown-item-text', 'custom-text');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the content element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content ref={ref}>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('dropdown-menu');
    });

    it('forwards ref to an item element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item ref={ref}>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('dropdown-item');
    });

    it('forwards ref to the Dropdown.ItemText span', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Dropdown.ItemText ref={ref}>Text</Dropdown.ItemText>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger asChild>
            <a href="/menu">Open link</a>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );
      const link = screen.getByRole('link', { name: /open link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveAttribute('href', '/menu');
      expect(link).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('renders an item as the supplied child with the item classes', () => {
      render(
        <Dropdown defaultOpen>
          <Dropdown.Trigger>Open</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item asChild>
              <a href="/profile">Profile</a>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(item).toBeInstanceOf(HTMLAnchorElement);
      expect(item).toHaveAttribute('href', '/profile');
      expect(item).toHaveClass('dropdown-item');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Dropdown, 'Dropdown'],
      [Dropdown.Portal, 'Dropdown.Portal'],
      [Dropdown.Trigger, 'Dropdown.Trigger'],
      [Dropdown.Content, 'Dropdown.Content'],
      [Dropdown.Group, 'Dropdown.Group'],
      [Dropdown.Item, 'Dropdown.Item'],
      [Dropdown.Label, 'Dropdown.Label'],
      [Dropdown.Separator, 'Dropdown.Separator'],
      [Dropdown.ItemText, 'Dropdown.ItemText'],
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
