import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  breadcrumbVariants,
} from './breadcrumb';

// A complete breadcrumb trail used across the tests.
function Example(props: React.ComponentProps<typeof BreadcrumbList>) {
  return (
    <Breadcrumb>
      <BreadcrumbList {...props}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <BreadcrumbPage>Data</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe('Breadcrumb', () => {
  describe('Rendering', () => {
    it('renders a nav landmark', () => {
      render(<Example />);
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
      expect(nav).toBeInstanceOf(HTMLElement);
      expect(nav.tagName).toBe('NAV');
      expect(nav).toHaveAttribute('data-slot', 'breadcrumb');
    });

    it('renders the list as an ordered list', () => {
      render(<Example />);
      const list = screen.getByRole('list');
      expect(list).toBeInstanceOf(HTMLOListElement);
      expect(list).toHaveAttribute('data-slot', 'breadcrumb-list');
    });

    it('renders items as list items', () => {
      render(<Example />);
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
      items.forEach((item) => {
        expect(item).toBeInstanceOf(HTMLLIElement);
        expect(item).toHaveAttribute('data-slot', 'breadcrumb-item');
      });
    });

    it('renders links as anchors', () => {
      render(<Example />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeInstanceOf(HTMLAnchorElement);
      expect(home).toHaveAttribute('href', '/');
      expect(home).toHaveAttribute('data-slot', 'breadcrumb-link');
    });

    it('renders the current page as a non-interactive span', () => {
      render(<Example />);
      const page = screen.getByText('Data');
      expect(page).toBeInstanceOf(HTMLSpanElement);
      expect(page).toHaveAttribute('data-slot', 'breadcrumb-page');
    });
  });

  describe('Structure & classes', () => {
    it('applies the breadcrumb base class to the list', () => {
      render(<Example />);
      expect(screen.getByRole('list')).toHaveClass('breadcrumb');
    });

    it('applies breadcrumb-item to each item', () => {
      render(<Example />);
      screen.getAllByRole('listitem').forEach((item) => {
        expect(item).toHaveClass('breadcrumb-item');
      });
    });

    it('applies active to the active item', () => {
      render(<Example />);
      const items = screen.getAllByRole('listitem');
      expect(items[0]).not.toHaveClass('active');
      expect(items[1]).not.toHaveClass('active');
      expect(items[2]).toHaveClass('breadcrumb-item', 'active');
    });

    it('adds no Hummingbird class to BreadcrumbLink', () => {
      render(<Example />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home.getAttribute('class')).toBeNull();
    });
  });

  describe('Separators', () => {
    const separators = [
      { separator: 'slash', expected: '' },
      { separator: 'dashed', expected: 'breadcrumb-separator-dashed' },
      { separator: 'arrow', expected: 'breadcrumb-separator-arrow' },
    ] as const;

    it('applies separator classes to the list', () => {
      separators.forEach(({ separator, expected }) => {
        const { unmount } = render(<Example separator={separator} />);
        const list = screen.getByRole('list');
        expect(list).toHaveClass('breadcrumb');
        if (expected) {
          expect(list).toHaveClass(expected);
        } else {
          // slash is the default; no extra class
          expect(list.className.trim()).toBe('breadcrumb');
        }
        unmount();
      });
    });

    it('defaults to the slash separator (base class only)', () => {
      render(<Example />);
      expect(screen.getByRole('list').className.trim()).toBe('breadcrumb');
    });
  });

  describe('Class Merging', () => {
    it('passes className through on the nav', () => {
      render(
        <Breadcrumb className="custom-nav">
          <BreadcrumbList>
            <BreadcrumbItem>Item</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
    });

    it('merges custom className with the list classes', () => {
      render(<Example separator="arrow" className="custom-list" />);
      expect(screen.getByRole('list')).toHaveClass(
        'breadcrumb',
        'breadcrumb-separator-arrow',
        'custom-list'
      );
    });

    it('merges custom className on items', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem active className="custom-item">
              Item
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByRole('listitem')).toHaveClass('breadcrumb-item', 'active', 'custom-item');
    });

    it('applies className to links and pages', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="custom-link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <BreadcrumbPage className="custom-page">Data</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByRole('link', { name: /home/i })).toHaveClass('custom-link');
      expect(screen.getByText('Data')).toHaveClass('custom-page');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the nav element', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Breadcrumb ref={ref}>
          <BreadcrumbList />
        </Breadcrumb>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('forwards ref to the list element', () => {
      const ref = React.createRef<HTMLOListElement>();
      render(
        <Breadcrumb>
          <BreadcrumbList ref={ref} />
        </Breadcrumb>
      );
      expect(ref.current).toBeInstanceOf(HTMLOListElement);
      expect(ref.current?.className).toContain('breadcrumb');
    });

    it('forwards refs to item, link, and page elements', () => {
      const itemRef = React.createRef<HTMLLIElement>();
      const linkRef = React.createRef<HTMLAnchorElement>();
      const pageRef = React.createRef<HTMLSpanElement>();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem ref={itemRef}>
              <BreadcrumbLink ref={linkRef} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <BreadcrumbPage ref={pageRef}>Data</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
      expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(pageRef.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('asChild Prop', () => {
    it('renders BreadcrumbLink as the supplied child and preserves its attributes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button type="button" className="custom-link">
                  Home
                </button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      const button = screen.getByRole('button', { name: /home/i });
      expect(button).toHaveAttribute('data-slot', 'breadcrumb-link');
      expect(button).toHaveClass('custom-link');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Breadcrumb, 'Breadcrumb'],
      [BreadcrumbList, 'BreadcrumbList'],
      [BreadcrumbItem, 'BreadcrumbItem'],
      [BreadcrumbLink, 'BreadcrumbLink'],
      [BreadcrumbPage, 'BreadcrumbPage'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('labels the nav landmark as breadcrumb by default', () => {
      render(<Example />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'breadcrumb');
    });

    it('allows overriding the nav aria-label', () => {
      render(
        <Breadcrumb aria-label="You are here">
          <BreadcrumbList />
        </Breadcrumb>
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'You are here');
    });

    it('marks the current page with aria-current="page"', () => {
      render(<Example />);
      const page = screen.getByText('Data');
      expect(page).toHaveAttribute('aria-current', 'page');
    });

    it('exposes the current page as a disabled link', () => {
      render(<Example />);
      const page = screen.getByText('Data');
      expect(page).toHaveAttribute('role', 'link');
      expect(page).toHaveAttribute('aria-disabled', 'true');
    });
  });
});

describe('breadcrumbVariants', () => {
  it('generates the base class by default', () => {
    const classes = breadcrumbVariants();
    expect(classes).toContain('breadcrumb');
  });

  it('generates no extra class for the slash separator', () => {
    expect(breadcrumbVariants({ separator: 'slash' }).trim()).toBe('breadcrumb');
  });

  it('generates separator classes', () => {
    expect(breadcrumbVariants({ separator: 'dashed' })).toContain('breadcrumb-separator-dashed');
    expect(breadcrumbVariants({ separator: 'arrow' })).toContain('breadcrumb-separator-arrow');
  });
});
