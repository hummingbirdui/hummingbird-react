import Link from "next/link";
import { Component } from "@/data/components";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const { url, imgComponent: ImageComponent, title, count } = component;

  return (
    <Link
      href={url}
      className="card card-action flex size-full flex-col overflow-hidden rounded-2xl bg-default hover:border-primary"
    >
      <div className="aspect-4/3 grow flex items-center justify-center bg-subtle p-4">
        <ImageComponent />
      </div>

      <div className="px-4 py-3">
        <h6 className="card-title mb-0.5 text-base font-semibold">{title}</h6>

        <p className="mb-0 text-xs text-muted">{count} components</p>
      </div>
    </Link>
  );
}
