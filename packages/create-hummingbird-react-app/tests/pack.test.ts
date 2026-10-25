import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const PKG_DIR = path.resolve(import.meta.dirname, '..');

describe('published tarball', () => {
  it('contains the CLI bundle and every template file', () => {
    const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
      cwd: PKG_DIR,
      encoding: 'utf8',
      shell: process.platform === 'win32',
    });
    const [{ files }] = JSON.parse(output) as [{ files: { path: string }[] }];
    const packed = new Set(files.map((f) => f.path));

    expect(packed.has('dist/index.js')).toBe(true);
    expect(packed.has('package.json')).toBe(true);
    expect(packed.has('README.md')).toBe(true);

    const templateFiles = readdirSync(path.join(PKG_DIR, 'templates'), {
      recursive: true,
      encoding: 'utf8',
    })
      .filter((rel) => statSync(path.join(PKG_DIR, 'templates', rel)).isFile())
      .map((rel) => `templates/${rel.split(path.sep).join('/')}`);

    expect(templateFiles.length).toBeGreaterThan(40);
    const missing = templateFiles.filter((f) => !packed.has(f));
    expect(missing).toEqual([]);

    expect([...packed].filter((f) => f.startsWith('src/') || f.startsWith('tests/'))).toEqual([]);
  });
});
