import fs from 'node:fs/promises';
import path from 'node:path';

export interface TemplateContext {
  projectName: string;
}

/**
 * npm strips `.gitignore` from published tarballs (and the repo's own
 * .gitignore would hide some dotfiles), so templates store them with a `_`
 * prefix and they are renamed on copy.
 */
const SPECIAL_FILES: Record<string, string> = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc',
  '_env.example': '.env.example',
};

export function renameSpecialFile(name: string): string {
  return SPECIAL_FILES[name] ?? name;
}

/** Returns rewritten contents for files that need it, or null to copy verbatim. */
export function transformTemplateFile(
  relPath: string,
  contents: string,
  ctx: TemplateContext
): string | null {
  const normalized = relPath.split(path.sep).join('/');
  if (normalized === 'package.json') {
    const pkg = JSON.parse(contents) as Record<string, unknown>;
    // Keep `name` first, as package managers write it.
    const { name: _omitted, ...rest } = pkg;
    return JSON.stringify({ name: ctx.projectName, ...rest }, null, 2) + '\n';
  }
  if (normalized === 'README.md') {
    return contents.replaceAll('{{projectName}}', ctx.projectName);
  }
  return null;
}

/** Recursively copies a template, applying renames and transforms. Returns written paths (relative). */
export async function copyTemplate(
  sourceDir: string,
  targetDir: string,
  ctx: TemplateContext
): Promise<string[]> {
  const written: string[] = [];
  await fs.mkdir(targetDir, { recursive: true });

  const entries = await fs.readdir(sourceDir, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const absSource = path.join(entry.parentPath, entry.name);
    const relSource = path.relative(sourceDir, absSource);
    const relTarget = path.join(path.dirname(relSource), renameSpecialFile(entry.name));
    const absTarget = path.join(targetDir, relTarget);

    await fs.mkdir(path.dirname(absTarget), { recursive: true });
    const isText = relSource === 'package.json' || relSource === 'README.md';
    const transformed = isText
      ? transformTemplateFile(relSource, await fs.readFile(absSource, 'utf8'), ctx)
      : null;
    if (transformed !== null) {
      await fs.writeFile(absTarget, transformed);
    } else {
      await fs.copyFile(absSource, absTarget);
    }
    written.push(relTarget.split(path.sep).join('/'));
  }
  return written.sort();
}
