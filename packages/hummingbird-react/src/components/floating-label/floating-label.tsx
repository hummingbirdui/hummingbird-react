import * as React from 'react';
import { cn } from '../../utils/cn';
import { FormLabel } from '../form-control';

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
      <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
    </div>
  );
}

FloatingLabel.displayName = 'FloatingLabel';

export { FloatingLabel };
