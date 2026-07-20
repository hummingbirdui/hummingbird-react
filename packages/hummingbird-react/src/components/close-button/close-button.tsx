import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const closeButtonVariants = cva('btn-close', {
  variants: {
    variant: {
      default: '',
      white: 'btn-close-white',
    },
    shape: {
      default: '',
      circle: 'btn-close-circle',
    },
  },
  defaultVariants: {
    variant: 'default',
    shape: 'default',
  },
});

export interface CloseButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof closeButtonVariants> {}

function CloseButton({ className, variant, shape, type = 'button', ...props }: CloseButtonProps) {
  return (
    <button
      data-slot="close-button"
      aria-label="Close"
      className={cn(closeButtonVariants({ variant, shape }), className)}
      type={type}
      {...props}
    />
  );
}

CloseButton.displayName = 'CloseButton';

export { CloseButton, closeButtonVariants };
