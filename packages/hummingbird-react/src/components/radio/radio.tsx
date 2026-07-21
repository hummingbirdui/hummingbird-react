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
  label?: React.ReactNode;
  inline?: boolean;
}

function RadioRoot({
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

  const resolvedName = name ?? group?.name;
  const resolvedChecked = group && value !== undefined ? group.value === String(value) : checked;

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
    <label className={cn(inline ? 'form-check-inline' : 'form-check')} data-slot="form-check">
      {input}
      <span className="form-check-label">{label}</span>
    </label>
  );
}

RadioRoot.displayName = 'Radio';

export interface RadioGroupProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

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

RadioGroup.displayName = 'Radio.Group';

const Radio = /* @__PURE__ */ Object.assign(RadioRoot, {
  Root: RadioRoot,
  Group: RadioGroup,
});

namespace Radio {
  export type Props = React.ComponentProps<typeof RadioRoot>;
  export type RootProps = React.ComponentProps<typeof RadioRoot>;
  export type GroupProps = React.ComponentProps<typeof RadioGroup>;
}

export { Radio, radioVariants };
