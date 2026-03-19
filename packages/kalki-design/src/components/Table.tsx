import React, { forwardRef, createContext, useContext } from 'react';
import { CaretUp, CaretDown, CaretUpDown } from '@phosphor-icons/react';
import styles from '../styles/table.module.css';

/* ─── Context ────────────────────────────────────────── */
interface TableContextValue {
  striped: boolean;
  hoverable: boolean;
  compact: boolean;
  stickyHeader: boolean;
}

const TableContext = createContext<TableContextValue>({
  striped: false,
  hoverable: false,
  compact: false,
  stickyHeader: false,
});

/* ─── Table Root ─────────────────────────────────────── */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      striped = false,
      hoverable = false,
      compact = false,
      stickyHeader = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.table,
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TableContext.Provider value={{ striped, hoverable, compact, stickyHeader }}>
        <div className={styles.wrapper}>
          <table ref={ref} className={classNames} {...props}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
TableRoot.displayName = 'Table';

/* ─── Header ─────────────────────────────────────────── */
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { stickyHeader } = useContext(TableContext);
    return (
      <thead
        ref={ref}
        className={`${styles.header} ${stickyHeader ? styles.sticky : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </thead>
    );
  }
);
TableHeader.displayName = 'TableHeader';

/* ─── Body ───────────────────────────────────────────── */
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    const { striped, hoverable } = useContext(TableContext);
    const classNames = [
      styles.body,
      striped && styles.striped,
      hoverable && styles.hoverable,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tbody ref={ref} className={classNames} {...props}>
        {children}
      </tbody>
    );
  }
);
TableBody.displayName = 'TableBody';

/* ─── Row ────────────────────────────────────────────── */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, className, children, ...props }, ref) => {
    const classNames = [
      styles.row,
      selected && styles.selected,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tr ref={ref} className={classNames} {...props}>
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'TableRow';

/* ─── Head Cell ──────────────────────────────────────── */
export interface TableHeadCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  align?: 'left' | 'center' | 'right';
}

const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  ({ sortable, sortDirection, onSort, align, className, children, ...props }, ref) => {
    const classNames = [
      styles.headCell,
      sortable && styles.sortable,
      align && styles[`align-${align}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <th
        ref={ref}
        className={classNames}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
            ? 'descending'
            : undefined
        }
        {...props}
      >
        <span className={styles.headCellContent}>
          {children}
          {sortable && (
            <span className={`${styles.sortIcon} ${sortDirection ? styles.sortIconActive : ''}`} aria-hidden="true">
              {sortDirection === 'asc' ? <CaretUp weight="bold" size={12} /> : sortDirection === 'desc' ? <CaretDown weight="bold" size={12} /> : <CaretUpDown weight="bold" size={12} />}
            </span>
          )}
        </span>
      </th>
    );
  }
);
TableHeadCell.displayName = 'TableHeadCell';

/* ─── Cell ───────────────────────────────────────────── */
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  mono?: boolean;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align, mono, className, children, ...props }, ref) => {
    const classNames = [
      styles.cell,
      align && styles[`align-${align}`],
      mono && styles.mono,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={classNames} {...props}>
        {children}
      </td>
    );
  }
);
TableCell.displayName = 'TableCell';

/* ─── Compound Export ────────────────────────────────── */
const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeadCell: TableHeadCell,
  Cell: TableCell,
});

export default Table;
