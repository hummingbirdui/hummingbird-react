import path from 'node:path';
import { copyTemplate } from './copy';
import { CliError } from './errors';
import { emptyDir, isDirEmpty } from './fs-utils';
import { initGit, type GitInitResult } from './git';
import { runInstall, type CommandResult, type PackageManager } from './package-manager';
import { templateDir, type TemplateId } from './templates';

export type OverwriteMode = 'error' | 'remove' | 'ignore';

export interface CreateOptions {
  /** Absolute target directory. */
  targetDir: string;
  projectName: string;
  template: TemplateId;
  overwrite?: OverwriteMode;
}

/** Copies the template into the target directory. No prompts, no installs. */
export async function scaffoldProject(options: CreateOptions): Promise<string[]> {
  const { targetDir, projectName, template, overwrite = 'error' } = options;
  if (!path.isAbsolute(targetDir)) throw new Error('targetDir must be absolute');

  if (!(await isDirEmpty(targetDir))) {
    if (overwrite === 'error') {
      throw new CliError(
        `Target directory "${targetDir}" is not empty. Use --overwrite to replace its contents.`
      );
    }
    if (overwrite === 'remove') await emptyDir(targetDir);
  }

  return copyTemplate(templateDir(template), targetDir, { projectName });
}

export function installDependencies(pm: PackageManager, targetDir: string): Promise<CommandResult> {
  return runInstall(pm, targetDir);
}

export function initRepository(targetDir: string): GitInitResult {
  return initGit(targetDir);
}
