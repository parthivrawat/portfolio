import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-start justify-center px-6 py-16 max-w-prose mx-auto">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
        Page not found
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={ROUTES.HOME}
        className="text-primary-600 dark:text-primary-400 hover:underline"
      >
        Go back home →
      </Link>
    </div>
  )
}

export default NotFound
