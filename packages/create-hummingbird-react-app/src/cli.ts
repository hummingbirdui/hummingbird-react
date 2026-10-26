import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { parseCliArgs, USAGE } from './args';
import { initRepository, installDependencies, scaffoldProject, type OverwriteMode } from './create';
import { CliError } from './errors';
import { createProgress } from './progress';
import { isDirEmpty } from './fs-utils';
import { isGitAvailable, isInsideGitRepo } from './git';
import { projectNameFromDir } from './naming';
import {
  detectPackageManager,
  installCommand,
  runCommand,
  type PackageManager,
} from './package-manager';
import {
  askDirectory,
  askGit,
  askInstall,
  askOverwrite,
  askTemplate,
  DEFAULT_DIRECTORY,
} from './prompts';
import { DEFAULT_TEMPLATE, getTemplate, nodeVersionWarning } from './templates';

function quoteIfNeeded(value: string): string {
  return /\s/.test(value) ? `"${value}"` : value;
}

export async function run(argv: string[]): Promise<number> {
  const args = parseCliArgs(argv);

  if (args.help) {
    console.log(USAGE);
    return 0;
  }
  if (args.version) {
    console.log(__CLI_VERSION__);
    return 0;
  }

  const interactive = !args.yes;
  if (interactive && !process.stdin.isTTY) {
    throw new CliError(
      'No interactive terminal detected. Pass --yes (plus a directory and --template) to run non-interactively.'
    );
  }

  p.intro(pc.bgCyan(pc.black(' create-hummingbird-react-app ')) + pc.dim(` v${__CLI_VERSION__}`));

  // 1. Directory
  const directory = args.directory ?? (interactive ? await askDirectory() : DEFAULT_DIRECTORY);
  const targetDir = path.resolve(directory);
  const projectName = projectNameFromDir(directory);

  // 2. Non-empty target
  let overwrite: OverwriteMode = 'error';
  if (!(await isDirEmpty(targetDir))) {
    if (args.overwrite) overwrite = 'remove';
    else if (interactive) overwrite = await askOverwrite(directory);
    // non-interactive without --overwrite: scaffoldProject throws a clear error
  }

  // 3. Template
  const templateId = args.template ?? (interactive ? await askTemplate() : DEFAULT_TEMPLATE);
  const template = getTemplate(templateId);

  // 4. Package manager + install
  const pm: PackageManager = args.pm ?? detectPackageManager();
  const install = args.install ?? (interactive ? await askInstall(pm) : true);

  // 5. Git (only offered when it makes sense)
  const parentDir = path.dirname(targetDir);
  const canInitGit = isGitAvailable() && !isInsideGitRepo(parentDir);
  let git = false;
  if (args.git === true) git = isGitAvailable();
  else if (args.git === undefined && canInitGit) git = interactive ? await askGit() : true;

  const nodeWarning = nodeVersionWarning(template);
  if (nodeWarning) p.log.warn(nodeWarning);

  // Copy
  const spin = createProgress();
  spin.start(`Creating a ${template.name} project in ${pc.cyan(targetDir)}`);
  try {
    await scaffoldProject({ targetDir, projectName, template: template.id, overwrite });
  } catch (error) {
    spin.error('Could not create the project.');
    throw error;
  }
  spin.stop(`Created ${pc.cyan(projectName)} from the ${template.name} template.`);

  // Install
  let exitCode = 0;
  let installed = false;
  if (install) {
    spin.start(`Installing dependencies with ${pm}. This can take a minute.`);
    const result = await installDependencies(pm, targetDir);
    if (result.ok) {
      installed = true;
      spin.stop('Installed dependencies.');
    } else {
      exitCode = 1;
      spin.error(`Installing dependencies with ${pm} failed.`);
      const tail = result.output.trim().split('\n').slice(-15).join('\n');
      if (tail) p.log.message(pc.dim(tail));
    }
  }

  // Git
  if (git) {
    const result = initRepository(targetDir);
    if (result === 'committed') p.log.success('Initialized a git repository.');
    else if (result === 'initialized')
      p.log.warn('Initialized a git repository, but could not create the initial commit.');
    else p.log.warn('Could not initialize a git repository.');
  }

  // Next steps
  const relative = path.relative(process.cwd(), targetDir);
  const steps: string[] = [];
  if (relative) steps.push(`cd ${quoteIfNeeded(relative)}`);
  if (!installed) steps.push(installCommand(pm));
  steps.push(runCommand(pm, template.devScript));
  p.note(
    [
      ...steps.map((s) => pc.cyan(s)),
      '',
      `Then open ${pc.underline(template.devUrl)} and edit ${pc.bold(template.entryFile)}.`,
      `Guide: ${pc.underline(template.docsUrl)}`,
    ].join('\n'),
    'Next steps'
  );
  p.outro(exitCode === 0 ? 'Happy building!' : pc.yellow('Project created with warnings.'));
  return exitCode;
}

export async function main(argv: string[]): Promise<void> {
  try {
    process.exitCode = await run(argv);
  } catch (error) {
    if (error instanceof CliError) {
      console.error(pc.red(error.message));
      process.exitCode = error.exitCode;
    } else {
      console.error(pc.red('Unexpected error:'), error);
      process.exitCode = 1;
    }
  }
}
