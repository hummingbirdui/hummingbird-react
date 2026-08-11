import { source } from "@/lib/source";

export const revalidate = false;

// Every page's headings (anchor id + title) in document order, taken from the
// same structured data the search index is built from. The search dialog uses
// this to collapse a page's matches into one row per section, ordered and
// titled like the page's own TOC, since Orama returns raw text snippets
// ranked by relevance score.
export function GET() {
  const map: Record<string, { id: string; title: string }[]> = {};
  for (const page of source.getPages()) {
    map[page.url] = page.data.structuredData.headings
      .filter((heading) => heading.id != null)
      .map((heading) => ({ id: heading.id as string, title: heading.content }));
  }
  return Response.json(map);
}
