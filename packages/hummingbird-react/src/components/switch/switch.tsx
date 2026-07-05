import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva('form-check-input', {
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
    // The `form-switch` CSS scales the track via `form-check-sm`/`form-check-lg`.
    size: {
      sm: 'form-check-sm',
      md: '',
      lg: 'form-check-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export interface SwitchProps
  extends
    Omit<React.ComponentProps<'input'>, 'color' | 'size' | 'type' | 'role'>,
    VariantProps<typeof switchVariants> {
  /** Text rendered beside the control. Wraps everything in a clickable label. */
  label?: React.ReactNode;
  /** Lay the field out inline (`form-check-inline`). */
  inline?: boolean;
}

/** A styled toggle switch built on a native checkbox with `role="switch"`. */
function Switch({ className, color, size, label, inline = false, ...props }: SwitchProps) {
  const input = (
    <input
      type="checkbox"
      role="switch"
      data-slot="switch"
      className={cn(switchVariants({ color, size }), className)}
      {...props}
    />
  );

  if (label == null) {
    return (
      <span
        className={cn('form-switch', inline ? 'form-check-inline' : 'form-check')}
        data-slot="form-check"
      >
        {input}
      </span>
    );
  }

  return (
    <label
      className={cn('form-switch', inline ? 'form-check-inline' : 'form-check')}
      data-slot="form-check"
    >
      {input}
      <span className="form-check-label">{label}</span>
    </label>
  );
}

Switch.displayName = 'Switch';

export { Switch, switchVariants };
