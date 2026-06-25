'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// `.modal-dialog` modifiers from reference-css/components/modal.css. These are
// pure looks — every option maps to a real Hummingbird class.
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

/**
 * Modal dialog root. A thin pass-through over Radix `Dialog.Root` — Radix owns
 * all open-state behavior (controlled via `open`/`onOpenChange`, uncontrolled
 * via `defaultOpen`) and keeps the content mounted across the exit animation
 * via its own `Presence`. The fade/zoom transition is expressed entirely with
 * `data-[state]` animation utilities on the overlay and content (see below), so
 * no React state, context, or effects are needed here.
 */
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

/**
 * The dimmed backdrop (`.modal-backdrop` supplies the look). The fade is driven
 * by Radix's `data-[state=open|closed]` attribute via tw-animate-css keyframes,
 * which Radix's `Presence` awaits before unmounting.
 */
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
  /** Class applied to the `.modal-dialog` wrapper. */
  dialogClassName?: string;
  /**
   * Portal target. Forwarded to the underlying Radix `Dialog.Portal`'s
   * `container` so the dialog can render into a custom DOM node.
   */
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
  /** Extra props forwarded to the underlying Radix `Dialog.Portal`. */
  portalProps?: Omit<React.ComponentProps<typeof DialogPrimitive.Portal>, 'container' | 'children'>;
  /**
   * Props forwarded to the `.modal-backdrop` overlay (e.g. `className`,
   * `onClick`). Lets you customize the backdrop without composing the parts by
   * hand.
   */
  overlayProps?: React.ComponentProps<typeof DialogOverlay>;
}

/**
 * The modal body. Renders the full-screen scroll container (`.modal`), the
 * `.modal-dialog` wrapper, and Radix's focus-trapped content as the
 * `.modal-content` box. `className` targets `.modal-content`; `dialogClassName`
 * targets `.modal-dialog`; `overlayProps` targets `.modal-backdrop`.
 *
 * The slide/zoom/fade transition is expressed with `data-[state]` animation
 * utilities (tw-animate-css) on `.modal-content`, mirroring the
 * `--modal-*-transform` values in modal.css. Radix's `Presence` keeps the node
 * mounted until the close animation finishes — no JS state machine required.
 *
 * Portal placement is configurable via `container`/`portalProps`. For full
 * control beyond these props (e.g. `forceMount` on the portal/overlay), compose
 * `DialogPortal`, `DialogOverlay`, and `DialogContent` directly instead.
 */
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
      {/* `.modal` is `hidden` by default (a `base` sub-layer inside
          `utilities`); the `block` utility — emitted directly in `utilities` —
          overrides it while mounted, the same role Bootstrap's inline display
          plays. */}
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

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('modal-title', className)}
      {...props}
    />
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
