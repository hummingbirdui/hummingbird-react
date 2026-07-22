import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    fontWeight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    truncate: {
      true: 'truncate',
    },
    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
    },
  },
});

type TextTag =
  | 'p'
  | 'span'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'small'
  | 'strong'
  | 'em'
  | 'blockquote'
  | 'code'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'b';

// Intersection of the DOM interfaces behind every TextTag; a Ref to it satisfies
// each tag's specific ref type, so the JSX below type-checks for the whole union.
type TextTagElement = HTMLParagraphElement &
  HTMLSpanElement &
  HTMLLabelElement &
  HTMLHeadingElement &
  HTMLQuoteElement &
  HTMLModElement;

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  /** The text tag to render. Defaults to `p`. */
  as?: TextTag;
  ref?: React.Ref<HTMLElement>;
}

function Text({
  className,
  as = 'p',
  size,
  fontWeight,
  truncate,
  lineClamp,
  ref,
  ...props
}: TextProps) {
  const Comp = as;

  return (
    <Comp
      data-slot="text"
      ref={ref as React.Ref<TextTagElement>}
      className={cn(textVariants({ size, fontWeight, truncate, lineClamp }), className)}
      {...props}
    />
  );
}

Text.displayName = 'Text';

namespace Text {
  export type Props = TextProps;
}

export { Text, textVariants };
