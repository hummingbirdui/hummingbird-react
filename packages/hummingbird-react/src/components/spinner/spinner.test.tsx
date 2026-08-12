import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner, spinnerVariants } from './spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders a span element', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toBeInstanceOf(HTMLSpanElement);
    });

           it('has data-slot attribute', () => {
             render(<Spinner data-testid="spinner" />);
             expect(screen.getByTestId('spinner')).toHaveAttribute('data-slot', 'spinner');
           });

           it('applies default variant classes (primary + md)', () => {
             render(<Spinner data-testid="spinner" />);
             const spinner = screen.getByTestId('spinner');
             expect(spinner).toHaveClass('spinner', 'spinner-primary');
             expect(spinner).not.toHaveClass('spinner-sm');
             expect(spinner).not.toHaveClass('spinner-lg');
           });
  });

         describe('Colors', () => {
           const colors = ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
           it('applies the correct class for every color', () => {
             colors.forEach((color) => {
               const { unmount } = render(<Spinner data-testid="spinner" color={color} />);
               expect(screen.getByTestId('spinner')).toHaveClass('spinner', `spinner-${color}`);
               unmount();
             });
           });
         });

         describe('Sizes', () => {
           const sizes = ['sm', 'md', 'lg'] as const;
           it('applies size classes correctly', () => {
             sizes.forEach((size) => {
               const { unmount } = render(<Spinner data-testid="spinner" size={size} />);
               const spinner = screen.getByTestId('spinner');
               if (size === 'md') {
                 expect(spinner).toHaveClass('spinner');
                 expect(spinner).not.toHaveClass('spinner-md');
               } else {
                 expect(spinner).toHaveClass(`spinner-${size}`);
               }
               unmount();
             });
           });
         });

         describe('Accessibility', () => {
           it('has role="status"', () => {
             render(<Spinner data-testid="spinner" />);
             expect(screen.getByTestId('spinner')).toHaveAttribute('role', 'status');
           });
           it('has aria-live="polite"', () => {
             render(<Spinner data-testid="spinner" />);
             expect(screen.getByTestId('spinner')).toHaveAttribute('aria-live', 'polite');
           });
           it('renders a visually hidden label by default', () => {
             render(<Spinner />);
             expect(screen.getByText('Loading...')).toBeInTheDocument();
           });
           it('supports a custom label', () => {
             render(<Spinner label="Fetching results" />);
             expect(screen.getByText('Fetching results')).toBeInTheDocument();
           });
           it('renders without a label when label is set to an empty string', () => {
             render(<Spinner label="" data-testid="spinner" />);
             expect(screen.getByTestId('spinner')).toBeEmptyDOMElement();
           });
           it('is exposed with its accessible name via the status role', () => {
             render(<Spinner label="Loading results" />);
             expect(screen.getByRole('status', { name: 'Loading results' })).toBeInTheDocument();
           });
         });

         describe('Class Merging', () => {
           it('merges custom className with variant classes', () => {
             render(<Spinner data-testid="spinner" className="custom-class" />);
             expect(screen.getByTestId('spinner')).toHaveClass('spinner', 'spinner-primary', 'custom-class');
           });
         });
  describe('Ref Forwarding', () => {
    it('forwards ref to the span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Spinner ref={ref} data-testid="spinner" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Spinner.displayName).toBe('Spinner');
    });
  });
});

describe('spinnerVariants', () => {
  it('generates correct default classes', () => {
    const classes = spinnerVariants();
    expect(classes).toContain('spinner');
    expect(classes).toContain('spinner-primary');
  });
  it('generates classes for all color options', () => {
    const colors = ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
    colors.forEach((color) => {
      expect(spinnerVariants({ color })).toContain(`spinner-${color}`);
    });
  });
  it('generates classes for all size options', () => {
    expect(spinnerVariants({ size: 'sm' })).toContain('spinner-sm');
    expect(spinnerVariants({ size: 'lg' })).toContain('spinner-lg');
  });
});
