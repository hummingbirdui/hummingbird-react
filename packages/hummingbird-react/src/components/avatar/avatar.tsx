import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const avatarVariants = cva('avatar', {
  variants: {
    size: {
      xs: 'avatar-xs',
      sm: 'avatar-sm',
      md: '',
      lg: 'avatar-lg',
    },
    status: {
      online: 'avatar-status-online',
      offline: 'avatar-status-offline',
      away: 'avatar-status-away',
      busy: 'avatar-status-busy',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Render as a child element (e.g. an `img`). Uses Radix Slot. */
  asChild?: boolean;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, status, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span';

    return (
      <Comp
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ size, status }), className)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const AvatarName = React.forwardRef<HTMLSpanElement, AvatarNameProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span';

    return (
      <Comp
        ref={ref}
        data-slot="avatar-name"
        className={cn('avatar-name', className)}
        {...props}
      />
    );
  }
);

AvatarName.displayName = 'AvatarName';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a child element. Uses Radix Slot. */
  asChild?: boolean;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'div';

    return (
      <Comp
        ref={ref}
        data-slot="avatar-group"
        className={cn('avatar-group', className)}
        {...props}
      />
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarName, AvatarGroup, avatarVariants };
