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

function CardRoot({ className, aside, action, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="card" className={cn(cardVariants({ aside, action }), className)} {...props} />
  );
}

CardRoot.displayName = 'Card';

export interface CardSlotProps extends React.ComponentProps<'div'> {}

function CardHeader({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-header" className={cn('card-header', className)} {...props} />;
}

CardHeader.displayName = 'Card.Header';

function CardBody({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-body" className={cn('card-body', className)} {...props} />;
}

CardBody.displayName = 'Card.Body';

function CardFooter({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-footer" className={cn('card-footer', className)} {...props} />;
}

CardFooter.displayName = 'Card.Footer';

function CardTitle({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-title" className={cn('card-title text-xl', className)} {...props} />;
}

CardTitle.displayName = 'Card.Title';

function CardSubtitle({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-subtitle" className={cn('card-subtitle', className)} {...props} />;
}

CardSubtitle.displayName = 'Card.Subtitle';

export interface CardTextProps extends React.ComponentProps<'p'> {}

function CardText({ className, ...props }: CardTextProps) {
  return <p data-slot="card-text" className={cn('card-text', className)} {...props} />;
}

CardText.displayName = 'Card.Text';

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

CardImage.displayName = 'Card.Image';

function CardImageOverlay({ className, ...props }: CardSlotProps) {
  return (
    <div data-slot="card-image-overlay" className={cn('card-img-overlay', className)} {...props} />
  );
}

CardImageOverlay.displayName = 'Card.ImageOverlay';

function CardGroup({ className, ...props }: CardSlotProps) {
  return <div data-slot="card-group" className={cn('card-group', className)} {...props} />;
}

CardGroup.displayName = 'Card.Group';

const Card = /* @__PURE__ */ Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Text: CardText,
  Image: CardImage,
  ImageOverlay: CardImageOverlay,
  Group: CardGroup,
});

namespace Card {
  export type Props = React.ComponentProps<typeof CardRoot>;
  export type RootProps = React.ComponentProps<typeof CardRoot>;
  export type HeaderProps = React.ComponentProps<typeof CardHeader>;
  export type BodyProps = React.ComponentProps<typeof CardBody>;
  export type FooterProps = React.ComponentProps<typeof CardFooter>;
  export type TitleProps = React.ComponentProps<typeof CardTitle>;
  export type SubtitleProps = React.ComponentProps<typeof CardSubtitle>;
  export type TextProps = React.ComponentProps<typeof CardText>;
  export type ImageProps = React.ComponentProps<typeof CardImage>;
  export type ImageOverlayProps = React.ComponentProps<typeof CardImageOverlay>;
  export type GroupProps = React.ComponentProps<typeof CardGroup>;
}

export { Card, cardVariants, cardImageVariants };
