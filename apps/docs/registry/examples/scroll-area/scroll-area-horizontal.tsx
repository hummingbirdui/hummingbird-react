"use client";

import { ScrollArea } from "@hummingbirdui/react";

const artworks = [
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?q=80&w=600&auto=format&fit=crop",
  },
  {
    artist: "Bailey Zindel",
    art: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
  },
  {
    artist: "Pablo Heimplatz",
    art: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=600&auto=format&fit=crop",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?q=80&w=600&auto=format&fit=crop",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="mx-auto w-96 max-w-full rounded-lg border border-subtle">
      <ScrollArea.Viewport>
        <div className="flex gap-4 p-4">
          {artworks.map(({ artist, art }) => (
            <figure key={artist} className="shrink-0">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={art}
                  alt={`Photo by ${artist}`}
                  className="aspect-3/4 h-80 w-auto object-cover"
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted">
                Photo by{" "}
                <span className="font-semibold text-default">{artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" rounded />
    </ScrollArea>
  );
}
