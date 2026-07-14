import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
import { ThemeModeScript } from "@hummingbirdui/react";
import { MainThemeScript } from "@/components/layout/MainThemeScript";
import { MainThemeController } from "@/components/layout/MainThemeController";
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
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <MainThemeScript />
      </head>
      <body className="min-h-screen flex flex-col bg-default text-default">
        <MainThemeController />
        <SiteNavbar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
