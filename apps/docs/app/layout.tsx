import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hummingbird React",
  description:
    "Hummingbird React is a React component library for Hummingbird that provides a set of pre-built UI components and utilities for building web applications with React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
