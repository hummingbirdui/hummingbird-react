import * as p from '@clack/prompts';
import { validateDirectoryInput } from './naming';
import { DEFAULT_TEMPLATE, TEMPLATES, type TemplateId } from './templates';
import type { OverwriteMode } from './create';
import type { PackageManager } from './package-manager';

export const DEFAULT_DIRECTORY = 'my-hummingbird-app';

function exitOnCancel<T>(value: T): Exclude<T, symbol> {
  if (p.isCancel(value)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }
  return value as Exclude<T, symbol>;
}

export async function askDirectory(): Promise<string> {
  const value = await p.text({
    message: 'Where should we create your project?',
    placeholder: DEFAULT_DIRECTORY,
    defaultValue: DEFAULT_DIRECTORY,
    validate: (input) => (input ? validateDirectoryInput(input) : undefined),
  });
  return exitOnCancel(value).trim() || DEFAULT_DIRECTORY;
}

export async function askOverwrite(displayDir: string): Promise<Exclude<OverwriteMode, 'error'>> {
  const label = displayDir === '.' ? 'Current directory' : `Target directory "${displayDir}"`;
  const value = await p.select<OverwriteMode | 'cancel'>({
    message: `${label} is not empty. How would you like to proceed?`,
    options: [
      { value: 'cancel', label: 'Cancel operation' },
      { value: 'remove', label: 'Remove existing files and continue', hint: 'keeps .git' },
      { value: 'ignore', label: 'Ignore files and continue' },
    ],
  });
  const choice = exitOnCancel(value);
  if (choice === 'cancel' || choice === 'error') {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }
  return choice;
}

export async function askTemplate(): Promise<TemplateId> {
  const value = await p.select<TemplateId>({
    message: 'Which framework would you like to use?',
    initialValue: DEFAULT_TEMPLATE,
    options: TEMPLATES.map((t) => ({ value: t.id, label: t.name, hint: t.hint })),
  });
  return exitOnCancel(value);
}

export async function askInstall(pm: PackageManager): Promise<boolean> {
  const value = await p.confirm({
    message: `Install dependencies with ${pm}?`,
    initialValue: true,
  });
  return exitOnCancel(value);
}

export async function askGit(): Promise<boolean> {
  const value = await p.confirm({
    message: 'Initialize a git repository?',
    initialValue: true,
  });
  return exitOnCancel(value);
}
