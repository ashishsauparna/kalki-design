'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  /** Label rendered above the select */
  label?: string
  /** Helper text below the select */
  helperText?: string
  /** Error message or boolean error state */
  error?: string | boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      id: propId,
      disabled,
      children,
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
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-muted-foreground px-0.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={displayHelper ? helperId : undefined}
            className={cn(
              'flex h-8 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-8 text-sm text-foreground transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50 mb-0',
              hasError && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {displayHelper && (
          <p
            id={helperId}
            className={cn(
              'text-xs text-muted-foreground px-0.5',
              hasError && 'text-destructive'
            )}
          >
            {displayHelper}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
