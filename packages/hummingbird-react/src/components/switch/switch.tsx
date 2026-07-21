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
  label?: React.ReactNode;
  inline?: boolean;
}

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

namespace Switch {
  export type Props = React.ComponentProps<typeof Switch>;
}

export { Switch, switchVariants };
