import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const badgeVariants = cva('badge', {
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
    size: {
      sm: '',
      md: 'badge-md',
      lg: 'badge-lg',
    },
    link: {
      true: 'badge-link',
    },
  },
  compoundVariants: [
    // Filled variants
    { variant: 'filled', color: 'primary', class: 'badge-primary' },
    { variant: 'filled', color: 'secondary', class: 'badge-secondary' },
    { variant: 'filled', color: 'info', class: 'badge-info' },
    { variant: 'filled', color: 'success', class: 'badge-success' },
    { variant: 'filled', color: 'warning', class: 'badge-warning' },
    { variant: 'filled', color: 'danger', class: 'badge-danger' },

    // Subtle variants
    { variant: 'subtle', color: 'primary', class: 'badge-subtle-primary' },
    { variant: 'subtle', color: 'secondary', class: 'badge-subtle-secondary' },
    { variant: 'subtle', color: 'info', class: 'badge-subtle-info' },
    { variant: 'subtle', color: 'success', class: 'badge-subtle-success' },
    { variant: 'subtle', color: 'warning', class: 'badge-subtle-warning' },
    { variant: 'subtle', color: 'danger', class: 'badge-subtle-danger' },

    // Outline variants
    { variant: 'outline', color: 'primary', class: 'badge-outline-primary' },
    { variant: 'outline', color: 'secondary', class: 'badge-outline-secondary' },
    { variant: 'outline', color: 'info', class: 'badge-outline-info' },
    { variant: 'outline', color: 'success', class: 'badge-outline-success' },
    { variant: 'outline', color: 'warning', class: 'badge-outline-warning' },
    { variant: 'outline', color: 'danger', class: 'badge-outline-danger' },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'sm',
  },
});

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof badgeVariants> {
  /** Render as a child element (e.g. a link). Uses Radix Slot. */
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, link, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span';

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, color, size, link }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export interface BadgeActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A small circular action (e.g. a dismiss button) rendered inside a Badge. */
const BadgeActionButton = React.forwardRef<HTMLButtonElement, BadgeActionButtonProps>(
  ({ className, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="badge-action-btn"
        className={cn('badge-action-btn', className)}
        {...(asChild ? {} : { type })}
        {...props}
      />
    );
  }
);

BadgeActionButton.displayName = 'BadgeActionButton';

export { Badge, BadgeActionButton, badgeVariants };
