"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IframePreviewProps {
  children: ReactNode;
  theme: string;
  className?: string;
  mountTarget?: string;
  onReady?: (document: Document, window: Window) => void | (() => void);
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const INITIAL_CONTENT = `<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@hummingbirdui/browser@1.4.0/dist/index.global.js"></script>

    <link rel="stylesheet" href="${basePath}/themes.css">

    <style type="text/tailwindcss">
      @custom-variant dark (&:where(.dark, .dark *), .dark);
      @custom-variant active (&:active, &.active);
    </style>
  </head>

  <body class="h-screen">
    <div id="root"></div>
  </body>
</html>`;

const IframePreview = ({
  children,
  theme,
  className,
  mountTarget = "#root",
  onReady,
}: IframePreviewProps) => {
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const cleanupRef = useRef<(() => void) | void>(undefined);

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

    // The initial contentDocument is "about:blank" with readyState "complete",
    // so only run the eager check once the actual srcdoc document is in place.
    if (
      iframe.contentDocument?.URL === "about:srcdoc" &&
      (iframe.contentDocument.readyState === "complete" ||
        iframe.contentDocument.readyState === "interactive")
    ) {
      handleLoad();
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [iframe, mountTarget]);

  useEffect(() => {
    if (!mountNode || !iframe?.contentDocument || !iframe.contentWindow) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      cleanupRef.current?.();

      cleanupRef.current = onReady?.(
        iframe.contentDocument!,
        iframe.contentWindow!,
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanupRef.current?.();
      cleanupRef.current = undefined;
    };
  }, [mountNode, iframe, onReady]);

  // mountNode belongs to the loaded srcdoc document, so this both applies the
  // initial theme once that document is ready and reapplies it on change.
  useEffect(() => {
    mountNode?.ownerDocument.documentElement.setAttribute("data-theme", theme);
  }, [mountNode, theme]);

  return (
    <>
      <iframe
        ref={setIframe}
        srcDoc={INITIAL_CONTENT}
        className={`size-full rounded-4xl overflow-hidden ${className ?? ""}`}
      />

      {mountNode && createPortal(children, mountNode)}
    </>
  );
};

export default IframePreview;
