import { clsx, type ClassValue } from 'clsx';

/**
 * Merge classNames with conditional support.
 * Uses clsx for conditional class composition.
 *
 * Note: tailwind-merge is intentionally excluded because Hummingbird CSS
 * uses custom utility classes (e.g. btn, btn-primary) that would be
 * incorrectly stripped by tailwind-merge's conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
