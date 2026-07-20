import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tableVariants = cva('table', {
  variants: {
    size: { md: '', sm: 'table-sm' },
    color: {
      default: '',
      neutral: 'table-neutral',
      primary: 'table-primary',
      secondary: 'table-secondary',
      info: 'table-info',
      success: 'table-success',
      warning: 'table-warning',
      danger: 'table-danger',
    },
    // Independent, combinable boolean modifiers.
    striped: { true: 'table-striped', false: '' },
    stripedColumns: { true: 'table-striped-columns', false: '' },
    bordered: { true: 'table-bordered', false: '' },
    borderless: { true: 'table-borderless', false: '' },
    hover: { true: 'table-hover', false: '' },
    highlight: { true: 'table-highlight', false: '' },
    stickyHeader: { true: 'table-sticky-header', false: '' },
    active: { true: 'table-active', false: '' },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    striped: false,
    stripedColumns: false,
    bordered: false,
    borderless: false,
    hover: false,
    highlight: false,
    stickyHeader: false,
    active: false,
  },
});

export interface TableProps
  extends Omit<React.ComponentProps<'table'>, 'color'>, VariantProps<typeof tableVariants> {}

function Table({
  className,
  size,
  color,
  striped,
  stripedColumns,
  bordered,
  borderless,
  hover,
  highlight,
  stickyHeader,
  active,
  ...props
}: TableProps) {
  return (
    <table
      data-slot="table"
      className={cn(
        tableVariants({
          size,
          color,
          striped,
          stripedColumns,
          bordered,
          borderless,
          hover,
          highlight,
          stickyHeader,
          active,
        }),
        className
      )}
      {...props}
    />
  );
}

Table.displayName = 'Table';

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={className} {...props} />;
}
TableHeader.displayName = 'TableHeader';

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}
TableBody.displayName = 'TableBody';

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return <tfoot data-slot="table-footer" className={className} {...props} />;
}
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.ComponentProps<'tr'> {
  active?: boolean;
}

function TableRow({ className, active = false, ...props }: TableRowProps) {
  return (
    <tr data-slot="table-row" className={cn(active && 'table-active', className)} {...props} />
  );
}
TableRow.displayName = 'TableRow';

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th data-slot="table-head" className={className} {...props} />;
}
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.ComponentProps<'td'> {
  active?: boolean;
}

function TableCell({ className, active = false, ...props }: TableCellProps) {
  return (
    <td data-slot="table-cell" className={cn(active && 'table-active', className)} {...props} />
  );
}
TableCell.displayName = 'TableCell';

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return <caption data-slot="table-caption" className={className} {...props} />;
}
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
};
