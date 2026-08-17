'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Percentage of the root's value, consumed by Progress.Bar for its width.
const ProgressPercentageContext = React.createContext<number | null>(null);
// True inside Progress.Stacked, where the width belongs on the segment root
// (`.progress`) and the core CSS stretches the bar to fill it.
const ProgressStackedContext = React.createContext(false);

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {}

function ProgressRoot({ className, value, max = 100, style, children, ...props }: ProgressProps) {
  const stacked = React.useContext(ProgressStackedContext);
  const percentage = value == null ? null : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <ProgressPercentageContext.Provider value={stacked ? null : percentage}>
      <ProgressPrimitive.Root
        data-slot="progress"
        value={value}
        max={max}
        className={cn('progress', className)}
        style={
          stacked && percentage != null ? { width: `${percentage}%`, ...style } : style
        }
        {...props}
      >
        {children ?? <ProgressBar />}
      </ProgressPrimitive.Root>
    </ProgressPercentageContext.Provider>
  );
}
ProgressRoot.displayName = 'Progress';

const progressBarVariants = cva('progress-bar', {
  variants: {
    color: {
      primary: '',
      secondary: 'bg-secondary',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
    },
    striped: {
      true: 'progress-bar-striped',
    },
    animated: {
      true: 'progress-bar-animated',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export interface ProgressBarProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive.Indicator>, 'color'>,
    VariantProps<typeof progressBarVariants> {}

function ProgressBar({ className, color, striped, animated, style, ...props }: ProgressBarProps) {
  const percentage = React.useContext(ProgressPercentageContext);

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-bar"
      className={cn(progressBarVariants({ color, striped, animated }), className)}
      style={percentage != null ? { width: `${percentage}%`, ...style } : style}
      {...props}
    />
  );
}
ProgressBar.displayName = 'Progress.Bar';

function ProgressStacked({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <ProgressStackedContext.Provider value={true}>
      <div data-slot="progress-stacked" className={cn('progress-stacked', className)} {...props} />
    </ProgressStackedContext.Provider>
  );
}
ProgressStacked.displayName = 'Progress.Stacked';

const Progress = /* @__PURE__ */ Object.assign(ProgressRoot, {
  Bar: ProgressBar,
  Stacked: ProgressStacked,
});

namespace Progress {
  export type Props = React.ComponentProps<typeof ProgressRoot>;
  export type BarProps = React.ComponentProps<typeof ProgressBar>;
  export type StackedProps = React.ComponentProps<typeof ProgressStacked>;
}

export { Progress, progressBarVariants };
