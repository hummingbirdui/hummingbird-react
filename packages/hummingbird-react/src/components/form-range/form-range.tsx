import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const formRangeVariants = cva('form-range', {
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

export interface FormRangeProps
  // Omit native `color`/`size`/`type` — `color`/`size` collide with the CVA
  // variants and `type` is fixed to `range`.
  extends
    Omit<React.ComponentProps<'input'>, 'color' | 'size' | 'type'>,
    VariantProps<typeof formRangeVariants> {}

/** A styled native range slider (`<input type="range">`). */
function FormRange({ className, color, size, ...props }: FormRangeProps) {
  return (
    <input
      type="range"
      data-slot="form-range"
      className={cn(formRangeVariants({ color, size }), className)}
      {...props}
    />
  );
}

FormRange.displayName = 'FormRange';

namespace FormRange {
  export type Props = React.ComponentProps<typeof FormRange>;
}

export { FormRange, formRangeVariants };
