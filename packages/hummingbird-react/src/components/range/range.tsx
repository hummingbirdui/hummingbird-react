import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const rangeVariants = cva('form-range', {
  variants: {
    size: {
      sm: 'form-range-sm',
      md: '',
      lg: 'form-range-lg',
    },
    color: {
      primary: '',
      secondary: 'form-range-secondary',
      info: 'form-range-info',
      success: 'form-range-success',
      warning: 'form-range-warning',
      danger: 'form-range-danger',
      neutral: 'form-range-neutral',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export interface RangeProps
  // Omit native `color`/`size`/`type` — `color`/`size` collide with the CVA
  // variants and `type` is fixed to `range`.
  extends
    Omit<React.ComponentProps<'input'>, 'color' | 'size' | 'type'>,
    VariantProps<typeof rangeVariants> {}

/** A styled native range slider (`<input type="range">`). */
function Range({ className, color, size, ...props }: RangeProps) {
  return (
    <input
      type="range"
      data-slot="range"
      className={cn(rangeVariants({ color, size }), className)}
      {...props}
    />
  );
}

Range.displayName = 'Range';

namespace Range {
  export type Props = React.ComponentProps<typeof Range>;
}

export { Range, rangeVariants };
