import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const buttonGroupVariants = cva('', {
  variants: {
    // `btn-group` and `btn-group-vertical` are mutually exclusive base classes
    // in the CSS, so orientation switches the base rather than adding to it.
    orientation: {
      horizontal: 'btn-group',
      vertical: 'btn-group-vertical',
    },
    size: {
      sm: 'btn-group-sm',
      md: '',
      lg: 'btn-group-lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export interface ButtonGroupProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

function ButtonGroup({
  className,
  orientation,
  size,
  asChild = false,
  ...props
}: ButtonGroupProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      role="group"
      data-slot="button-group"
      className={cn(buttonGroupVariants({ orientation, size }), className)}
      {...props}
    />
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export interface ButtonToolbarProps extends React.ComponentProps<'div'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** Wraps multiple button groups (and input groups) into a single toolbar. */
function ButtonToolbar({ className, asChild = false, ...props }: ButtonToolbarProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      role="toolbar"
      data-slot="button-toolbar"
      className={cn('btn-toolbar', className)}
      {...props}
    />
  );
}

ButtonToolbar.displayName = 'ButtonToolbar';

export { ButtonGroup, ButtonToolbar, buttonGroupVariants };
