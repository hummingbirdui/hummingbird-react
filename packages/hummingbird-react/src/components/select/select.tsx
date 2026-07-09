import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const selectVariants = cva('', {
  variants: {
    variant: {
      outline: 'form-select',
      fill: 'form-select-fill',
    },
    size: {
      sm: 'form-select-sm',
      md: '',
      lg: 'form-select-lg',
    },
    color: {
      primary: '',
      secondary: 'form-select-secondary',
      info: 'form-select-info',
      success: 'form-select-success',
      warning: 'form-select-warning',
    },
    state: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export interface SelectProps
  extends
    Omit<React.ComponentProps<'select'>, 'color' | 'size'>,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
}

function Select({
  className,
  variant,
  size,
  color,
  state,
  asChild = false,
  ...props
}: SelectProps) {
  const Comp = asChild ? Slot.Root : 'select';

  return (
    <Comp
      data-slot="select"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(selectVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

Select.displayName = 'Select';

export { Select, selectVariants };
