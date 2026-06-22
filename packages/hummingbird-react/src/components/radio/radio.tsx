'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const radioVariants = cva('form-check-input', {
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

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioProps
  extends
    Omit<React.ComponentProps<'input'>, 'color' | 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  /** Text rendered beside the control. Wraps everything in a clickable label. */
  label?: React.ReactNode;
  /** Lay the field out inline (`form-check-inline`). */
  inline?: boolean;
}

/** A styled native radio. Use inside a `RadioGroup`, or standalone with `name`. */
function Radio({
  className,
  color,
  size,
  label,
  inline = false,
  name,
  checked,
  value,
  onChange,
  ...props
}: RadioProps) {
  const group = React.useContext(RadioGroupContext);

  // When inside a controlled RadioGroup, derive name/checked from context.
  const resolvedName = name ?? group?.name;
  const resolvedChecked =
    group?.value !== undefined && value !== undefined ? group.value === value : checked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (group?.onValueChange && value !== undefined && event.target.checked) {
      group.onValueChange(String(value));
    }
  };

  const input = (
    <span className="form-check-input-wrapper">
      <input
        type="radio"
        data-slot="radio"
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        onChange={handleChange}
        className={cn(radioVariants({ color, size }), className)}
        {...props}
      />
    </span>
  );

  if (label == null) return input;

  return (
    <label className={cn('form-check', inline && 'form-check-inline')} data-slot="form-check">
      {input}
      <span className="form-check-label">{label}</span>
    </label>
  );
}

Radio.displayName = 'Radio';

export interface RadioGroupProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  /** Shared `name` applied to every radio in the group. */
  name?: string;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fires with the newly selected value. */
  onValueChange?: (value: string) => void;
}

/** Groups radios: shares a `name` and (optionally) manages the selected value. */
function RadioGroup({
  className,
  name,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const context = React.useMemo<RadioGroupContextValue>(
    () => ({ name, value: currentValue, onValueChange: handleValueChange }),
    [name, currentValue, handleValueChange]
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <div role="radiogroup" data-slot="radio-group" className={className} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup, radioVariants };
