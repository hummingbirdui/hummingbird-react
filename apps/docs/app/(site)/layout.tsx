import "../globals.css";
import { Toaster } from "@hummingbirdui/react";
import { MainThemeController } from "@/components/layout/MainThemeController";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainThemeController />
      <SiteNavbar />
      <div className="flex-1">{children}</div>
      <Toaster />
      <SiteFooter />
    </div>
  );
}
