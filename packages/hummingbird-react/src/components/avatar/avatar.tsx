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
  extends React.ComponentProps<'span'>, VariantProps<typeof avatarVariants> {
  asChild?: boolean;
}

function Avatar({ className, size, status, asChild = false, ...props }: AvatarProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="avatar"
      className={cn(avatarVariants({ size, status }), className)}
      {...props}
    />
  );
}

Avatar.displayName = 'Avatar';

export interface AvatarNameProps extends React.ComponentProps<'span'> {
  asChild?: boolean;
}

function AvatarName({ className, asChild = false, ...props }: AvatarNameProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return <Comp data-slot="avatar-name" className={cn('avatar-name', className)} {...props} />;
}

AvatarName.displayName = 'AvatarName';

export interface AvatarGroupProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

function AvatarGroup({ className, asChild = false, ...props }: AvatarGroupProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="avatar-group" className={cn('avatar-group', className)} {...props} />;
}

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarName, AvatarGroup, avatarVariants };
