import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva('', {
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

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'color' | 'size'>, InputVariantProps {}

function Input({ className, variant, size, color, state, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(inputVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

Input.displayName = 'Input';

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'color'>, InputVariantProps {}

function Textarea({ className, variant, size, color, state, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(inputVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

Textarea.displayName = 'Textarea';

export interface FieldProps extends React.ComponentProps<'div'> {}

function FieldRoot({ className, ...props }: FieldProps) {
  return <div data-slot="field" className={cn('form-field', className)} {...props} />;
}

FieldRoot.displayName = 'Field';

export interface FieldLabelProps extends React.ComponentProps<'label'> {}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <label data-slot="field-label" className={cn('form-label', className)} {...props} />;
}

FieldLabel.displayName = 'Field.Label';

const fieldTextVariants = cva('', {
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

export interface FieldTextProps
  extends React.ComponentProps<'p'>, VariantProps<typeof fieldTextVariants> {}

function FieldText({ className, variant, ...props }: FieldTextProps) {
  return (
    <div
      data-slot="field-text"
      className={cn(fieldTextVariants({ variant }), className)}
      {...props}
    />
  );
}

FieldText.displayName = 'Field.Text';

export interface InputIconProps extends React.ComponentProps<'div'> {}

function InputIconRoot({ className, ...props }: InputIconProps) {
  return <div data-slot="input-icon" className={cn('input-group-icon', className)} {...props} />;
}

InputIconRoot.displayName = 'InputIcon';

export interface InputIconSlotProps extends React.ComponentProps<'span'> {}

function InputIconStart({ className, ...props }: InputIconSlotProps) {
  return (
    <span
      data-slot="input-icon-start"
      className={cn('form-control-icon-start', className)}
      {...props}
    />
  );
}

InputIconStart.displayName = 'InputIcon.Start';

function InputIconEnd({ className, ...props }: InputIconSlotProps) {
  return (
    <span
      data-slot="input-icon-end"
      className={cn('form-control-icon-end', className)}
      {...props}
    />
  );
}

InputIconEnd.displayName = 'InputIcon.End';

const Field = /* @__PURE__ */ Object.assign(FieldRoot, {
  Label: FieldLabel,
  Text: FieldText,
});

namespace Field {
  export type Props = React.ComponentProps<typeof FieldRoot>;
  export type LabelProps = React.ComponentProps<typeof FieldLabel>;
  export type TextProps = React.ComponentProps<typeof FieldText>;
}

const InputIcon = /* @__PURE__ */ Object.assign(InputIconRoot, {
  Start: InputIconStart,
  End: InputIconEnd,
});

namespace InputIcon {
  export type Props = React.ComponentProps<typeof InputIconRoot>;
  export type StartProps = React.ComponentProps<typeof InputIconStart>;
  export type EndProps = React.ComponentProps<typeof InputIconEnd>;
}

namespace Input {
  export type Props = React.ComponentProps<typeof Input>;
}

namespace Textarea {
  export type Props = React.ComponentProps<typeof Textarea>;
}

export { Input, Textarea, Field, InputIcon, inputVariants, fieldTextVariants };
