import { describe, expect, it } from 'vitest';
import { detectPackageManager, installCommand, runCommand } from '../src/package-manager';

describe('detectPackageManager', () => {
  it.each([
    ['pnpm/9.0.0 npm/? node/v22.12.0 darwin arm64', 'pnpm'],
    ['yarn/4.5.0 npm/? node/v22.12.0 linux x64', 'yarn'],
    ['bun/1.2.0 npm/? node/v22.12.0 linux x64', 'bun'],
    ['npm/11.0.0 node/v22.12.0 darwin arm64 workspaces/false', 'npm'],
    ['deno/2.0.0', 'npm'],
    ['', 'npm'],
  ])('%j -> %s', (ua, expected) => {
    expect(detectPackageManager(ua)).toBe(expected);
  });
});

describe('commands', () => {
  it('builds install commands', () => {
    expect(installCommand('pnpm')).toBe('pnpm install');
  });

  it('uses "run" only for npm', () => {
    expect(runCommand('npm', 'dev')).toBe('npm run dev');
    expect(runCommand('pnpm', 'develop')).toBe('pnpm develop');
    expect(runCommand('yarn', 'dev')).toBe('yarn dev');
    expect(runCommand('bun', 'dev')).toBe('bun dev');
  });
});
