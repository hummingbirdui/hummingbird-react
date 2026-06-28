import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { getSidebarGroups } from "@/lib/docs-tree";
import { SidebarNav } from "@/components/docs/SidebarNav";
import { DocsBreadcrumb } from "@/components/docs/DocsBreadcrumb";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const groups = getSidebarGroups(source.pageTree);

  return (
    <div className="px-6 sm:px-10">
      <DocsBreadcrumb groups={groups} />
      <div className="lg:grid lg:grid-cols-[15rem_1fr] max-w-8xl mx-auto">
        <aside className="docs-sidebar hidden lg:block lg:sticky top-0 max-h-screen overflow-y-auto py-10 pe-10">
          <SidebarNav groups={groups} />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
