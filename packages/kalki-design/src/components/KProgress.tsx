import React, { forwardRef } from 'react';
import styles from '../styles/kprogress.module.css';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  showLabel?: boolean;
  striped?: boolean;
}

const KProgress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      indeterminate = false,
      showLabel = false,
      striped = false,
      className,
      ...props
    },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    const classNames = [
      styles.root,
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const barClassNames = [
      styles.bar,
      styles[variant],
      indeterminate && styles.indeterminate,
      striped && styles.striped,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div className={styles.track}>
          <div
            className={barClassNames}
            style={indeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
        {showLabel && !indeterminate && (
          <span className={styles.label}>{Math.round(pct)}%</span>
        )}
      </div>
    );
  }
);

KProgress.displayName = 'KProgress';

/* ─── Circular Progress ──────────────────────────────── */
export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  indeterminate?: boolean;
  showLabel?: boolean;
}

const KCircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      size: svgSize = 48,
      strokeWidth = 4,
      variant = 'default',
      indeterminate = false,
      showLabel = false,
      className,
      ...props
    },
    ref
  ) => {
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const pct = Math.min(100, Math.max(0, value));
    const offset = circumference - (pct / 100) * circumference;

    return (
      <div
        ref={ref}
        className={`${styles.circularRoot} ${indeterminate ? styles.circularSpin : ''} ${className || ''}`}
        style={{ width: svgSize, height: svgSize }}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
          <circle
            className={styles.circularTrack}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={svgSize / 2}
            cy={svgSize / 2}
          />
          <circle
            className={`${styles.circularBar} ${styles[`circular-${variant}`]}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={svgSize / 2}
            cy={svgSize / 2}
          />
        </svg>
        {showLabel && !indeterminate && (
          <span className={styles.circularLabel}>{Math.round(pct)}%</span>
        )}
      </div>
    );
  }
);

KCircularProgress.displayName = 'KCircularProgress';

export { KProgress, KCircularProgress };
export default KProgress;
