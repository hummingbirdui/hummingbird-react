import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavigationMenu } from './navigation-menu';

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

// A menu with one panel and one plain link, used across the tests.
function Example({
  viewport,
  value,
  onValueChange,
  triggerProps,
  contentProps,
  linkProps,
}: {
  viewport?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  triggerProps?: Partial<React.ComponentProps<typeof NavigationMenu.Trigger>>;
  contentProps?: Partial<React.ComponentProps<typeof NavigationMenu.Content>>;
  linkProps?: Partial<React.ComponentProps<typeof NavigationMenu.Link>>;
}) {
  return (
    <NavigationMenu viewport={viewport} value={value} onValueChange={onValueChange}>
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger {...triggerProps}>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content {...contentProps}>
            <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
            <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#docs" {...linkProps}>
            Docs
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

const content = () => document.querySelector('[data-slot="navigation-menu-content"]');

describe('NavigationMenu', () => {
  describe('Rendering', () => {
    it('renders a navigation landmark with its list', () => {
      render(<Example />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders triggers and top-level links', () => {
      render(<Example />);
      expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /docs/i })).toHaveAttribute('href', '#docs');
    });

    it('keeps panels closed by default', () => {
      render(<Example />);
      expect(screen.queryByRole('link', { name: /analytics/i })).not.toBeInTheDocument();
    });

    it('renders a chevron inside the trigger', () => {
      render(<Example />);
      const svg = screen.getByRole('button', { name: /products/i }).querySelector('svg');
      expect(svg).toHaveClass('navigation-menu-trigger-icon');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Structure & classes', () => {
    it('applies the navigation-menu classes to each part', () => {
      render(<Example />);
      expect(screen.getByRole('navigation')).toHaveClass('navigation-menu');
      expect(screen.getByRole('list')).toHaveClass('navigation-menu-list');
      expect(screen.getAllByRole('listitem')[0]).toHaveClass('navigation-menu-item');
      expect(screen.getByRole('button', { name: /products/i })).toHaveClass(
        'nav-link',
        'navigation-menu-trigger'
      );
      expect(screen.getByRole('link', { name: /docs/i })).toHaveClass('navigation-menu-link');
    });

    it('applies navigation-menu-content to an open panel', async () => {
      const user = setupUser();
      render(<Example />);
      await user.click(screen.getByRole('button', { name: /products/i }));
      await screen.findByRole('link', { name: /analytics/i });
      expect(content()).toHaveClass('navigation-menu-content');
    });
  });

  describe('Interactions', () => {
    it('opens a panel when its trigger is clicked', async () => {
      const user = setupUser();
      render(<Example />);
      const trigger = screen.getByRole('button', { name: /products/i });

      await user.click(trigger);
      expect(await screen.findByRole('link', { name: /analytics/i })).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('closes the panel on Escape', async () => {
      const user = setupUser();
      render(<Example />);
      // Open from the keyboard: a pointer click also schedules Radix's 200ms
      // hover-open timer, which would reopen the panel after Escape on a slow
      // runner and make this test flaky.
      screen.getByRole('button', { name: /products/i }).focus();
      await user.keyboard('{Enter}');
      await screen.findByRole('link', { name: /analytics/i });

      await user.keyboard('{Escape}');
      await waitFor(() =>
        expect(screen.queryByRole('link', { name: /analytics/i })).not.toBeInTheDocument()
      );
    });

    it('supports a controlled value', () => {
      render(<Example value="products" />);
      expect(screen.getByRole('link', { name: /analytics/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /products/i })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('calls onValueChange with the item value', async () => {
      const user = setupUser();
      const onValueChange = vi.fn();
      render(<Example onValueChange={onValueChange} />);

      await user.click(screen.getByRole('button', { name: /products/i }));
      expect(onValueChange).toHaveBeenCalledWith('products');
    });
  });

  describe('Viewport', () => {
    it('renders panels inside a shared viewport by default', () => {
      render(<Example value="products" />);
      const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]');
      expect(screen.getByRole('navigation')).toHaveAttribute('data-viewport', 'true');
      expect(viewport).toHaveClass('navigation-menu-viewport');
      expect(viewport?.parentElement).toHaveClass('navigation-menu-viewport-wrapper');
      expect(viewport).toContainElement(content() as HTMLElement);
    });

    it('renders panels in place when viewport is false', () => {
      render(<Example viewport={false} value="products" />);
      expect(screen.getByRole('navigation')).toHaveAttribute('data-viewport', 'false');
      expect(document.querySelector('[data-slot="navigation-menu-viewport"]')).toBeNull();
      expect(screen.getAllByRole('listitem')[0]).toContainElement(content() as HTMLElement);
    });
  });

  describe('Link', () => {
    it('marks the active link', () => {
      render(<Example linkProps={{ active: true }} />);
      const link = screen.getByRole('link', { name: /docs/i });
      expect(link).toHaveAttribute('data-active');
      expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('calls onSelect when a link is chosen', async () => {
      const user = setupUser();
      const onSelect = vi.fn();
      render(<Example linkProps={{ onSelect }} />);
      await user.click(screen.getByRole('link', { name: /docs/i }));
      expect(onSelect).toHaveBeenCalled();
    });
  });

  describe('Class Merging', () => {
    it('merges className onto every part', () => {
      render(
        <NavigationMenu className="custom-root" value="products">
          <NavigationMenu.List className="custom-list">
            <NavigationMenu.Item value="products" className="custom-item">
              <NavigationMenu.Trigger className="custom-trigger">Products</NavigationMenu.Trigger>
              <NavigationMenu.Content className="custom-content">
                <NavigationMenu.Link href="#a" className="custom-link">
                  Analytics
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation')).toHaveClass('navigation-menu', 'custom-root');
      expect(screen.getByRole('list')).toHaveClass('navigation-menu-list', 'custom-list');
      expect(screen.getAllByRole('listitem')[0]).toHaveClass('navigation-menu-item', 'custom-item');
      expect(screen.getByRole('button', { name: /products/i })).toHaveClass(
        'navigation-menu-trigger',
        'custom-trigger'
      );
      expect(content()).toHaveClass('navigation-menu-content', 'custom-content');
      expect(screen.getByRole('link', { name: /analytics/i })).toHaveClass(
        'navigation-menu-link',
        'custom-link'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards refs to the trigger, content and link', () => {
      const triggerRef = React.createRef<HTMLButtonElement>();
      const contentRef = React.createRef<HTMLDivElement>();
      const linkRef = React.createRef<HTMLAnchorElement>();
      render(
        <Example
          value="products"
          triggerProps={{ ref: triggerRef }}
          contentProps={{ ref: contentRef }}
          linkProps={{ ref: linkRef }}
        />
      );
      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
      expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('asChild', () => {
    it('renders the link as its child element', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild className="from-part">
                <a href="/pricing" className="own">
                  Pricing
                </a>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      const link = screen.getByRole('link', { name: /pricing/i });
      expect(link).toHaveAttribute('href', '/pricing');
      expect(link).toHaveClass('navigation-menu-link', 'from-part', 'own');
    });
  });

  describe('Display Name', () => {
    it.each([
      [NavigationMenu, 'NavigationMenu'],
      [NavigationMenu.List, 'NavigationMenu.List'],
      [NavigationMenu.Item, 'NavigationMenu.Item'],
      [NavigationMenu.Trigger, 'NavigationMenu.Trigger'],
      [NavigationMenu.Content, 'NavigationMenu.Content'],
      [NavigationMenu.Link, 'NavigationMenu.Link'],
      [NavigationMenu.Indicator, 'NavigationMenu.Indicator'],
      [NavigationMenu.Viewport, 'NavigationMenu.Viewport'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('wires the trigger to its panel', async () => {
      const user = setupUser();
      render(<Example />);
      const trigger = screen.getByRole('button', { name: /products/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      await screen.findByRole('link', { name: /analytics/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls', content()?.id);
    });

    it('accepts an aria-label on the root', () => {
      render(
        <NavigationMenu aria-label="Main">
          <NavigationMenu.List />
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
    });
  });
});
