'use client';

import * as React from 'react';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const scrollAreaScrollbarVariants = cva(
  [
    'scroll-area-scrollbar',
    'duration-150 data-[state=visible]:animate-in data-[state=visible]:fade-in-0',
    'data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0',
  ].join(' '),
  {
    variants: {
      rounded: {
        true: 'scroll-area-scrollbar-rounded',
        false: '',
      },
    },
    defaultVariants: {
      rounded: false,
    },
  }
);

function ScrollAreaRoot({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('scroll-area', className)}
      {...props}
    />
  );
}
ScrollAreaRoot.displayName = 'ScrollArea';

function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn('scroll-area-viewport', className)}
      {...props}
    />
  );
}
ScrollAreaViewport.displayName = 'ScrollArea.Viewport';

export interface ScrollAreaScrollbarProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>,
    VariantProps<typeof scrollAreaScrollbarVariants> {}

function ScrollAreaScrollbar({
  className,
  rounded,
  children,
  forceMount,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      className={cn(scrollAreaScrollbarVariants({ rounded }), className)}
      forceMount={forceMount}
      {...props}
    >
      {children ?? <ScrollAreaThumb forceMount={forceMount} />}
    </ScrollAreaPrimitive.Scrollbar>
  );
}
ScrollAreaScrollbar.displayName = 'ScrollArea.Scrollbar';

function ScrollAreaThumb({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  return (
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      className={cn('scroll-area-thumb', className)}
      {...props}
    />
  );
}
ScrollAreaThumb.displayName = 'ScrollArea.Thumb';

function ScrollAreaCorner({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Corner>) {
  return (
    <ScrollAreaPrimitive.Corner
      data-slot="scroll-area-corner"
      className={cn('scroll-area-corner', className)}
      {...props}
    />
  );
}
ScrollAreaCorner.displayName = 'ScrollArea.Corner';

const ScrollArea = /* @__PURE__ */ Object.assign(ScrollAreaRoot, {
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
});

namespace ScrollArea {
  export type Props = React.ComponentProps<typeof ScrollAreaRoot>;
  export type ViewportProps = React.ComponentProps<typeof ScrollAreaViewport>;
  export type ScrollbarProps = React.ComponentProps<typeof ScrollAreaScrollbar>;
  export type ThumbProps = React.ComponentProps<typeof ScrollAreaThumb>;
  export type CornerProps = React.ComponentProps<typeof ScrollAreaCorner>;
}

export { ScrollArea, scrollAreaScrollbarVariants };
