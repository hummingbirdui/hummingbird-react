import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
import { ThemeModeScript } from "@hummingbirdui/react";
import { MainThemeScript } from "@/components/layout/MainThemeScript";

export const metadata: Metadata = {
  title: {
    default:
      "Hummingbird React - React components for Hummingbird, built with Tailwind CSS.",
    template: "%s - Hummingbird React",
  },
  description: "React components for Hummingbird, built with Tailwind CSS.",
  icons: [
    { rel: "icon", url: "/images/favicons/favicon.ico" },
    { rel: "icon", type: "image/svg+xml", url: "/images/favicons/favicon.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/images/favicons/favicon-96x96.png",
    },
    { rel: "apple-touch-icon", url: "/images/favicons/apple-touch-icon.png" },
    { rel: "manifest", url: "/images/favicons/site.webmanifest" },
  ],
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
      <body className="bg-default text-default">{children}</body>
    </html>
  );
}
