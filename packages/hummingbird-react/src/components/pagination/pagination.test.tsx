import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination, paginationVariants } from './pagination';

// A complete pagination used across the tests.
function Example({
  contentClassName,
  ...props
}: React.ComponentProps<typeof Pagination> & { contentClassName?: string }) {
  return (
    <Pagination {...props}>
      <Pagination.Content className={contentClassName}>
        <Pagination.Item>
          <Pagination.Link href="#">Previous</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item active>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item disabled>
          <Pagination.Link href="#">Next</Pagination.Link>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

describe('Pagination', () => {
  describe('Rendering', () => {
    it('renders a nav landmark labelled pagination', () => {
      render(<Example />);
      const nav = screen.getByRole('navigation', { name: 'pagination' });
      expect(nav).toBeInTheDocument();
      expect(nav).toBeInstanceOf(HTMLElement);
      expect(nav.tagName).toBe('NAV');
      expect(nav).toHaveAttribute('data-slot', 'pagination');
    });

    it('renders the content as a ul with page links', () => {
      render(<Example />);
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('UL');
      expect(screen.getAllByRole('listitem')).toHaveLength(4);
      expect(screen.getByRole('link', { name: 'Previous' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Next' })).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies pagination to the content list', () => {
      render(<Example />);
      const list = screen.getByRole('list');
      expect(list).toHaveClass('pagination');
      expect(list).toHaveAttribute('data-slot', 'pagination-content');
    });

    it('applies the default filled primary compound class', () => {
      render(<Example />);
      expect(screen.getByRole('list')).toHaveClass('pagination', 'pagination-primary');
    });

    it('applies page-item to items', () => {
      render(<Example />);
      const item = screen.getByRole('link', { name: '2' }).closest('li') as HTMLElement;
      expect(item).toHaveClass('page-item');
      expect(item).toHaveAttribute('data-slot', 'pagination-item');
    });

    it('applies page-link to links', () => {
      render(<Example />);
      const link = screen.getByRole('link', { name: '2' });
      expect(link).toHaveClass('page-link');
      expect(link).toHaveAttribute('data-slot', 'pagination-link');
    });

    it('marks the active item with the active class', () => {
      render(<Example />);
      const activeItem = screen.getByRole('link', { name: '1' }).closest('li') as HTMLElement;
      expect(activeItem).toHaveClass('page-item', 'active');
      const inactiveItem = screen.getByRole('link', { name: '2' }).closest('li') as HTMLElement;
      expect(inactiveItem).not.toHaveClass('active');
    });

    it('marks the disabled item with the disabled class', () => {
      render(<Example />);
      const disabledItem = screen.getByRole('link', { name: 'Next' }).closest('li') as HTMLElement;
      expect(disabledItem).toHaveClass('page-item', 'disabled');
      const enabledItem = screen.getByRole('link', { name: '2' }).closest('li') as HTMLElement;
      expect(enabledItem).not.toHaveClass('disabled');
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm', expected: 'pagination-sm' },
      { size: 'md', expected: '' },
      { size: 'lg', expected: 'pagination-lg' },
    ] as const;

    it('applies size classes to the content list', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(<Example size={size} />);
        const list = screen.getByRole('list');
        expect(list).toHaveClass('pagination');
        if (expected) {
          expect(list).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Shapes', () => {
    it('applies the circle shape class', () => {
      render(<Example shape="circle" />);
      expect(screen.getByRole('list')).toHaveClass('pagination', 'pagination-circle');
    });

    it('applies no shape class for the default shape', () => {
      render(<Example shape="default" />);
      const list = screen.getByRole('list');
      expect(list).toHaveClass('pagination');
      expect(list).not.toHaveClass('pagination-circle');
    });
  });

  describe('Variants & Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'danger',
      'warning',
      'success',
      'info',
      'neutral',
    ] as const;

    it('applies filled variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Example variant="filled" color={color} />);
        expect(screen.getByRole('list')).toHaveClass('pagination', `pagination-${color}`);
        unmount();
      });
    });

    it('applies subtle variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Example variant="subtle" color={color} />);
        expect(screen.getByRole('list')).toHaveClass('pagination', `pagination-subtle-${color}`);
        unmount();
      });
    });

    it('applies outlined variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Example variant="outlined" color={color} />);
        expect(screen.getByRole('list')).toHaveClass('pagination', `pagination-outlined-${color}`);
        unmount();
      });
    });

    it('combines variant, color, size, and shape', () => {
      render(<Example variant="outlined" color="success" size="lg" shape="circle" />);
      expect(screen.getByRole('list')).toHaveClass(
        'pagination',
        'pagination-outlined-success',
        'pagination-lg',
        'pagination-circle'
      );
    });
  });

  describe('Interactions', () => {
    it('fires onClick on a page link', async () => {
      const handleClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
      const user = userEvent.setup();
      render(
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Link href="#" onClick={handleClick}>
                2
              </Pagination.Link>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      );

      await user.click(screen.getByRole('link', { name: '2' }));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('preserves the href attribute', () => {
      render(
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Link href="/page/2">2</Pagination.Link>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      );
      expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/page/2');
    });
  });

  describe('Class Merging', () => {
    it('passes className through on the nav', () => {
      render(<Pagination className="custom-nav" />);
      expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
    });

    it('merges className on the content list', () => {
      render(<Example contentClassName="custom-list" />);
      expect(screen.getByRole('list')).toHaveClass(
        'pagination',
        'pagination-primary',
        'custom-list'
      );
    });

    it('merges className on items and links', () => {
      render(
        <Pagination>
          <Pagination.Content>
            <Pagination.Item active className="custom-item">
              <Pagination.Link href="#" className="custom-link">
                1
              </Pagination.Link>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      );
      const link = screen.getByRole('link', { name: '1' });
      expect(link).toHaveClass('page-link', 'custom-link');
      expect(link.closest('li')).toHaveClass('page-item', 'active', 'custom-item');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the nav element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Pagination ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('forwards ref to the ul element', () => {
      const ref = React.createRef<HTMLUListElement>();
      render(<Pagination.Content ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
      expect(ref.current?.className).toContain('pagination');
    });

    it('forwards ref to the li element', () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <Pagination.Content>
          <Pagination.Item ref={ref}>Item</Pagination.Item>
        </Pagination.Content>
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
      expect(ref.current?.className).toContain('page-item');
    });

    it('forwards ref to the anchor element', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Pagination.Link href="#" ref={ref}>
          1
        </Pagination.Link>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.className).toContain('page-link');
    });
  });

  describe('asChild Prop', () => {
    it('renders Pagination.Link as the supplied child with classes and aria-current', () => {
      render(
        <Pagination.Item active>
          <Pagination.Link asChild>
            <button type="button">1</button>
          </Pagination.Link>
        </Pagination.Item>
      );
      const button = screen.getByRole('button', { name: '1' });
      expect(button).toHaveClass('page-link');
      expect(button).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Pagination, 'Pagination'],
      [Pagination.Content, 'Pagination.Content'],
      [Pagination.Item, 'Pagination.Item'],
      [Pagination.Link, 'Pagination.Link'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes the navigation landmark with the default label', () => {
      render(<Example />);
      expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
    });

    it('allows overriding the aria-label', () => {
      render(<Pagination aria-label="Search results pages" />);
      expect(screen.getByRole('navigation', { name: 'Search results pages' })).toBeInTheDocument();
    });

    it('marks the active link with aria-current="page"', () => {
      render(<Example />);
      expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('aria-current', 'page');
    });

    it('omits aria-current on inactive links', () => {
      render(<Example />);
      expect(screen.getByRole('link', { name: '2' })).not.toHaveAttribute('aria-current');
    });

    it('is keyboard navigable', async () => {
      const handleClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
      const user = userEvent.setup();
      render(
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Link href="#" onClick={handleClick}>
                1
              </Pagination.Link>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      );

      await user.tab();
      expect(screen.getByRole('link', { name: '1' })).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });
});

describe('paginationVariants', () => {
  it('generates correct default classes', () => {
    const classes = paginationVariants();
    expect(classes).toContain('pagination');
    expect(classes).toContain('pagination-primary'); // filled + primary default
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: 'pagination-sm' },
      { size: 'md' as const, expected: '' }, // default, no class
      { size: 'lg' as const, expected: 'pagination-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = paginationVariants({ size });
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates the circle shape class', () => {
    expect(paginationVariants({ shape: 'circle' })).toContain('pagination-circle');
    expect(paginationVariants({ shape: 'default' })).not.toContain('pagination-circle');
  });

  it('generates classes for every variant + color combination', () => {
    const colors = [
      'primary',
      'secondary',
      'danger',
      'warning',
      'success',
      'info',
      'neutral',
    ] as const;

    colors.forEach((color) => {
      expect(paginationVariants({ variant: 'filled', color })).toContain(`pagination-${color}`);
      expect(paginationVariants({ variant: 'subtle', color })).toContain(
        `pagination-subtle-${color}`
      );
      expect(paginationVariants({ variant: 'outlined', color })).toContain(
        `pagination-outlined-${color}`
      );
    });
  });

  it('combines size, shape, variant, and color', () => {
    const classes = paginationVariants({
      size: 'lg',
      shape: 'circle',
      variant: 'subtle',
      color: 'danger',
    });
    expect(classes).toContain('pagination');
    expect(classes).toContain('pagination-lg');
    expect(classes).toContain('pagination-circle');
    expect(classes).toContain('pagination-subtle-danger');
  });
});
