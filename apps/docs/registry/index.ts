import type * as React from "react";

import ButtonDefault from "./examples/button-default";
import ButtonVariants from "./examples/button-variants";

export type RegistryEntry = {
  /** The example component rendered in the "Preview" tab. */
  component: React.ComponentType;
  /**
   * The example's source file name, relative to `registry/examples`.
   * `ComponentPreview` reads this file to populate the "Code" tab, so the
   * code shown is always the exact source that produced the preview.
   */
  file: string;
};

/**
 * Maps an example `name` (used as `<ComponentPreview name="..." />`) to the
 * component to render and the source file to display. Add one entry per
 * example; keep the `name` in sync with the file name for readability.
 */
export const registry: Record<string, RegistryEntry> = {
  "button-default": {
    component: ButtonDefault,
    file: "button-default.tsx",
  },
  "button-variants": {
    component: ButtonVariants,
    file: "button-variants.tsx",
  },
};
