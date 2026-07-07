import { docs, meta } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const source = loader({
  baseUrl: '/docs',
  source: toFumadocsSource(docs, meta),
  pageTree: {
    transformers: [
      {
        // Use `sidebarTitle` frontmatter (when set) as the tree node name so
        // the sidebar can show a shorter label than the page's H1 title.
        file(node, filePath) {
          if (!filePath) return node;
          const file = this.storage.read(filePath);
          if (file?.format === 'page') {
            const { sidebarTitle } = file.data as { sidebarTitle?: string };
            if (sidebarTitle) node.name = sidebarTitle;
          }
          return node;
        },
      },
    ],
  },
});
