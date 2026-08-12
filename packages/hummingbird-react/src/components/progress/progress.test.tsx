import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress, progressVariants } from './progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders with role="progressbar"', () => {
      render(<Progress value={50} data-testid="progress" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

           it('has data-slot attribute', () => {
             render(<Progress value={50} data-testid="progress" />);
             expect(screen.getByTestId('progress')).toHaveAttribute('data-slot', 'progress');
           });

           it('applies default variant classes (primary + md)', () => {
             render(<Progress value={50} data-testid="progress" />);
             const progress = screen.getByTestId('progress');
             expect(progress).toHaveClass('progress', 'progress-primary');
             expect(progress).not.toHaveClass('progress-sm');
             expect(progress).not.toHaveClass('progress-lg');
           });
  });

         describe('Colors', () => {
           const colors = ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
           it('applies the correct class for every color', () => {
             colors.forEach((color) => {
               const { unmount } = render(<Progress value={50} data-testid="progress" color={color} />);
               expect(screen.getByTestId('progress')).toHaveClass('progress', `progress-${color}`);
               unmount();
             });
           });
         });
  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Progress value={50} data-testid="progress" size={size} />);
        const progress = screen.getByTestId('progress');
        if (size === 'md') {
          expect(progress).toHaveClass('progress');
          expect(progress).not.toHaveClass('progress-md');
        } else {
          expect(progress).toHaveClass(`progress-${size}`);
        }
        unmount();
      });
    });
  });

         describe('Determinate value', () => {
           it('reflects value via aria-valuenow', () => {
             render(<Progress value={42} data-testid="progress" />);
             expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
           });
           it('reflects a custom max via aria-valuemax', () => {
             render(<Progress value={5} max={10} data-testid="progress" />);
             expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '10');
           });
           it('clamps the indicator width calculation between 0 and 100 percent', () => {
             render(<Progress value={150} max={100} data-testid="progress" />);
             expect(screen.getByRole('progressbar')).toBeInTheDocument();
           });
         });
  describe('Indeterminate state', () => {
    it('has no aria-valuenow when value is null', () => {
      render(<Progress value={null} data-testid="progress" />);
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    });
    it('exposes data-state="indeterminate"', () => {
      render(<Progress value={null} data-testid="progress" />);
      expect(screen.getByTestId('progress')).toHaveAttribute('data-state', 'indeterminate');
    });
  });

         describe('Label', () => {
           it('does not render a label by default', () => {
             render(<Progress value={50} data-testid="progress" />);
             expect(screen.queryByText('50%')).not.toBeInTheDocument();
           });
           it('renders the rounded percentage when label is true', () => {
             render(<Progress value={33} label />);
             expect(screen.getByText('33%')).toBeInTheDocument();
           });
           it('does not render a label while indeterminate even if label is true', () => {
             render(<Progress value={null} label />);
             expect(screen.queryByText('%', { exact: false })).not.toBeInTheDocument();
           });
         });
  describe('Class Merging', () => {
    it('merges custom className with variant classes', () => {
      render(<Progress value={50} data-testid="progress" className="custom-class" />);
      expect(screen.getByTestId('progress')).toHaveClass('progress', 'progress-primary', 'custom-class');
    });
  });
  describe('Ref Forwarding', () => {
    it('forwards ref to the progress root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} data-testid="progress" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Progress.displayName).toBe('Progress');
    });
  });
});

describe('progressVariants', () => {
  it('generates correct default classes', () => {
    const classes = progressVariants();
    expect(classes).toContain('progress');
    expect(classes).toContain('progress-primary');
  });
  it('generates classes for all color options', () => {
    const colors = ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
    colors.forEach((color) => {
      expect(progressVariants({ color })).toContain(`progress-${color}`);
    });
  });
  it('generates classes for all size options', () => {
    expect(progressVariants({ size: 'sm' })).toContain('progress-sm');
    expect(progressVariants({ size: 'lg' })).toContain('progress-lg');
  });
});
