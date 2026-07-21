import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const navVariants = cva('nav', {
  variants: {
    variant: {
      default: '',
      underline: 'nav-underline',
      tabs: 'nav-tabs',
    },
    color: {
      default: '',
      primary: 'nav-primary',
      secondary: 'nav-secondary',
      info: 'nav-info',
      success: 'nav-success',
      warning: 'nav-warning',
      danger: 'nav-danger',
      neutral: 'nav-neutral',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
  },
});

export interface NavProps
  extends Omit<React.ComponentProps<'ul'>, 'color'>, VariantProps<typeof navVariants> {
  asChild?: boolean;
}

function NavRoot({ className, variant, color, asChild = false, ...props }: NavProps) {
  const Comp = asChild ? Slot.Root : 'ul';

  return (
    <Comp data-slot="nav" className={cn(navVariants({ variant, color }), className)} {...props} />
  );
}

NavRoot.displayName = 'Nav';

export interface NavItemProps extends React.ComponentProps<'li'> {}

function NavItem({ className, ...props }: NavItemProps) {
  return <li data-slot="nav-item" className={className} {...props} />;
}

NavItem.displayName = 'Nav.Item';

export interface NavLinkProps extends React.ComponentProps<'a'> {
  active?: boolean;
  disabled?: boolean;
  asChild?: boolean;
}

function NavLink({
  className,
  active = false,
  disabled = false,
  asChild = false,
  ...props
}: NavLinkProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="nav-link"
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      className={cn('nav-link', active && 'active', disabled && 'disabled', className)}
      {...props}
    />
  );
}

NavLink.displayName = 'Nav.Link';

const Nav = /* @__PURE__ */ Object.assign(NavRoot, {
  Root: NavRoot,
  Item: NavItem,
  Link: NavLink,
});

namespace Nav {
  export type Props = React.ComponentProps<typeof NavRoot>;
  export type RootProps = React.ComponentProps<typeof NavRoot>;
  export type ItemProps = React.ComponentProps<typeof NavItem>;
  export type LinkProps = React.ComponentProps<typeof NavLink>;
}

export { Nav, navVariants };
