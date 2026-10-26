import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { scaffoldProject } from '../src/create';
import { CliError } from '../src/errors';
import { TEMPLATE_IDS } from '../src/templates';

let tmp: string;

beforeEach(async () => {
  tmp = await mkdtemp(path.join(os.tmpdir(), 'chra-'));
});

afterEach(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe.each(TEMPLATE_IDS)('scaffolding %s', (template) => {
  it('copies the template and personalizes it', async () => {
    const targetDir = path.join(tmp, 'my-app');
    const files = await scaffoldProject({ targetDir, projectName: 'my-app', template });

    expect(files).toContain('.gitignore');
    expect(files).not.toContain('_gitignore');
    expect(existsSync(path.join(targetDir, '.gitignore'))).toBe(true);

    const pkg = JSON.parse(await readFile(path.join(targetDir, 'package.json'), 'utf8'));
    expect(pkg.name).toBe('my-app');

    const readme = await readFile(path.join(targetDir, 'README.md'), 'utf8');
    expect(readme.startsWith('# my-app\n')).toBe(true);
    expect(readme).not.toContain('{{projectName}}');

    expect(files).toMatchSnapshot();
  });
});

describe('non-empty target directories', () => {
  async function prepare(): Promise<string> {
    const targetDir = path.join(tmp, 'existing');
    await mkdir(path.join(targetDir, '.git'), { recursive: true });
    await writeFile(path.join(targetDir, '.git', 'HEAD'), 'ref: refs/heads/main\n');
    await writeFile(path.join(targetDir, 'notes.txt'), 'keep me?');
    return targetDir;
  }

  it('refuses to write by default', async () => {
    const targetDir = await prepare();
    await expect(
      scaffoldProject({ targetDir, projectName: 'existing', template: 'vite' })
    ).rejects.toBeInstanceOf(CliError);
  });

  it('treats a directory with only .git as empty', async () => {
    const targetDir = path.join(tmp, 'only-git');
    await mkdir(path.join(targetDir, '.git'), { recursive: true });
    await expect(
      scaffoldProject({ targetDir, projectName: 'only-git', template: 'vite' })
    ).resolves.toContain('package.json');
  });

  it('"remove" clears files but keeps .git', async () => {
    const targetDir = await prepare();
    await scaffoldProject({
      targetDir,
      projectName: 'existing',
      template: 'vite',
      overwrite: 'remove',
    });
    expect(existsSync(path.join(targetDir, 'notes.txt'))).toBe(false);
    expect(existsSync(path.join(targetDir, '.git', 'HEAD'))).toBe(true);
    expect(existsSync(path.join(targetDir, 'package.json'))).toBe(true);
  });

  it('"ignore" writes alongside existing files', async () => {
    const targetDir = await prepare();
    await scaffoldProject({
      targetDir,
      projectName: 'existing',
      template: 'vite',
      overwrite: 'ignore',
    });
    expect(existsSync(path.join(targetDir, 'notes.txt'))).toBe(true);
    expect(existsSync(path.join(targetDir, 'package.json'))).toBe(true);
  });
});
