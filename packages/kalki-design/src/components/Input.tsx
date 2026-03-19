'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Label rendered above the input */
  label?: string
  /** Helper text below the input */
  helperText?: string
  /** Error message or boolean error state */
  error?: string | boolean
  /** Show a clear (×) button when the input has a value */
  clearable?: boolean
  /** Called when the clear button is clicked */
  onClear?: () => void
  /** Icon or element rendered inside the input on the left */
  iconLeft?: React.ReactNode
  /** Icon or element rendered inside the input on the right */
  iconRight?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      clearable = false,
      onClear,
      iconLeft,
      iconRight,
      id: propId,
      value,
      defaultValue,
      onChange,
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

    // Internal ref for clear button focus restore
    const internalRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef

    // Support controlled and uncontrolled for clearable
    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) ?? ''
    )
    const isControlled = value !== undefined
    const currentValue = isControlled ? String(value) : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue('')
      onClear?.()
      // Dispatch a synthetic change event for controlled consumers
      if (inputRef && 'current' in inputRef && inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set
        nativeInputValueSetter?.call(inputRef.current, '')
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
        inputRef.current.focus()
      }
    }

    const showClear = clearable && currentValue.length > 0 && !disabled

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
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:size-3.5">
              {iconLeft}
            </span>
          )}
          <input
            id={id}
            ref={inputRef}
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={displayHelper ? helperId : undefined}
            className={cn(
              'flex h-8 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-destructive focus-visible:ring-destructive',
              iconLeft && 'pl-9',
              (showClear || iconRight) && 'pr-8',
              className
            )}
            {...props}
          />
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
          {iconRight && !showClear && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:size-3.5">
              {iconRight}
            </span>
          )}
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
Input.displayName = 'Input'

export { Input }
