import React, { forwardRef } from 'react';
import styles from '../styles/kbreadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}

const KBreadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator,
      maxItems,
      className,
      ...props
    },
    ref
  ) => {
    const defaultSeparator = (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4l4 4-4 4" />
      </svg>
    );

    let displayItems = items;
    let collapsed = false;

    if (maxItems && items.length > maxItems && maxItems >= 2) {
      displayItems = [items[0], ...items.slice(-(maxItems - 1))];
      collapsed = true;
    }

    return (
      <nav
        ref={ref}
        className={`${styles.breadcrumbs} ${className || ''}`}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className={styles.list}>
          {displayItems.map((item, i) => {
            const isLast = i === displayItems.length - 1;
            const showCollapse = collapsed && i === 0;

            return (
              <React.Fragment key={i}>
                <li className={styles.item}>
                  {isLast ? (
                    <span className={styles.current} aria-current="page">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <a className={styles.link} href={item.href} onClick={item.onClick}>
                      {item.label}
                    </a>
                  ) : (
                    <button className={styles.link} onClick={item.onClick} type="button">
                      {item.label}
                    </button>
                  )}
                </li>
                {showCollapse && (
                  <>
                    <li className={styles.separator} aria-hidden="true">
                      {separator || defaultSeparator}
                    </li>
                    <li className={styles.item}>
                      <span className={styles.ellipsis}>...</span>
                    </li>
                  </>
                )}
                {!isLast && (
                  <li className={styles.separator} aria-hidden="true">
                    {separator || defaultSeparator}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

KBreadcrumbs.displayName = 'KBreadcrumbs';
export default KBreadcrumbs;
