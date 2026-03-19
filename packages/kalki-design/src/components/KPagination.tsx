import React, { forwardRef, useMemo } from 'react';
import styles from '../styles/kpagination.module.css';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  total: number;
  page: number;
  onChange: (page: number) => void;
  pageSize?: number;
  siblingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showEdges?: boolean;
}

function getRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const KPagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      page,
      onChange,
      pageSize = 10,
      siblingCount = 1,
      size = 'md',
      showEdges = true,
      className,
      ...props
    },
    ref
  ) => {
    const totalPages = Math.ceil(total / pageSize);

    const pages = useMemo(() => {
      const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
      const totalBlocks = totalNumbers + 2; // + 2 ellipses

      if (totalPages <= totalBlocks) {
        return getRange(1, totalPages);
      }

      const leftSibling = Math.max(page - siblingCount, 1);
      const rightSibling = Math.min(page + siblingCount, totalPages);

      const showLeftDots = leftSibling > 2;
      const showRightDots = rightSibling < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        const leftRange = getRange(1, 3 + 2 * siblingCount);
        return [...leftRange, 'dots-right', totalPages];
      }

      if (showLeftDots && !showRightDots) {
        const rightRange = getRange(totalPages - (2 + 2 * siblingCount), totalPages);
        return [1, 'dots-left', ...rightRange];
      }

      const middleRange = getRange(leftSibling, rightSibling);
      return [1, 'dots-left', ...middleRange, 'dots-right', totalPages];
    }, [page, totalPages, siblingCount]);

    if (totalPages <= 1) return null;

    return (
      <nav
        ref={ref}
        className={`${styles.pagination} ${styles[size]} ${className || ''}`}
        aria-label="Pagination"
        {...props}
      >
        {showEdges && (
          <button
            className={`${styles.item} ${styles.arrow}`}
            onClick={() => onChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
          </button>
        )}

        {pages.map((p, i) => {
          if (typeof p === 'string') {
            return (
              <span key={p} className={styles.dots}>
                ...
              </span>
            );
          }

          return (
            <button
              key={p}
              className={`${styles.item} ${p === page ? styles.active : ''}`}
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        {showEdges && (
          <button
            className={`${styles.item} ${styles.arrow}`}
            onClick={() => onChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        )}
      </nav>
    );
  }
);

KPagination.displayName = 'KPagination';
export default KPagination;
