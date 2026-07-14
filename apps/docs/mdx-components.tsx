import type { MDXComponents } from "mdx/types";
import { Button } from "@hummingbirdui/react/button";
import { ButtonGroup, ButtonToolbar } from "@hummingbirdui/react/button-group";
import { Alert, AlertIcon } from "@hummingbirdui/react/alert";
import { Badge, BadgeActionButton } from "@hummingbirdui/react/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@hummingbirdui/react/avatar";
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
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { MdxCodeBlock } from "@/components/docs/MdxCodeBlock";
import { PropsTable } from "@/components/docs/PropsTable";
import { ThemeSwatches } from "@/components/docs/ThemeSwatches";

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
    Switch: (props: any) => <Switch {...props} />,
    InputGroup: (props: any) => <InputGroup {...props} />,
    InputGroupText: (props: any) => <InputGroupText {...props} />,

    // List group parts.
    ListGroup: (props: any) => <ListGroup {...props} />,
    ListGroupItem: (props: any) => <ListGroupItem {...props} />,
    ListText: (props: any) => <ListText {...props} />,
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
    ComponentPreview: (props: any) => <ComponentPreview {...props} />,

    PropsTable: (props: any) => <PropsTable {...props} />,
    ThemeSwatches: (props: any) => <ThemeSwatches {...props} />,
    pre: (props: any) => <MdxCodeBlock {...props} />,
  };
}
