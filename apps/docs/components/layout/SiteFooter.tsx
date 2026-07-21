import { footerLinks, productLinks, socialLinks } from "@/data/footerLinks";
import Image from "next/image";

export const SiteFooter = () => {
  return (
    <footer className="px-6 lg:px-10">
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-10 xl:grid-cols-15 xl:gap-8 gap-y-12 py-12">
          <div className="col-span-10 xl:col-span-5">
            <a href="#!" className="mb-4 flex items-center gap-2 no-underline">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logos/hummingbird.svg`}
                alt="Hummingbird"
                width={40}
                height={40}
                priority
              />
              <span className="text-2xl font-semibold text-muted">
                hummingbird
              </span>
            </a>
            <p className="mb-4 text-sm text-muted xl:max-w-75">
              Crafted with care, caffeine, and clean code by{" "}
              <a
                href="https://themewagon.com/"
                className="text-default no-underline font-semibold"
              >
                ThemeWagon
              </a>{" "}
              – trusted by 2M+ Devs & Counting.
            </p>
            <p className="text-sm text-muted">
              <a
                href="https://github.com/hummingbirdui/hummingbird-react/blob/main/LICENSE"
                className="text-muted"
              >
                MIT
              </a>{" "}
              for code,{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                className="text-muted"
              >
                CC BY 4.0
              </a>{" "}
              for docs.
            </p>
          </div>

          {footerLinks.map(({ title, links }) => (
            <div key={title} className="col-span-5 sm:col-span-4 md:col-span-2">
              <h3 className="mb-5 text-sm font-bold text-subtle">{title}</h3>
              <ul className="list-none p-0 space-y-5">
                {links.map(({ label, url, external }) => (
                  <li key={label} className="text-sm">
                    <a
                      // href={external ? url : getVersionedPath(url)}
                      href={url}
                      target={external ? "_blank" : undefined}
                      className="no-underline text-default"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                {title === "Help Center" && (
                  <li className="text-sm">
                    <span
                      className="no-underline text-default cursor-pointer select-none"
                      data-open-support-widget
                    >
                      Support
                    </span>
                  </li>
                )}
              </ul>
            </div>
          ))}

          <div className="col-span-10 sm:col-span-6 md:col-span-4">
            <h3 className="mb-4 text-sm font-bold text-subtle">Newsletter</h3>
            <script
              async
              src="https://api.mailbluster.com/v1/forms/0aa446ee-1675-41ba-b481-fa705e80728e.js"
              data-form="0aa446ee-1675-41ba-b481-fa705e80728e"
            ></script>

            <p className="text-subtle text-xs mt-1.5 mb-5">
              Our email newsletters are powered by{" "}
              <a
                className="text-subtle hover:text-muted"
                target="_blank"
                rel="noopener noreferrer"
                href="https://mailbluster.com/?utm_source=hummingbird&utm_medium=attribution&utm_campaign=poweredbymb"
              >
                MailBluster
              </a>
            </p>
            <h3 className="mb-4 text-sm font-bold text-subtle">
              Stay Connected
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  className="btn btn-subtle-neutral btn-circle"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 border-t border-subtle">
          {productLinks.map((product) => (
            <a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-2 no-underline product-link rounded-xl hover:bg-light/40 transition duration-200"
            >
              <img
                src={product.imageDark}
                alt={product.alt}
                className={`mx-auto h-11 hidden ${product.imageDark ? "dark:block" : ""}`}
              />
              <img
                src={product.image}
                alt={product.alt}
                className={`mx-auto h-11 ${product.imageDark ? "dark:hidden" : ""}`}
              />
              <p className="mx-auto text-sm text-gray-500 max-w-50">
                {product.description}
              </p>
            </a>
          ))}
        </div>

        <div className="border-t border-subtle py-5">
          <p className="mb-0 text-center text-sm text-muted">
            Hummingbird &copy; {new Date().getFullYear()}, all rights reserved
          </p>
        </div>
      </div>
      <div
        className="alert alert-subtle-success mb-5 fixed z-9999 top-8 right-8 hidden"
        data-success-alert
        role="alert"
      >
        Successfully Subscribed
      </div>
    </footer>
  );
};
