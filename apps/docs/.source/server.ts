// @ts-nocheck
import * as __fd_glob_1 from "../content/docs/components/button.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/getting-started.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"getting-started.mdx": __fd_glob_0, "components/button.mdx": __fd_glob_1, });

export const meta = await create.meta("meta", "content/docs", {});