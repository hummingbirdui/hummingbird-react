'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

const progressVariants = cva('progress', {
  variants: {
    color: {
      neutral: 'progress-neutral',
      primary: 'progress-primary',
      secondary: 'progress-secondary',
      info: 'progress-info',
      success: 'progress-success',
      warning: 'progress-warning',
      danger: 'progress-danger',
    },
    size: {
      sm: 'progress-sm',
      md: '',
      lg: 'progress-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
VariantProps<typeof progressVariants> {
  label?: boolean;
}

function Progress({
  className,
  color,
  size,
  value,
  max = 100,
  label = false,
  ...props
}: ProgressProps) {
  const isIndeterminate = value == null;
  const safeMax = max || 100;
  const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, ((value ?? 0) / safeMax) * 100));

return (
  <span className="progress-wrapper" data-slot="progress-wrapper">
  <ProgressPrimitive.Root
    data-slot="progress"
    value={value}
    max={max}
    className={cn(progressVariants({ color, size }), className)}
    {...props}
    >
  <ProgressPrimitive.Indicator
    data-slot="progress-indicator"
    className="progress-indicator"
    style={{ transform: `translateX(-${100 - percentage}%)` }}
    />
  </ProgressPrimitive.Root>
    {label && !isIndeterminate ? (
    <span className="progress-label" data-slot="progress-label">{`${Math.round(percentage)}%`}</span>
    ) : null}
  </span>
  );
}

Progress.displayName = 'Progress';

namespace Progress {
  export type Props = React.ComponentProps<typeof Progress>;
}

export { Progress, progressVariants };
