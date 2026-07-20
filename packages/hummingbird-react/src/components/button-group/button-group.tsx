import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonGroupVariants = cva('', {
  variants: {
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
  extends React.ComponentProps<'div'>, VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({ className, orientation, size, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn(buttonGroupVariants({ orientation, size }), className)}
      {...props}
    />
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export interface ButtonToolbarProps extends React.ComponentProps<'div'> {}

function ButtonToolbar({ className, ...props }: ButtonToolbarProps) {
  return (
    <div
      role="toolbar"
      data-slot="button-toolbar"
      className={cn('btn-toolbar', className)}
      {...props}
    />
  );
}

ButtonToolbar.displayName = 'ButtonToolbar';

export { ButtonGroup, ButtonToolbar, buttonGroupVariants };
