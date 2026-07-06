"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@hummingbirdui/react/button";
import { cn } from "@hummingbirdui/react/utils";

function useIsMac() {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);
  return isMac;
}

// Input-shaped trigger, mirrors the DocSearch button on the main Hummingbird
// docs (w-70 muted field with placeholder and shortcut hint).
export function SearchButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  const isMac = useIsMac();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search documentation"
      className={cn(
        "h-9.25 w-70 cursor-pointer items-center gap-2 rounded-lg bg-muted px-4 text-muted hover:bg-highlight",
        className,
      )}
    >
      <Search className="size-4" />
      <span className="text-sm font-normal">Search</span>
      <kbd className="ms-auto flex items-center gap-0.5 font-sans text-sm">
        <span>{isMac ? "⌘" : "Ctrl"}</span>
        <span>K</span>
      </kbd>
    </button>
  );
}

export function SearchIconButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="subtle"
      color="neutral"
      shape="circle"
      aria-label="Search documentation"
      onClick={onClick}
      className={className}
    >
      <Search className="size-4.5" />
    </Button>
  );
}
