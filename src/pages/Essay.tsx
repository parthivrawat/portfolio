import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getEssayBySlug } from '@/data/essays'
import NotFound from './NotFound'

const Essay: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const essay = slug ? getEssayBySlug(slug) : undefined

  if (!essay) {
    return <NotFound />
  }

  return (
    <>
      <Helmet>
        <title>{essay.title} | Parthiv Rawat</title>
        <meta name="description" content={essay.description} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <time dateTime={new Date(essay.date).toISOString()} className="text-sm text-gray-500 dark:text-gray-500">
            {essay.date}
          </time>
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mt-2 mb-6">
            {essay.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {essay.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            to="/essays"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Back to essays
          </Link>
        </div>
      </div>
    </>
  )
}

export default Essay
