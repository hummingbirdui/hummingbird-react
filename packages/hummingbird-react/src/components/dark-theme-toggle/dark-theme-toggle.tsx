'use client';

import * as React from 'react';
import { useThemeMode } from '../../hooks/use-theme-mode';
import { Button } from '../button';

function SunIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export interface DarkThemeToggleProps extends Button.Props {
  /** Icon shown while in dark mode (defaults to a sun) */
  iconDark?: React.FC<React.ComponentProps<'svg'>>;
  /** Icon shown while in light mode (defaults to a moon) */
  iconLight?: React.FC<React.ComponentProps<'svg'>>;
}

function DarkThemeToggle({
  className,
  iconDark: IconDark = SunIcon,
  iconLight: IconLight = MoonIcon,
  onClick,
  children,
  ...props
}: DarkThemeToggleProps) {
  const { toggleMode } = useThemeMode();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) toggleMode();
  }

  return (
    <Button
      type="button"
      variant="subtle"
      color="neutral"
      shape="circle"
      aria-label="Toggle dark mode"
      data-slot="dark-theme-toggle"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children ?? (
        <>
          <IconDark aria-hidden="true" className="hidden size-5 dark:block" />
          <IconLight aria-hidden="true" className="size-5 dark:hidden" />
        </>
      )}
    </Button>
  );
}

DarkThemeToggle.displayName = 'DarkThemeToggle';

namespace DarkThemeToggle {
  export type Props = React.ComponentProps<typeof DarkThemeToggle>;
}

export { DarkThemeToggle };
