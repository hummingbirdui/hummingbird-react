import { describe, expect, it } from 'vitest';
import { renameSpecialFile, transformTemplateFile } from '../src/copy';

const ctx = { projectName: 'my-app' };

describe('renameSpecialFile', () => {
  it('restores dotfiles', () => {
    expect(renameSpecialFile('_gitignore')).toBe('.gitignore');
    expect(renameSpecialFile('_npmrc')).toBe('.npmrc');
    expect(renameSpecialFile('_env.example')).toBe('.env.example');
  });

  it('leaves other names alone', () => {
    expect(renameSpecialFile('_app.tsx')).toBe('_app.tsx');
    expect(renameSpecialFile('package.json')).toBe('package.json');
  });
});

describe('transformTemplateFile', () => {
  it('rewrites only the package name, keeping it first', () => {
    const input = JSON.stringify({ private: true, name: 'template', scripts: { dev: 'vite' } });
    const output = transformTemplateFile('package.json', input, ctx);
    expect(output).toBe(
      '{\n  "name": "my-app",\n  "private": true,\n  "scripts": {\n    "dev": "vite"\n  }\n}\n'
    );
  });

  it('fills the README placeholder', () => {
    expect(transformTemplateFile('README.md', '# {{projectName}}\n{{projectName}}', ctx)).toBe(
      '# my-app\nmy-app'
    );
  });

  it('returns null for files that are copied verbatim', () => {
    expect(transformTemplateFile('src/App.tsx', 'export {}', ctx)).toBeNull();
    expect(transformTemplateFile('nested/package.json', '{}', ctx)).toBeNull();
  });
});
