'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Label rendered above the textarea */
  label?: string
  /** Helper text below the textarea */
  helperText?: string
  /** Error message or boolean error state */
  error?: string | boolean
}

const MIN_HEIGHT = 40
const MAX_HEIGHT = 240

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
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

    // Internal ref for resizing
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef

    const isControlled = value !== undefined

    // Initial resize if needed
    React.useEffect(() => {
      const el = textareaRef.current
      if (el) {
        el.style.height = 'auto'
        const newHeight = Math.min(Math.max(el.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)
        el.style.height = `${newHeight}px`
      }
    }, [value, defaultValue])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement
      target.style.height = 'auto'
      const newHeight = Math.min(Math.max(target.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)
      target.style.height = `${newHeight}px`
    }

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
          <textarea
            id={id}
            ref={textareaRef}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onInput={handleInput}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={displayHelper ? helperId : undefined}
            className={cn(
              'flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none overflow-y-auto',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            style={{ minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT }}
            {...props}
          />
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
Textarea.displayName = 'Textarea'

export { Textarea }
