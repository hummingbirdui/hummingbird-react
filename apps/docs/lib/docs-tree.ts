import type { ReactNode } from "react";
import type { Node, Root } from "fumadocs-core/page-tree";

export interface SidebarItem {
  name: ReactNode;
  url: string;
}

export interface SidebarGroup {
  /** Section heading; omitted for the leading group of loose top-level pages. */
  subHeader?: ReactNode;
  items: SidebarItem[];
}

/** Depth-first collect every page (and folder index) under a set of nodes. */
function collectPages(nodes: Node[]): SidebarItem[] {
  const items: SidebarItem[] = [];

  for (const node of nodes) {
    if (node.type === "page") {
      items.push({ name: node.name, url: node.url });
    } else if (node.type === "folder") {
      if (node.index) items.push({ name: node.index.name, url: node.index.url });
      items.push(...collectPages(node.children));
    }
  }

  return items;
}

/**
 * Normalize a Fumadocs page tree into grouped sidebar sections: loose top-level
 * pages become a leading group without a heading, and each folder becomes a
 * group titled by its name.
 */
export function getSidebarGroups(tree: Root): SidebarGroup[] {
  const groups: SidebarGroup[] = [];
  const loose: SidebarItem[] = [];

  for (const node of tree.children) {
    if (node.type === "page") {
      loose.push({ name: node.name, url: node.url });
    } else if (node.type === "folder") {
      const items: SidebarItem[] = [];
      if (node.index) items.push({ name: node.index.name, url: node.index.url });
      items.push(...collectPages(node.children));
      groups.push({ subHeader: node.name, items });
    }
  }

  if (loose.length) groups.unshift({ items: loose });

  return groups;
}
