import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const formControlVariants = cva('', {
  variants: {
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
  extends Omit<React.ComponentProps<'input'>, 'color' | 'size'>, FormControlVariantProps {
  asChild?: boolean;
}

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
  asChild?: boolean;
}

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
  asChild?: boolean;
}

function FormLabel({ className, asChild = false, ...props }: FormLabelProps) {
  const Comp = asChild ? Slot.Root : 'label';

  return <Comp data-slot="form-label" className={cn('form-label', className)} {...props} />;
}

FormLabel.displayName = 'FormLabel';

export interface FormFieldProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

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
  asChild?: boolean;
}

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
  asChild?: boolean;
}

function InputIcon({ className, asChild = false, ...props }: InputIconProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="input-icon" className={cn('input-group-icon', className)} {...props} />;
}

InputIcon.displayName = 'InputIcon';

export interface InputIconSlotProps extends React.ComponentProps<'span'> {
  asChild?: boolean;
}

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
