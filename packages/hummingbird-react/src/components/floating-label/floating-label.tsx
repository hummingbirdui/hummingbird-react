import * as React from 'react';
import { cn } from '../../utils/cn';
import { FormLabel } from '../form-control';

export interface FloatingLabelProps extends React.ComponentProps<'div'> {
  /** The floating label text. */
  label: React.ReactNode;
  /** Links the label to the control; should match the control's `id`. */
  htmlFor?: string;
}

/**
 * Renders a control with a label that floats above it once filled or focused.
 * Wrap a single `FormControl`, `Textarea`, or `Select` as the child — the label
 * is rendered after it automatically (the CSS requires that order), and a blank
 * placeholder is injected when missing (the float keys off `:placeholder-shown`).
 */
function FloatingLabel({ className, label, htmlFor, children, ...props }: FloatingLabelProps) {
  const control = React.isValidElement<{ placeholder?: string }>(children)
    ? React.cloneElement(children, {
        placeholder: children.props.placeholder ?? ' ',
      })
    : children;

  return (
    <div data-slot="floating-label" className={cn('form-floating', className)} {...props}>
      {control}
      <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
    </div>
  );
}

FloatingLabel.displayName = 'FloatingLabel';

export { FloatingLabel };
