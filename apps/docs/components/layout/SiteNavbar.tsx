"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { Navbar, NavbarBrand, NavbarNav } from "@hummingbirdui/react/navbar";
import { NavLink } from "@hummingbirdui/react/nav";
import { Badge } from "@hummingbirdui/react/badge";
import { Button } from "@hummingbirdui/react/button";
import { cn } from "@hummingbirdui/react/utils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerClose,
} from "@hummingbirdui/react";
import { ThemeToggle } from "./ThemeToggle";
import { GithubMark } from "./BrandIcons";
import { CloseButton } from "@hummingbirdui/react";

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
    href: "/docs/components/button",
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
          <NavLink
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
          </NavLink>
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-default px-6 sm:px-10 pointer-events-auto! h-(--navbar-height)">
      <Navbar expand="lg" className="max-w-8xl mx-auto px-0 h-full">
        <NavbarBrand asChild className="me-1 sm:me-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <h5 className="text-muted font-semibold hidden sm:block mb-0">
              hummingbird
            </h5>
          </Link>
        </NavbarBrand>

        <Badge variant="subtle" color="neutral">
          v0.1.0
        </Badge>

        <div className="ms-auto flex items-center">
          <NavbarNav className="hidden lg:flex">
            <NavLinks pathname={pathname} />
          </NavbarNav>
          <div className="mx-2 xl:mx-4 my-auto border-l h-8 xl:h-10 border-subtle flex"></div>
          <ThemeToggle />
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
            <DrawerTrigger asChild>
              <Button
                variant="subtle"
                color="neutral"
                shape="circle"
                className="lg:hidden ms-4"
                aria-label="Open menu"
              >
                <Ellipsis className="size-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-80">
              <DrawerHeader className="px-6 py-5">
                <DrawerTitle asChild>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-muted no-underline"
                  >
                    <Logo />
                    <h5 className="mb-0 font-semibold">hummingbird</h5>
                  </Link>
                </DrawerTitle>
                <DrawerClose asChild>
                  <CloseButton />
                </DrawerClose>
              </DrawerHeader>
              <DrawerBody className="overflow-y-auto px-6 py-0">
                <NavbarNav asChild>
                  <div className="flex-col items-stretch gap-1">
                    <NavLinks
                      pathname={pathname}
                      onNavigate={() => setOpen(false)}
                    />
                  </div>
                </NavbarNav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </Navbar>
    </header>
  );
}
