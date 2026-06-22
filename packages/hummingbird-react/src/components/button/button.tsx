import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      filled: '',
      subtle: '',
      outline: '',
      text: '',
      link: 'btn-link',
      icon: 'btn-icon',
    },
    color: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
      neutral: '',
      light: '',
      dark: '',
    },
    size: {
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    },
    shape: {
      default: '',
      square: 'btn-square',
      circle: 'btn-circle',
    },
  },
  compoundVariants: [
    // Filled variants
    { variant: 'filled', color: 'primary', class: 'btn-primary' },
    { variant: 'filled', color: 'secondary', class: 'btn-secondary' },
    { variant: 'filled', color: 'info', class: 'btn-info' },
    { variant: 'filled', color: 'success', class: 'btn-success' },
    { variant: 'filled', color: 'warning', class: 'btn-warning' },
    { variant: 'filled', color: 'danger', class: 'btn-danger' },
    { variant: 'filled', color: 'neutral', class: 'btn-neutral' },
    { variant: 'filled', color: 'light', class: 'btn-light' },
    { variant: 'filled', color: 'dark', class: 'btn-dark' },

    // Subtle variants
    { variant: 'subtle', color: 'primary', class: 'btn-subtle-primary' },
    { variant: 'subtle', color: 'secondary', class: 'btn-subtle-secondary' },
    { variant: 'subtle', color: 'info', class: 'btn-subtle-info' },
    { variant: 'subtle', color: 'success', class: 'btn-subtle-success' },
    { variant: 'subtle', color: 'warning', class: 'btn-subtle-warning' },
    { variant: 'subtle', color: 'danger', class: 'btn-subtle-danger' },
    { variant: 'subtle', color: 'neutral', class: 'btn-subtle-neutral' },
    { variant: 'subtle', color: 'light', class: 'btn-subtle-light' },
    { variant: 'subtle', color: 'dark', class: 'btn-subtle-dark' },

    // Outline variants
    { variant: 'outline', color: 'primary', class: 'btn-outline-primary' },
    { variant: 'outline', color: 'secondary', class: 'btn-outline-secondary' },
    { variant: 'outline', color: 'info', class: 'btn-outline-info' },
    { variant: 'outline', color: 'success', class: 'btn-outline-success' },
    { variant: 'outline', color: 'warning', class: 'btn-outline-warning' },
    { variant: 'outline', color: 'danger', class: 'btn-outline-danger' },
    { variant: 'outline', color: 'neutral', class: 'btn-outline-neutral' },
    { variant: 'outline', color: 'light', class: 'btn-outline-light' },
    { variant: 'outline', color: 'dark', class: 'btn-outline-dark' },

    // Text variants
    { variant: 'text', color: 'primary', class: 'btn-text-primary' },
    { variant: 'text', color: 'secondary', class: 'btn-text-secondary' },
    { variant: 'text', color: 'info', class: 'btn-text-info' },
    { variant: 'text', color: 'success', class: 'btn-text-success' },
    { variant: 'text', color: 'warning', class: 'btn-text-warning' },
    { variant: 'text', color: 'danger', class: 'btn-text-danger' },
    { variant: 'text', color: 'neutral', class: 'btn-text-neutral' },
    { variant: 'text', color: 'light', class: 'btn-text-light' },
    { variant: 'text', color: 'dark', class: 'btn-text-dark' },

    // Icon variants
    { variant: 'icon', color: 'primary', class: 'btn-icon-primary' },
    { variant: 'icon', color: 'secondary', class: 'btn-icon-secondary' },
    { variant: 'icon', color: 'info', class: 'btn-icon-info' },
    { variant: 'icon', color: 'success', class: 'btn-icon-success' },
    { variant: 'icon', color: 'warning', class: 'btn-icon-warning' },
    { variant: 'icon', color: 'danger', class: 'btn-icon-danger' },
    { variant: 'icon', color: 'neutral', class: 'btn-icon' },
  ],
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    shape: 'default',
  },
});

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element (e.g. Next.js Link). Uses Radix Slot. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, color, size, shape }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
