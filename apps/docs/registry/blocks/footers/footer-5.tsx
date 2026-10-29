"use client";

import { MessagesSquare, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { Button, Input, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $99",
    className: "bg-info-lighter text-info",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "SSL Encrypted Checkout",
    className: "bg-success-lighter text-success",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Hassle-free exchanges",
    className: "bg-danger-lighter text-danger",
  },
  {
    icon: MessagesSquare,
    title: "24/7 Support",
    description: "Live chat or call anytime",
    className: "bg-warning-lighter text-warning",
  },
];

const columns = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Collections", "Weekly Deals"],
  },
  {
    title: "Help",
    links: ["Track Order", "Shipping Info", "Returns", "Order History"],
  },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/HummingbirdUI/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M13.2511 3.07031H11.0359C9.7213 3.07031 8.2591 3.62322 8.2591 5.52878C8.26551 6.19276 8.2591 6.82865 8.2591 7.5443H6.73828V9.96437H8.30616V16.9313H11.1872V9.91839H13.0888L13.2609 7.53751H11.1376C11.1376 7.53751 11.1423 6.47839 11.1376 6.17082C11.1376 5.41778 11.9211 5.46091 11.9683 5.46091C12.3411 5.46091 13.0661 5.46199 13.2522 5.46091V3.07031H13.2511Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hummingbird.ui",
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path
          d="M19.5457 14.76C19.499 15.7838 19.3278 16.3401 19.1857 16.7095C18.9946 17.1994 18.7669 17.5497 18.3974 17.917C18.0321 18.2845 17.6818 18.5117 17.1919 18.7006C16.8225 18.8449 16.2641 19.0166 15.2403 19.0654C14.1335 19.1142 13.8055 19.1246 10.9987 19.1246C8.19451 19.1246 7.86392 19.1142 6.75708 19.0654C5.73329 19.0166 5.17752 18.8449 4.80802 18.7006C4.31559 18.5117 3.96793 18.2845 3.60053 17.917C3.23054 17.5497 3.00274 17.1994 2.81438 16.7095C2.67217 16.3401 2.49836 15.7838 2.45422 14.76C2.40028 13.6531 2.3904 13.32 2.3904 10.5189C2.3904 7.71206 2.40028 7.38151 2.45422 6.27464C2.49836 5.25085 2.67217 4.69511 2.81438 4.3225C3.00274 3.83317 3.23054 3.48496 3.60053 3.11757C3.96793 2.75072 4.31559 2.52289 4.80802 2.33196C5.17752 2.18718 5.73329 2.018 6.75708 1.96923C7.86392 1.92043 8.19451 1.90797 10.9987 1.90797C13.8055 1.90797 14.1335 1.92043 15.2403 1.96923C16.2641 2.018 16.8225 2.18718 17.1919 2.33196C17.6818 2.52289 18.0321 2.75072 18.3974 3.11757C18.7669 3.48496 18.9946 3.83317 19.1857 4.3225C19.3278 4.69511 19.499 5.25085 19.5457 6.27464C19.5971 7.38151 19.6096 7.71206 19.6096 10.5189C19.6096 13.32 19.5971 13.6531 19.5457 14.76ZM21.4362 6.18852C21.3848 5.06972 21.2083 4.30537 20.9463 3.63962C20.6796 2.94893 20.3221 2.3636 19.7367 1.77826C19.154 1.19553 18.5686 0.837986 17.878 0.568161C17.2096 0.308691 16.4478 0.13017 15.3285 0.0814055C14.2092 0.0274251 13.8517 0.0175781 10.9987 0.0175781C8.14828 0.0175781 7.7882 0.0274251 6.66888 0.0814055C5.55217 0.13017 4.79089 0.308691 4.11944 0.568161C3.43136 0.837986 2.84602 1.19553 2.26329 1.77826C1.67795 2.3636 1.32041 2.94893 1.05109 3.63962C0.791618 4.30537 0.615199 5.06972 0.561219 6.18852C0.512454 7.30784 0.5 7.66588 0.5 10.5189C0.5 13.3693 0.512454 13.7268 0.561219 14.8461C0.615199 15.9628 0.791618 16.7267 1.05109 17.3956C1.32041 18.0836 1.67795 18.6716 2.26329 19.2543C2.84602 19.837 3.43136 20.1972 4.11944 20.4665C4.79089 20.7259 5.55217 20.9024 6.66888 20.9538C7.7882 21.0051 8.14828 21.0176 10.9987 21.0176C13.8517 21.0176 14.2092 21.0051 15.3285 20.9538C16.4478 20.9024 17.2096 20.7259 17.878 20.4665C18.5686 20.1972 19.154 19.837 19.7367 19.2543C20.3221 18.6716 20.6796 18.0836 20.9463 17.3956C21.2083 16.7267 21.3848 15.9628 21.4362 14.8461C21.4876 13.7268 21.5 13.3693 21.5 10.5189C21.5 7.66588 21.4876 7.30784 21.4362 6.18852Z"
          fill="currentColor"
        />
        <path
          d="M17.8436 4.90737C17.8436 4.21032 17.2786 3.64746 16.5841 3.64746C15.8896 3.64746 15.3242 4.21032 15.3242 4.90737C15.3242 5.60187 15.8896 6.1647 16.5841 6.1647C17.2786 6.1647 17.8436 5.60187 17.8436 4.90737Z"
          fill="currentColor"
        />
        <path
          d="M10.9848 13.9982C9.05528 13.9982 7.4896 12.4351 7.4896 10.5056C7.4896 8.57295 9.05528 7.00782 10.9848 7.00782C12.9149 7.00782 14.4826 8.57295 14.4826 10.5056C14.4826 12.4351 12.9149 13.9982 10.9848 13.9982ZM10.9848 5.11719C8.01047 5.11719 5.60156 7.53125 5.60156 10.5056C5.60156 13.4774 8.01047 15.8889 10.9848 15.8889C13.9591 15.8889 16.3706 13.4774 16.3706 10.5056C16.3706 7.53125 13.9591 5.11719 10.9848 5.11719Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/Hummingbird_UI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M11.3399 8.89916L16.5761 2.8125H15.3353L10.7888 8.09761L7.15734 2.8125H2.96875L8.46 10.8044L2.96875 17.1875H4.2096L9.01085 11.606L12.8461 17.1875H17.0347L11.3393 8.89916H11.3399ZM9.64019 10.8749L9.08388 10.0791L4.65666 3.74659H6.56279L10.1356 8.8569L10.6919 9.6527L15.3358 16.2957H13.4297L9.64019 10.8749Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const payments = [
  { src: "https://www.svgrepo.com/show/328144/visa.svg", alt: "visa" },
  {
    src: "https://www.svgrepo.com/show/508701/mastercard-full.svg",
    alt: "mastercard",
  },
  { src: "https://www.svgrepo.com/show/508716/paypal.svg", alt: "paypal" },
  { src: "https://www.svgrepo.com/show/452108/stripe.svg", alt: "stripe" },
  {
    src: "https://www.svgrepo.com/show/508403/amex.svg",
    alt: "american-express",
  },
];

