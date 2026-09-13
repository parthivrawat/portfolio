interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        aria-hidden="true"
        className={`${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full animate-spin`}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner
