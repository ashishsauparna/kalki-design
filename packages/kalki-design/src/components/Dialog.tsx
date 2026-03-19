'use client'

import * as React from 'react'
import { X } from '@phosphor-icons/react'
import { cn } from '../utils/cn'

export interface DialogProps {
  /** Controlled open state */
  open?: boolean
  /** Callback fired when the dialog should close */
  onClose?: () => void
  /** Dialog content */
  children?: React.ReactNode
  /** Maximum width of the dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** If true, clicking on the overlay closes the dialog */
  closeOnOverlay?: boolean
  /** If true, pressing Escape closes the dialog */
  closeOnEscape?: boolean
  /** Additional CSS classes for the dialog panel */
  className?: string
}

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
  )
)
DialogHeader.displayName = 'DialogHeader'

const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('py-4', className)} {...props} />
  )
)
DialogBody.displayName = 'DialogBody'

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
  )
)
DialogFooter.displayName = 'DialogFooter'

const sizeClasses = {
  sm: 'sm:max-w-[425px]',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-xl',
  xl: 'sm:max-w-2xl',
  full: 'sm:max-w-[90vw]',
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      children,
      size = 'md',
      closeOnOverlay = true,
      closeOnEscape = true,
      className,
    },
    ref
  ) => {
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const previousFocus = React.useRef<HTMLElement | null>(null)

    const handleEscape = React.useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') onClose?.()
      },
      [closeOnEscape, onClose]
    )

    // Basic focus trapping logic for a11y
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    React.useEffect(() => {
      if (open) {
        previousFocus.current = document.activeElement as HTMLElement
        document.addEventListener('keydown', handleEscape)
        
        // Prevent body scroll
        document.body.style.setProperty('overflow', 'hidden')
        
        // Move focus into the dialog after it renders
        requestAnimationFrame(() => {
          if (dialogRef.current) {
            const focusable = dialogRef.current.querySelector<HTMLElement>(
              'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            if (focusable) {
              focusable.focus()
            } else {
              dialogRef.current.focus()
            }
          }
        })
      }
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.removeProperty('overflow')
        if (!open && previousFocus.current) {
          previousFocus.current.focus()
        }
      }
    }, [open, handleEscape])

    if (!open) return null

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlay && e.target === e.currentTarget) {
        onClose?.()
      }
    }

    return (
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200 grid place-items-center overflow-y-auto p-4 sm:p-0"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          ref={(node) => {
            ;(dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative w-full border border-border bg-background p-6 shadow-lg sm:rounded-lg animate-in fade-in-0 zoom-in-95 duration-200',
            sizeClasses[size],
            className
          )}
        >
          {children}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="size-4" weight="bold" />
              <span className="sr-only">Close dialog</span>
            </button>
          )}
        </div>
      </div>
    )
  }
)
Dialog.displayName = 'Dialog'

export { Dialog, DialogHeader, DialogBody, DialogFooter }
export default Dialog