export default function Footer5() {
  return (
    <footer>
      <div className="border-b border-subtle bg-subtle/90">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    feature.className,
                  )}
                >
                  <feature.icon className="size-6" />
                </div>
                <div>
                  <Text as="h4" size="sm" className="mb-1">
                    {feature.title}
                  </Text>
                  <span className="text-xs text-muted">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-12 py-10 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <a href="#">
              <img
                src="https://themewagon.com/wp-content/themes/themewagon/dist/images/hb.png"
                alt="hummingbird"
                className="h-14 mb-2"
              />
            </a>
            <Text size="sm" className="text-muted max-w-lg lg:max-w-xs mb-0">
              Your destination for premium streetwear and exclusive drops.
              Elevating your everyday aesthetic since 2026.
            </Text>
          </div>
          {columns.map((column) => (
            <div
              key={column.title}
              className="col-span-6 md:col-span-3 lg:col-span-2"
            >
              <Text as="h3" size="sm" className="uppercase tracking-wide mb-4">
                {column.title}
              </Text>
              <ul className="space-y-4 list-none p-0 mb-0">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-primary no-underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Text as="h3" size="sm" className="uppercase tracking-wide mb-4">
              Stay Updated
            </Text>
            <Text size="xs" className="text-muted">
              Get early access to drops and exclusive offers.
            </Text>
            <div className="flex items-center gap-2 w-full max-w-90 mb-6">
              <Input
                variant="fill"
                type="text"
                placeholder="Email address"
                aria-label="Email address"
              />
              <Button variant="subtle" className="shrink-0">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="subtle"
                  color="neutral"
                  shape="circle"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-subtle py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <Text size="xs" className="text-center md:text-start text-muted mb-0">
            &copy; 2026 Hummingbird - All Rights Reserved.
          </Text>
          <div className="flex items-center gap-2">
            {payments.map((payment) => (
              <img
                key={payment.alt}
                src={payment.src}
                alt={payment.alt}
                className="h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
