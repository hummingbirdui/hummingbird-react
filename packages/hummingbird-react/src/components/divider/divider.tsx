'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Separator } from 'radix-ui';
import { cn } from '../../utils/cn';

const dividerVariants = cva('divider', {
  variants: {
    orientation: {
      horizontal: 'divider-horizontal',
      vertical: 'divider-vertical',
    },
    color: {
      neutral: '',
      primary: 'divider-primary',
      secondary: 'divider-secondary',
      info: 'divider-info',
      success: 'divider-success',
      warning: 'divider-warning',
      danger: 'divider-danger',
    },
    lineStyle: {
      solid: '',
      dashed: 'divider-dashed',
      dotted: 'divider-dotted',
    },
    thickness: {
      thin: '',
      md: 'divider-thickness-md',
      thick: 'divider-thickness-thick',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    color: 'neutral',
    lineStyle: 'solid',
    thickness: 'thin',
  },
});

export interface DividerProps
  extends Omit<React.ComponentProps<typeof Separator.Root>, 'color' | 'orientation' | 'children'>,
    VariantProps<typeof dividerVariants> {
  /**
   * Content shown in the middle of the line, e.g. `OR`.
   *
   * The label is presentational: the separator itself keeps its accessible
   * role, and the surrounding rules are hidden from assistive technology so
   * the label is announced once rather than twice.
   */
  label?: React.ReactNode;
}

function Divider({
  className,
  orientation = 'horizontal',
  color,
  lineStyle,
  thickness,
  label,
  decorative,
  ...props
}: DividerProps) {
  // cva's VariantProps admits null, which a default parameter does not catch,
  // and Radix's orientation prop does not accept it.
  const resolvedOrientation = orientation ?? 'horizontal';
  const variantClasses = dividerVariants({
    orientation: resolvedOrientation,
    color,
    lineStyle,
    thickness,
  });

  // Radix renders a plain rule and does not accept children, so a labelled
  // divider is composed rather than nested: two Separators either side of the
  // label. Both are decorative, because the label is the meaningful content
  // and announcing "separator" twice around it helps nobody.
  if (label !== undefined && label !== null && label !== false) {
    return (
      <div
        data-slot="divider"
        data-orientation={resolvedOrientation}
        role="separator"
        aria-orientation={resolvedOrientation}
        className={cn('divider-labelled', `divider-labelled-${resolvedOrientation}`, className)}
      >
        <Separator.Root
          decorative
          orientation={resolvedOrientation}
          className={cn(variantClasses, 'divider-line')}
        />
        <span data-slot="divider-label" className="divider-label">
          {label}
        </span>
        <Separator.Root
          decorative
          orientation={resolvedOrientation}
          className={cn(variantClasses, 'divider-line')}
        />
      </div>
    );
  }

  return (
    <Separator.Root
      data-slot="divider"
      decorative={decorative}
      orientation={resolvedOrientation}
      className={cn(variantClasses, className)}
      {...props}
    />
  );
}

Divider.displayName = 'Divider';

namespace Divider {
  export type Props = DividerProps;
}

export { Divider, dividerVariants };
