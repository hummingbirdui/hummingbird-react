import Image from "next/image";
import Link from "next/link";
import { GithubMark } from "./BrandIcons";

const GITHUB_URL = "https://github.com/hummingbirdui/hummingbird";

const footerLinks: {
  title: string;
  links: { label: string; url: string; external?: boolean }[];
}[] = [
  {
    title: "Documentation",
    links: [
      { label: "Getting Started", url: "/docs/getting-started" },
      { label: "Components", url: "/docs/components/button" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", url: GITHUB_URL, external: true },
      { label: "Hummingbird", url: "https://hummingbirdui.com", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary/2 px-6 lg:px-10">
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-y-12 py-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="mb-4 flex items-center gap-2 no-underline">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logos/hummingbird.svg`}
                alt="Hummingbird"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-semibold text-muted">hummingbird</span>
            </Link>
            <p className="mb-4 text-sm text-muted md:max-w-xs">
              A React component library for Hummingbird — pre-built, accessible UI
              components for building web applications.
            </p>
            <p className="text-sm text-muted mb-0">
              <a
                href="https://github.com/hummingbirdui/hummingbird/blob/main/LICENSE"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted"
              >
                MIT
              </a>{" "}
              for code, CC BY 4.0 for docs.
            </p>
          </div>

          {footerLinks.map(({ title, links }) => (
            <div key={title} className="md:col-span-2">
              <h3 className="mb-5 text-sm font-bold text-subtle">{title}</h3>
              <ul className="list-none p-0 m-0 space-y-5">
                {links.map(({ label, url, external }) => (
                  <li key={label} className="text-sm">
                    {external ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="no-underline text-default hover:text-primary"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={url}
                        className="no-underline text-default hover:text-primary"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold text-subtle">Stay Connected</h3>
            <div className="flex gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub repository"
                className="btn btn-subtle-neutral btn-circle"
              >
                <GithubMark className="size-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-subtle py-5">
          <p className="mb-0 text-center text-sm text-muted">
            Hummingbird &copy; {new Date().getFullYear()}, all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
