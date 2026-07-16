'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const paginationVariants = cva('pagination', {
  variants: {
    size: { sm: 'pagination-sm', md: '', lg: 'pagination-lg' },
    shape: { default: '', circle: 'pagination-circle' },
    variant: { filled: '', subtle: '', outlined: '' },
    color: {
      primary: '',
      secondary: '',
      danger: '',
      warning: '',
      success: '',
      info: '',
      neutral: '',
    },
  },
  compoundVariants: [
    // filled
    { variant: 'filled', color: 'primary', class: 'pagination-primary' },
    { variant: 'filled', color: 'secondary', class: 'pagination-secondary' },
    { variant: 'filled', color: 'danger', class: 'pagination-danger' },
    { variant: 'filled', color: 'warning', class: 'pagination-warning' },
    { variant: 'filled', color: 'success', class: 'pagination-success' },
    { variant: 'filled', color: 'info', class: 'pagination-info' },
    { variant: 'filled', color: 'neutral', class: 'pagination-neutral' },
    // subtle
    { variant: 'subtle', color: 'primary', class: 'pagination-subtle-primary' },
    { variant: 'subtle', color: 'secondary', class: 'pagination-subtle-secondary' },
    { variant: 'subtle', color: 'info', class: 'pagination-subtle-info' },
    { variant: 'subtle', color: 'success', class: 'pagination-subtle-success' },
    { variant: 'subtle', color: 'warning', class: 'pagination-subtle-warning' },
    { variant: 'subtle', color: 'danger', class: 'pagination-subtle-danger' },
    { variant: 'subtle', color: 'neutral', class: 'pagination-subtle-neutral' },
    // outlined
    { variant: 'outlined', color: 'primary', class: 'pagination-outlined-primary' },
    { variant: 'outlined', color: 'secondary', class: 'pagination-outlined-secondary' },
    { variant: 'outlined', color: 'danger', class: 'pagination-outlined-danger' },
    { variant: 'outlined', color: 'warning', class: 'pagination-outlined-warning' },
    { variant: 'outlined', color: 'success', class: 'pagination-outlined-success' },
    { variant: 'outlined', color: 'info', class: 'pagination-outlined-info' },
    { variant: 'outlined', color: 'neutral', class: 'pagination-outlined-neutral' },
  ],
  defaultVariants: {
    size: 'md',
    shape: 'default',
    variant: 'filled',
    color: 'primary',
  },
});

type PaginationVariants = VariantProps<typeof paginationVariants>;

const PaginationVariantsContext = React.createContext<PaginationVariants>({});

export interface PaginationProps
  extends Omit<React.ComponentProps<'nav'>, 'color'>, PaginationVariants {
  asChild?: boolean;
}

function Pagination({
  className,
  size,
  shape,
  variant,
  color,
  asChild = false,
  ...props
}: PaginationProps) {
  const Comp = asChild ? Slot.Root : 'nav';
  const variants = React.useMemo(
    () => ({ size, shape, variant, color }),
    [size, shape, variant, color]
  );

  return (
    <PaginationVariantsContext.Provider value={variants}>
      <Comp
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={className}
        {...props}
      />
    </PaginationVariantsContext.Provider>
  );
}

Pagination.displayName = 'Pagination';

export interface PaginationContentProps extends React.ComponentProps<'ul'> {
  asChild?: boolean;
}

function PaginationContent({ className, asChild = false, ...props }: PaginationContentProps) {
  const Comp = asChild ? Slot.Root : 'ul';
  const variants = React.useContext(PaginationVariantsContext);

  return (
    <Comp
      data-slot="pagination-content"
      className={cn(paginationVariants(variants), className)}
      {...props}
    />
  );
}

PaginationContent.displayName = 'PaginationContent';

const PaginationItemActiveContext = React.createContext(false);

export interface PaginationItemProps extends React.ComponentProps<'li'> {
  active?: boolean;
  disabled?: boolean;
  asChild?: boolean;
}

function PaginationItem({
  className,
  active = false,
  disabled = false,
  asChild = false,
  ...props
}: PaginationItemProps) {
  const Comp = asChild ? Slot.Root : 'li';

  return (
    <PaginationItemActiveContext.Provider value={active}>
      <Comp
        data-slot="pagination-item"
        className={cn('page-item', active && 'active', disabled && 'disabled', className)}
        {...props}
      />
    </PaginationItemActiveContext.Provider>
  );
}

PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean;
}

function PaginationLink({ className, asChild = false, ...props }: PaginationLinkProps) {
  const Comp = asChild ? Slot.Root : 'a';
  const active = React.useContext(PaginationItemActiveContext);

  return (
    <Comp
      data-slot="pagination-link"
      aria-current={active ? 'page' : undefined}
      className={cn('page-link', className)}
      {...props}
    />
  );
}

PaginationLink.displayName = 'PaginationLink';

export { Pagination, PaginationContent, PaginationItem, PaginationLink, paginationVariants };
