import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const cardVariants = cva('card', {
  variants: {
    aside: {
      true: 'card-aside',
    },
    action: {
      true: 'card-action',
    },
  },
});

export interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

function Card({ className, aside, action, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card" className={cn(cardVariants({ aside, action }), className)} {...props} />
  );
}

Card.displayName = 'Card';

export interface CardSlotProps extends React.ComponentProps<'div'> {}

function CardHeader({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-header" className={cn('card-header', className)} {...props} />;
}

CardHeader.displayName = 'CardHeader';

function CardBody({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-body" className={cn('card-body', className)} {...props} />;
}

CardBody.displayName = 'CardBody';

function CardFooter({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-footer" className={cn('card-footer', className)} {...props} />;
}

CardFooter.displayName = 'CardFooter';

function CardTitle({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-title" className={cn('card-title text-xl', className)} {...props} />;
}

CardTitle.displayName = 'CardTitle';

function CardSubtitle({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-subtitle" className={cn('card-subtitle', className)} {...props} />;
}

CardSubtitle.displayName = 'CardSubtitle';

export interface CardTextProps extends React.ComponentProps<'p'> {}

function CardText({ className, ...props }: CardTextProps) {
  return <p data-slot="card-text" className={cn('card-text', className)} {...props} />;
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
  extends React.ComponentProps<'img'>, VariantProps<typeof cardImageVariants> {}

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

function CardImageOverlay({ className, ...props }: CardSlotProps) {
  return (
    <div data-slot="card-image-overlay" className={cn('card-img-overlay', className)} {...props} />
  );
}

CardImageOverlay.displayName = 'CardImageOverlay';

function CardGroup({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-group" className={cn('card-group', className)} {...props} />;
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
