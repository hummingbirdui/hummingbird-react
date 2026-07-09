'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva('form-check-input', {
  variants: {
    color: {
      primary: '',
      secondary: 'form-check-secondary',
      success: 'form-check-success',
      info: 'form-check-info',
      warning: 'form-check-warning',
      danger: 'form-check-danger',
      neutral: 'form-check-neutral',
    },
    size: {
      sm: '',
      md: 'form-check-md',
      lg: 'form-check-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm',
  },
});

export interface CheckboxProps
  extends
    Omit<React.ComponentProps<'input'>, 'color' | 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  inline?: boolean;
  indeterminate?: boolean;
}

function Checkbox({
  className,
  color,
  size,
  label,
  inline = false,
  indeterminate = false,
  ref: forwardedRef,
  ...props
}: CheckboxProps) {
  const innerRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const ref = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  const input = (
    <span className="form-check-input-wrapper">
      <input
        ref={ref}
        type="checkbox"
        data-slot="checkbox"
        aria-checked={indeterminate ? 'mixed' : undefined}
        className={cn(checkboxVariants({ color, size }), className)}
        {...props}
      />
    </span>
  );

  if (label == null) return input;

  return (
    <label className={cn(inline ? 'form-check-inline' : 'form-check')} data-slot="form-check">
      {input}
      <span className="form-check-label">{label}</span>
    </label>
  );
}

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
