import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const listGroupVariants = cva('list-group', {
  variants: {
    numbered: { true: 'list-group-numbered', false: '' },
  },
  defaultVariants: {
    numbered: false,
  },
});

export interface ListGroupProps
  extends React.ComponentProps<'ul'>, VariantProps<typeof listGroupVariants> {
  asChild?: boolean;
}

function ListGroup({ className, numbered, asChild = false, ...props }: ListGroupProps) {
  const Comp = asChild ? Slot.Root : 'ul';

  return (
    <Comp
      data-slot="list-group"
      className={cn(listGroupVariants({ numbered }), className)}
      {...props}
    />
  );
}

ListGroup.displayName = 'ListGroup';

const listGroupItemVariants = cva('list-group-item', {
  variants: {
    action: { true: 'list-group-item-action', false: '' },
    pinned: { true: 'list-group-item-pinned', false: '' },
  },
  defaultVariants: {
    action: false,
    pinned: false,
  },
});

export interface ListGroupItemProps
  extends React.ComponentProps<'li'>, VariantProps<typeof listGroupItemVariants> {
  active?: boolean;
  disabled?: boolean;
  asChild?: boolean;
}

function ListGroupItem({
  className,
  action,
  pinned,
  active = false,
  disabled = false,
  asChild = false,
  ...props
}: ListGroupItemProps) {
  const Comp = asChild ? Slot.Root : 'li';

  return (
    <Comp
      data-slot="list-group-item"
      aria-current={active ? 'true' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      className={cn(
        listGroupItemVariants({ action, pinned }),
        active && 'active',
        disabled && 'disabled',
        className
      )}
      {...props}
    />
  );
}

ListGroupItem.displayName = 'ListGroupItem';

const listTextVariants = cva('', {
  variants: {
    variant: {
      primary: 'list-text-primary',
      secondary: 'list-text-secondary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ListTextProps
  extends React.ComponentProps<'p'>, VariantProps<typeof listTextVariants> {
  asChild?: boolean;
}

function ListText({ className, variant, asChild = false, ...props }: ListTextProps) {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      data-slot="list-text"
      className={cn(listTextVariants({ variant }), className)}
      {...props}
    />
  );
}

ListText.displayName = 'ListText';

export {
  ListGroup,
  ListGroupItem,
  ListText,
  listGroupVariants,
  listGroupItemVariants,
  listTextVariants,
};
