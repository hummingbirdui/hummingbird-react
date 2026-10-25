import { spawn } from 'node:child_process';

export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export function isPackageManager(value: string): value is PackageManager {
  return (PACKAGE_MANAGERS as readonly string[]).includes(value);
}

/**
 * Detects the package manager that launched the CLI from `npm_config_user_agent`,
 * e.g. "pnpm/9.0.0 npm/? node/v22.12.0 darwin arm64".
 */
export function detectPackageManager(
  userAgent = process.env.npm_config_user_agent
): PackageManager {
  const name = userAgent?.split(' ')[0]?.split('/')[0];
  return name && isPackageManager(name) ? name : 'npm';
}

export function installCommand(pm: PackageManager): string {
  return `${pm} install`;
}

export function runCommand(pm: PackageManager, script: string): string {
  return pm === 'npm' ? `npm run ${script}` : `${pm} ${script}`;
}

export interface CommandResult {
  ok: boolean;
  output: string;
}

/** Runs a command, capturing combined output. Never rejects. */
export function runCaptured(command: string, args: string[], cwd: string): Promise<CommandResult> {
  return new Promise((resolve) => {
    let output = '';
    const child = spawn(command, args, {
      cwd,
      // Package managers are .cmd shims on Windows.
      shell: process.platform === 'win32',
      env: { ...process.env, npm_config_loglevel: process.env.npm_config_loglevel ?? 'error' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.stdout?.on('data', (chunk: Buffer) => (output += chunk.toString()));
    child.stderr?.on('data', (chunk: Buffer) => (output += chunk.toString()));
    child.on('error', (error) => resolve({ ok: false, output: output + error.message }));
    child.on('close', (code) => resolve({ ok: code === 0, output }));
  });
}

export function runInstall(pm: PackageManager, cwd: string): Promise<CommandResult> {
  return runCaptured(pm, ['install'], cwd);
}
