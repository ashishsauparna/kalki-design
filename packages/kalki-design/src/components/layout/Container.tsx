import React, { forwardRef } from 'react';
import styles from '../../styles/layout.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
}

const sizeMap = {
  sm: 'var(--container-sm)',
  md: 'var(--container-md)',
  lg: 'var(--container-lg)',
  xl: 'var(--container-xl)',
  full: '100%',
} as const;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', center = true, style, className, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: sizeMap[size],
      ...(center && { marginLeft: 'auto', marginRight: 'auto' }),
      paddingLeft: 'var(--space-base)',
      paddingRight: 'var(--space-base)',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={computedStyle}
        className={className}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
export default Container;
