import React, { forwardRef, useState, useRef, useCallback, useId } from 'react';
import styles from '../styles/kslider.module.css';

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number[]) => void;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const KSlider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [0],
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled = false,
      label,
      showValue = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const trackRef = useRef<HTMLDivElement>(null);
    const id = useId();

    const currentValue = controlledValue ?? internalValue;

    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    const updateValue = useCallback(
      (index: number, clientX: number) => {
        if (!trackRef.current || disabled) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const raw = min + percent * (max - min);
        const stepped = Math.round(raw / step) * step;
        const clamped = Math.max(min, Math.min(max, stepped));

        const next = [...currentValue];
        next[index] = clamped;
        // Keep range thumbs in order
        if (next.length === 2) {
          if (index === 0 && next[0] > next[1]) next[0] = next[1];
          if (index === 1 && next[1] < next[0]) next[1] = next[0];
        }

        if (!controlledValue) setInternalValue(next);
        onChange?.(next);
      },
      [currentValue, controlledValue, min, max, step, disabled, onChange]
    );

    const handlePointerDown = (index: number) => (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => updateValue(index, ev.clientX);
      const onUp = () => {
        target.removeEventListener('pointermove', onMove);
        target.removeEventListener('pointerup', onUp);
      };

      target.addEventListener('pointermove', onMove);
      target.addEventListener('pointerup', onUp);
      updateValue(index, e.clientX);
    };

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
      if (disabled) return;
      let next = currentValue[index];
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          next = Math.min(max, next + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          next = Math.max(min, next - step);
          break;
        case 'Home':
          e.preventDefault();
          next = min;
          break;
        case 'End':
          e.preventDefault();
          next = max;
          break;
        default:
          return;
      }
      const vals = [...currentValue];
      vals[index] = next;
      if (!controlledValue) setInternalValue(vals);
      onChange?.(vals);
    };

    // Range fill
    const rangeStart = currentValue.length === 2 ? getPercent(currentValue[0]) : 0;
    const rangeEnd = currentValue.length === 2
      ? getPercent(currentValue[1])
      : getPercent(currentValue[0]);

    const classNames = [styles.slider, disabled && styles.disabled, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames}>
        {label && (
          <div className={styles.labelRow}>
            <label className={styles.label}>{label}</label>
            {showValue && (
              <span className={styles.valueDisplay}>
                {currentValue.length === 2
                  ? `${currentValue[0]} – ${currentValue[1]}`
                  : currentValue[0]}
              </span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className={styles.track}
          role="presentation"
        >
          <div
            className={styles.range}
            style={{ left: `${rangeStart}%`, width: `${rangeEnd - rangeStart}%` }}
          />
          {currentValue.map((val, i) => (
            <span
              key={i}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuenow={val}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-label={label || `Slider thumb ${i + 1}`}
              aria-disabled={disabled || undefined}
              className={styles.thumb}
              style={{ left: `${getPercent(val)}%` }}
              onPointerDown={handlePointerDown(i)}
              onKeyDown={handleKeyDown(i)}
            />
          ))}
        </div>
      </div>
    );
  }
);

KSlider.displayName = 'KSlider';
export default KSlider;
