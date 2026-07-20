import * as React from 'react';
import { cn } from '../../utils/cn';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export type ColSpanNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColOffsetNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type ColSpan = ColSpanNumber | 'auto' | boolean;
export type ColSize = ColSpan | { span?: ColSpan; offset?: ColOffsetNumber };
export type RowCols = 1 | 2 | 3 | 4 | 5 | 6 | 'auto';

/** Equal-width column (`span: true`) per breakpoint. */
const COL_EQUAL: Record<Breakpoint, string> = {
  xs: 'col',
  sm: 'sm:col',
  md: 'md:col',
  lg: 'lg:col',
  xl: 'xl:col',
  xxl: '2xl:col',
};

const COL_SPAN: Record<Breakpoint, Record<ColSpanNumber | 'auto', string>> = {
  xs: {
    auto: 'col-auto',
    1: 'col-1',
    2: 'col-2',
    3: 'col-3',
    4: 'col-4',
    5: 'col-5',
    6: 'col-6',
    7: 'col-7',
    8: 'col-8',
    9: 'col-9',
    10: 'col-10',
    11: 'col-11',
    12: 'col-12',
  },
  sm: {
    auto: 'sm:col-auto',
    1: 'sm:col-1',
    2: 'sm:col-2',
    3: 'sm:col-3',
    4: 'sm:col-4',
    5: 'sm:col-5',
    6: 'sm:col-6',
    7: 'sm:col-7',
    8: 'sm:col-8',
    9: 'sm:col-9',
    10: 'sm:col-10',
    11: 'sm:col-11',
    12: 'sm:col-12',
  },
  md: {
    auto: 'md:col-auto',
    1: 'md:col-1',
    2: 'md:col-2',
    3: 'md:col-3',
    4: 'md:col-4',
    5: 'md:col-5',
    6: 'md:col-6',
    7: 'md:col-7',
    8: 'md:col-8',
    9: 'md:col-9',
    10: 'md:col-10',
    11: 'md:col-11',
    12: 'md:col-12',
  },
  lg: {
    auto: 'lg:col-auto',
    1: 'lg:col-1',
    2: 'lg:col-2',
    3: 'lg:col-3',
    4: 'lg:col-4',
    5: 'lg:col-5',
    6: 'lg:col-6',
    7: 'lg:col-7',
    8: 'lg:col-8',
    9: 'lg:col-9',
    10: 'lg:col-10',
    11: 'lg:col-11',
    12: 'lg:col-12',
  },
  xl: {
    auto: 'xl:col-auto',
    1: 'xl:col-1',
    2: 'xl:col-2',
    3: 'xl:col-3',
    4: 'xl:col-4',
    5: 'xl:col-5',
    6: 'xl:col-6',
    7: 'xl:col-7',
    8: 'xl:col-8',
    9: 'xl:col-9',
    10: 'xl:col-10',
    11: 'xl:col-11',
    12: 'xl:col-12',
  },
  xxl: {
    auto: '2xl:col-auto',
    1: '2xl:col-1',
    2: '2xl:col-2',
    3: '2xl:col-3',
    4: '2xl:col-4',
    5: '2xl:col-5',
    6: '2xl:col-6',
    7: '2xl:col-7',
    8: '2xl:col-8',
    9: '2xl:col-9',
    10: '2xl:col-10',
    11: '2xl:col-11',
    12: '2xl:col-12',
  },
};

const COL_OFFSET: Record<Breakpoint, Record<ColOffsetNumber, string>> = {
  xs: {
    0: 'offset-0',
    1: 'offset-1',
    2: 'offset-2',
    3: 'offset-3',
    4: 'offset-4',
    5: 'offset-5',
    6: 'offset-6',
    7: 'offset-7',
    8: 'offset-8',
    9: 'offset-9',
    10: 'offset-10',
    11: 'offset-11',
  },
  sm: {
    0: 'sm:offset-0',
    1: 'sm:offset-1',
    2: 'sm:offset-2',
    3: 'sm:offset-3',
    4: 'sm:offset-4',
    5: 'sm:offset-5',
    6: 'sm:offset-6',
    7: 'sm:offset-7',
    8: 'sm:offset-8',
    9: 'sm:offset-9',
    10: 'sm:offset-10',
    11: 'sm:offset-11',
  },
  md: {
    0: 'md:offset-0',
    1: 'md:offset-1',
    2: 'md:offset-2',
    3: 'md:offset-3',
    4: 'md:offset-4',
    5: 'md:offset-5',
    6: 'md:offset-6',
    7: 'md:offset-7',
    8: 'md:offset-8',
    9: 'md:offset-9',
    10: 'md:offset-10',
    11: 'md:offset-11',
  },
  lg: {
    0: 'lg:offset-0',
    1: 'lg:offset-1',
    2: 'lg:offset-2',
    3: 'lg:offset-3',
    4: 'lg:offset-4',
    5: 'lg:offset-5',
    6: 'lg:offset-6',
    7: 'lg:offset-7',
    8: 'lg:offset-8',
    9: 'lg:offset-9',
    10: 'lg:offset-10',
    11: 'lg:offset-11',
  },
  xl: {
    0: 'xl:offset-0',
    1: 'xl:offset-1',
    2: 'xl:offset-2',
    3: 'xl:offset-3',
    4: 'xl:offset-4',
    5: 'xl:offset-5',
    6: 'xl:offset-6',
    7: 'xl:offset-7',
    8: 'xl:offset-8',
    9: 'xl:offset-9',
    10: 'xl:offset-10',
    11: 'xl:offset-11',
  },
  xxl: {
    0: '2xl:offset-0',
    1: '2xl:offset-1',
    2: '2xl:offset-2',
    3: '2xl:offset-3',
    4: '2xl:offset-4',
    5: '2xl:offset-5',
    6: '2xl:offset-6',
    7: '2xl:offset-7',
    8: '2xl:offset-8',
    9: '2xl:offset-9',
    10: '2xl:offset-10',
    11: '2xl:offset-11',
  },
};

