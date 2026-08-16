'use client';

import * as React from 'react';
import { Toaster as SonnerToaster, toast, type ToasterProps } from 'sonner';

function Toaster({ style, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      style={
        {
          '--normal-bg': 'var(--background-color-subtle)',
          '--normal-text': 'var(--text-color-default)',
          '--normal-border': 'var(--border-color-default)',
          '--border-radius': 'var(--radius-lg)',
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

Toaster.displayName = 'Toaster';

namespace Toaster {
  export type Props = ToasterProps;
}

export { Toaster, toast };
export type { ToasterProps };
