import type { MDXComponents } from "mdx/types";
// Import from per-component subpaths, not the root barrel. The barrel inlines
// `RadioGroup`'s top-level `React.createContext(...)`, which throws when this
// (server) module imports it. The subpath files are self-contained, so the
// server graph never pulls `createContext`.
import { Button } from "@hummingbirdui/react/button";
import { ButtonGroup, ButtonToolbar } from "@hummingbirdui/react/button-group";
import { Alert, AlertIcon } from "@hummingbirdui/react/alert";
import { Badge, BadgeActionButton } from "@hummingbirdui/react/badge";
import { Avatar, AvatarName, AvatarGroup } from "@hummingbirdui/react/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@hummingbirdui/react/breadcrumb";
import {
  FormControl,
  Textarea,
  FormLabel,
  FormField,
  FormText,
  InputIcon,
  InputIconStart,
  InputIconEnd,
} from "@hummingbirdui/react/form-control";
import { FloatingLabel } from "@hummingbirdui/react/floating-label";
import { FormRange } from "@hummingbirdui/react/form-range";
import { CloseButton } from "@hummingbirdui/react/close-button";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImage,
  CardImageOverlay,
  CardGroup,
} from "@hummingbirdui/react/card";
import { Select } from "@hummingbirdui/react/select";
import { Switch } from "@hummingbirdui/react/switch";
import { InputGroup, InputGroupText } from "@hummingbirdui/react/input-group";
// Hook/context-using controls go through a "use client" boundary.
import { Checkbox, Radio, RadioGroup } from "@/components/form";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItemText,
} from "@/components/dropdown";

// Next.js requires this file to be at the root of the app or src directory
// to use MDX globally in the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Wrapping the Button component fixes the ForwardRefExoticComponent type conflict
    // that occurs between @types/react and @types/mdx
    Button: (props: any) => <Button {...props} />,
    ButtonGroup: (props: any) => <ButtonGroup {...props} />,
    ButtonToolbar: (props: any) => <ButtonToolbar {...props} />,

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

    // Form components — native HTML form elements styled by Hummingbird CSS.
    FormControl: (props: any) => <FormControl {...props} />,
    Textarea: (props: any) => <Textarea {...props} />,
    FormLabel: (props: any) => <FormLabel {...props} />,
    FormField: (props: any) => <FormField {...props} />,
    FormText: (props: any) => <FormText {...props} />,
    InputIcon: (props: any) => <InputIcon {...props} />,
    InputIconStart: (props: any) => <InputIconStart {...props} />,
    InputIconEnd: (props: any) => <InputIconEnd {...props} />,
    FloatingLabel: (props: any) => <FloatingLabel {...props} />,
    FormRange: (props: any) => <FormRange {...props} />,
    Select: (props: any) => <Select {...props} />,

    // Card parts.
    Card: (props: any) => <Card {...props} />,
    CardHeader: (props: any) => <CardHeader {...props} />,
    CardBody: (props: any) => <CardBody {...props} />,
    CardFooter: (props: any) => <CardFooter {...props} />,
    CardTitle: (props: any) => <CardTitle {...props} />,
    CardSubtitle: (props: any) => <CardSubtitle {...props} />,
    CardText: (props: any) => <CardText {...props} />,
    CardImage: (props: any) => <CardImage {...props} />,
    CardImageOverlay: (props: any) => <CardImageOverlay {...props} />,
    CardGroup: (props: any) => <CardGroup {...props} />,

    // Close button.
    CloseButton: (props: any) => <CloseButton {...props} />,
    Checkbox: (props: any) => <Checkbox {...props} />,
    Radio: (props: any) => <Radio {...props} />,
    RadioGroup: (props: any) => <RadioGroup {...props} />,
    Switch: (props: any) => <Switch {...props} />,
    InputGroup: (props: any) => <InputGroup {...props} />,
    InputGroupText: (props: any) => <InputGroupText {...props} />,

    // Accordion primitives, exposed so MDX can compose them inline. They come
    // from a client boundary (see components/accordion.tsx) so their hooks run
    // inside the server-rendered MDX page. Wrapped like Button to sidestep the
    // ForwardRefExoticComponent type conflict between @types/react and @types/mdx.
    Accordion: (props: any) => <Accordion {...props} />,
    AccordionItem: (props: any) => <AccordionItem {...props} />,
    AccordionHeader: (props: any) => <AccordionHeader {...props} />,
    AccordionTrigger: (props: any) => <AccordionTrigger {...props} />,
    AccordionContent: (props: any) => <AccordionContent {...props} />,

    // DropdownMenu primitives, exposed so MDX can compose them inline. They come
    // from a client boundary (see components/dropdown.tsx) so their hooks run
    // inside the server-rendered MDX page. Wrapped like Button to sidestep the
    // ForwardRefExoticComponent type conflict between @types/react and @types/mdx.
    DropdownMenu: (props: any) => <DropdownMenu {...props} />,
    DropdownMenuPortal: (props: any) => <DropdownMenuPortal {...props} />,
    DropdownMenuTrigger: (props: any) => <DropdownMenuTrigger {...props} />,
    DropdownMenuGroup: (props: any) => <DropdownMenuGroup {...props} />,
    DropdownMenuContent: (props: any) => <DropdownMenuContent {...props} />,
    DropdownMenuItem: (props: any) => <DropdownMenuItem {...props} />,
    DropdownMenuLabel: (props: any) => <DropdownMenuLabel {...props} />,
    DropdownMenuSeparator: (props: any) => <DropdownMenuSeparator {...props} />,
    DropdownMenuItemText: (props: any) => <DropdownMenuItemText {...props} />,

    // You can also add standard HTML overrides here, for example:
    // h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    //   <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...props} />
    // ),
  };
}
