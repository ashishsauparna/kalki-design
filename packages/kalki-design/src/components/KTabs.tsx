import React, { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import styles from '../styles/ktabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pills' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const KTabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTab,
      onChange,
      variant = 'underline',
      size = 'md',
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseId = useId();
    const [active, setActive] = useState(activeTab || tabs[0]?.id || '');
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const listRef = useRef<HTMLDivElement>(null);

    const currentActive = activeTab !== undefined ? activeTab : active;

    const updateIndicator = useCallback(() => {
      const el = tabRefs.current.get(currentActive);
      const list = listRef.current;
      if (el && list) {
        const listRect = list.getBoundingClientRect();
        const tabRect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: tabRect.left - listRect.left,
          width: tabRect.width,
        });
      }
    }, [currentActive]);

    useEffect(() => {
      updateIndicator();
    }, [currentActive, updateIndicator]);

    useEffect(() => {
      window.addEventListener('resize', updateIndicator);
      return () => window.removeEventListener('resize', updateIndicator);
    }, [updateIndicator]);

    const handleClick = (id: string) => {
      if (activeTab === undefined) setActive(id);
      onChange?.(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const currentIndex = enabledTabs.findIndex((t) => t.id === currentActive);

      let nextIndex = currentIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = enabledTabs.length - 1;
      }

      if (nextIndex !== currentIndex) {
        const nextTab = enabledTabs[nextIndex];
        handleClick(nextTab.id);
        tabRefs.current.get(nextTab.id)?.focus();
      }
    };

    const rootClassNames = [
      styles.tabs,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={rootClassNames} {...props}>
        <div
          ref={listRef}
          className={styles.list}
          role="tablist"
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab) => {
            const isActive = currentActive === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.id, el);
                }}
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                onClick={() => handleClick(tab.id)}
              >
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={styles.badge}>{tab.badge}</span>
                )}
              </button>
            );
          })}
          {variant === 'underline' && (
            <span className={styles.indicator} style={indicatorStyle} />
          )}
        </div>
      </div>
    );
  }
);

KTabs.displayName = 'KTabs';

/* ─── Tab Panel ──────────────────────────────────────── */
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tabId: string;
  activeTab: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabId, activeTab, children, className, ...props }, ref) => {
    if (tabId !== activeTab) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={`${styles.panel} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = 'TabPanel';

export { KTabs, TabPanel };
export default KTabs;
