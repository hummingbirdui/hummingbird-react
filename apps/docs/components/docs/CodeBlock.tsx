"use client";

import {
  Check,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  File,
} from "lucide-react";
import { Button } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import { useEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = 280;

export function CodeBlock({
  children,
  rawCode,
  lang = "tsx",
  filePath,
  showPreview = true,
}: {
  children: React.ReactNode;
  rawCode: string;
  lang?: string;
  filePath?: string;
  showPreview?: boolean;
}) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [collapsible, setCollapsible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      setCollapsible(codeRef.current.scrollHeight > COLLAPSED_HEIGHT);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    void navigator.clipboard.writeText(rawCode);
    setCopied(true);
  };

  const collapsed = showPreview && collapsible && !expanded;

  return (
    <div
      className={cn(
        "code-block relative grid",
        showPreview && "rounded-b-2xl bg-subtle p-6",
      )}
    >
      {showPreview && (
        <div className="mb-4 flex items-center justify-between">
          <p className="mb-0 font-semibold uppercase text-muted">{lang}</p>
          <div className="flex items-center gap-1">
            {collapsible && (
              <Button
                variant="text"
                color="neutral"
                size="sm"
                className="gap-1"
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded ? (
                  <ChevronsDownUp className="size-4" />
                ) : (
                  <ChevronsUpDown className="size-4" />
                )}
                <span className="hidden sm:block">
                  {expanded ? "Collapse Code" : "Expand Code"}
                </span>
              </Button>
            )}
            <Button
              variant="text"
              color="neutral"
              size="sm"
              className="gap-1 sm:min-w-29"
              onClick={copy}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span className="hidden sm:block">
                {copied ? "Copied" : "Copy Code"}
              </span>
            </Button>
          </div>
        </div>
      )}

      <div
        ref={codeRef}
        className={cn(
          "hb-code overflow-auto transition-[max-height] duration-300 [&_pre]:my-0",
          showPreview ? "p-4" : "px-4 py-7",
          filePath && "pt-14",
        )}
        style={collapsed ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
      >
        {children}
      </div>

      {filePath && (
        <p className="absolute left-4 top-3 mb-0 flex items-center gap-1 text-sm font-semibold">
          <File className="size-4" />
          <span>{filePath}</span>
        </p>
      )}

      {!showPreview && (
        <Button
          variant="text"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-3 top-3"
          onClick={copy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      )}
    </div>
  );
}
