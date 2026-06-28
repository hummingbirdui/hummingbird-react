'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot, Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';
import { Menu } from 'lucide-react';

const navbarVariants = cva('navbar', {
  variants: {
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

type NavbarExpand = VariantProps<typeof navbarVariants>['expand'];

const NavbarContext = React.createContext<{ expand?: NavbarExpand }>({});

export interface NavbarProps
  extends React.ComponentProps<'nav'>, VariantProps<typeof navbarVariants> {
  asChild?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Navbar({
  className,
  expand,
  asChild = false,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: NavbarProps) {
  const Comp = asChild ? Slot.Root : 'nav';
  const ctx = React.useMemo(() => ({ expand }), [expand]);

  return (
    <NavbarContext.Provider value={ctx}>
      <CollapsiblePrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        asChild
      >
        <Comp data-slot="navbar" className={cn(navbarVariants({ expand }), className)} {...props} />
      </CollapsiblePrimitive.Root>
    </NavbarContext.Provider>
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
  extends React.ComponentProps<'ul'>, VariantProps<typeof navbarNavVariants> {
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

type CollapseGate = 'all' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

function gateFor(expand?: NavbarExpand): CollapseGate {
  if (expand == null) return 'all';
  if (expand === 'always') return 'none';
  return expand;
}

const COLLAPSE_OUTER: Record<CollapseGate, string> = {
  all: 'grid items-stretch overflow-hidden transition-[grid-template-rows] duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:transition-none data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]',
  sm: 'max-sm:grid max-sm:items-stretch max-sm:overflow-hidden max-sm:transition-[grid-template-rows] max-sm:duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:max-sm:transition-none max-sm:data-[state=closed]:grid-rows-[0fr] max-sm:data-[state=open]:grid-rows-[1fr]',
  md: 'max-md:grid max-md:items-stretch max-md:overflow-hidden max-md:transition-[grid-template-rows] max-md:duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:max-md:transition-none max-md:data-[state=closed]:grid-rows-[0fr] max-md:data-[state=open]:grid-rows-[1fr]',
  lg: 'max-lg:grid max-lg:items-stretch max-lg:overflow-hidden max-lg:transition-[grid-template-rows] max-lg:duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:max-lg:transition-none max-lg:data-[state=closed]:grid-rows-[0fr] max-lg:data-[state=open]:grid-rows-[1fr]',
  xl: 'max-xl:grid max-xl:items-stretch max-xl:overflow-hidden max-xl:transition-[grid-template-rows] max-xl:duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:max-xl:transition-none max-xl:data-[state=closed]:grid-rows-[0fr] max-xl:data-[state=open]:grid-rows-[1fr]',
  '2xl':
    'max-2xl:grid max-2xl:items-stretch max-2xl:overflow-hidden max-2xl:transition-[grid-template-rows] max-2xl:duration-(--hb-navbar-collapse-duration,200ms)! motion-reduce:max-2xl:transition-none max-2xl:data-[state=closed]:grid-rows-[0fr] max-2xl:data-[state=open]:grid-rows-[1fr]',
  none: '',
};

const COLLAPSE_INNER: Record<CollapseGate, string> = {
  all: 'min-h-0 overflow-hidden',
  sm: 'min-h-0 overflow-hidden sm:contents',
  md: 'min-h-0 overflow-hidden md:contents',
  lg: 'min-h-0 overflow-hidden lg:contents',
  xl: 'min-h-0 overflow-hidden xl:contents',
  '2xl': 'min-h-0 overflow-hidden 2xl:contents',
  none: 'contents',
};

export interface NavbarCollapseProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Content
> {
  duration?: number;
}

function NavbarCollapse({ className, children, duration, style, ...props }: NavbarCollapseProps) {
  const { expand } = React.useContext(NavbarContext);
  const gate = gateFor(expand);

  const collapseStyle =
    duration == null
      ? style
      : ({ '--hb-navbar-collapse-duration': `${duration}ms`, ...style } as React.CSSProperties);

  return (
    <CollapsiblePrimitive.Content
      forceMount
      data-slot="navbar-collapse"
      className={cn('navbar-collapse', COLLAPSE_OUTER[gate], className)}
      style={collapseStyle}
      {...props}
    >
      <div data-slot="navbar-collapse-inner" className={COLLAPSE_INNER[gate]}>
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  );
}

NavbarCollapse.displayName = 'NavbarCollapse';

/** Default hamburger glyph for `NavbarToggle`; override by passing children. */
function NavbarTogglerIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return <Menu className={cn('size-5', className)} {...props} />;
}

NavbarTogglerIcon.displayName = 'NavbarTogglerIcon';

export interface NavbarToggleProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
> {}

function NavbarToggle({ className, children, ...props }: NavbarToggleProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="navbar-toggler"
      aria-label="Toggle navigation"
      className={cn('navbar-toggler', !children && 'btn btn-icon btn-sm', className)}
      {...props}
    >
      {children ?? <NavbarTogglerIcon />}
    </CollapsiblePrimitive.Trigger>
  );
}

NavbarToggle.displayName = 'NavbarToggle';

export {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarText,
  NavbarCollapse,
  NavbarToggle,
  NavbarTogglerIcon,
  navbarVariants,
  navbarNavVariants,
};
