"use client";

import { Check, Copy, File } from "lucide-react";
import { Button } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import {
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Recursively pull the plain-text source out of Shiki's highlighted spans. */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

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
  const rawCode = useMemo(() => extractText(children), [children]);

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
          void navigator.clipboard.writeText(rawCode);
          setCopied(true);
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>

      <pre
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
