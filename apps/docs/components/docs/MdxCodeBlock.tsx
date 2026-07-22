"use client";

import { Check, Copy, File } from "lucide-react";
import { Button } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

type MdxCodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  title?: string;
  icon?: ReactNode;
};

export function MdxCodeBlock({
  className,
  children,
  title,
  icon: _icon,
  ...props
}: MdxCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  // The highlighted children arrive from the server as a partially-lazy
  // Flight tree, so walking element props here misses outlined chunks —
  // read the rendered text from the DOM instead.
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="code-block relative my-6 overflow-hidden rounded-lg bg-subtle">
      {title && (
        <span className="absolute left-5 top-3 flex items-center gap-1 text-sm font-semibold text-muted">
          <File className="size-4" />
          {title}
        </span>
      )}

      <Button
        variant="text"
        color="neutral"
        size="sm"
        shape="square"
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 z-10"
        onClick={() => {
          const code = preRef.current?.textContent ?? "";
          void navigator.clipboard.writeText(code.replace(/\n$/, ""));
          setCopied(true);
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>

      <pre
        ref={preRef}
        className={cn(
          "hb-code m-0 overflow-auto py-6 pe-12! ps-5",
          title && "pt-12",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
