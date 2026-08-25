/* eslint-disable @typescript-eslint/no-explicit-any -- the `any`s below
   sidestep the ForwardRefExoticComponent conflict between @types/react and
   @types/mdx; see the inline comments. */
import type { MDXComponents } from "mdx/types";
import { Button } from "@hummingbirdui/react/button";
import { Table } from "@hummingbirdui/react/table";
import { ColorPalette } from "@/components/docs/ColorPalette";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CssFileCode } from "@/components/docs/CssFileCode";
import { MdxCodeBlock } from "@/components/docs/MdxCodeBlock";
import { PackageManagerTabs } from "@/components/docs/PackageManagerTabs";
import { PropsTable } from "@/components/docs/PropsTable";
import { DataAttributesTable } from "@/components/docs/DataAttributesTable";
import { CssVariablesTable } from "@/components/docs/CssVariablesTable";
import { ThemeSwatches } from "@/components/docs/ThemeSwatches";
import HbAlert from "./components/docs/HbAlert";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Wrapping the Button component fixes the ForwardRefExoticComponent type conflict
    // that occurs between @types/react and @types/mdx
    Button: (props: any) => <Button {...props} />,
    // Compound components are passed through directly: MDX resolves
    // <Table.Row> as a property access on the mapped `Table` value, so a
    // wrapper function would lose the attached parts. `as any` sidesteps the
    // same @types/react vs @types/mdx conflict the wrappers solved.
    Table: Table as any,
    ComponentPreview: (props: any) => <ComponentPreview {...props} />,

    PackageManagerTabs: (props: any) => <PackageManagerTabs {...props} />,
    PropsTable: (props: any) => <PropsTable {...props} />,
    DataAttributesTable: (props: any) => <DataAttributesTable {...props} />,
    CssVariablesTable: (props: any) => <CssVariablesTable {...props} />,
    HbAlert: ({ color, ...rest }) => <HbAlert color={color} {...rest} />,
    ThemeSwatches: (props: any) => <ThemeSwatches {...props} />,
    ColorPalette: (props: any) => <ColorPalette {...props} />,
    CssFileCode: (props: any) => <CssFileCode {...props} />,
    pre: (props: any) => <MdxCodeBlock {...props} />,
  };
}
