"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@hummingbirdui/react/button";
import { Tabs } from "@hummingbirdui/react/tabs";
import { useEffect, useState, useSyncExternalStore } from "react";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

const STORAGE_KEY = "hb-docs-package-manager";
const CHANGE_EVENT = "hb-package-manager-change";

/** Shared package-manager preference: persisted and synced across instances. */
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Manager {
  const stored = localStorage.getItem(STORAGE_KEY);
  return (MANAGERS as readonly string[]).includes(stored ?? "")
    ? (stored as Manager)
    : "pnpm";
}

function usePackageManager() {
  const manager = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "pnpm" as Manager,
  );
  const setManager = (next: Manager) => {
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  return [manager, setManager] as const;
}

const DEV_FLAGS = new Set(["-D", "--save-dev", "--dev", "-d"]);

/** Converts one authored command line into the given package manager's form. */
function convertLine(line: string, manager: Manager): string {
  const tokens = line.trim().split(/\s+/);
  const [bin, sub] = tokens;

  // npx / dlx style execution
  if (bin === "npx" || bin === "bunx") {
    const args = tokens.slice(1).join(" ");
    return {
      pnpm: `pnpm dlx ${args}`,
      npm: `npx ${args}`,
      yarn: `yarn dlx ${args}`,
      bun: `bunx ${args}`,
    }[manager];
  }
  if ((bin === "pnpm" || bin === "yarn") && sub === "dlx") {
    const args = tokens.slice(2).join(" ");
    return {
      pnpm: `pnpm dlx ${args}`,
      npm: `npx ${args}`,
      yarn: `yarn dlx ${args}`,
      bun: `bunx ${args}`,
    }[manager];
  }

  // install / add
  if (
    ["npm", "pnpm", "yarn", "bun"].includes(bin) &&
    ["install", "i", "add"].includes(sub)
  ) {
    const rest = tokens.slice(2);
    const dev = rest.some((token) => DEV_FLAGS.has(token));
    const packages = rest.filter((token) => !token.startsWith("-"));

    if (packages.length === 0) {
      return manager === "npm" ? "npm install" : `${manager} install`;
    }

    const list = packages.join(" ");
    const flag = dev
      ? { pnpm: " -D", npm: " -D", yarn: " -D", bun: " -d" }[manager]
      : "";
    const verb = manager === "npm" ? "install" : "add";
    return `${manager} ${verb}${flag} ${list}`;
  }

  // anything else: swap the binary name only
  if (["npm", "pnpm", "yarn", "bun"].includes(bin)) {
    return [manager, ...tokens.slice(1)].join(" ");
  }
  return line.trim();
}

export function PackageManagerTabs({ command }: { command: string }) {
  const [manager, setManager] = usePackageManager();
  const [copied, setCopied] = useState(false);

  const commandFor = (pm: Manager) =>
    command
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => convertLine(line, pm))
      .join("\n");

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    void navigator.clipboard.writeText(commandFor(manager));
    setCopied(true);
  };

  return (
    <Tabs
      value={manager}
      onValueChange={(value) => setManager(value as Manager)}
      className="code-block mb-6 overflow-hidden rounded-2xl bg-muted"
    >
      <div className="flex items-center justify-between gap-2 border-b border-default px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Terminal className="size-4 shrink-0 text-muted" />
          <Tabs.List
            variant="underline"
            className="mb-0 flex-nowrap overflow-x-auto border-b-0"
          >
            {MANAGERS.map((pm) => (
              <Tabs.Trigger
                key={pm}
                value={pm}
                className="px-3 py-2.5 font-mono text-sm"
              >
                {pm}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <Button
          variant="text"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={copied ? "Copied" : "Copy command"}
          onClick={copy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      {MANAGERS.map((pm) => (
        <Tabs.Content key={pm} value={pm}>
          <pre className="my-0 overflow-x-auto bg-transparent px-5 py-4 font-mono text-sm text-default">
            {commandFor(pm)}
          </pre>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
