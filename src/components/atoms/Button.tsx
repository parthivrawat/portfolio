import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-5 py-3 rounded bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
        className
      )}
      aria-busy={isLoading || undefined}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export default Button
