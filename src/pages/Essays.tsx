import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { NewsletterSignup } from '@components'
import { essays } from '@/data/essays'

const Essays: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Essays | Parthiv Rawat</title>
        <meta
          name="description"
          content="Notes on building resilient platforms, decentralized identity, and production frontend architecture."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Essays
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-12">
            Notes on building resilient platforms, decentralized identity, and production frontend architecture.
          </p>

          <div className="space-y-8">
            {essays.map((essay) => (
              <article key={essay.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                <time dateTime={new Date(essay.date).toISOString()} className="text-sm text-gray-500 dark:text-gray-400">
                  {essay.date}
                </time>
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-2 mb-3">
                  <Link to={`/essays/${essay.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {essay.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {essay.description}
                </p>
              </article>
            ))}
          </div>

          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}

export default Essays
