import React, { forwardRef } from 'react';
import styles from '../styles/kavatar.module.css';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const KAvatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      initials,
      size = 'md',
      shape = 'circle',
      status,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.avatar,
      styles[size],
      styles[shape],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const [imgError, setImgError] = React.useState(false);
    const showFallback = !src || imgError;

    return (
      <span ref={ref} className={classNames} {...props}>
        {!showFallback ? (
          <img
            className={styles.image}
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span className={styles.initials}>{initials}</span>
        ) : (
          <svg
            className={styles.fallbackIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
        {status && (
          <span className={`${styles.status} ${styles[`status-${status}`]}`} />
        )}
      </span>
    );
  }
);

KAvatar.displayName = 'KAvatar';

/* ─── Avatar Group ───────────────────────────────────── */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
  children: React.ReactNode;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = 'md', children, className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visible = max ? childArray.slice(0, max) : childArray;
    const overflow = max ? childArray.length - max : 0;

    return (
      <div ref={ref} className={`${styles.group} ${className || ''}`} {...props}>
        {visible.map((child, i) =>
          React.isValidElement<AvatarProps>(child)
            ? React.cloneElement(child, { size, key: i })
            : child
        )}
        {overflow > 0 && (
          <span className={`${styles.avatar} ${styles[size]} ${styles.circle} ${styles.overflow}`}>
            <span className={styles.initials}>+{overflow}</span>
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { KAvatar, AvatarGroup };
export default KAvatar;
