import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonVariants = cva('placeholder', {
  variants: {
    size: {
      xs: 'placeholder-xs',
      sm: 'placeholder-sm',
      md: '',
      lg: 'placeholder-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SkeletonProps
  extends React.ComponentProps<'span'>, VariantProps<typeof skeletonVariants> {}

function SkeletonRoot({ className, size, ...props }: SkeletonProps) {
  return (
    <span
      data-slot="skeleton"
      className={cn(skeletonVariants({ size }), className)}
      {...props}
    />
  );
}

SkeletonRoot.displayName = 'Skeleton';

const skeletonGroupVariants = cva('', {
  variants: {
    animation: {
      glow: 'placeholder-glow',
      wave: 'placeholder-wave',
    },
  },
  defaultVariants: {
    animation: 'glow',
  },
});

export interface SkeletonGroupProps
  extends React.ComponentProps<'div'>, VariantProps<typeof skeletonGroupVariants> {}

function SkeletonGroup({ className, animation, ...props }: SkeletonGroupProps) {
  return (
    <div
      data-slot="skeleton-group"
      className={cn(skeletonGroupVariants({ animation }), className)}
      {...props}
    />
  );
}

SkeletonGroup.displayName = 'Skeleton.Group';

const Skeleton = /* @__PURE__ */ Object.assign(SkeletonRoot, {
  Group: SkeletonGroup,
});

namespace Skeleton {
  export type Props = React.ComponentProps<typeof SkeletonRoot>;
  export type GroupProps = React.ComponentProps<typeof SkeletonGroup>;
}

export { Skeleton, skeletonVariants, skeletonGroupVariants };
