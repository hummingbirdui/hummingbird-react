import path from 'node:path';

const PACKAGE_NAME_RE = /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/;

/** Whether `name` is a valid npm package name (new-style rules). */
export function isValidPackageName(name: string): boolean {
  return name.length > 0 && name.length <= 214 && PACKAGE_NAME_RE.test(name);
}

/** Coerces an arbitrary directory name into a valid npm package name. */
export function toValidPackageName(name: string): string {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]+/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'hummingbird-app';
}

/** Derives the package name for a target directory (handles ".", nested paths). */
export function projectNameFromDir(dir: string, cwd = process.cwd()): string {
  const base = path.basename(path.resolve(cwd, dir));
  return isValidPackageName(base) ? base : toValidPackageName(base);
}

/** Validation message for the directory prompt, or undefined when valid. */
export function validateDirectoryInput(value: string | undefined): string | undefined {
  const dir = (value ?? '').trim();
  if (!dir) return 'Please enter a directory name.';
  if (/[<>:"|?*]/.test(dir)) return 'The directory name contains invalid characters.';
  return undefined;
}
