import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const exec = promisify(execFile);
const PKG_DIR = path.resolve(import.meta.dirname, '..');
const BIN = path.join(PKG_DIR, 'dist/index.js');

async function runCli(args: string[], cwd = PKG_DIR) {
  try {
    const { stdout, stderr } = await exec(process.execPath, [BIN, ...args], {
      cwd,
      env: { ...process.env, CI: '1' },
    });
    return { code: 0, stdout, stderr };
  } catch (error) {
    const e = error as { code: number; stdout: string; stderr: string };
    return { code: e.code, stdout: e.stdout, stderr: e.stderr };
  }
}

let tmp: string;

beforeAll(async () => {
  if (!existsSync(BIN)) throw new Error('dist/index.js is missing; run the build first');
  tmp = await mkdtemp(path.join(os.tmpdir(), 'chra-bin-'));
});

afterAll(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe('bin', () => {
  it('prints the package version', async () => {
    const pkg = JSON.parse(readFileSync(path.join(PKG_DIR, 'package.json'), 'utf8'));
    const result = await runCli(['--version']);
    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe(pkg.version);
  });

  it('prints usage', async () => {
    const result = await runCli(['--help']);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain('Usage: create-hummingbird-react-app');
  });

  it('exits 1 on an unknown template', async () => {
    const result = await runCli(['--template', 'nope']);
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('Unknown template "nope"');
  });

  it('scaffolds non-interactively', async () => {
    const result = await runCli(
      ['site', '--template', 'vite', '--no-install', '--no-git', '--yes'],
      tmp
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toContain('cd site');
    expect(result.stdout).toContain('install');
    expect(existsSync(path.join(tmp, 'site', 'src/App.tsx'))).toBe(true);
  });

  it('fails without --overwrite when the target is not empty', async () => {
    const result = await runCli(
      ['site', '--template', 'vite', '--no-install', '--no-git', '--yes'],
      tmp
    );
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('is not empty');
  });

  it('requires --yes without a terminal', async () => {
    const result = await runCli(['other'], tmp);
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('--yes');
  });
});
