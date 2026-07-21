'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

function PopoverRoot({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
PopoverRoot.displayName = 'Popover';

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
PopoverTrigger.displayName = 'Popover.Trigger';

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
PopoverAnchor.displayName = 'Popover.Anchor';

function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}
PopoverClose.displayName = 'Popover.Close';

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'popover origin-[var(--radix-popover-content-transform-origin)]',
          'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow data-slot="popover-arrow" asChild>
          <span className="relative block h-[7px] w-3.5">
            <span
              className={cn(
                'absolute top-0 left-0 block size-0 border-x-[7px] border-t-[7px] border-x-transparent',
                'border-t-[color:var(--popover-arrow-border-color)]'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-[calc(-1*var(--popover-border-width))] block size-0 border-x-[7px] border-t-[7px] border-x-transparent',
                'border-t-[color:var(--popover-bg)]'
              )}
            />
          </span>
        </PopoverPrimitive.Arrow>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
PopoverContent.displayName = 'Popover.Content';

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={cn('popover-header', className)} {...props} />;
}
PopoverHeader.displayName = 'Popover.Header';

function PopoverBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-body" className={cn('popover-body', className)} {...props} />;
}
PopoverBody.displayName = 'Popover.Body';

const Popover = /* @__PURE__ */ Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Content: PopoverContent,
  Header: PopoverHeader,
  Body: PopoverBody,
});

namespace Popover {
  export type Props = React.ComponentProps<typeof PopoverRoot>;
  export type RootProps = React.ComponentProps<typeof PopoverRoot>;
  export type TriggerProps = React.ComponentProps<typeof PopoverTrigger>;
  export type AnchorProps = React.ComponentProps<typeof PopoverAnchor>;
  export type CloseProps = React.ComponentProps<typeof PopoverClose>;
  export type ContentProps = React.ComponentProps<typeof PopoverContent>;
  export type HeaderProps = React.ComponentProps<typeof PopoverHeader>;
  export type BodyProps = React.ComponentProps<typeof PopoverBody>;
}

export { Popover };
