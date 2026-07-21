import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
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
  extends Omit<React.ComponentProps<'input'>, 'color' | 'size'>, FormControlVariantProps {}

function FormControl({ className, variant, size, color, state, ...props }: FormControlProps) {
  return (
    <input
      data-slot="form-control"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(formControlVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

FormControl.displayName = 'FormControl';

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'color'>, FormControlVariantProps {}

function Textarea({ className, variant, size, color, state, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={state === 'invalid' || undefined}
      className={cn(formControlVariants({ variant, size, color, state }), className)}
      {...props}
    />
  );
}

Textarea.displayName = 'Textarea';

export interface FormLabelProps extends React.ComponentProps<'label'> {}

function FormLabel({ className, ...props }: FormLabelProps) {
  return <label data-slot="form-label" className={cn('form-label', className)} {...props} />;
}

FormLabel.displayName = 'FormLabel';

export interface FormFieldProps extends React.ComponentProps<'div'> {}

function FormField({ className, ...props }: FormFieldProps) {
  return <div data-slot="form-field" className={cn('form-field', className)} {...props} />;
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
  extends React.ComponentProps<'p'>, VariantProps<typeof formTextVariants> {}

function FormText({ className, variant, ...props }: FormTextProps) {
  return (
    <p data-slot="form-text" className={cn(formTextVariants({ variant }), className)} {...props} />
  );
}

FormText.displayName = 'FormText';

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

const InputIcon = /* @__PURE__ */ Object.assign(InputIconRoot, {
  Root: InputIconRoot,
  Start: InputIconStart,
  End: InputIconEnd,
});

namespace InputIcon {
  export type Props = React.ComponentProps<typeof InputIconRoot>;
  export type RootProps = React.ComponentProps<typeof InputIconRoot>;
  export type StartProps = React.ComponentProps<typeof InputIconStart>;
  export type EndProps = React.ComponentProps<typeof InputIconEnd>;
}

namespace FormControl {
  export type Props = React.ComponentProps<typeof FormControl>;
}

namespace Textarea {
  export type Props = React.ComponentProps<typeof Textarea>;
}

namespace FormLabel {
  export type Props = React.ComponentProps<typeof FormLabel>;
}

namespace FormField {
  export type Props = React.ComponentProps<typeof FormField>;
}

namespace FormText {
  export type Props = React.ComponentProps<typeof FormText>;
}

export {
  FormControl,
  Textarea,
  FormLabel,
  FormField,
  FormText,
  InputIcon,
  formControlVariants,
  formTextVariants,
};
