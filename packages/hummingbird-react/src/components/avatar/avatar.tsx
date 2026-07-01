import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive, Slot } from 'radix-ui';
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
  extends React.ComponentProps<typeof AvatarPrimitive.Root>, VariantProps<typeof avatarVariants> {}

function Avatar({ className, size, status, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, status }), className)}
      {...props}
    />
  );
}

Avatar.displayName = 'Avatar';

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('h-full w-full object-cover rounded-full', className)}
      {...props}
    />
  );
}

AvatarImage.displayName = 'AvatarImage';

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn('avatar-name rounded-full', className)}
      {...props}
    />
  );
}

AvatarFallback.displayName = 'AvatarFallback';

export interface AvatarGroupProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

function AvatarGroup({ className, asChild = false, ...props }: AvatarGroupProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return <Comp data-slot="avatar-group" className={cn('avatar-group', className)} {...props} />;
}

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants };
