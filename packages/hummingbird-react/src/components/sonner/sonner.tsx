'use client';

import * as React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps } from 'sonner';

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

// Local binding (not a pass-through re-export) so the export stays inside
// this module, which `sideEffects: false` lets bundlers drop when unused —
// a direct `export { toast } from 'sonner'` would be hoisted into the root
// barrel and force `sonner` into every consumer bundle.
const toast: typeof sonnerToast = sonnerToast;

export { Toaster, toast };
export type { ToasterProps };
