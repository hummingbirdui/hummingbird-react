import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

/** Semantic wrapper for a breadcrumb trail. Renders a `nav` landmark. */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'nav';

    return <Comp ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
  }
);

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
  extends React.OlHTMLAttributes<HTMLOListElement>, VariantProps<typeof breadcrumbVariants> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, separator, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'ol';

    return (
      <Comp
        ref={ref}
        data-slot="breadcrumb-list"
        className={cn(breadcrumbVariants({ separator }), className)}
        {...props}
      />
    );
  }
);

BreadcrumbList.displayName = 'BreadcrumbList';

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Marks the item as the current page (adds the `active` class). */
  active?: boolean;
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, active = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'li';

    return (
      <Comp
        ref={ref}
        data-slot="breadcrumb-item"
        className={cn('breadcrumb-item', active && 'active', className)}
        {...props}
      />
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as a child element (e.g. a framework link). Uses Radix Slot. */
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'a';

    return <Comp ref={ref} data-slot="breadcrumb-link" className={className} {...props} />;
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

/** The current page in the trail. Non-interactive; sets `aria-current="page"`. */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span';

    return (
      <Comp
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        data-slot="breadcrumb-page"
        className={className}
        {...props}
      />
    );
  }
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  breadcrumbVariants,
};
