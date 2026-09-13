import { useState, type FormEvent } from 'react'
import Button from '@components/atoms/Button'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface NewsletterSignupProps {
  placement?: 'top' | 'bottom'
  variant?: 'default' | 'simple'
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  placement = 'bottom',
  variant = 'default',
}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const substackDomain = import.meta.env.VITE_SUBSTACK_DOMAIN
  const actionUrl = substackDomain ? `https://${substackDomain}/api/v1/free` : undefined

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setError('')
    setSubmitted(false)

    const trimmed = email.trim()

    if (!trimmed) {
      e.preventDefault()
      setError('Please enter your email address.')
      return
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      e.preventDefault()
      setError('Please enter a valid email address.')
      return
    }

    if (!actionUrl) {
      e.preventDefault()
      setError('Newsletter is not configured. Set VITE_SUBSTACK_DOMAIN.')
      return
    }

    setIsSubmitting(true)
    setSubmitted(true)
  }

  const isSimple = variant === 'simple'
  const containerClasses = isSimple
    ? placement === 'top' ? 'mb-12' : 'border-t border-gray-200 dark:border-gray-800 pt-8 mt-12'
    : placement === 'top' ? 'mb-12' : 'border-t border-gray-200 dark:border-gray-800 pt-8 mt-12'

  return (
    <section
      aria-label={isSimple ? 'Newsletter signup' : undefined}
      aria-labelledby={!isSimple ? 'newsletter-heading' : undefined}
      className={containerClasses}
    >
      {isSimple ? (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Get new essays in your inbox:
        </p>
      ) : (
        <>
          <h2
            id="newsletter-heading"
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
          >
            Subscribe to my newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Get new essays on software, platforms, and distributed systems delivered to your inbox.
          </p>
        </>
      )}

      <form
        action={actionUrl}
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-start gap-4"
      >
        <div className="w-full sm:flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
            required
            className="w-full px-4 py-3 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300 dark:border-gray-700"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-4 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}

      {submitted && !error && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 p-4 border border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
        >
          A Substack confirmation page has opened in a new tab. Please confirm your email there to complete your subscription.
        </p>
      )}
    </section>
  )
}

export default NewsletterSignup
