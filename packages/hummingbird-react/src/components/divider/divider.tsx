import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dividerVariants = cva('', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
    align: {
      start: 'label-start',
      center: '',
      end: 'label-end',
    },
    labeled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', labeled: true, class: 'hr-label' },
    { orientation: 'vertical', labeled: true, class: 'vr-label' },
    { orientation: 'vertical', labeled: false, class: 'vr' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    align: 'center',
    labeled: false,
  },
});

export interface DividerProps
  extends React.ComponentProps<'div'>,
    Omit<VariantProps<typeof dividerVariants>, 'labeled'> {}

function Divider({ className, orientation, align, children, ...props }: DividerProps) {
  const labeled = children != null;
  const classes = cn(dividerVariants({ orientation, align, labeled }), className);

  if (!labeled && orientation !== 'vertical') {
    return (
      <hr
        data-slot="divider"
        className={classes || undefined}
        {...(props as React.ComponentProps<'hr'>)}
      />
    );
  }

  return (
    <div
      data-slot="divider"
      role={labeled ? undefined : 'separator'}
      aria-orientation={labeled ? undefined : 'vertical'}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
}

Divider.displayName = 'Divider';

namespace Divider {
  export type Props = DividerProps;
}

export { Divider, dividerVariants };
