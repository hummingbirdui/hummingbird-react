import * as React from 'react';
import { cn } from '../../utils/cn';
import { Field } from '../input';

export interface FloatingLabelProps extends React.ComponentProps<'div'> {
  label: React.ReactNode;
  htmlFor?: string;
}

function FloatingLabel({ className, label, htmlFor, children, ...props }: FloatingLabelProps) {
  const control = React.isValidElement<{ placeholder?: string }>(children)
    ? React.cloneElement(children, {
        placeholder: children.props.placeholder ?? ' ',
      })
    : children;

  return (
    <div data-slot="floating-label" className={cn('form-floating', className)} {...props}>
      {control}
      <Field.Label htmlFor={htmlFor}>{label}</Field.Label>
    </div>
  );
}

FloatingLabel.displayName = 'FloatingLabel';

namespace FloatingLabel {
  export type Props = React.ComponentProps<typeof FloatingLabel>;
}

export { FloatingLabel };
