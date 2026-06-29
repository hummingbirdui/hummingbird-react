import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col bg-default text-default">
        <SiteNavbar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
