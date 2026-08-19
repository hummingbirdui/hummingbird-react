import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva('', {
  variants: {
    breakpoint: {
      sm: 'sm:container',
      md: 'md:container',
      lg: 'lg:container',
      xl: 'xl:container',
      xxl: '2xl:container',
    },
    fluid: {
      true: 'mx-auto w-full px-3',
      false: '',
    },
  },
  defaultVariants: {
    fluid: false,
  },
});

export interface ContainerProps
  extends React.ComponentProps<'div'>, VariantProps<typeof containerVariants> {}

function Container({ className, breakpoint, fluid = false, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        containerVariants({ fluid, breakpoint: fluid ? undefined : breakpoint }),
        !fluid && !breakpoint && 'container',
        className
      )}
      {...props}
    />
  );
}

Container.displayName = 'Container';

namespace Container {
  export type Props = ContainerProps;
}

export { Container, containerVariants };
