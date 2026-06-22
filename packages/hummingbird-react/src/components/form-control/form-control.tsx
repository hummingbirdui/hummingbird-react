import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const formControlVariants = cva('', {
  variants: {
    // `form-control` (bordered) and `form-control-fill` (filled, muted bg) are
    // mutually exclusive base classes, so variant switches the base.
    variant: {
      outline: 'form-control',
      fill: 'form-control-fill',
    },
    size: {
      sm: 'form-control-sm',
      md: '',
      lg: 'form-control-lg',
    },
    color: {
      primary: 'form-control-primary',
      secondary: 'form-control-secondary',
      info: 'form-control-info',
      success: 'form-control-success',
      warning: 'form-control-warning',
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

type FormControlVariantProps = VariantProps<typeof formControlVariants>;

export interface FormControlProps
  // Omit native `color`/`size` — they collide with the CVA variants.
  extends Omit<React.ComponentProps<'input'>, 'color' | 'size'>, FormControlVariantProps {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A styled text input. Renders `<input>`; pair with `Textarea` for multi-line. */
function FormControl({
  className,
  variant,
  size,
  color,
  state,
  asChild = false,
  ...props
}: FormControlProps) {
  const Comp = asChild ? Slot.Root : 'input';

  return (
    <Comp
      data-slot="form-control"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(formControlVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

FormControl.displayName = 'FormControl';

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'color'>, FormControlVariantProps {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A styled multi-line text input. Shares `form-control` styling with `FormControl`. */
function Textarea({
  className,
  variant,
  size,
  color,
  state,
  asChild = false,
  ...props
}: TextareaProps) {
  const Comp = asChild ? Slot.Root : 'textarea';

  return (
    <Comp
      data-slot="textarea"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(formControlVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

Textarea.displayName = 'Textarea';

export interface FormLabelProps extends React.ComponentProps<'label'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A field label. Reacts to its `FormField`'s focus/disabled state via CSS. */
function FormLabel({ className, asChild = false, ...props }: FormLabelProps) {
  const Comp = asChild ? Slot.Root : 'label';

  return <Comp data-slot="form-label" className={cn('form-label', className)} {...props} />;
}

FormLabel.displayName = 'FormLabel';

export interface FormFieldProps extends React.ComponentProps<'div'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** Stacks a label, control, and helper text; drives label coloring on focus. */
function FormField({ className, asChild = false, ...props }: FormFieldProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="form-field" className={cn('form-field', className)} {...props} />;
}

FormField.displayName = 'FormField';

const formTextVariants = cva('', {
  variants: {
    variant: {
      default: 'form-text',
      valid: 'valid-feedback',
      invalid: 'invalid-feedback',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface FormTextProps
  extends React.ComponentProps<'p'>, VariantProps<typeof formTextVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** Helper or validation text shown beneath a control. */
function FormText({ className, variant, asChild = false, ...props }: FormTextProps) {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      data-slot="form-text"
      className={cn(formTextVariants({ variant }), className)}
      {...props}
    />
  );
}

FormText.displayName = 'FormText';

export interface InputIconProps extends React.ComponentProps<'div'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/**
 * Wraps a `FormControl` so leading/trailing icons can be overlaid. Add an
 * `InputIconStart` and/or `InputIconEnd` alongside the control; the wrapper
 * pads the control to make room.
 */
function InputIcon({ className, asChild = false, ...props }: InputIconProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="input-icon" className={cn('input-group-icon', className)} {...props} />;
}

InputIcon.displayName = 'InputIcon';

export interface InputIconSlotProps extends React.ComponentProps<'span'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A leading icon positioned at the start of an `InputIcon` wrapper. */
function InputIconStart({ className, asChild = false, ...props }: InputIconSlotProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="input-icon-start"
      className={cn('form-control-icon-start', className)}
      {...props}
    />
  );
}

InputIconStart.displayName = 'InputIconStart';

/** A trailing icon positioned at the end of an `InputIcon` wrapper. */
function InputIconEnd({ className, asChild = false, ...props }: InputIconSlotProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="input-icon-end"
      className={cn('form-control-icon-end', className)}
      {...props}
    />
  );
}

InputIconEnd.displayName = 'InputIconEnd';

export {
  FormControl,
  Textarea,
  FormLabel,
  FormField,
  FormText,
  InputIcon,
  InputIconStart,
  InputIconEnd,
  formControlVariants,
  formTextVariants,
};
