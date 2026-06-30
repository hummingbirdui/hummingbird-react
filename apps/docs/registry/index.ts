export type RegistryEntry = {
  file: string;
};

export const registry: Record<string, RegistryEntry> = {
  "button-default": { file: "buttons/button-default.tsx" },
  "button-variants": { file: "buttons/button-variants.tsx" },
  "button-colors": { file: "buttons/button-colors.tsx" },
  "button-sizes": { file: "buttons/button-sizes.tsx" },
  "button-shapes": { file: "buttons/button-shapes.tsx" },
  "button-with-icon": { file: "buttons/button-with-icon.tsx" },
  "button-icons": { file: "buttons/button-icons.tsx" },
  "button-full-width": { file: "buttons/full-width.tsx" },
  "button-disabled": { file: "buttons/button-disabled.tsx" },
};
