import { fileURLToPath } from 'node:url';

export const TEMPLATE_IDS = ['nextjs', 'vite', 'astro', 'react-router', 'gatsby'] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export interface Template {
  id: TemplateId;
  /** Display name, e.g. "Next.js". */
  name: string;
  /** Short description shown next to the name in the picker. */
  hint: string;
  /** The file holding the welcome page; shown in the page itself and in next steps. */
  entryFile: string;
  /** package.json script that starts the dev server. */
  devScript: 'dev';
  devUrl: string;
  /** Framework guide on the Hummingbird React docs site. */
  docsUrl: string;
  /** Minimum Node.js version the framework supports (inclusive). */
  minNode?: string;
  /** First Node.js major the framework does not support (exclusive). */
  maxNodeMajor?: number;
}

const GUIDES = 'https://react.hbui.dev/docs/getting-started/framework-guides';

export const TEMPLATES: readonly Template[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    hint: 'App Router, React Server Components',
    entryFile: 'app/page.tsx',
    devScript: 'dev',
    devUrl: 'http://localhost:3000',
    docsUrl: `${GUIDES}/nextjs`,
    minNode: '20.9.0',
  },
  {
    id: 'vite',
    name: 'Vite',
    hint: 'Client-side single-page app',
    entryFile: 'src/App.tsx',
    devScript: 'dev',
    devUrl: 'http://localhost:5173',
    docsUrl: `${GUIDES}/vite`,
    minNode: '20.19.0',
  },
  {
    id: 'astro',
    name: 'Astro',
    hint: 'Content sites with React islands',
    entryFile: 'src/pages/index.astro',
    devScript: 'dev',
    devUrl: 'http://localhost:4321',
    docsUrl: `${GUIDES}/astro`,
    minNode: '22.23.4',
  },
  {
    id: 'react-router',
    name: 'React Router',
    hint: 'Framework mode with server rendering',
    entryFile: 'app/routes/home.tsx',
    devScript: 'dev',
    devUrl: 'http://localhost:5173',
    docsUrl: `${GUIDES}/react-router`,
    minNode: '22.22.0',
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    hint: 'Static site generator',
    entryFile: 'src/pages/index.tsx',
    devScript: 'dev',
    devUrl: 'http://localhost:8000',
    docsUrl: `${GUIDES}/gatsby`,
    minNode: '18.0.0',
    maxNodeMajor: 26,
  },
];

export const DEFAULT_TEMPLATE: TemplateId = 'nextjs';

export function isTemplateId(value: string): value is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(value);
}

export function getTemplate(id: TemplateId): Template {
  const template = TEMPLATES.find((t) => t.id === id);
  if (!template) throw new Error(`Unknown template: ${id}`);
  return template;
}

/** Absolute path of a template directory inside the installed package. */
export function templateDir(id: TemplateId): string {
  // Bundled into dist/index.js, so ../templates is the package's templates dir.
  // From src/ (tests via vitest), ../templates resolves the same way.
  return fileURLToPath(new URL(`../templates/${id}`, import.meta.url));
}

/** Returns a warning when the running Node.js version is outside the template's range. */
export function nodeVersionWarning(
  template: Template,
  version = process.versions.node
): string | null {
  const [major = 0, minor = 0, patch = 0] = version.split('.').map(Number);
  if (template.maxNodeMajor !== undefined && major >= template.maxNodeMajor) {
    return `${template.name} supports Node.js below ${template.maxNodeMajor}; you are running ${version}.`;
  }
  if (template.minNode) {
    const [rMajor = 0, rMinor = 0, rPatch = 0] = template.minNode.split('.').map(Number);
    const tooOld =
      major < rMajor ||
      (major === rMajor && (minor < rMinor || (minor === rMinor && patch < rPatch)));
    if (tooOld) {
      return `${template.name} requires Node.js ${template.minNode} or later; you are running ${version}.`;
    }
  }
  return null;
}
