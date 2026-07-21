import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';
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

function AvatarRoot({ className, size, status, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, status }), className)}
      {...props}
    />
  );
}

AvatarRoot.displayName = 'Avatar';

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('h-full w-full object-cover rounded-full', className)}
      {...props}
    />
  );
}

AvatarImage.displayName = 'Avatar.Image';

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

AvatarFallback.displayName = 'Avatar.Fallback';

export interface AvatarGroupProps extends React.ComponentProps<'div'> {}

function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return <div data-slot="avatar-group" className={cn('avatar-group', className)} {...props} />;
}

AvatarGroup.displayName = 'Avatar.Group';

const Avatar = /* @__PURE__ */ Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
});

namespace Avatar {
  export type Props = React.ComponentProps<typeof AvatarRoot>;
  export type RootProps = React.ComponentProps<typeof AvatarRoot>;
  export type ImageProps = React.ComponentProps<typeof AvatarImage>;
  export type FallbackProps = React.ComponentProps<typeof AvatarFallback>;
  export type GroupProps = React.ComponentProps<typeof AvatarGroup>;
}

export { Avatar, avatarVariants };
