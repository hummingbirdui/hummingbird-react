import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
} from './table';

// A complete table used across the tests.
function Example(props: React.ComponentProps<typeof Table>) {
  return (
    <Table {...props}>
      <TableCaption>User list</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe('Table', () => {
  describe('Rendering', () => {
    it('renders a table element with the table base class', () => {
      render(<Example />);
      const table = screen.getByRole('table');
      expect(table).toBeInstanceOf(HTMLTableElement);
      expect(table).toHaveClass('table');
      expect(table).toHaveAttribute('data-slot', 'table');
    });

    it('renders the correct semantic structure', () => {
      render(<Example />);
      const table = screen.getByRole('table');
      expect(table.querySelector('thead')).toHaveAttribute('data-slot', 'table-header');
      expect(table.querySelector('tbody')).toHaveAttribute('data-slot', 'table-body');
      expect(table.querySelector('tfoot')).toHaveAttribute('data-slot', 'table-footer');
      expect(table.querySelector('caption')).toHaveAttribute('data-slot', 'table-caption');
      expect(table.querySelector('thead tr')).toHaveAttribute('data-slot', 'table-row');
      expect(table.querySelector('th')).toHaveAttribute('data-slot', 'table-head');
      expect(table.querySelector('td')).toHaveAttribute('data-slot', 'table-cell');
    });

    it('renders header, body, footer, and caption content', () => {
      render(<Example />);
      expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInstanceOf(
        HTMLTableCellElement
      );
      expect(screen.getByRole('cell', { name: 'Ada' })).toBeInstanceOf(HTMLTableCellElement);
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('User list')).toBeInTheDocument();
    });

    it('sub-components carry no class of their own by default', () => {
      render(<Example />);
      const table = screen.getByRole('table');
      expect(table.querySelector('thead')?.getAttribute('class')).toBeNull();
      expect(table.querySelector('tbody')?.getAttribute('class')).toBeNull();
      expect(table.querySelector('tfoot')?.getAttribute('class')).toBeNull();
      expect(table.querySelector('caption')?.getAttribute('class')).toBeNull();
      expect(table.querySelector('th')?.getAttribute('class')).toBeNull();
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'md', expected: '' },
      { size: 'sm', expected: 'table-sm' },
    ] as const;

    it('applies size classes correctly', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(<Example size={size} />);
        const table = screen.getByRole('table');
        expect(table).toHaveClass('table');
        if (expected) {
          expect(table).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const colors = [
      { color: 'default', expected: '' },
      { color: 'neutral', expected: 'table-neutral' },
      { color: 'primary', expected: 'table-primary' },
      { color: 'secondary', expected: 'table-secondary' },
      { color: 'info', expected: 'table-info' },
      { color: 'success', expected: 'table-success' },
      { color: 'warning', expected: 'table-warning' },
      { color: 'danger', expected: 'table-danger' },
    ] as const;

    it('applies color classes correctly', () => {
      colors.forEach(({ color, expected }) => {
        const { unmount } = render(<Example color={color} />);
        const table = screen.getByRole('table');
        expect(table).toHaveClass('table');
        if (expected) {
          expect(table).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Modifiers', () => {
    const modifiers = [
      { prop: 'striped', expected: 'table-striped' },
      { prop: 'stripedColumns', expected: 'table-striped-columns' },
      { prop: 'bordered', expected: 'table-bordered' },
      { prop: 'borderless', expected: 'table-borderless' },
      { prop: 'hover', expected: 'table-hover' },
      { prop: 'highlight', expected: 'table-highlight' },
      { prop: 'stickyHeader', expected: 'table-sticky-header' },
      { prop: 'active', expected: 'table-active' },
    ] as const;

    it('applies each boolean modifier class when true', () => {
      modifiers.forEach(({ prop, expected }) => {
        const { unmount } = render(<Example {...{ [prop]: true }} />);
        expect(screen.getByRole('table')).toHaveClass('table', expected);
        unmount();
      });
    });

    it('omits modifier classes when false', () => {
      modifiers.forEach(({ prop, expected }) => {
        const { unmount } = render(<Example {...{ [prop]: false }} />);
        expect(screen.getByRole('table')).not.toHaveClass(expected);
        unmount();
      });
    });

    it('omits all modifier classes by default', () => {
      render(<Example />);
      const table = screen.getByRole('table');
      modifiers.forEach(({ expected }) => {
        expect(table).not.toHaveClass(expected);
      });
    });

    it('combines multiple modifiers', () => {
      render(<Example striped hover bordered size="sm" color="primary" />);
      expect(screen.getByRole('table')).toHaveClass(
        'table',
        'table-striped',
        'table-hover',
        'table-bordered',
        'table-sm',
        'table-primary'
      );
    });
  });

  describe('Class Merging', () => {
    it('merges custom className on the table', () => {
      render(<Example striped className="custom-table" />);
      expect(screen.getByRole('table')).toHaveClass('table', 'table-striped', 'custom-table');
    });

    it('passes className through on every sub-component', () => {
      render(
        <Table>
          <TableCaption className="c-caption">Caption</TableCaption>
          <TableHeader className="c-head">
            <TableRow className="c-row">
              <TableHead className="c-th">H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="c-body">
            <TableRow>
              <TableCell className="c-td">D</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className="c-foot">
            <TableRow>
              <TableCell>F</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table.querySelector('caption')).toHaveClass('c-caption');
      expect(table.querySelector('thead')).toHaveClass('c-head');
      expect(table.querySelector('thead tr')).toHaveClass('c-row');
      expect(table.querySelector('th')).toHaveClass('c-th');
      expect(table.querySelector('tbody')).toHaveClass('c-body');
      expect(table.querySelector('tbody td')).toHaveClass('c-td');
      expect(table.querySelector('tfoot')).toHaveClass('c-foot');
    });
  });

  describe('TableRow', () => {
    it('renders a tr element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId('row')).toBeInstanceOf(HTMLTableRowElement);
    });

    it('applies table-active when active', () => {
      render(
        <Table>
          <TableBody>
            <TableRow active data-testid="row">
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId('row')).toHaveClass('table-active');
    });

    it('has no class when active is false', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId('row')).not.toHaveClass('table-active');
    });
  });

  describe('TableCell', () => {
    it('renders a td element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('cell');
      expect(cell).toBeInstanceOf(HTMLTableCellElement);
      expect(cell.tagName).toBe('TD');
    });

    it('applies table-active when active', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell active data-testid="cell">
                x
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId('cell')).toHaveClass('table-active');
    });

    it('preserves native cell attributes like colSpan', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} data-testid="cell">
                x
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId('cell')).toHaveAttribute('colspan', '2');
    });
  });

  describe('TableHead', () => {
    it('renders a th element and preserves scope', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByRole('columnheader', { name: 'Name' });
      expect(head.tagName).toBe('TH');
      expect(head).toHaveAttribute('scope', 'col');
    });
  });

  describe('TableCaption', () => {
    it('renders a caption element inside the table', () => {
      render(
        <Table>
          <TableCaption>Monthly report</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const caption = screen.getByText('Monthly report');
      expect(caption.tagName).toBe('CAPTION');
      expect(screen.getByRole('table')).toContainElement(caption);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the table element', () => {
      const ref = React.createRef<HTMLTableElement>();
      render(
        <Table ref={ref}>
          <TableBody>
            <TableRow>
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableElement);
      expect(ref.current?.className).toContain('table');
    });

    it('forwards refs to sub-component elements', () => {
      const rowRef = React.createRef<HTMLTableRowElement>();
      const cellRef = React.createRef<HTMLTableCellElement>();
      render(
        <Table>
          <TableBody>
            <TableRow ref={rowRef}>
              <TableCell ref={cellRef}>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
      expect(cellRef.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });

  describe('Display Name', () => {
    it.each([
      [Table, 'Table'],
      [TableHeader, 'TableHeader'],
      [TableBody, 'TableBody'],
      [TableFooter, 'TableFooter'],
      [TableRow, 'TableRow'],
      [TableHead, 'TableHead'],
      [TableCell, 'TableCell'],
      [TableCaption, 'TableCaption'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes table semantics via roles', () => {
      render(<Example />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('rowgroup')).toHaveLength(3); // thead, tbody, tfoot
      expect(screen.getAllByRole('row')).toHaveLength(3);
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(4);
    });

    it('names the table with its caption', () => {
      render(<Example />);
      expect(screen.getByRole('table', { name: /user list/i })).toBeInTheDocument();
    });

    it('supports aria-label on the table', () => {
      render(
        <Table aria-label="Data grid">
          <TableBody>
            <TableRow>
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table', { name: /data grid/i })).toBeInTheDocument();
    });
  });
});

describe('tableVariants', () => {
  it('generates the base class by default with no modifiers', () => {
    expect(tableVariants()).toBe('table');
  });

  it('generates the size class', () => {
    expect(tableVariants({ size: 'sm' })).toContain('table-sm');
    expect(tableVariants({ size: 'md' })).not.toContain('table-sm');
  });

  it('generates color classes', () => {
    const colors = [
      'neutral',
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
    ] as const;
    colors.forEach((color) => {
      expect(tableVariants({ color })).toContain(`table-${color}`);
    });
    expect(tableVariants({ color: 'default' })).toBe('table');
  });

  it('generates each boolean modifier class', () => {
    expect(tableVariants({ striped: true })).toContain('table-striped');
    expect(tableVariants({ stripedColumns: true })).toContain('table-striped-columns');
    expect(tableVariants({ bordered: true })).toContain('table-bordered');
    expect(tableVariants({ borderless: true })).toContain('table-borderless');
    expect(tableVariants({ hover: true })).toContain('table-hover');
    expect(tableVariants({ highlight: true })).toContain('table-highlight');
    expect(tableVariants({ stickyHeader: true })).toContain('table-sticky-header');
    expect(tableVariants({ active: true })).toContain('table-active');
  });

  it('combines size, color, and modifiers', () => {
    const classes = tableVariants({
      size: 'sm',
      color: 'danger',
      striped: true,
      hover: true,
      bordered: true,
    });
    expect(classes).toContain('table');
    expect(classes).toContain('table-sm');
    expect(classes).toContain('table-danger');
    expect(classes).toContain('table-striped');
    expect(classes).toContain('table-hover');
    expect(classes).toContain('table-bordered');
  });
});
