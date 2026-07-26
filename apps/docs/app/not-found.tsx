import type { Metadata } from "next";
import { Button } from "@hummingbirdui/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found - Hummingbird React",
};

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium text-muted mb-4">404</p>
      <h1 className="text-4xl sm:text-6xl tracking-tighter sm:tracking-[-3px] font-medium mb-4">
        Page not found
      </h1>
      <p className="text-muted max-w-140 mb-8">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>
          <Link href="/">Back to home</Link>
        </Button>
        <Button variant="subtle">
          <Link href="/docs/getting-started/introduction/">Browse docs</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
