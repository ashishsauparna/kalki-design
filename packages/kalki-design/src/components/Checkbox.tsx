'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /** Label rendered next to the checkbox */
  label?: string
  /** Subtext rendered below the label */
  helperText?: string
  /** Error message or boolean error state */
  error?: string | boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      id: propId,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId()
    const id = propId ?? autoId
    const helperId = `${id}-helper`
    const hasError = Boolean(error)
    const errorMessage = typeof error === 'string' ? error : undefined
    const displayHelper = errorMessage ?? helperText

    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center mt-[3px]">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={displayHelper ? helperId : undefined}
            className={cn(
              'peer size-4 shrink-0 rounded border border-input bg-background ring-offset-background appearance-none transition-colors cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            {...props}
          />
          {/* Custom Checkmark Icon */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {/* Checked Background */}
          <div className="absolute inset-0 size-4 rounded pointer-events-none peer-checked:bg-primary -z-10 transition-colors" />
        </div>
        {(label || displayHelper) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'text-sm font-medium leading-none cursor-pointer',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {displayHelper && (
              <p
                id={helperId}
                className={cn(
                  'text-xs mt-1 text-muted-foreground',
                  hasError && 'text-destructive',
                  disabled && 'opacity-50'
                )}
              >
                {displayHelper}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
