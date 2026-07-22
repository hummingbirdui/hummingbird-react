import type { MDXComponents } from "mdx/types";
import { Button } from "@hummingbirdui/react/button";
import { ButtonGroup } from "@hummingbirdui/react/button-group";
import { Alert } from "@hummingbirdui/react/alert";
import { Badge } from "@hummingbirdui/react/badge";
import { Avatar } from "@hummingbirdui/react/avatar";
import { Breadcrumb } from "@hummingbirdui/react/breadcrumb";
import { Input, Textarea, Field, InputIcon } from "@hummingbirdui/react/input";
import { FloatingLabel } from "@hummingbirdui/react/floating-label";
import { Range } from "@hummingbirdui/react/range";
import { CloseButton } from "@hummingbirdui/react/close-button";
import { Card } from "@hummingbirdui/react/card";
import { Select } from "@hummingbirdui/react/select";
import { Switch } from "@hummingbirdui/react/switch";
import { InputGroup } from "@hummingbirdui/react/input-group";
import { ListGroup } from "@hummingbirdui/react/list-group";
import { Nav } from "@hummingbirdui/react/nav";
import { Pagination } from "@hummingbirdui/react/pagination";
import { Table } from "@hummingbirdui/react/table";
import { ColorPalette } from "@/components/docs/ColorPalette";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CssFileCode } from "@/components/docs/CssFileCode";
import { MdxCodeBlock } from "@/components/docs/MdxCodeBlock";
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
    // <Card.Header> as a property access on the mapped `Card` value, so a
    // wrapper function would lose the attached parts. `as any` sidesteps the
    // same @types/react vs @types/mdx conflict the wrappers solved.
    ButtonGroup: ButtonGroup as any,
    Alert: Alert as any,
    Badge: Badge as any,
    Avatar: Avatar as any,
    Breadcrumb: Breadcrumb as any,

    // Form components — native HTML form elements styled by Hummingbird CSS.
    Input: (props: any) => <Input {...props} />,
    Textarea: (props: any) => <Textarea {...props} />,
    Field: Field as any,
    InputIcon: InputIcon as any,
    FloatingLabel: (props: any) => <FloatingLabel {...props} />,
    Range: (props: any) => <Range {...props} />,
    Select: (props: any) => <Select {...props} />,

    Card: Card as any,

    // Close button.
    CloseButton: (props: any) => <CloseButton {...props} />,
    Switch: (props: any) => <Switch {...props} />,
    InputGroup: InputGroup as any,
    ListGroup: ListGroup as any,
    // The static "Tab Nav".
    Nav: Nav as any,
    Pagination: Pagination as any,
    Table: Table as any,
    ComponentPreview: (props: any) => <ComponentPreview {...props} />,

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
