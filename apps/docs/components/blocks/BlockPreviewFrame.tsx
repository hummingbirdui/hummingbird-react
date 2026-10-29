"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Code,
  Copy,
  Eye,
  Lightbulb,
  LightbulbOff,
  Palette,
} from "lucide-react";
import { Button, Dropdown } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import { ThemeSwatches } from "@/components/docs/ThemeSwatches";
import { MAIN_THEMES, type MainTheme } from "@/components/layout/main-themes";
import { useIsDarkMode } from "@/hooks/use-main-theme";

const MIN_WIDTH = 375;

export function BlockPreviewFrame({
  id,
  title,
  src,
  className,
  rawCode,
  children,
}: {
  id: string;
  title: string;
  src: string;
  className?: string;
  rawCode: string;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameDoc, setFrameDoc] = useState<Document | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [theme, setTheme] = useState<MainTheme>("default");
  const [copied, setCopied] = useState(false);

  // Dark mode follows the site until toggled here; a later site toggle wins
  // again (the override only holds for the site mode it was made in).
  const siteDark = useIsDarkMode();
  const [darkOverride, setDarkOverride] = useState<{
    site: boolean;
    dark: boolean;
  } | null>(null);
  const dark =
    darkOverride && darkOverride.site === siteDark
      ? darkOverride.dark
      : siteDark;

  // The iframe can finish loading before hydration attaches listeners, so
  // also pick up a document that is already complete.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => setFrameDoc(iframe.contentDocument);
    iframe.addEventListener("load", onLoad);
    const doc = iframe.contentDocument;
    if (doc?.readyState === "complete" && doc.URL !== "about:blank") {
      onLoad();
    }
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!frameDoc) return;
    frameDoc.documentElement.setAttribute("data-theme", theme);
    frameDoc.documentElement.classList.toggle("dark", dark);
  }, [frameDoc, theme, dark]);

  // Size the iframe to its content, and keep links and forms inert.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!frameDoc || !iframe) return;

    const fit = () => {
      const height = Math.max(
        frameDoc.body.scrollHeight,
        frameDoc.documentElement.scrollHeight,
      );
      iframe.style.height = `${height}px`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(frameDoc.body);
    fit();

    const preventLinks = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("a")) {
        event.preventDefault();
      }
    };
    const preventSubmit = (event: Event) => event.preventDefault();
    frameDoc.addEventListener("click", preventLinks);
    frameDoc.addEventListener("submit", preventSubmit);

    return () => {
      observer.disconnect();
      frameDoc.removeEventListener("click", preventLinks);
      frameDoc.removeEventListener("submit", preventSubmit);
    };
  }, [frameDoc]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    void navigator.clipboard.writeText(rawCode);
    setCopied(true);
  };

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const iframe = iframeRef.current;
    if (!wrap || !iframe) return;
    event.preventDefault();

    const handle = event.currentTarget;
    const startX = event.clientX;
    const startWidth = wrap.offsetWidth;
    const maxWidth = wrap.parentElement?.offsetWidth ?? startWidth;
    handle.setPointerCapture(event.pointerId);
    iframe.style.pointerEvents = "none";
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: PointerEvent) => {
      const width = startWidth + moveEvent.clientX - startX;
      wrap.style.width = `${Math.min(maxWidth, Math.max(MIN_WIDTH, width))}px`;
    };
    const onUp = () => {
      iframe.style.pointerEvents = "";
      document.body.style.userSelect = "";
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  };

  const themeLabel = MAIN_THEMES.find((t) => t.value === theme)?.label;

  return (
    <div id={id} className="scroll-mt-28">
      <h6 className="mt-14 mb-6 font-medium">
        <a className="no-underline text-default" href={`#${id}`}>
          {title}
        </a>
      </h6>
      <div className="mb-5">
        <div className="flex mb-3">
          <Button
            variant="text"
            color="neutral"
            className={cn(
              "max-sm:btn-square gap-1 me-1",
              !showCode && "active",
            )}
            aria-pressed={!showCode}
            onClick={() => setShowCode(false)}
          >
            <Eye className="size-4.5" />
            <span className="hidden sm:block">Preview</span>
          </Button>
          <Button
            variant="text"
            color="neutral"
            className={cn("max-sm:btn-square gap-1", showCode && "active")}
            aria-pressed={showCode}
            onClick={() => setShowCode(true)}
          >
            <Code className="size-4.5" />
            <span className="hidden sm:block">Show code</span>
          </Button>
          <div className="ms-auto me-2">
            <Dropdown>
              <Dropdown.Trigger asChild>
                <Button variant="subtle" color="neutral" className="min-w-36">
                  <Palette className="size-4.5" />
                  <span>{themeLabel}</span>
                  <ChevronDown className="size-4" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content align="center" className="min-w-66">
                {MAIN_THEMES.map((t) => (
                  <Dropdown.Item
                    key={t.value}
                    className={cn(
                      "flex items-center justify-between",
                      theme === t.value && "active",
                    )}
                    onSelect={(event) => {
                      event.preventDefault();
                      setTheme(t.value);
                    }}
                  >
                    {t.label}
                    <ThemeSwatches theme={t.value} />
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </div>
          <Button
            variant="subtle"
            color="neutral"
            shape="square"
            className="me-2"
            aria-label={
              dark
                ? "Switch preview to light mode"
                : "Switch preview to dark mode"
            }
            onClick={() => setDarkOverride({ site: siteDark, dark: !dark })}
          >
            {dark ? (
              <LightbulbOff className="size-5" />
            ) : (
              <Lightbulb className="size-5" />
            )}
          </Button>
          <Button
            variant="subtle"
            color="neutral"
            shape="square"
            aria-label="Copy code"
            onClick={copy}
          >
            {copied ? (
              <Check className="size-5 text-success" />
            ) : (
              <Copy className="size-5" />
            )}
          </Button>
        </div>

        <div className={cn("w-full", showCode && "hidden")}>
          <div className="flex">
            <div
              ref={wrapRef}
              className="rounded-2xl relative w-full border border-subtle/50"
            >
              <div className="h-10 rounded-t-2xl bg-muted px-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <iframe
                ref={iframeRef}
                src={src}
                title={title}
                loading="lazy"
                className={cn("block w-full rounded-b-2xl", className)}
              />
              <div
                className="h-full w-1 absolute -right-4 top-0 px-2 flex items-center cursor-ew-resize touch-none"
                onPointerDown={startResize}
                aria-hidden
              >
                <div className="w-1.5 h-8 bg-emphasis shrink-0 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "hb-code bg-subtle overflow-x-auto p-4 border border-subtle/50 rounded-2xl [&_pre]:my-0",
            !showCode && "hidden",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
