import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

export interface BreadcrumbProps extends React.ComponentProps<'nav'> {}

function BreadcrumbRoot(props: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

BreadcrumbRoot.displayName = 'Breadcrumb';

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

BreadcrumbList.displayName = 'Breadcrumb.List';

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

BreadcrumbItem.displayName = 'Breadcrumb.Item';

export interface BreadcrumbLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean;
}

function BreadcrumbLink({ className, asChild = false, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return <Comp data-slot="breadcrumb-link" className={className} {...props} />;
}

BreadcrumbLink.displayName = 'Breadcrumb.Link';

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

BreadcrumbPage.displayName = 'Breadcrumb.Page';

const Breadcrumb = /* @__PURE__ */ Object.assign(BreadcrumbRoot, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
});

namespace Breadcrumb {
  export type Props = React.ComponentProps<typeof BreadcrumbRoot>;
  export type RootProps = React.ComponentProps<typeof BreadcrumbRoot>;
  export type ListProps = React.ComponentProps<typeof BreadcrumbList>;
  export type ItemProps = React.ComponentProps<typeof BreadcrumbItem>;
  export type LinkProps = React.ComponentProps<typeof BreadcrumbLink>;
  export type PageProps = React.ComponentProps<typeof BreadcrumbPage>;
}

export { Breadcrumb, breadcrumbVariants };
