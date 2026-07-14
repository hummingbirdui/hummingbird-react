"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IframePreviewProps {
  children: ReactNode;
  theme: string;
  className?: string;
  initialContent?: string;
  mountTarget?: string;
  onReady?: (document: Document, window: Window) => void | (() => void);
}

const INITIAL_CONTENT = `<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@hummingbirdui/browser@1.2.2/dist/index.global.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hummingbirdui/hummingbird@main/apps/docs/public/themes.css">

    <style type="text/tailwindcss">
      @custom-variant dark (&:where(.dark, .dark *), .dark);
      @custom-variant active (&:active, &.active);
    </style>

    <script>
      const mainTheme = localStorage.getItem("main-theme");

      if (mainTheme) {
        document.documentElement.setAttribute("data-theme", mainTheme);
      }
    </script>
  </head>

  <body class="h-screen">
    <div id="root"></div>

    <script src="https://cdn.jsdelivr.net/npm/@hummingbirdui/hummingbird@1.2.2/dist/hummingbird.bundle.min.js"></script>
  </body>
</html>`;

const IframePreview = ({
  children,
  theme,
  className,
  initialContent = INITIAL_CONTENT,
  mountTarget = "#root",
  onReady,
}: IframePreviewProps) => {
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const cleanupRef = useRef<(() => void) | void>(undefined);

  const srcDoc = useMemo(() => initialContent, [initialContent]);

  useEffect(() => {
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const node = doc.querySelector<HTMLElement>(mountTarget);

      if (!node) {
        console.error(
          `IframePreview: mount target "${mountTarget}" not found.`,
        );
        return;
      }

      setMountNode(node);
    };

    iframe.addEventListener("load", handleLoad);

    if (
      iframe.contentDocument?.readyState === "complete" ||
      iframe.contentDocument?.readyState === "interactive"
    ) {
      handleLoad();
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [iframe, mountTarget, srcDoc]);

  useEffect(() => {
    if (!mountNode || !iframe?.contentDocument || !iframe.contentWindow) {
      return;
    }

    requestAnimationFrame(() => {
      cleanupRef.current?.();

      cleanupRef.current = onReady?.(
        iframe.contentDocument!,
        iframe.contentWindow!,
      );
    });

    return () => {
      cleanupRef.current?.();
    };
  }, [mountNode, children, iframe, onReady]);

  useEffect(() => {
    if (!iframe?.contentDocument) return;
    iframe.contentDocument.documentElement.setAttribute("data-theme", theme);
  }, [iframe, theme]);

  return (
    <>
      <iframe
        ref={setIframe}
        srcDoc={srcDoc}
        className={`size-full ${className ?? ""}`}
      />

      {mountNode && createPortal(children, mountNode)}
    </>
  );
};

export default IframePreview;
