import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const navbarVariants = cva('navbar', {
  variants: {
    // The breakpoint at which the navbar switches from stacked to horizontal.
    // `always` (navbar-expand) is expanded at every width.
    expand: {
      sm: 'navbar-expand-sm',
      md: 'navbar-expand-md',
      lg: 'navbar-expand-lg',
      xl: 'navbar-expand-xl',
      '2xl': 'navbar-expand-2xl',
      always: 'navbar-expand',
    },
  },
});

export interface NavbarProps
  extends React.ComponentProps<'nav'>,
    VariantProps<typeof navbarVariants> {
  asChild?: boolean;
}

function Navbar({ className, expand, asChild = false, ...props }: NavbarProps) {
  const Comp = asChild ? Slot.Root : 'nav';

  return (
    <Comp data-slot="navbar" className={cn(navbarVariants({ expand }), className)} {...props} />
  );
}

Navbar.displayName = 'Navbar';

export interface NavbarBrandProps extends React.ComponentProps<'a'> {
  asChild?: boolean;
}

function NavbarBrand({ className, asChild = false, ...props }: NavbarBrandProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return <Comp data-slot="navbar-brand" className={cn('navbar-brand', className)} {...props} />;
}

NavbarBrand.displayName = 'NavbarBrand';

const navbarNavVariants = cva('navbar-nav', {
  variants: {
    scrollable: { true: 'navbar-nav-scroll', false: '' },
  },
  defaultVariants: {
    scrollable: false,
  },
});

export interface NavbarNavProps
  extends React.ComponentProps<'ul'>,
    VariantProps<typeof navbarNavVariants> {
  asChild?: boolean;
}

function NavbarNav({ className, scrollable, asChild = false, ...props }: NavbarNavProps) {
  const Comp = asChild ? Slot.Root : 'ul';

  return (
    <Comp
      data-slot="navbar-nav"
      className={cn(navbarNavVariants({ scrollable }), className)}
      {...props}
    />
  );
}

NavbarNav.displayName = 'NavbarNav';

export interface NavbarTextProps extends React.ComponentProps<'span'> {
  asChild?: boolean;
}

function NavbarText({ className, asChild = false, ...props }: NavbarTextProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return <Comp data-slot="navbar-text" className={cn('navbar-text', className)} {...props} />;
}

NavbarText.displayName = 'NavbarText';

export interface NavbarCollapseProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

function NavbarCollapse({ className, asChild = false, ...props }: NavbarCollapseProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp data-slot="navbar-collapse" className={cn('navbar-collapse', className)} {...props} />
  );
}

NavbarCollapse.displayName = 'NavbarCollapse';

export {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarText,
  NavbarCollapse,
  navbarVariants,
  navbarNavVariants,
};
