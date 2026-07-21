'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive, Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dialogVariants = cva('modal-dialog', {
  variants: {
    size: {
      sm: 'modal-sm',
      md: '',
      lg: 'modal-lg',
      xl: 'modal-xl',
    },
    centered: {
      true: 'modal-dialog-centered',
      false: '',
    },
    scrollable: {
      true: 'modal-dialog-scrollable',
      false: '',
    },
    fullscreen: {
      false: '',
      true: 'modal-fullscreen',
      'sm-down': 'modal-fullscreen-sm-down',
      'md-down': 'modal-fullscreen-md-down',
      'lg-down': 'modal-fullscreen-lg-down',
      'xl-down': 'modal-fullscreen-xl-down',
      '2xl-down': 'modal-fullscreen-2xl-down',
    },
  },
  defaultVariants: {
    size: 'md',
    centered: false,
    scrollable: false,
    fullscreen: false,
  },
});

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function DialogRoot({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
DialogRoot.displayName = 'Dialog';

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
DialogTrigger.displayName = 'Dialog.Trigger';

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
DialogPortal.displayName = 'Dialog.Portal';

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
DialogClose.displayName = 'Dialog.Close';

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'modal-backdrop',
        'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  );
}
DialogOverlay.displayName = 'Dialog.Overlay';

export interface DialogContentProps
  extends
    React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  dialogClassName?: string;

  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
  portalProps?: Omit<React.ComponentProps<typeof DialogPrimitive.Portal>, 'container' | 'children'>;
  overlayProps?: React.ComponentProps<typeof DialogOverlay>;
}

function DialogContent({
  className,
  dialogClassName,
  children,
  size,
  centered,
  scrollable,
  fullscreen,
  container,
  portalProps,
  overlayProps,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal container={container} {...portalProps}>
      <DialogOverlay {...overlayProps} />
      <div data-slot="dialog-modal" className="modal block">
        <div
          className={cn(
            dialogVariants({ size, centered, scrollable, fullscreen }),
            dialogClassName
          )}
        >
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              'modal-content',
              'duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-4',
              className
            )}
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </div>
      </div>
    </DialogPortal>
  );
}
DialogContent.displayName = 'Dialog.Content';

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('modal-header', className)} {...props} />;
}
DialogHeader.displayName = 'Dialog.Header';

export interface DialogTitleProps extends React.ComponentProps<'h6'> {
  asChild?: boolean;
}
function DialogTitle({ className, asChild = false, ...props }: DialogTitleProps) {
  const Comp = asChild ? Slot.Root : 'h6';
  return (
    <DialogPrimitive.Title asChild>
      <Comp data-slot="dialog-title" className={cn('modal-title', className)} {...props} />
    </DialogPrimitive.Title>
  );
}
DialogTitle.displayName = 'Dialog.Title';

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description data-slot="dialog-description" className={className} {...props} />
  );
}
DialogDescription.displayName = 'Dialog.Description';

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={cn('modal-body', className)} {...props} />;
}
DialogBody.displayName = 'Dialog.Body';

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cn('modal-footer', className)} {...props} />;
}
DialogFooter.displayName = 'Dialog.Footer';

const Dialog = /* @__PURE__ */ Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
});

namespace Dialog {
  export type Props = React.ComponentProps<typeof DialogRoot>;
  export type RootProps = React.ComponentProps<typeof DialogRoot>;
  export type TriggerProps = React.ComponentProps<typeof DialogTrigger>;
  export type PortalProps = React.ComponentProps<typeof DialogPortal>;
  export type CloseProps = React.ComponentProps<typeof DialogClose>;
  export type OverlayProps = React.ComponentProps<typeof DialogOverlay>;
  export type ContentProps = React.ComponentProps<typeof DialogContent>;
  export type HeaderProps = React.ComponentProps<typeof DialogHeader>;
  export type TitleProps = React.ComponentProps<typeof DialogTitle>;
  export type DescriptionProps = React.ComponentProps<typeof DialogDescription>;
  export type BodyProps = React.ComponentProps<typeof DialogBody>;
  export type FooterProps = React.ComponentProps<typeof DialogFooter>;
}

export { Dialog, dialogVariants };
