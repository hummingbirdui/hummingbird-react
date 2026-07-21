import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar, navbarVariants, navbarNavVariants } from './navbar';

// A complete navbar used across the tests. `Navbar.Collapse` is forceMount-ed
// by the component, so its content is always in the DOM.
function Example(
  props: React.ComponentProps<typeof Navbar> & {
    collapseProps?: React.ComponentProps<typeof Navbar.Collapse>;
  }
) {
  const { collapseProps, ...navbarProps } = props;
  return (
    <Navbar {...navbarProps}>
      <Navbar.Brand href="/">Brand</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse {...collapseProps}>
        <Navbar.Nav>
          <li>
            <a href="#home">Home</a>
          </li>
        </Navbar.Nav>
        <Navbar.Text>Signed in</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

function getCollapse() {
  return document.querySelector('[data-slot="navbar-collapse"]') as HTMLElement;
}

function getCollapseInner() {
  return document.querySelector('[data-slot="navbar-collapse-inner"]') as HTMLElement;
}

describe('Navbar', () => {
  describe('Rendering', () => {
    it('renders a nav landmark', () => {
      render(<Example aria-label="Main" />);
      const nav = screen.getByRole('navigation', { name: /main/i });
      expect(nav.tagName).toBe('NAV');
      expect(nav).toHaveAttribute('data-slot', 'navbar');
    });

    it('renders the brand as an anchor', () => {
      render(<Example />);
      const brand = screen.getByRole('link', { name: /brand/i });
      expect(brand).toBeInstanceOf(HTMLAnchorElement);
      expect(brand).toHaveAttribute('href', '/');
      expect(brand).toHaveAttribute('data-slot', 'navbar-brand');
    });

    it('renders the nav list as an unordered list', () => {
      render(<Example />);
      const list = screen.getByRole('list');
      expect(list).toBeInstanceOf(HTMLUListElement);
      expect(list).toHaveAttribute('data-slot', 'navbar-nav');
    });

    it('renders the text as a span', () => {
      render(<Example />);
      const text = screen.getByText('Signed in');
      expect(text).toBeInstanceOf(HTMLSpanElement);
      expect(text).toHaveAttribute('data-slot', 'navbar-text');
    });

    it('renders the toggler as a button with a default hamburger icon', () => {
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toBeInstanceOf(HTMLButtonElement);
      expect(toggler).toHaveAttribute('data-slot', 'navbar-toggler');
      expect(toggler.querySelector('svg')).toBeInTheDocument();
    });

    it('always mounts the collapse content (forceMount)', () => {
      render(<Example />);
      expect(getCollapse()).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies the navbar base class', () => {
      render(<Example aria-label="Main" />);
      expect(screen.getByRole('navigation')).toHaveClass('navbar');
    });

    it('applies navbar-brand, navbar-nav, and navbar-text', () => {
      render(<Example />);
      expect(screen.getByRole('link', { name: /brand/i })).toHaveClass('navbar-brand');
      expect(screen.getByRole('list')).toHaveClass('navbar-nav');
      expect(screen.getByText('Signed in')).toHaveClass('navbar-text');
    });

    it('applies navbar-collapse to the collapse content', () => {
      render(<Example />);
      expect(getCollapse()).toHaveClass('navbar-collapse');
    });

    it('styles the default toggler as an icon button', () => {
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveClass('navbar-toggler', 'btn', 'btn-icon', 'btn-sm');
    });

    it('drops the icon-button classes when the toggler has custom children', () => {
      render(
        <Navbar>
          <Navbar.Toggle>Menu</Navbar.Toggle>
          <Navbar.Collapse>Content</Navbar.Collapse>
        </Navbar>
      );
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveClass('navbar-toggler');
      expect(toggler).not.toHaveClass('btn', 'btn-icon', 'btn-sm');
      expect(toggler).toHaveTextContent('Menu');
    });

    it('renders Navbar.TogglerIcon as an svg with size-5', () => {
      const { container } = render(<Navbar.TogglerIcon data-testid="icon" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('size-5');
    });
  });

  describe('Expand', () => {
    const expands = [
      { expand: 'sm', expected: 'navbar-expand-sm' },
      { expand: 'md', expected: 'navbar-expand-md' },
      { expand: 'lg', expected: 'navbar-expand-lg' },
      { expand: 'xl', expected: 'navbar-expand-xl' },
      { expand: '2xl', expected: 'navbar-expand-2xl' },
      { expand: 'always', expected: 'navbar-expand' },
    ] as const;

    it('applies expand classes', () => {
      expands.forEach(({ expand, expected }) => {
        const { unmount } = render(<Example aria-label="Main" expand={expand} />);
        expect(screen.getByRole('navigation')).toHaveClass('navbar', expected);
        unmount();
      });
    });

    it('applies no expand class when expand is omitted', () => {
      render(<Example aria-label="Main" />);
      expect(screen.getByRole('navigation').className.trim()).toBe('navbar');
    });
  });

  describe('Navbar.Nav scrollable', () => {
    it('applies navbar-nav-scroll when scrollable', () => {
      render(
        <Navbar>
          <Navbar.Nav scrollable />
        </Navbar>
      );
      expect(screen.getByRole('list')).toHaveClass('navbar-nav', 'navbar-nav-scroll');
    });

    it('applies only the base class by default', () => {
      render(
        <Navbar>
          <Navbar.Nav />
        </Navbar>
      );
      expect(screen.getByRole('list').className.trim()).toBe('navbar-nav');
    });
  });

  describe('Collapse gating', () => {
    it('collapses at all widths when expand is omitted', () => {
      render(<Example />);
      const outer = getCollapse();
      expect(outer).toHaveClass(
        'grid',
        'items-stretch',
        'overflow-hidden',
        'data-[state=closed]:grid-rows-[0fr]',
        'data-[state=open]:grid-rows-[1fr]'
      );
      expect(getCollapseInner()).toHaveClass('min-h-0', 'overflow-hidden');
    });

    it('gates the collapse below the expand breakpoint', () => {
      const gates = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
      gates.forEach((gate) => {
        const { unmount } = render(<Example expand={gate} />);
        const outer = getCollapse();
        expect(outer).toHaveClass(
          `max-${gate}:grid`,
          `max-${gate}:items-stretch`,
          `max-${gate}:overflow-hidden`,
          `max-${gate}:data-[state=closed]:grid-rows-[0fr]`,
          `max-${gate}:data-[state=open]:grid-rows-[1fr]`
        );
        expect(getCollapseInner()).toHaveClass('min-h-0', 'overflow-hidden', `${gate}:contents`);
        unmount();
      });
    });

    it('never collapses when expand is always', () => {
      render(<Example expand="always" />);
      const outer = getCollapse();
      expect(outer).toHaveClass('navbar-collapse');
      expect(outer).not.toHaveClass('grid');
      expect(getCollapseInner()).toHaveClass('contents');
    });

    it('sets the collapse duration CSS variable from the duration prop', () => {
      render(<Example collapseProps={{ duration: 350 }} />);
      expect(getCollapse().style.getPropertyValue('--hb-navbar-collapse-duration')).toBe('350ms');
    });

    it('sets no duration variable by default', () => {
      render(<Example />);
      expect(getCollapse().style.getPropertyValue('--hb-navbar-collapse-duration')).toBe('');
    });
  });

  describe('Interactions', () => {
    it('is closed by default', () => {
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
      expect(toggler).toHaveAttribute('data-state', 'closed');
      expect(getCollapse()).toHaveAttribute('data-state', 'closed');
    });

    it('opens and closes when the toggler is clicked', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });

      await user.click(toggler);
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
      expect(getCollapse()).toHaveAttribute('data-state', 'open');

      await user.click(toggler);
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
      expect(getCollapse()).toHaveAttribute('data-state', 'closed');
    });

    it('respects defaultOpen', () => {
      render(<Example defaultOpen />);
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getCollapse()).toHaveAttribute('data-state', 'open');
    });

    it('fires onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onOpenChange={onOpenChange} />);

      await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);

      await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('supports controlled open', () => {
      const { rerender } = render(<Example open={false} />);
      expect(getCollapse()).toHaveAttribute('data-state', 'closed');

      rerender(<Example open />);
      expect(getCollapse()).toHaveAttribute('data-state', 'open');
    });

    it('does not change state when controlled and no handler updates it', async () => {
      const user = userEvent.setup();
      render(<Example open={false} />);

      await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
      expect(getCollapse()).toHaveAttribute('data-state', 'closed');
    });

    it('toggles with the keyboard', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });

      toggler.focus();
      await user.keyboard('{Enter}');
      expect(toggler).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard(' ');
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Class Merging', () => {
    it('merges custom className on the navbar', () => {
      render(<Example aria-label="Main" expand="lg" className="custom-navbar" />);
      expect(screen.getByRole('navigation')).toHaveClass(
        'navbar',
        'navbar-expand-lg',
        'custom-navbar'
      );
    });

    it('merges custom className on sub-components', () => {
      render(
        <Navbar>
          <Navbar.Brand href="/" className="custom-brand">
            Brand
          </Navbar.Brand>
          <Navbar.Toggle className="custom-toggler" />
          <Navbar.Collapse className="custom-collapse">
            <Navbar.Nav className="custom-nav" />
            <Navbar.Text className="custom-text">Text</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      );
      expect(screen.getByRole('link', { name: /brand/i })).toHaveClass(
        'navbar-brand',
        'custom-brand'
      );
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toHaveClass(
        'navbar-toggler',
        'custom-toggler'
      );
      expect(getCollapse()).toHaveClass('navbar-collapse', 'custom-collapse');
      expect(screen.getByRole('list')).toHaveClass('navbar-nav', 'custom-nav');
      expect(screen.getByText('Text')).toHaveClass('navbar-text', 'custom-text');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the nav element', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Navbar ref={ref}>
          <Navbar.Brand href="/">Brand</Navbar.Brand>
        </Navbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
      expect(ref.current?.className).toContain('navbar');
    });

    it('forwards refs to brand, nav, and text elements', () => {
      const brandRef = React.createRef<HTMLAnchorElement>();
      const navRef = React.createRef<HTMLUListElement>();
      const textRef = React.createRef<HTMLSpanElement>();
      render(
        <Navbar>
          <Navbar.Brand ref={brandRef} href="/">
            Brand
          </Navbar.Brand>
          <Navbar.Nav ref={navRef} />
          <Navbar.Text ref={textRef}>Text</Navbar.Text>
        </Navbar>
      );
      expect(brandRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(navRef.current).toBeInstanceOf(HTMLUListElement);
      expect(textRef.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('asChild Prop', () => {
    it('renders Navbar.Brand as the supplied child and preserves its attributes', () => {
      render(
        <Navbar>
          <Navbar.Brand asChild>
            <button type="button" className="custom-brand">
              Brand
            </button>
          </Navbar.Brand>
        </Navbar>
      );
      const button = screen.getByRole('button', { name: /brand/i });
      expect(button).toHaveClass('navbar-brand', 'custom-brand');
    });

    it('renders the toggler as the supplied child via Radix asChild', async () => {
      const user = userEvent.setup();
      render(
        <Navbar>
          <Navbar.Toggle asChild>
            <button type="button" className="custom-toggle">
              Menu
            </button>
          </Navbar.Toggle>
          <Navbar.Collapse>Content</Navbar.Collapse>
        </Navbar>
      );
      // The default aria-label is still applied, so it wins as accessible name.
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveTextContent('Menu');
      expect(toggler).toHaveClass('navbar-toggler', 'custom-toggle');

      await user.click(toggler);
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Navbar, 'Navbar'],
      [Navbar.Brand, 'Navbar.Brand'],
      [Navbar.Nav, 'Navbar.Nav'],
      [Navbar.Text, 'Navbar.Text'],
      [Navbar.Collapse, 'Navbar.Collapse'],
      [Navbar.Toggle, 'Navbar.Toggle'],
      [Navbar.TogglerIcon, 'Navbar.TogglerIcon'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('labels the toggler by default and allows overriding it', () => {
      const { unmount } = render(<Example />);
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
      unmount();

      render(
        <Navbar>
          <Navbar.Toggle aria-label="Open menu" />
          <Navbar.Collapse>Content</Navbar.Collapse>
        </Navbar>
      );
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('wires the toggler to the collapse via aria-controls when open', () => {
      // Radix only exposes aria-controls while the collapsible is open.
      render(<Example defaultOpen />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      const controls = toggler.getAttribute('aria-controls');
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls as string)).toBe(getCollapse());
    });

    it('reflects the open state on aria-expanded', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
      await user.click(toggler);
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
    });
  });
});

describe('navbarVariants', () => {
  it('generates the base class by default', () => {
    expect(navbarVariants().trim()).toBe('navbar');
  });

  it('generates expand classes', () => {
    expect(navbarVariants({ expand: 'sm' })).toContain('navbar-expand-sm');
    expect(navbarVariants({ expand: 'md' })).toContain('navbar-expand-md');
    expect(navbarVariants({ expand: 'lg' })).toContain('navbar-expand-lg');
    expect(navbarVariants({ expand: 'xl' })).toContain('navbar-expand-xl');
    expect(navbarVariants({ expand: '2xl' })).toContain('navbar-expand-2xl');
    expect(navbarVariants({ expand: 'always' })).toContain('navbar-expand');
  });
});

describe('navbarNavVariants', () => {
  it('generates the base class by default', () => {
    expect(navbarNavVariants().trim()).toBe('navbar-nav');
  });

  it('generates the scroll class when scrollable', () => {
    expect(navbarNavVariants({ scrollable: true })).toContain('navbar-nav-scroll');
    expect(navbarNavVariants({ scrollable: false }).trim()).toBe('navbar-nav');
  });
});
