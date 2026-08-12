import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const spinnerVariants = cva('spinner', {
  variants: {
    color: {
      neutral: 'spinner-neutral',
      primary: 'spinner-primary',
      secondary: 'spinner-secondary',
      info: 'spinner-info',
      success: 'spinner-success',
      warning: 'spinner-warning',
      danger: 'spinner-danger',
    },
    size: {
      sm: 'spinner-sm',
      md: '',
      lg: 'spinner-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export interface SpinnerProps
  extends React.ComponentProps<'span'>,
VariantProps<typeof spinnerVariants> {
  label?: string;
}

function Spinner({ className, color, size, label = 'Loading...', ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-live="polite"
      className={cn(spinnerVariants({ color, size }), className)}
      {...props}
      >
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
    );
}

Spinner.displayName = 'Spinner';

namespace Spinner {
  export type Props = React.ComponentProps<typeof Spinner>;
}

export { Spinner, spinnerVariants };
