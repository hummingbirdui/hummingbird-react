import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Nav, navVariants } from './nav';

// A small nav used across the tests.
function Example(props: React.ComponentProps<typeof Nav>) {
  return (
    <Nav {...props}>
      <Nav.Item>
        <Nav.Link href="#home" active>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#contact" disabled>
          Contact
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

describe('Nav', () => {
  describe('Rendering', () => {
    it('renders as an unordered list', () => {
      render(<Example />);
      const list = screen.getByRole('list');
      expect(list).toBeInstanceOf(HTMLUListElement);
      expect(list).toHaveAttribute('data-slot', 'nav');
    });

    it('renders items as list items', () => {
      render(<Example />);
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
      items.forEach((item) => {
        expect(item).toBeInstanceOf(HTMLLIElement);
        expect(item).toHaveAttribute('data-slot', 'nav-item');
      });
    });

    it('renders links as anchors', () => {
      render(<Example />);
      const link = screen.getByRole('link', { name: /profile/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveAttribute('href', '#profile');
      expect(link).toHaveAttribute('data-slot', 'nav-link');
    });
  });

  describe('Structure & classes', () => {
    it('applies the nav base class', () => {
      render(<Example />);
      expect(screen.getByRole('list')).toHaveClass('nav');
    });

    it('adds no Hummingbird class to Nav.Item', () => {
      render(<Example />);
      screen.getAllByRole('listitem').forEach((item) => {
        expect(item.getAttribute('class')).toBeNull();
      });
    });

    it('applies nav-link to links', () => {
      render(<Example />);
      screen.getAllByRole('link').forEach((link) => {
        expect(link).toHaveClass('nav-link');
      });
    });
  });

  describe('Variants', () => {
    const variants = [
      { variant: 'default', expected: '' },
      { variant: 'underline', expected: 'nav-underline' },
      { variant: 'tabs', expected: 'nav-tabs' },
    ] as const;

    it('applies variant classes', () => {
      variants.forEach(({ variant, expected }) => {
        const { unmount } = render(<Example variant={variant} />);
        const list = screen.getByRole('list');
        expect(list).toHaveClass('nav');
        if (expected) {
          expect(list).toHaveClass(expected);
        } else {
          // default has no extra class
          expect(list.className.trim()).toBe('nav');
        }
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'neutral',
    ] as const;

    it('applies color classes', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Example color={color} />);
        expect(screen.getByRole('list')).toHaveClass('nav', `nav-${color}`);
        unmount();
      });
    });

    it('applies no color class for the default color', () => {
      render(<Example color="default" />);
      expect(screen.getByRole('list').className.trim()).toBe('nav');
    });

    it('combines variant and color', () => {
      render(<Example variant="tabs" color="success" />);
      expect(screen.getByRole('list')).toHaveClass('nav', 'nav-tabs', 'nav-success');
    });
  });

  describe('Active & Disabled links', () => {
    it('applies active to the active link', () => {
      render(<Example />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toHaveClass('nav-link', 'active');
      expect(screen.getByRole('link', { name: /profile/i })).not.toHaveClass('active');
    });

    it('applies disabled to the disabled link', () => {
      render(<Example />);
      const contact = screen.getByRole('link', { name: /contact/i });
      expect(contact).toHaveClass('nav-link', 'disabled');
      expect(screen.getByRole('link', { name: /profile/i })).not.toHaveClass('disabled');
    });
  });

  describe('Interactions', () => {
    it('handles click events on links', async () => {
      const handleClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
      const user = userEvent.setup();
      render(
        <Nav>
          <Nav.Item>
            <Nav.Link href="#home" onClick={handleClick}>
              Home
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );

      await user.click(screen.getByRole('link', { name: /home/i }));
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with nav classes', () => {
      render(<Example variant="underline" color="primary" className="custom-nav" />);
      expect(screen.getByRole('list')).toHaveClass(
        'nav',
        'nav-underline',
        'nav-primary',
        'custom-nav'
      );
    });

    it('merges custom className on items and links', () => {
      render(
        <Nav>
          <Nav.Item className="custom-item">
            <Nav.Link href="#" active className="custom-link">
              Home
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );
      expect(screen.getByRole('listitem')).toHaveClass('custom-item');
      expect(screen.getByRole('link', { name: /home/i })).toHaveClass(
        'nav-link',
        'active',
        'custom-link'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the ul element', () => {
      const ref = React.createRef<HTMLUListElement>();
      render(<Nav ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
      expect(ref.current?.className).toContain('nav');
    });

    it('forwards refs to item and link elements', () => {
      const itemRef = React.createRef<HTMLLIElement>();
      const linkRef = React.createRef<HTMLAnchorElement>();
      render(
        <Nav>
          <Nav.Item ref={itemRef}>
            <Nav.Link ref={linkRef} href="#">
              Home
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );
      expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
      expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(linkRef.current?.className).toContain('nav-link');
    });
  });

  describe('asChild Prop', () => {
    it('renders Nav as the supplied child with nav classes', () => {
      render(
        <Nav asChild variant="tabs">
          <nav data-testid="custom-nav" />
        </Nav>
      );
      const el = screen.getByTestId('custom-nav');
      expect(el.tagName).toBe('NAV');
      expect(el).toHaveClass('nav', 'nav-tabs');
    });

    it('renders Nav.Link as the supplied child and preserves its attributes', () => {
      render(
        <Nav>
          <Nav.Item>
            <Nav.Link asChild active>
              <button type="button" className="custom-link">
                Home
              </button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );
      const button = screen.getByRole('button', { name: /home/i });
      expect(button).toHaveClass('nav-link', 'active', 'custom-link');
      expect(button).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Nav, 'Nav'],
      [Nav.Item, 'Nav.Item'],
      [Nav.Link, 'Nav.Link'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('sets aria-current="page" on the active link only', () => {
      render(<Example />);
      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('aria-current', 'page');
      expect(screen.getByRole('link', { name: /profile/i })).not.toHaveAttribute('aria-current');
    });

    it('sets aria-disabled="true" on the disabled link only', () => {
      render(<Example />);
      expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(screen.getByRole('link', { name: /profile/i })).not.toHaveAttribute('aria-disabled');
    });

    it('supports an aria-label when used inside a nav landmark', () => {
      render(
        <nav aria-label="Main">
          <Example />
        </nav>
      );
      expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
    });
  });
});

describe('navVariants', () => {
  it('generates the base class by default', () => {
    expect(navVariants().trim()).toBe('nav');
  });

  it('generates variant classes', () => {
    expect(navVariants({ variant: 'underline' })).toContain('nav-underline');
    expect(navVariants({ variant: 'tabs' })).toContain('nav-tabs');
    expect(navVariants({ variant: 'default' }).trim()).toBe('nav');
  });

  it('generates color classes', () => {
    const colors = [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'neutral',
    ] as const;
    colors.forEach((color) => {
      expect(navVariants({ color })).toContain(`nav-${color}`);
    });
    expect(navVariants({ color: 'default' }).trim()).toBe('nav');
  });

  it('combines variant and color', () => {
    const classes = navVariants({ variant: 'underline', color: 'danger' });
    expect(classes).toContain('nav');
    expect(classes).toContain('nav-underline');
    expect(classes).toContain('nav-danger');
  });
});
