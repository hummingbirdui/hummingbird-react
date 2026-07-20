import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

export interface BreadcrumbProps extends React.ComponentProps<'nav'> {}

function Breadcrumb(props: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

Breadcrumb.displayName = 'Breadcrumb';

const breadcrumbVariants = cva('breadcrumb', {
  variants: {
    separator: {
      slash: '',
      dashed: 'breadcrumb-separator-dashed',
      arrow: 'breadcrumb-separator-arrow',
    },
  },
  defaultVariants: {
    separator: 'slash',
  },
});

export interface BreadcrumbListProps
  extends React.ComponentProps<'ol'>, VariantProps<typeof breadcrumbVariants> {}

function BreadcrumbList({ className, separator, ...props }: BreadcrumbListProps) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumbVariants({ separator }), className)}
      {...props}
    />
  );
}

BreadcrumbList.displayName = 'BreadcrumbList';

export interface BreadcrumbItemProps extends React.ComponentProps<'li'> {
  active?: boolean;
}

function BreadcrumbItem({ className, active = false, ...props }: BreadcrumbItemProps) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('breadcrumb-item', active && 'active', className)}
      {...props}
    />
  );
}

BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean;
}

function BreadcrumbLink({ className, asChild = false, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return <Comp data-slot="breadcrumb-link" className={className} {...props} />;
}

BreadcrumbLink.displayName = 'BreadcrumbLink';

export interface BreadcrumbPageProps extends React.ComponentProps<'span'> {}

/** The current page in the trail. Non-interactive; sets `aria-current="page"`. */
function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={className}
      {...props}
    />
  );
}

BreadcrumbPage.displayName = 'BreadcrumbPage';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  breadcrumbVariants,
};
