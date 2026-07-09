import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
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
  extends Omit<React.ComponentProps<'div'>, 'size'>, VariantProps<typeof inputGroupVariants> {
  asChild?: boolean;
}

function InputGroup({ className, size, asChild = false, ...props }: InputGroupProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      role="group"
      data-slot="input-group"
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  );
}

InputGroup.displayName = 'InputGroup';

export interface InputGroupTextProps extends React.ComponentProps<'span'> {
  asChild?: boolean;
}

function InputGroupText({ className, asChild = false, ...props }: InputGroupTextProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp data-slot="input-group-text" className={cn('input-group-text', className)} {...props} />
  );
}

InputGroupText.displayName = 'InputGroupText';

export { InputGroup, InputGroupText, inputGroupVariants };
