'use client'

import * as React from 'react'
import { X, Info, CheckCircle, WarningCircle, Warning } from '@phosphor-icons/react'
import { cn } from '../utils/cn'

export type ToastType = 'info' | 'success' | 'error' | 'warning'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual type of the toast affecting border, background, and icon */
  type?: ToastType
  /** Primary title of the toast */
  title?: string
  /** Sub-message or description */
  message?: string
  /** Duration in milliseconds before auto-dismissal. Set to 0 to disable auto-dismiss. */
  duration?: number
  /** Callback fired when the close button is clicked or duration ends */
  onClose?: () => void
}

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const iconMap: Record<ToastType, React.ReactNode> = {
  info: <Info size={20} weight="fill" />,
  success: <CheckCircle size={20} weight="fill" />,
  error: <WarningCircle size={20} weight="fill" />,
  warning: <Warning size={20} weight="fill" />,
}

const typeClasses: Record<ToastType, string> = {
  // Using Tailwind v4 colors
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
  success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
  error: 'border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/40 dark:bg-destructive/20 dark:text-destructive-foreground',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
}

const iconColors: Record<ToastType, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  error: 'text-destructive',
  warning: 'text-yellow-500',
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ type = 'info', title, message, duration = 5000, onClose, className, ...props }, ref) => {
    const [exiting, setExiting] = React.useState(false)

    const handleClose = React.useCallback(() => {
      setExiting(true)
      setTimeout(() => onClose?.(), 200)
    }, [onClose])

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(handleClose, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, handleClose])

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          'pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-md transition-all sm:max-w-[420px]',
          typeClasses[type],
          exiting ? 'animate-out fade-out-0 zoom-out-95 duration-200' : 'animate-in slide-in-from-right-full sm:slide-in-from-top-full duration-300',
          className
        )}
        {...props}
      >
        <span className={cn('mt-0.5 shrink-0', iconColors[type])}>{iconMap[type]}</span>
        <div className="grid gap-1 flex-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {message && <div className="text-sm opacity-90">{message}</div>}
        </div>
        {onClose && (
          <button
            type="button"
            className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
            aria-label="Dismiss toast"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = 'Toast'

const positionClasses = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0 flex-col-reverse',
  'bottom-left': 'bottom-0 left-0 flex-col-reverse',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
}

const KToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position = 'top-right', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px] pointer-events-none',
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
KToastContainer.displayName = 'KToastContainer'

import { useToast } from '../context/ToastContext'

export function Toaster({ position = 'bottom-right' }: { position?: ToastContainerProps['position'] }) {
  const { toasts, dismiss } = useToast()

  return (
    <KToastContainer position={position}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          type={t.type}
          message={t.message}
          onClose={() => dismiss(t.id)}
        />
      ))}
    </KToastContainer>
  )
}

export { Toast, KToastContainer }
export default Toast
