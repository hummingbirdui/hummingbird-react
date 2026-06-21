import type { MDXComponents } from "mdx/types";
import { Button } from "@hummingbirdui/react";

// Next.js requires this file to be at the root of the app or src directory
// to use MDX globally in the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Wrapping the Button component fixes the ForwardRefExoticComponent type conflict
    // that occurs between @types/react and @types/mdx
    Button: (props: any) => <Button {...props} />,

    // You can also add standard HTML overrides here, for example:
    // h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    //   <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...props} />
    // ),
  };
}
