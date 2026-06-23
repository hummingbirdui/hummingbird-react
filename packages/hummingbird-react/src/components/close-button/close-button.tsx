import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
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
  extends React.ComponentProps<'button'>,
    VariantProps<typeof closeButtonVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** An icon-only dismiss button (×). Defaults `type="button"` and `aria-label="Close"`. */
function CloseButton({ className, variant, shape, asChild = false, ...props }: CloseButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="close-button"
      aria-label="Close"
      className={cn(closeButtonVariants({ variant, shape }), className)}
      {...(asChild ? {} : { type: 'button' })}
      {...props}
    />
  );
}

CloseButton.displayName = 'CloseButton';

export { CloseButton, closeButtonVariants };
