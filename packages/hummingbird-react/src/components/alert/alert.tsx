import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const alertVariants = cva('alert', {
  variants: {
    variant: {
      filled: '',
      subtle: '',
      outline: '',
    },
    color: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Filled variants
    { variant: 'filled', color: 'primary', class: 'alert-primary' },
    { variant: 'filled', color: 'secondary', class: 'alert-secondary' },
    { variant: 'filled', color: 'info', class: 'alert-info' },
    { variant: 'filled', color: 'success', class: 'alert-success' },
    { variant: 'filled', color: 'warning', class: 'alert-warning' },
    { variant: 'filled', color: 'danger', class: 'alert-danger' },

    // Subtle variants
    { variant: 'subtle', color: 'primary', class: 'alert-subtle-primary' },
    { variant: 'subtle', color: 'secondary', class: 'alert-subtle-secondary' },
    { variant: 'subtle', color: 'info', class: 'alert-subtle-info' },
    { variant: 'subtle', color: 'success', class: 'alert-subtle-success' },
    { variant: 'subtle', color: 'warning', class: 'alert-subtle-warning' },
    { variant: 'subtle', color: 'danger', class: 'alert-subtle-danger' },

    // Outline variants
    { variant: 'outline', color: 'primary', class: 'alert-outline-primary' },
    { variant: 'outline', color: 'secondary', class: 'alert-outline-secondary' },
    { variant: 'outline', color: 'info', class: 'alert-outline-info' },
    { variant: 'outline', color: 'success', class: 'alert-outline-success' },
    { variant: 'outline', color: 'warning', class: 'alert-outline-warning' },
    { variant: 'outline', color: 'danger', class: 'alert-outline-danger' },
  ],
  defaultVariants: {
    variant: 'filled',
  },
});

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof alertVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'div';

    return (
      <Comp
        ref={ref}
        role="alert"
        data-slot="alert"
        className={cn(alertVariants({ variant, color }), className)}
        {...props}
      />
    );
  }
);

Alert.displayName = 'Alert';

export interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const AlertIcon = React.forwardRef<HTMLSpanElement, AlertIconProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span';

    return (
      <Comp ref={ref} data-slot="alert-icon" className={cn('alert-icon', className)} {...props} />
    );
  }
);

AlertIcon.displayName = 'AlertIcon';

export { Alert, AlertIcon, alertVariants };
