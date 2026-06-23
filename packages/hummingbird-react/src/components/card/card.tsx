import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const cardVariants = cva('card', {
  variants: {
    /** Lay the card out horizontally (`card-aside`). */
    aside: {
      true: 'card-aside',
    },
    /** Make the whole card interactive with a hover surface (`card-action`). */
    action: {
      true: 'card-action',
    },
  },
});

export interface CardProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {
  /** Render as a child element (e.g. an `a` or `button`). Uses Radix Slot. */
  asChild?: boolean;
}

function Card({ className, aside, action, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card" className={cn(cardVariants({ aside, action }), className)} {...props} />
  );
}

Card.displayName = 'Card';

export interface CardSlotProps extends React.ComponentProps<'div'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

function CardHeader({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card-header" className={cn('card-header', className)} {...props} />
  );
}

CardHeader.displayName = 'CardHeader';

function CardBody({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="card-body" className={cn('card-body', className)} {...props} />;
}

CardBody.displayName = 'CardBody';

function CardFooter({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card-footer" className={cn('card-footer', className)} {...props} />
  );
}

CardFooter.displayName = 'CardFooter';

function CardTitle({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="card-title" className={cn('card-title', className)} {...props} />;
}

CardTitle.displayName = 'CardTitle';

function CardSubtitle({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card-subtitle" className={cn('card-subtitle', className)} {...props} />
  );
}

CardSubtitle.displayName = 'CardSubtitle';

export interface CardTextProps extends React.ComponentProps<'p'> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

function CardText({ className, asChild = false, ...props }: CardTextProps) {
  const Comp = asChild ? Slot.Root : 'p';

  return <Comp data-slot="card-text" className={cn('card-text', className)} {...props} />;
}

CardText.displayName = 'CardText';

const cardImageVariants = cva('', {
  variants: {
    position: {
      top: 'card-img-top',
      bottom: 'card-img-bottom',
      left: 'card-img-left',
      right: 'card-img-right',
      full: 'card-img',
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

export interface CardImageProps
  extends React.ComponentProps<'img'>,
    VariantProps<typeof cardImageVariants> {}

/** A card image. `position` controls which corners are rounded. */
function CardImage({ className, position, ...props }: CardImageProps) {
  return (
    <img
      data-slot="card-image"
      className={cn(cardImageVariants({ position }), className)}
      {...props}
    />
  );
}

CardImage.displayName = 'CardImage';

function CardImageOverlay({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="card-image-overlay"
      className={cn('card-img-overlay', className)}
      {...props}
    />
  );
}

CardImageOverlay.displayName = 'CardImageOverlay';

function CardGroup({ className, asChild = false, ...props }: CardSlotProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="card-group" className={cn('card-group', className)} {...props} />;
}

CardGroup.displayName = 'CardGroup';

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImage,
  CardImageOverlay,
  CardGroup,
  cardVariants,
  cardImageVariants,
};
