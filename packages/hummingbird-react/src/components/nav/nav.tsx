import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const navVariants = cva('nav', {
  variants: {
    // Line style of the nav. `tabs` and `underline` are standalone classes;
    // the plain `nav` has no extra class.
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
  extends Omit<React.ComponentProps<'ul'>, 'color'>,
    VariantProps<typeof navVariants> {
  asChild?: boolean;
}

function Nav({ className, variant, color, asChild = false, ...props }: NavProps) {
  const Comp = asChild ? Slot.Root : 'ul';

  return (
    <Comp data-slot="nav" className={cn(navVariants({ variant, color }), className)} {...props} />
  );
}

Nav.displayName = 'Nav';

export interface NavItemProps extends React.ComponentProps<'li'> {
  asChild?: boolean;
}

// `nav-item` is not a Hummingbird utility — the CSS targets `.nav-link`
// directly — so this is a classless `<li>` wrapper for ergonomics.
function NavItem({ className, asChild = false, ...props }: NavItemProps) {
  const Comp = asChild ? Slot.Root : 'li';

  return <Comp data-slot="nav-item" className={className} {...props} />;
}

NavItem.displayName = 'NavItem';

export interface NavLinkProps extends React.ComponentProps<'a'> {
  /** Marks the link as the active one (`.active`). */
  active?: boolean;
  /** Mutes the link and disables interaction (`.disabled`). */
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

NavLink.displayName = 'NavLink';

export { Nav, NavItem, NavLink, navVariants };
