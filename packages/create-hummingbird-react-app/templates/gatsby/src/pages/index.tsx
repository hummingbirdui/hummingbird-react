import type { HeadFC } from 'gatsby';
import { Button, DarkThemeToggle } from '@hummingbirdui/react';
import { HbReactLogo } from '../components/HbReactLogo';
import { HeroIllustration } from '../components/HeroIllustration';

const ENTRY_FILE = 'src/pages/index.tsx';

export default function IndexPage() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-8 p-8">
      <div className="max-w-115">
        <a
          href="https://react.hbui.dev"
          target="_blank"
          rel="noreferrer"
          className="mb-12 flex items-center gap-2 no-underline"
        >
          <HbReactLogo className="size-10" />
          <span className="text-muted text-xl font-semibold">hummingbird React</span>
        </a>
        <DarkThemeToggle className="mb-8" />
        <h2 className="mb-6 font-medium">To get started, edit the {ENTRY_FILE} file.</h2>
        <p className="mb-12 max-w-100">
          Start customizing your project and make it your own. Explore the{' '}
          <a href="https://react.hbui.dev/docs/customize/component" target="_blank" rel="noreferrer">
            customization docs
          </a>{' '}
          to learn more.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <a
              href="https://react.hbui.dev/docs/getting-started/introduction"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          </Button>
          <Button asChild variant="outline" color="neutral">
            <a
              href="https://react.hbui.dev/docs/components/overview"
              target="_blank"
              rel="noreferrer"
            >
              Component Overview
            </a>
          </Button>
        </div>
      </div>
      <HeroIllustration className="hidden lg:block" />
    </main>
  );
}

export const Head: HeadFC = () => (
  <>
    <title>Hummingbird React + Gatsby</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </>
);
