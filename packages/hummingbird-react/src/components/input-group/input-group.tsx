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
  // Omit native `size` — it collides with the CVA variant.
  extends Omit<React.ComponentProps<'div'>, 'size'>,
    VariantProps<typeof inputGroupVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** Joins controls, buttons, and addons into a single control. */
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
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** A text or icon addon placed alongside a control in an `InputGroup`. */
function InputGroupText({ className, asChild = false, ...props }: InputGroupTextProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="input-group-text"
      className={cn('input-group-text', className)}
      {...props}
    />
  );
}

InputGroupText.displayName = 'InputGroupText';

export { InputGroup, InputGroupText, inputGroupVariants };
