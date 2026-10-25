import { execFileSync } from 'node:child_process';

function git(args: string[], cwd: string): boolean {
  try {
    execFileSync('git', args, { cwd, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function isGitAvailable(): boolean {
  return git(['--version'], process.cwd());
}

export function isInsideGitRepo(dir: string): boolean {
  return git(['rev-parse', '--is-inside-work-tree'], dir);
}

export type GitInitResult = 'committed' | 'initialized' | 'failed';

/** `git init` + initial commit. Keeps the repo if the commit fails (e.g. no identity). */
export function initGit(dir: string): GitInitResult {
  if (!git(['init', '-q'], dir)) return 'failed';
  if (!git(['add', '-A'], dir)) return 'initialized';
  return git(['commit', '-q', '-m', 'Initial commit from create-hummingbird-react-app'], dir)
    ? 'committed'
    : 'initialized';
}
