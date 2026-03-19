import React, { forwardRef } from 'react';
import styles from '../styles/kskeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  count?: number;
  animate?: boolean;
}

const KSkeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      count = 1,
      animate = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const elements = Array.from({ length: count });

    const classNames = [
      styles.skeleton,
      styles[variant],
      animate && styles.animate,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <>
        {elements.map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? ref : undefined}
            className={classNames}
            style={{ width, height, ...style }}
            aria-hidden="true"
            {...props}
          />
        ))}
      </>
    );
  }
);

KSkeleton.displayName = 'KSkeleton';
export default KSkeleton;
