"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { Navbar } from "@hummingbirdui/react/navbar";
import { Nav } from "@hummingbirdui/react/nav";
import { Badge } from "@hummingbirdui/react/badge";
import { Button } from "@hummingbirdui/react/button";
import { cn } from "@hummingbirdui/react/utils";
import { Drawer, DarkThemeToggle } from "@hummingbirdui/react";
import { GithubMark } from "./BrandIcons";
import { CloseButton } from "@hummingbirdui/react";
import { ThemeDropdown } from "./ThemeDropdown";
import { SearchButton, SearchIconButton } from "../search/SearchToggle";
import { SearchDialog } from "../search/SearchDialog";

const GITHUB_URL = "https://github.com/hummingbirdui/hummingbird-react";

const navLinks: {
  href: string;
  label: string;
  isActive: (path: string) => boolean;
}[] = [
  {
    href: "/docs/getting-started",
    label: "Docs",
    isActive: (p) => p.startsWith("/docs") && !p.startsWith("/docs/components"),
  },
  {
    href: "/docs/components/overview/",
    label: "Components",
    isActive: (p) => p.startsWith("/docs/components"),
  },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navLinks.map((link) => {
        const active = link.isActive(pathname);
        return (
          <Nav.Link
            key={link.href}
            asChild
            active={active}
            className={cn(
              "px-4 py-2 text-base lg:text-sm font-normal rounded-lg hover:bg-hover",
              active ? "text-primary" : "text-default",
            )}
          >
            <Link href={link.href} onClick={onNavigate}>
              {link.label}
            </Link>
          </Nav.Link>
        );
      })}
    </>
  );
}

const Logo = () => (
  <Image
    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logos/hummingbird.svg`}
    alt="Hummingbird"
    width={40}
    height={40}
    priority
  />
);

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-default px-6 sm:px-10 pointer-events-auto! h-(--navbar-height)">
      <Navbar expand="lg" className="max-w-8xl mx-auto px-0 h-full">
        <Navbar.Brand asChild className="me-1 sm:me-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <h5 className="text-muted font-semibold hidden sm:block mb-0">
              Hummingbird React
            </h5>
          </Link>
        </Navbar.Brand>

        <Badge variant="subtle" color="neutral">
          v0.1.0
        </Badge>

        <SearchButton
          className="ms-2 hidden sm:ms-15 lg:flex"
          onClick={() => setSearchOpen(true)}
        />

        <div className="ms-auto flex items-center">
          <Navbar.Nav className="hidden lg:flex">
            <NavLinks pathname={pathname} />
          </Navbar.Nav>
          <SearchIconButton
            className="lg:hidden"
            onClick={() => setSearchOpen(true)}
          />
          <div className="mx-2 xl:mx-4 my-auto border-l h-8 xl:h-10 border-subtle flex"></div>
          <DarkThemeToggle />
          {pathname !== "/" && (
            <div className="ms-1.5">
              <ThemeDropdown />
            </div>
          )}
          <Button
            asChild
            variant="subtle"
            color="neutral"
            shape="circle"
            aria-label="GitHub repository"
            className="ms-2"
          >
            <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
              <GithubMark className="size-4.5" />
            </a>
          </Button>

          <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <Drawer.Trigger asChild>
              <Button
                variant="subtle"
                color="neutral"
                shape="circle"
                className="lg:hidden ms-4"
                aria-label="Open menu"
              >
                <Ellipsis className="size-4" />
              </Button>
            </Drawer.Trigger>
            <Drawer.Content className="w-80">
              <Drawer.Header className="px-6 py-5">
                <Drawer.Title asChild>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-muted no-underline"
                  >
                    <Logo />
                    <h5 className="mb-0 font-semibold">hummingbird</h5>
                  </Link>
                </Drawer.Title>
                <Drawer.Close asChild>
                  <CloseButton />
                </Drawer.Close>
              </Drawer.Header>
              <Drawer.Body className="overflow-y-auto px-6 py-0">
                <Navbar.Nav asChild>
                  <div className="flex-col items-stretch gap-1">
                    <NavLinks
                      pathname={pathname}
                      onNavigate={() => setOpen(false)}
                    />
                  </div>
                </Navbar.Nav>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer>
        </div>
      </Navbar>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
