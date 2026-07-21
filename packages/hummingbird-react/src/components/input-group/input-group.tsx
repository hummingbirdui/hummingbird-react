import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputGroupVariants = cva('input-group', {
  variants: {
    size: {
      sm: 'input-group-sm',
      md: '',
      lg: 'input-group-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface InputGroupProps
  extends Omit<React.ComponentProps<'div'>, 'size'>, VariantProps<typeof inputGroupVariants> {}

function InputGroupRoot({ className, size, ...props }: InputGroupProps) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  );
}

InputGroupRoot.displayName = 'InputGroup';

export interface InputGroupTextProps extends React.ComponentProps<'span'> {}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span data-slot="input-group-text" className={cn('input-group-text', className)} {...props} />
  );
}

InputGroupText.displayName = 'InputGroup.Text';

const InputGroup = /* @__PURE__ */ Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Text: InputGroupText,
});

namespace InputGroup {
  export type Props = React.ComponentProps<typeof InputGroupRoot>;
  export type RootProps = React.ComponentProps<typeof InputGroupRoot>;
  export type TextProps = React.ComponentProps<typeof InputGroupText>;
}

export { InputGroup, inputGroupVariants };
