import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader, loaderVariants } from './loader';

describe('Loader', () => {
  describe('Rendering', () => {
    it('renders a status element with the border spinner by default', () => {
      render(<Loader />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveClass('spinner-border');
      expect(loader).toHaveAttribute('data-slot', 'loader');
    });

    it('renders the default screen-reader label', () => {
      render(<Loader />);
      const label = screen.getByText('Loading...');
      expect(label).toHaveClass('sr-only');
    });

    it('renders a custom label', () => {
      render(<Loader label="Saving changes" />);
      expect(screen.getByText('Saving changes')).toHaveClass('sr-only');
    });

    it('omits the label when passed an empty string', () => {
      render(<Loader label="" />);
      expect(screen.getByRole('status').querySelector('.sr-only')).not.toBeInTheDocument();
    });

    it('renders children before the label', () => {
      render(<Loader><span data-testid="child" /></Loader>);
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    const variants = [
      ['border', 'spinner-border'],
      ['grow', 'spinner-grow'],
      ['bar', 'loader-bar'],
    ] as const;

    variants.forEach(([variant, expected]) => {
      it(`applies ${expected} for the ${variant} variant`, () => {
        const { unmount } = render(<Loader variant={variant} />);
        expect(screen.getByRole('status')).toHaveClass(expected);
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const spinnerColors = [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'neutral',
    ] as const;

    spinnerColors.forEach((color) => {
      it(`applies text-${color} on spinners for the ${color} color`, () => {
        const { unmount } = render(<Loader color={color} />);
        expect(screen.getByRole('status')).toHaveClass('spinner-border', `text-${color}`);
        unmount();
      });
    });

    it('applies no color class when color is unset (currentcolor)', () => {
      render(<Loader />);
      expect(screen.getByRole('status').className.trim()).toBe('spinner-border');
    });

    const barColors = ['secondary', 'info', 'success', 'warning', 'danger'] as const;
    barColors.forEach((color) => {
      it(`applies loader-bar-${color} on the bar for the ${color} color`, () => {
        const { unmount } = render(<Loader variant="bar" color={color} />);
        expect(screen.getByRole('status')).toHaveClass('loader-bar', `loader-bar-${color}`);
        unmount();
      });
    });

    it('applies no extra class for the bar default primary color', () => {
      render(<Loader variant="bar" color="primary" />);
      expect(screen.getByRole('status').className.trim()).toBe('loader-bar');
    });
  });

  describe('Sizes', () => {
    it('applies spinner-border-sm for the small border spinner', () => {
      render(<Loader size="sm" />);
      expect(screen.getByRole('status')).toHaveClass('spinner-border', 'spinner-border-sm');
    });

    it('applies spinner-grow-sm for the small grow spinner', () => {
      render(<Loader variant="grow" size="sm" />);
      expect(screen.getByRole('status')).toHaveClass('spinner-grow', 'spinner-grow-sm');
    });

    it('applies no size class on the bar', () => {
      render(<Loader variant="bar" size="sm" />);
      expect(screen.getByRole('status').className.trim()).toBe('loader-bar');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classes with variant classes', () => {
      render(<Loader className="size-12" />);
      expect(screen.getByRole('status')).toHaveClass('spinner-border', 'size-12');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Loader ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('spinner-border');
    });
  });

  describe('asChild Prop', () => {
    it('renders the child element with loader classes and no injected label', () => {
      render(
        <Loader asChild>
          <span data-testid="custom-loader" className="me-2" />
        </Loader>
      );
      const el = screen.getByTestId('custom-loader');
      expect(el.tagName).toBe('SPAN');
      expect(el).toHaveClass('spinner-border', 'me-2');
      expect(el).toHaveAttribute('role', 'status');
      expect(el.querySelector('.sr-only')).not.toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Loader.displayName).toBe('Loader');
    });
  });

  describe('Accessibility', () => {
    it('exposes role="status" with an accessible label', () => {
      render(<Loader label="Loading results" />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveTextContent('Loading results');
    });

    it('supports aria-hidden for decorative use inside labelled controls', () => {
      render(<Loader aria-hidden="true" label="" />);
      expect(document.querySelector('[data-slot="loader"]')).toHaveAttribute(
        'aria-hidden',
        'true'
      );
    });
  });
});

describe('loaderVariants', () => {
  it('returns the border spinner by default', () => {
    expect(loaderVariants().trim()).toBe('spinner-border');
  });

  it('maps variants to their classes', () => {
    expect(loaderVariants({ variant: 'grow' })).toContain('spinner-grow');
    expect(loaderVariants({ variant: 'bar' })).toContain('loader-bar');
  });

  it('maps spinner colors to text classes and bar colors to loader-bar classes', () => {
    expect(loaderVariants({ color: 'danger' })).toContain('text-danger');
    expect(loaderVariants({ variant: 'bar', color: 'danger' })).toContain('loader-bar-danger');
  });

  it('maps the small size per spinner variant', () => {
    expect(loaderVariants({ size: 'sm' })).toContain('spinner-border-sm');
    expect(loaderVariants({ variant: 'grow', size: 'sm' })).toContain('spinner-grow-sm');
  });
});
