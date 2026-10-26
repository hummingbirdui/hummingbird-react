import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  nodeVersionWarning,
  getTemplate,
  templateDir,
  TEMPLATES,
  TEMPLATE_IDS,
} from '../src/templates';

const TEMPLATES_ROOT = path.resolve(import.meta.dirname, '../templates');

/** Where each template keeps its CSS entry and its welcome page source. */
const LAYOUT: Record<string, { css: string; welcome: string; components: string }> = {
  nextjs: { css: 'app/globals.css', welcome: 'app/page.tsx', components: 'components' },
  vite: { css: 'src/index.css', welcome: 'src/App.tsx', components: 'src/components' },
  astro: {
    css: 'src/styles/global.css',
    welcome: 'src/components/Welcome.tsx',
    components: 'src/components',
  },
  'react-router': {
    css: 'app/app.css',
    welcome: 'app/routes/home.tsx',
    components: 'app/components',
  },
  gatsby: {
    css: 'src/styles/global.css',
    welcome: 'src/pages/index.tsx',
    components: 'src/components',
  },
};

function listFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((rel) => statSync(path.join(dir, rel)).isFile())
    .map((rel) => rel.split(path.sep).join('/'));
}

function read(id: string, rel: string): string {
  return readFileSync(path.join(TEMPLATES_ROOT, id, rel), 'utf8');
}

function mainBlock(source: string): string {
  const match = source.match(/<main[\s\S]*<\/main>/);
  if (!match) throw new Error('no <main> block');
  return match[0];
}

describe('template registry', () => {
  it('matches the directories on disk', () => {
    const dirs = readdirSync(TEMPLATES_ROOT).filter((d) =>
      statSync(path.join(TEMPLATES_ROOT, d)).isDirectory()
    );
    expect(dirs.sort()).toEqual([...TEMPLATE_IDS].sort());
    for (const id of TEMPLATE_IDS) expect(existsSync(templateDir(id))).toBe(true);
  });

  it('starts every dev server with the "dev" script', () => {
    for (const t of TEMPLATES) {
      const pkg = JSON.parse(read(t.id, 'package.json')) as { scripts: Record<string, string> };
      expect(t.devScript).toBe('dev');
      expect(pkg.scripts.dev, t.id).toBeTruthy();
    }
  });

  it('has entries in the same order as the ids', () => {
    expect(TEMPLATES.map((t) => t.id)).toEqual([...TEMPLATE_IDS]);
  });

  it('points every entry file at a real file', () => {
    for (const t of TEMPLATES) {
      expect(existsSync(path.join(TEMPLATES_ROOT, t.id, t.entryFile)), t.id).toBe(true);
    }
  });
});

describe.each(TEMPLATE_IDS)('template %s', (id) => {
  const files = listFiles(path.join(TEMPLATES_ROOT, id));
  const layout = LAYOUT[id]!;

  it('has the required files', () => {
    for (const f of ['package.json', '_gitignore', 'README.md', layout.css, layout.welcome]) {
      expect(files, f).toContain(f);
    }
  });

  it('ships no literal dotfiles, lockfiles or build output', () => {
    for (const f of files) {
      expect(path.basename(f), f).not.toBe('.gitignore');
      expect(f).not.toMatch(/(^|\/)(node_modules|dist|build|\.next|\.astro|\.cache)\//);
      expect(f).not.toMatch(/(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?)$/);
    }
  });

  it('depends on @hummingbirdui/react and Tailwind CSS v4', () => {
    const pkg = JSON.parse(read(id, 'package.json')) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(deps['@hummingbirdui/react']).toMatch(/^\^1\./);
    expect(deps.tailwindcss).toMatch(/^\^4\./);
    expect(deps.react).toMatch(/^\^19\./);
  });

  it('imports Tailwind and Hummingbird React and registers the dark variant', () => {
    const css = read(id, layout.css);
    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain('@import "@hummingbirdui/react";');
    expect(css).toContain('@custom-variant dark (&:where(.dark, .dark *), .dark);');
  });

  it('shares the logo and illustration components byte for byte', () => {
    for (const name of ['HbReactLogo.tsx', 'HeroIllustration.tsx']) {
      expect(read(id, `${layout.components}/${name}`), name).toBe(
        read('vite', `src/components/${name}`)
      );
    }
  });

  it('renders the shared welcome page naming its own entry file', () => {
    const source = read(id, layout.welcome);
    expect(source).toContain(`const ENTRY_FILE = '${getTemplate(id).entryFile}';`);
    expect(mainBlock(source)).toBe(mainBlock(read('vite', 'src/App.tsx')));
  });

  it('applies the saved theme before first paint', () => {
    const all = files.map((f) => read(id, f)).join('\n');
    expect(all).toMatch(/ThemeModeScript|localStorage\.getItem\(["']theme["']\)/);
  });

  it('uses a README with the project name placeholder', () => {
    expect(read(id, 'README.md').startsWith('# {{projectName}}')).toBe(true);
  });
});

describe('gatsby pnpm config', () => {
  const config = read('gatsby', 'pnpm-workspace.yaml');

  it('uses a hoisted node_modules, which Gatsby requires', () => {
    expect(config).toMatch(/^nodeLinker: hoisted$/m);
  });

  it('reviews every dependency build script so pnpm 11+ does not fail the install', () => {
    for (const pkg of [
      '"@parcel/watcher": true',
      'gatsby: true',
      'gatsby-cli: true',
      'lmdb: true',
      'msgpackr-extract: true',
      'sharp: true',
      'core-js: false',
      'core-js-pure: false',
      'es5-ext: false',
    ]) {
      expect(config).toContain(`  ${pkg}`);
    }
  });
});

describe('nodeVersionWarning', () => {
  it('warns below the minimum', () => {
    expect(nodeVersionWarning(getTemplate('astro'), '22.12.0')).toMatch(/requires Node.js 22.23.4/);
  });

  it('warns at or above the unsupported major', () => {
    expect(nodeVersionWarning(getTemplate('gatsby'), '26.0.0')).toMatch(/below 26/);
  });

  it('is silent inside the range', () => {
    expect(nodeVersionWarning(getTemplate('vite'), '22.23.4')).toBeNull();
    expect(nodeVersionWarning(getTemplate('gatsby'), '24.11.0')).toBeNull();
  });
});
