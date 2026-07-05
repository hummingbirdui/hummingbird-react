import type { MDXComponents } from "mdx/types";
import { Button } from "@hummingbirdui/react/button";
import { ButtonGroup, ButtonToolbar } from "@hummingbirdui/react/button-group";
import { Alert, AlertIcon } from "@hummingbirdui/react/alert";
import { Badge, BadgeActionButton } from "@hummingbirdui/react/badge";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@hummingbirdui/react/avatar";
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
import {
  ListGroup,
  ListGroupItem,
  ListText,
} from "@hummingbirdui/react/list-group";
// Navbar wraps a Radix Collapsible + React context, so it comes through a
// "use client" boundary (see components/navbar.tsx) like the other interactive
// components rather than the server-importable subpath.
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarText,
  NavbarCollapse,
  NavbarToggle,
  NavbarTogglerIcon,
} from "@/components/navbar";
import { Nav, NavItem, NavLink } from "@hummingbirdui/react/nav";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@hummingbirdui/react/pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@hummingbirdui/react/table";
// Hook/context-using controls go through a "use client" boundary.
import { Checkbox, Radio, RadioGroup } from "@/components/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/collapsible";
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
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
} from "@/components/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@/components/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/tooltip";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { MdxCodeBlock } from "@/components/docs/MdxCodeBlock";
import { PropsTable } from "@/components/docs/PropsTable";

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
    AvatarImage: (props: any) => <AvatarImage {...props} />,
    AvatarFallback: (props: any) => <AvatarFallback {...props} />,
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

    // List group parts.
    ListGroup: (props: any) => <ListGroup {...props} />,
    ListGroupItem: (props: any) => <ListGroupItem {...props} />,
    ListText: (props: any) => <ListText {...props} />,

    // Navbar parts.
    Navbar: (props: any) => <Navbar {...props} />,
    NavbarBrand: (props: any) => <NavbarBrand {...props} />,
    NavbarNav: (props: any) => <NavbarNav {...props} />,
    NavbarText: (props: any) => <NavbarText {...props} />,
    NavbarCollapse: (props: any) => <NavbarCollapse {...props} />,
    NavbarToggle: (props: any) => <NavbarToggle {...props} />,
    NavbarTogglerIcon: (props: any) => <NavbarTogglerIcon {...props} />,

    // Nav parts (the static "Tab Nav").
    Nav: (props: any) => <Nav {...props} />,
    NavItem: (props: any) => <NavItem {...props} />,
    NavLink: (props: any) => <NavLink {...props} />,

    // Pagination parts.
    Pagination: (props: any) => <Pagination {...props} />,
    PaginationContent: (props: any) => <PaginationContent {...props} />,
    PaginationItem: (props: any) => <PaginationItem {...props} />,
    PaginationLink: (props: any) => <PaginationLink {...props} />,

    // Table parts.
    Table: (props: any) => <Table {...props} />,
    TableHeader: (props: any) => <TableHeader {...props} />,
    TableBody: (props: any) => <TableBody {...props} />,
    TableFooter: (props: any) => <TableFooter {...props} />,
    TableRow: (props: any) => <TableRow {...props} />,
    TableHead: (props: any) => <TableHead {...props} />,
    TableCell: (props: any) => <TableCell {...props} />,
    TableCaption: (props: any) => <TableCaption {...props} />,

    // Accordion primitives, exposed so MDX can compose them inline. They come
    // from a client boundary (see components/accordion.tsx) so their hooks run
    // inside the server-rendered MDX page. Wrapped like Button to sidestep the
    // ForwardRefExoticComponent type conflict between @types/react and @types/mdx.
    Accordion: (props: any) => <Accordion {...props} />,
    AccordionItem: (props: any) => <AccordionItem {...props} />,
    AccordionHeader: (props: any) => <AccordionHeader {...props} />,
    AccordionTrigger: (props: any) => <AccordionTrigger {...props} />,
    AccordionContent: (props: any) => <AccordionContent {...props} />,

    // Collapsible primitives, exposed so MDX can compose them inline. They come
    // from a client boundary (see components/collapsible.tsx) so their state runs
    // inside the server-rendered MDX page. Wrapped like Button to sidestep the
    // ForwardRefExoticComponent type conflict between @types/react and @types/mdx.
    Collapsible: (props: any) => <Collapsible {...props} />,
    CollapsibleTrigger: (props: any) => <CollapsibleTrigger {...props} />,
    CollapsibleContent: (props: any) => <CollapsibleContent {...props} />,

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

    // Dialog (modal) primitives, exposed so MDX can compose them inline. They
    // come from a client boundary (see components/dialog.tsx) so their
    // context/state runs inside the server-rendered MDX page. Wrapped like
    // Button to sidestep the ForwardRefExoticComponent type conflict between
    // @types/react and @types/mdx.
    Dialog: (props: any) => <Dialog {...props} />,
    DialogTrigger: (props: any) => <DialogTrigger {...props} />,
    DialogPortal: (props: any) => <DialogPortal {...props} />,
    DialogClose: (props: any) => <DialogClose {...props} />,
    DialogOverlay: (props: any) => <DialogOverlay {...props} />,
    DialogContent: (props: any) => <DialogContent {...props} />,
    DialogHeader: (props: any) => <DialogHeader {...props} />,
    DialogTitle: (props: any) => <DialogTitle {...props} />,
    DialogDescription: (props: any) => <DialogDescription {...props} />,
    DialogBody: (props: any) => <DialogBody {...props} />,
    DialogFooter: (props: any) => <DialogFooter {...props} />,

    // Drawer primitives (built on Vaul), exposed so MDX can compose them inline.
    // They come from a client boundary (see components/drawer.tsx). Wrapped like
    // Button to sidestep the ForwardRefExoticComponent type conflict between
    // @types/react and @types/mdx.
    Drawer: (props: any) => <Drawer {...props} />,
    DrawerTrigger: (props: any) => <DrawerTrigger {...props} />,
    DrawerPortal: (props: any) => <DrawerPortal {...props} />,
    DrawerClose: (props: any) => <DrawerClose {...props} />,
    DrawerOverlay: (props: any) => <DrawerOverlay {...props} />,
    DrawerContent: (props: any) => <DrawerContent {...props} />,
    DrawerHeader: (props: any) => <DrawerHeader {...props} />,
    DrawerTitle: (props: any) => <DrawerTitle {...props} />,
    DrawerDescription: (props: any) => <DrawerDescription {...props} />,
    DrawerBody: (props: any) => <DrawerBody {...props} />,

    // Tabs primitives, exposed so MDX can compose them inline. They come from a
    // client boundary (see components/tabs.tsx) so their context/state runs
    // inside the server-rendered MDX page.
    Tabs: (props: any) => <Tabs {...props} />,
    TabsList: (props: any) => <TabsList {...props} />,
    TabsTrigger: (props: any) => <TabsTrigger {...props} />,
    TabsContent: (props: any) => <TabsContent {...props} />,

    // Popover primitives (built on Radix), exposed so MDX can compose them
    // inline. They come from a client boundary (see components/popover.tsx).
    // Wrapped like Button to sidestep the ForwardRefExoticComponent type
    // conflict between @types/react and @types/mdx.
    Popover: (props: any) => <Popover {...props} />,
    PopoverTrigger: (props: any) => <PopoverTrigger {...props} />,
    PopoverAnchor: (props: any) => <PopoverAnchor {...props} />,
    PopoverClose: (props: any) => <PopoverClose {...props} />,
    PopoverContent: (props: any) => <PopoverContent {...props} />,
    PopoverHeader: (props: any) => <PopoverHeader {...props} />,
    PopoverBody: (props: any) => <PopoverBody {...props} />,

    // Tooltip primitives (built on Radix), exposed so MDX can compose them
    // inline. They come from a client boundary (see components/tooltip.tsx).
    // Wrapped like Button to sidestep the ForwardRefExoticComponent type
    // conflict between @types/react and @types/mdx.
    Tooltip: (props: any) => <Tooltip {...props} />,
    TooltipProvider: (props: any) => <TooltipProvider {...props} />,
    TooltipTrigger: (props: any) => <TooltipTrigger {...props} />,
    TooltipContent: (props: any) => <TooltipContent {...props} />,

    // Renders a live example above its source code — see ComponentPreview.tsx.
    ComponentPreview: (props: any) => <ComponentPreview {...props} />,

    // Data-driven API reference table — see PropsTable.tsx.
    PropsTable: (props: any) => <PropsTable {...props} />,

    // Styles standalone fenced code blocks (```tsx ...```) to match the
    // ComponentPreview code panel, adding a copy button — see MdxCodeBlock.tsx.
    pre: (props: any) => <MdxCodeBlock {...props} />,

    // You can also add standard HTML overrides here, for example:
    // h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    //   <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...props} />
    // ),
  };
}
