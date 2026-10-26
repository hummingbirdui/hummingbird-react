import fs from 'node:fs/promises';
import path from 'node:path';

export async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

/** True when the directory is missing, empty, or contains only a `.git` folder. */
export async function isDirEmpty(dir: string): Promise<boolean> {
  if (!(await pathExists(dir))) return true;
  const entries = await fs.readdir(dir);
  return entries.length === 0 || (entries.length === 1 && entries[0] === '.git');
}

/** Removes everything in `dir` except `.git`. */
export async function emptyDir(dir: string): Promise<void> {
  if (!(await pathExists(dir))) return;
  for (const entry of await fs.readdir(dir)) {
    if (entry === '.git') continue;
    await fs.rm(path.join(dir, entry), { recursive: true, force: true });
  }
}
