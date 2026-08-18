import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const skeletonVariants = cva('skeleton', {
  variants: {
    variant: {
      rectangle: '',
      text: 'skeleton-text',
      circle: 'skeleton-circle',
      rounded: 'skeleton-rounded',
    },
    animation: {
      pulse: 'skeleton-pulse',
      shimmer: 'skeleton-shimmer',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'text',
    animation: 'pulse',
  },
});

export interface SkeletonProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof skeletonVariants> {
  asChild?: boolean;
}

function Skeleton({ className, variant, animation, asChild = false, ...props }: SkeletonProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="skeleton"
      aria-hidden={true}
      className={cn(skeletonVariants({ variant, animation }), className)}
      {...props}
    />
  );
}

Skeleton.displayName = 'Skeleton';

namespace Skeleton {
  export type Props = React.ComponentProps<typeof Skeleton>;
}

export { Skeleton, skeletonVariants };
