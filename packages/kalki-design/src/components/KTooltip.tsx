import React, { useState, useRef, useEffect, useId } from 'react';
import styles from '../styles/ktooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number;
  className?: string;
}

const KTooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delay = 300,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();
  const tooltipId = `tooltip-${id}`;

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const toggle = () => {
    if (isTouch) setVisible((v) => !v);
  };

  const classNames = [
    styles.tooltip,
    styles[side],
    styles[`align_${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={!isTouch ? show : undefined}
      onMouseLeave={!isTouch ? hide : undefined}
      onFocus={!isTouch ? show : undefined}
      onBlur={!isTouch ? hide : undefined}
      onClick={toggle}
    >
      <span aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </span>
      {visible && (
        <span id={tooltipId} role="tooltip" className={classNames}>
          <span className={styles.arrow} />
          {content}
        </span>
      )}
    </span>
  );
};

KTooltip.displayName = 'KTooltip';
export default KTooltip;