const ROW_COLS: Record<Breakpoint, Record<RowCols, string>> = {
  xs: {
    auto: 'row-cols-auto',
    1: 'row-cols-1',
    2: 'row-cols-2',
    3: 'row-cols-3',
    4: 'row-cols-4',
    5: 'row-cols-5',
    6: 'row-cols-6',
  },
  sm: {
    auto: 'sm:row-cols-auto',
    1: 'sm:row-cols-1',
    2: 'sm:row-cols-2',
    3: 'sm:row-cols-3',
    4: 'sm:row-cols-4',
    5: 'sm:row-cols-5',
    6: 'sm:row-cols-6',
  },
  md: {
    auto: 'md:row-cols-auto',
    1: 'md:row-cols-1',
    2: 'md:row-cols-2',
    3: 'md:row-cols-3',
    4: 'md:row-cols-4',
    5: 'md:row-cols-5',
    6: 'md:row-cols-6',
  },
  lg: {
    auto: 'lg:row-cols-auto',
    1: 'lg:row-cols-1',
    2: 'lg:row-cols-2',
    3: 'lg:row-cols-3',
    4: 'lg:row-cols-4',
    5: 'lg:row-cols-5',
    6: 'lg:row-cols-6',
  },
  xl: {
    auto: 'xl:row-cols-auto',
    1: 'xl:row-cols-1',
    2: 'xl:row-cols-2',
    3: 'xl:row-cols-3',
    4: 'xl:row-cols-4',
    5: 'xl:row-cols-5',
    6: 'xl:row-cols-6',
  },
  xxl: {
    auto: '2xl:row-cols-auto',
    1: '2xl:row-cols-1',
    2: '2xl:row-cols-2',
    3: '2xl:row-cols-3',
    4: '2xl:row-cols-4',
    5: '2xl:row-cols-5',
    6: '2xl:row-cols-6',
  },
};

//  ===================================
//  Container
//  ===================================

export interface ContainerProps extends React.ComponentProps<'div'> {}

function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('container', className)} {...props} />;
}

Container.displayName = 'Container';

//  ===================================
//  Row
//  ===================================

export interface RowProps extends React.ComponentProps<'div'> {
  xs?: RowCols;
  sm?: RowCols;
  md?: RowCols;
  lg?: RowCols;
  xl?: RowCols;
  xxl?: RowCols;
}

function Row({ className, xs, sm, md, lg, xl, xxl, ...props }: RowProps) {
  const values: Record<Breakpoint, RowCols | undefined> = { xs, sm, md, lg, xl, xxl };

  const classes = BREAKPOINTS.map((bp) => {
    const value = values[bp];
    return value != null ? ROW_COLS[bp][value] : undefined;
  });

  return <div className={cn('row', classes, className)} {...props} />;
}

Row.displayName = 'Row';

//  ===================================
//  Col
//  ===================================

export interface ColProps extends React.ComponentProps<'div'> {
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
}

function Col({ className, xs, sm, md, lg, xl, xxl, ...props }: ColProps) {
  const values: Record<Breakpoint, ColSize | undefined> = { xs, sm, md, lg, xl, xxl };

  const classes: string[] = [];
  let hasSpan = false;

  for (const bp of BREAKPOINTS) {
    const value = values[bp];
    if (value == null || value === false) continue;

    const span = typeof value === 'object' ? value.span : value;
    const offset = typeof value === 'object' ? value.offset : undefined;

    if (span === true) {
      classes.push(COL_EQUAL[bp]);
      hasSpan = true;
    } else if (span != null && span !== false) {
      classes.push(COL_SPAN[bp][span]);
      hasSpan = true;
    }

    if (offset != null) {
      classes.push(COL_OFFSET[bp][offset]);
    }
  }

  // No span at any breakpoint → plain equal-width column.
  return <div className={cn(!hasSpan && 'col', classes, className)} {...props} />;
}

Col.displayName = 'Col';

export { Container, Row, Col };
