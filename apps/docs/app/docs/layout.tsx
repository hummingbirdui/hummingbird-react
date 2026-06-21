import { source } from '@/lib/source';
import Link from 'next/link';
import type { ReactNode } from 'react';

// A simple recursive component to render the page tree
function NavTree({ items }: { items: any[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-4 mt-2">
      {items.map((item, i) => {
        if (item.type === 'page') {
          return (
            <li key={i}>
              <Link href={item.url} className="text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white hover:underline">
                {item.name}
              </Link>
            </li>
          );
        }
        if (item.type === 'folder') {
          return (
            <li key={i} className="mt-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
              <NavTree items={item.children} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pageTree = source.pageTree;

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Basic Custom Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block">
        <h2 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">Documentation</h2>
        <nav>
          <NavTree items={pageTree.children} />
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
