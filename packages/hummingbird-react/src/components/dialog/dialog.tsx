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

function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
Dialog.displayName = 'Dialog';

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
DialogTrigger.displayName = 'DialogTrigger';

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
DialogPortal.displayName = 'DialogPortal';

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
DialogClose.displayName = 'DialogClose';

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
DialogOverlay.displayName = 'DialogOverlay';

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
DialogContent.displayName = 'DialogContent';

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('modal-header', className)} {...props} />;
}
DialogHeader.displayName = 'DialogHeader';

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
DialogTitle.displayName = 'DialogTitle';

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description data-slot="dialog-description" className={className} {...props} />
  );
}
DialogDescription.displayName = 'DialogDescription';

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={cn('modal-body', className)} {...props} />;
}
DialogBody.displayName = 'DialogBody';

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cn('modal-footer', className)} {...props} />;
}
DialogFooter.displayName = 'DialogFooter';

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  dialogVariants,
};
