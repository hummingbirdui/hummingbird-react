import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { pageSchema } from 'fumadocs-core/source/schema';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      // Shorter label for the sidebar; the page keeps `title` as its H1.
      sidebarTitle: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // Same anchor-link setup as the Hummingbird Astro docs: append an empty
    // <a class="heading-anchor"> to each section heading (icon and hover
    // reveal come from globals.css). Heading ids are added by fumadocs'
    // default remark pass, which runs before this.
    rehypePlugins: (plugins) => [
      ...plugins,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
          properties: {
            className: ['heading-anchor', 'no-underline'],
            'aria-label': 'Link to section',
          },
          content: [],
        },
      ],
    ],
  },
});
