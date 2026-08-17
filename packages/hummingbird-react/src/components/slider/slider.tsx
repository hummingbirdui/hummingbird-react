'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const sliderVariants = cva('slider', {
  variants: {
    size: {
      sm: 'slider-sm',
      md: '',
      lg: 'slider-lg',
    },
    color: {
      primary: '',
      secondary: 'slider-secondary',
      info: 'slider-info',
      success: 'slider-success',
      warning: 'slider-warning',
      danger: 'slider-danger',
      neutral: 'slider-neutral',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export interface SliderProps
  extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'color'>,
    VariantProps<typeof sliderVariants> {}

function Slider({
  className,
  color,
  size,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min]),
    [value, defaultValue, min]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(sliderVariants({ color, size }), className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="slider-track">
        <SliderPrimitive.Range data-slot="slider-range" className="slider-range" />
      </SliderPrimitive.Track>
      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb key={index} data-slot="slider-thumb" className="slider-thumb" />
      ))}
    </SliderPrimitive.Root>
  );
}

Slider.displayName = 'Slider';

namespace Slider {
  export type Props = React.ComponentProps<typeof Slider>;
}

export { Slider, sliderVariants };
