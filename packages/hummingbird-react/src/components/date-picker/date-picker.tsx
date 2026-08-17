'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { Popover } from '../popover';
import { cn } from '../../utils/cn';

function DatePickerRoot({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="date-picker" {...props} />;
}
DatePickerRoot.displayName = 'DatePicker';

const datePickerTriggerVariants = cva('form-control date-picker-trigger', {
  variants: {
    size: {
      sm: 'form-control-sm',
      md: '',
      lg: 'form-control-lg',
    },
    state: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface DatePickerTriggerProps
  extends Omit<React.ComponentProps<'button'>, 'size'>,
    VariantProps<typeof datePickerTriggerVariants> {
  /** Shown muted while no value (children) is rendered */
  placeholder?: string;
  /** `undefined` renders the default calendar icon, `null` renders none */
  icon?: React.ReactNode;
  asChild?: boolean;
}

function DatePickerTrigger({
  className,
  size,
  state,
  placeholder,
  icon,
  asChild = false,
  children,
  ...props
}: DatePickerTriggerProps) {
  if (asChild) {
    return (
      <PopoverPrimitive.Trigger data-slot="date-picker-trigger" asChild {...props}>
        {children}
      </PopoverPrimitive.Trigger>
    );
  }

  const isEmpty = children == null || children === '' || children === false;

  return (
    <PopoverPrimitive.Trigger asChild>
      <button
        type="button"
        data-slot="date-picker-trigger"
        data-empty={isEmpty || undefined}
        aria-invalid={state === 'invalid' || undefined}
        className={cn(datePickerTriggerVariants({ size, state }), className)}
        {...props}
      >
        <span data-slot="date-picker-value" data-placeholder={isEmpty || undefined}>
          {isEmpty ? placeholder : children}
        </span>
        {icon !== null && (
          <span data-slot="date-picker-icon" aria-hidden="true">
            {icon === undefined ? <CalendarIcon /> : icon}
          </span>
        )}
      </button>
    </PopoverPrimitive.Trigger>
  );
}
DatePickerTrigger.displayName = 'DatePicker.Trigger';

function DatePickerAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="date-picker-anchor" {...props} />;
}
DatePickerAnchor.displayName = 'DatePicker.Anchor';

function DatePickerContent({
  className,
  align = 'start',
  ...props
}: React.ComponentProps<typeof Popover.Content>) {
  return (
    <Popover.Content
      arrow={false}
      align={align}
      className={cn('date-picker-content', className)}
      {...props}
    />
  );
}
DatePickerContent.displayName = 'DatePicker.Content';

const DatePicker = /* @__PURE__ */ Object.assign(DatePickerRoot, {
  Trigger: DatePickerTrigger,
  Anchor: DatePickerAnchor,
  Content: DatePickerContent,
});

namespace DatePicker {
  export type Props = React.ComponentProps<typeof DatePickerRoot>;
  export type TriggerProps = DatePickerTriggerProps;
  export type AnchorProps = React.ComponentProps<typeof DatePickerAnchor>;
  export type ContentProps = React.ComponentProps<typeof DatePickerContent>;
}

export { DatePicker, datePickerTriggerVariants };
