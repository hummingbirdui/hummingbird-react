import Link from "next/link";
import type { Framework } from "@/data/frameworks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Logo card on the framework-guides index, mirroring the core Hummingbird docs. */
export default function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <Link
      href={framework.url}
      className="h-54 w-full rounded-lg border border-subtle hover:border-primary bg-default no-underline flex flex-col items-center justify-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${framework.logo.light}`}
        alt={framework.name}
        className="mb-5 w-20 object-contain dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${framework.logo.dark}`}
        alt={framework.name}
        className="mb-5 w-20 object-contain hidden dark:block"
      />
      <h3 className="text-2xl text-default font-medium m-0">
        {framework.name}
      </h3>
    </Link>
  );
}
