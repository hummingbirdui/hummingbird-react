import { parseArgs } from 'node:util';
import { CliError } from './errors';
import { isTemplateId, TEMPLATE_IDS, type TemplateId } from './templates';
import { isPackageManager, PACKAGE_MANAGERS, type PackageManager } from './package-manager';

export interface CliArgs {
  directory?: string;
  template?: TemplateId;
  pm?: PackageManager;
  install?: boolean;
  git?: boolean;
  overwrite: boolean;
  yes: boolean;
  help: boolean;
  version: boolean;
}

export const USAGE = `Usage: create-hummingbird-react-app [directory] [options]

Options:
  -t, --template <id>      ${TEMPLATE_IDS.join(' | ')}
      --pm <name>          ${PACKAGE_MANAGERS.join(' | ')} (default: the one running this command)
      --install            install dependencies (default: ask)
      --no-install         skip installing dependencies
      --git                initialize a git repository (default: ask)
      --no-git             skip git initialization
      --overwrite          empty the target directory if it is not empty
  -y, --yes                skip prompts and use defaults
  -h, --help               show this help
  -v, --version            show the version

Examples:
  npx create-hummingbird-react-app@latest
  npx create-hummingbird-react-app@latest my-app --template vite
  pnpm create hummingbird-react-app my-app --template nextjs --yes`;

/** `--flag` → true, `--no-flag` → false, neither → undefined. The negation wins if both are given. */
function triState(on: boolean | undefined, off: boolean | undefined): boolean | undefined {
  if (off) return false;
  if (on) return true;
  return undefined;
}

export function parseCliArgs(argv: string[]): CliArgs {
  let parsed;
  try {
    parsed = parseArgs({
      // Some package managers forward npm's `--` separator; it is never meaningful here.
      args: argv.filter((arg) => arg !== '--'),
      allowPositionals: true,
      strict: true,
      options: {
        template: { type: 'string', short: 't' },
        pm: { type: 'string' },
        install: { type: 'boolean' },
        'no-install': { type: 'boolean' },
        git: { type: 'boolean' },
        'no-git': { type: 'boolean' },
        overwrite: { type: 'boolean', default: false },
        yes: { type: 'boolean', short: 'y', default: false },
        help: { type: 'boolean', short: 'h', default: false },
        version: { type: 'boolean', short: 'v', default: false },
      },
    });
  } catch (error) {
    throw new CliError(`${(error as Error).message}\n\n${USAGE}`);
  }

  const { values, positionals } = parsed;
  if (positionals.length > 1) {
    throw new CliError(`Unexpected argument: ${positionals[1]}\n\n${USAGE}`);
  }

  const template = values.template;
  if (template !== undefined && !isTemplateId(template)) {
    throw new CliError(
      `Unknown template "${template}". Available templates: ${TEMPLATE_IDS.join(', ')}.`
    );
  }

  const pm = values.pm;
  if (pm !== undefined && !isPackageManager(pm)) {
    throw new CliError(
      `Unknown package manager "${pm}". Use one of: ${PACKAGE_MANAGERS.join(', ')}.`
    );
  }

  return {
    directory: positionals[0],
    template,
    pm,
    install: triState(values.install, values['no-install']),
    git: triState(values.git, values['no-git']),
    overwrite: values.overwrite ?? false,
    yes: values.yes ?? false,
    help: values.help ?? false,
    version: values.version ?? false,
  };
}
