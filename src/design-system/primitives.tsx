import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactNode
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', children, className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-semibold text-gray-900 dark:text-gray-100', className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Heading.displayName = 'Heading'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  muted?: boolean
  children: ReactNode
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Component = 'p', muted = false, children, className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          muted
            ? 'text-gray-500 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-300',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Text.displayName = 'Text'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center text-sm text-gray-600 dark:text-gray-400',
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
