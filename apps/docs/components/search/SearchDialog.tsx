"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import { oramaStaticClient } from "fumadocs-core/search/client/orama-static";
import type { SortedResult } from "fumadocs-core/search";
import { Dialog } from "@hummingbirdui/react/dialog";
import { ListGroup } from "@hummingbirdui/react/list-group";
import { cn } from "@hummingbirdui/react/utils";

const searchClient = oramaStaticClient({
  from: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/search`,
});

// A page hit followed by its matched headings/snippets, mirroring how the
// main Hummingbird docs group DocSearch results under the page title.
interface ResultGroup {
  page: SortedResult | null;
  items: SortedResult[];
}

const stripMarks = (text: string) => text.replace(/<\/?mark>/g, "");

// Search snippets come back with `<mark>` around matched terms; render those
// with the same primary-color highlight the main Hummingbird docs use.
function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(<mark>.*?<\/mark>)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("<mark>") ? (
          <mark key={i} className="bg-transparent text-primary">
            {part.slice("<mark>".length, -"</mark>".length)}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { search, setSearch, query } = useDocsSearch({ client: searchClient });
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo<SortedResult[]>(
    () => (Array.isArray(query.data) ? query.data : []),
    [query.data],
  );

  // Fumadocs returns each matched page followed by its matched headings and
  // text snippets. Rebuild that as groups, then rank groups whose page title
  // matches the query best (exact > prefix > substring) to the top so e.g.
  // "button" surfaces the Button component above Button Group.
  const groups = useMemo<ResultGroup[]>(() => {
    const list: ResultGroup[] = [];
    for (const result of results) {
      if (result.type === "page") {
        list.push({ page: result, items: [] });
      } else {
        if (list.length === 0) list.push({ page: null, items: [] });
        list[list.length - 1].items.push(result);
      }
    }

    const q = search.trim().toLowerCase();
    const score = (group: ResultGroup) => {
      if (!q || !group.page) return 0;
      const title = stripMarks(String(group.page.content)).trim().toLowerCase();
      if (title === q) return 3;
      if (title.startsWith(q)) return 2;
      if (title.includes(q)) return 1;
      return 0;
    };
    return list
      .map((group, order) => ({ group, order }))
      .sort((a, b) => score(b.group) - score(a.group) || a.order - b.order)
      .map(({ group }) => group);
  }, [results, search]);

  // Displayed order, flattened — keyboard navigation walks this list.
  const flatResults = useMemo(
    () =>
      groups.flatMap((group) =>
        group.page ? [group.page, ...group.items] : group.items,
      ),
    [groups],
  );

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Fresh query each time the dialog opens.
  useEffect(() => {
    if (open) setSearch("");
  }, [open, setSearch]);

  useEffect(() => {
    setActive(0);
  }, [flatResults]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const goTo = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const result = flatResults[active];
      if (result) goTo(result.url);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        dialogClassName="max-w-[35rem] max-md:max-w-[calc(100%-3rem)] mx-auto mt-6"
        className="rounded-lg dark:border dark:border-default"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          listRef.current
            ?.closest(".modal-content")
            ?.querySelector("input")
            ?.focus();
        }}
      >
        <Dialog.Title className="sr-only">Search documentation</Dialog.Title>

        <div className="p-4 pb-0">
          <div className="flex h-14 items-center gap-3 rounded-lg px-4 ring-1 ring-primary">
            <Search className="size-4 shrink-0 text-default" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search"
              aria-label="Search documentation"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full bg-transparent text-base text-default outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
            />
          </div>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-4">
          {flatResults.length > 0 ? (
            <>
              <p className="mb-2 px-3 text-sm text-subtle">Documentation</p>
              <ListGroup asChild className="w-full gap-1 bg-transparent">
                <div>
                  {groups.map((group, groupIndex) => {
                    const pageTitle = group.page
                      ? stripMarks(String(group.page.content)).trim()
                      : null;
                    let flatIndex = 0;
                    for (let i = 0; i < groupIndex; i++) {
                      flatIndex +=
                        (groups[i].page ? 1 : 0) + groups[i].items.length;
                    }
                    return (
                      <div key={group.page?.id ?? groupIndex}>
                        {group.page && (
                          <ListGroup.Item
                            action
                            asChild
                            className={cn(
                              "rounded-lg border-0 px-3 py-2 text-sm font-medium text-primary",
                              flatIndex === active
                                ? "bg-subtle"
                                : "bg-transparent",
                            )}
                          >
                            <button
                              type="button"
                              data-active={flatIndex === active}
                              onClick={() => goTo(group.page!.url)}
                              onMouseMove={() => setActive(flatIndex)}
                              className="flex w-full cursor-pointer items-center text-start"
                            >
                              <span className="min-w-0 truncate">
                                <Highlighted
                                  text={String(group.page.content)}
                                />
                              </span>
                            </button>
                          </ListGroup.Item>
                        )}
                        {group.items.map((item, itemIndex) => {
                          const index =
                            flatIndex + (group.page ? 1 : 0) + itemIndex;
                          const isActive = index === active;
                          return (
                            <ListGroup.Item
                              key={item.id}
                              action
                              asChild
                              className={cn(
                                "ms-3 mt-1 rounded-lg rounded-s-none border-0 border-s-2 border-subtle py-2 pe-3 ps-4 text-start text-sm",
                                isActive ? "bg-subtle" : "bg-transparent",
                              )}
                            >
                              <button
                                type="button"
                                data-active={isActive}
                                onClick={() => goTo(item.url)}
                                onMouseMove={() => setActive(index)}
                                className="flex w-full cursor-pointer flex-col items-start gap-0.5"
                              >
                                <span className="w-full min-w-0 truncate text-default">
                                  <Highlighted text={String(item.content)} />
                                </span>
                                {pageTitle && (
                                  <span className="text-xs text-primary">
                                    {pageTitle}
                                  </span>
                                )}
                              </button>
                            </ListGroup.Item>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </ListGroup>
            </>
          ) : (
            <p className="mb-0 py-10 text-center text-sm text-muted">
              {search.length === 0
                ? "No recent searches"
                : query.isLoading
                  ? "Searching…"
                  : `No results for “${search}”`}
            </p>
          )}
        </div>

        <div className="flex h-12 items-center gap-4 border-t border-subtle px-4 text-xs text-subtle">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-subtle px-1 font-sans">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-subtle px-1 font-sans">↑</kbd>
            <kbd className="rounded border border-subtle px-1 font-sans">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-subtle px-1 font-sans">
              esc
            </kbd>
            close
          </span>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
