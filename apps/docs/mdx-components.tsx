import type { MDXComponents } from "mdx/types";
import {
  Button,
  Alert,
  AlertIcon,
  Badge,
  BadgeActionButton,
  Avatar,
  AvatarName,
  AvatarGroup,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@hummingbirdui/react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion";

// Next.js requires this file to be at the root of the app or src directory
// to use MDX globally in the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Wrapping the Button component fixes the ForwardRefExoticComponent type conflict
    // that occurs between @types/react and @types/mdx
    Button: (props: any) => <Button {...props} />,

    // Simple display components, wrapped like Button to sidestep the same
    // ForwardRefExoticComponent type conflict.
    Alert: (props: any) => <Alert {...props} />,
    AlertIcon: (props: any) => <AlertIcon {...props} />,
    Badge: (props: any) => <Badge {...props} />,
    BadgeActionButton: (props: any) => <BadgeActionButton {...props} />,
    Avatar: (props: any) => <Avatar {...props} />,
    AvatarName: (props: any) => <AvatarName {...props} />,
    AvatarGroup: (props: any) => <AvatarGroup {...props} />,
    Breadcrumb: (props: any) => <Breadcrumb {...props} />,
    BreadcrumbList: (props: any) => <BreadcrumbList {...props} />,
    BreadcrumbItem: (props: any) => <BreadcrumbItem {...props} />,
    BreadcrumbLink: (props: any) => <BreadcrumbLink {...props} />,
    BreadcrumbPage: (props: any) => <BreadcrumbPage {...props} />,

    // Accordion primitives, exposed so MDX can compose them inline. They come
    // from a client boundary (see components/accordion.tsx) so their hooks run
    // inside the server-rendered MDX page. Wrapped like Button to sidestep the
    // ForwardRefExoticComponent type conflict between @types/react and @types/mdx.
    Accordion: (props: any) => <Accordion {...props} />,
    AccordionItem: (props: any) => <AccordionItem {...props} />,
    AccordionHeader: (props: any) => <AccordionHeader {...props} />,
    AccordionTrigger: (props: any) => <AccordionTrigger {...props} />,
    AccordionContent: (props: any) => <AccordionContent {...props} />,

    // You can also add standard HTML overrides here, for example:
    // h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    //   <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...props} />
    // ),
  };
}
