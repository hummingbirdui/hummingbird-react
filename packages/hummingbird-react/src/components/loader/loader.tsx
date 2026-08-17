import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const loaderVariants = cva('', {
  variants: {
    variant: {
      border: 'spinner-border',
      grow: 'spinner-grow',
      bar: 'loader-bar',
    },
    color: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
      neutral: '',
    },
    size: {
      sm: '',
      md: '',
    },
  },
  compoundVariants: [
    // small spinners
    { variant: 'border', size: 'sm', class: 'spinner-border-sm' },
    { variant: 'grow', size: 'sm', class: 'spinner-grow-sm' },

    // spinners color via currentcolor
    { variant: ['border', 'grow'], color: 'primary', class: 'text-primary' },
    { variant: ['border', 'grow'], color: 'secondary', class: 'text-secondary' },
    { variant: ['border', 'grow'], color: 'info', class: 'text-info' },
    { variant: ['border', 'grow'], color: 'success', class: 'text-success' },
    { variant: ['border', 'grow'], color: 'warning', class: 'text-warning' },
    { variant: ['border', 'grow'], color: 'danger', class: 'text-danger' },
    { variant: ['border', 'grow'], color: 'neutral', class: 'text-neutral' },

    // bar loader colors (primary is the bar's built-in default)
    { variant: 'bar', color: 'secondary', class: 'loader-bar-secondary' },
    { variant: 'bar', color: 'info', class: 'loader-bar-info' },
    { variant: 'bar', color: 'success', class: 'loader-bar-success' },
    { variant: 'bar', color: 'warning', class: 'loader-bar-warning' },
    { variant: 'bar', color: 'danger', class: 'loader-bar-danger' },
  ],
  defaultVariants: {
    variant: 'border',
    size: 'md',
  },
});

export interface LoaderProps
  extends Omit<React.ComponentProps<'div'>, 'color'>,
    VariantProps<typeof loaderVariants> {
  /** Screen-reader text announced with the loader. Pass an empty string to omit it. */
  label?: string;
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

function Loader({
  className,
  variant,
  color,
  size,
  label = 'Loading...',
  asChild = false,
  children,
  ...props
}: LoaderProps) {
  const sharedProps = {
    'data-slot': 'loader',
    role: 'status',
    className: cn(loaderVariants({ variant, color, size }), className),
    ...props,
  };

  // Slot accepts exactly one child, so the child element is used verbatim and
  // provides its own screen-reader label.
  if (asChild) {
    return <Slot.Root {...sharedProps}>{children}</Slot.Root>;
  }

  return (
    <div {...sharedProps}>
      {children}
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  );
}

Loader.displayName = 'Loader';

namespace Loader {
  export type Props = React.ComponentProps<typeof Loader>;
}

export { Loader, loaderVariants };
