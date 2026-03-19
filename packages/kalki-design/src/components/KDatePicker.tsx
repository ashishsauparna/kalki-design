import React, { useState, useRef, useEffect, useId } from 'react';
import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from '../styles/kdatepicker.module.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const KDatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  helperText,
  error,
  disabled = false,
  minDate,
  maxDate,
  size = 'md',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => (value || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (value || new Date()).getMonth());
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const helperId = `${id}-helper`;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;
  const displayHelper = errorMessage || helperText;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [isOpen]);

  // When value changes, sync the view
  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const selectDate = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    onChange?.(date);
    setIsOpen(false);
  };

  const isDisabledDate = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  // Build calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const today = new Date();

  const triggerClasses = [
    styles.trigger,
    styles[size],
    isOpen && styles.open,
    hasError && styles.error,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={`${styles.field} ${className || ''}`}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}

      <button
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-describedby={displayHelper ? helperId : undefined}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        <CalendarBlank size={16} weight="regular" className={styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.calendar} role="dialog" aria-label="Date picker">
          <div className={styles.calendarHeader}>
            <button type="button" className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
              <CaretLeft size={14} weight="bold" />
            </button>
            <span className={styles.monthYear}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
              <CaretRight size={14} weight="bold" />
            </button>
          </div>

          <div className={styles.weekdays}>
            {DAYS.map((d) => (
              <span key={d} className={styles.weekday}>{d}</span>
            ))}
          </div>

          <div className={styles.days}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`empty-${i}`} className={styles.dayEmpty} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(viewYear, viewMonth, day);
              const isSelected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              const isDayDisabled = isDisabledDate(day);

              return (
                <button
                  key={day}
                  type="button"
                  className={[
                    styles.day,
                    isSelected && styles.daySelected,
                    isToday && !isSelected && styles.dayToday,
                    isDayDisabled && styles.dayDisabled,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !isDayDisabled && selectDate(day)}
                  disabled={isDayDisabled}
                  aria-label={formatDate(date)}
                  aria-selected={isSelected || undefined}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {displayHelper && (
        <span id={helperId} className={`${styles.helperText} ${hasError ? styles.errorText : ''}`}>
          {displayHelper}
        </span>
      )}
    </div>
  );
};

KDatePicker.displayName = 'KDatePicker';
export default KDatePicker;
