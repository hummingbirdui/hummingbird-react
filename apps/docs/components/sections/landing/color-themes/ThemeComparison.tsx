"use client";

import Frame, { FrameContextConsumer } from "react-frame-component";
import { ReactNode } from "react";

interface ThemeComparisonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ThemeComparison({
  children,
  className,
  style,
}: ThemeComparisonProps) {
  return (
    <Frame
      className={className}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        ...style,
      }}
      initialContent={`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <!-- Load your Tailwind CSS here -->
            <link rel="stylesheet" href="/preview.css" />
          </head>
          <body class="bg-white">
            <div id="frame-root"></div>
          </body>
        </html>
      `}
      mountTarget="#frame-root"
    >
      <FrameContextConsumer>{() => children}</FrameContextConsumer>
    </Frame>
  );
}
