import { ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { packageLinks } from '@/data/socialLinks'
import { essays } from '@/data/essays'
import { NewsletterSignup } from '@components'

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Parthiv Rawat</title>
        <meta
          name="description"
          content="Full-stack developer delivering secure, cloud-native platforms. Go, React, and distributed systems."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <section className="mb-16">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Hello, I'm Parthiv Rawat.
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I am a full-stack developer building secure, cloud-native platforms with Go and React.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I work at the intersection of technology, product, and platforms. Technology shapes design space for product. Product shapes technical architecture. Carefully engineered interactions and incentives enable thriving platforms.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I specialize in decentralized identity workflows, micro-frontend delivery, and GCP-backed services. I've shipped 30+ secure modules across admin consoles and enterprise SaaS platforms.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm passionate about improving developer experience and building maintainable systems. I publish packages on{' '}
                {packageLinks.map((link, index) => (
                  <span key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                      aria-label={link.iconLabel}
                    >
                      <link.icon size={14} aria-hidden="true" />
                      {link.name}
                    </a>
                    {index < packageLinks.length - 1 && ', '}
                  </span>
                ))}
                .
              </p>
            </div>
          </section>

          <NewsletterSignup placement="top" variant="simple" />

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
              Recent essays
            </h2>
            
            <div className="space-y-8">
              {essays.map((essay) => (
                <article key={essay.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                  <time dateTime={new Date(essay.date).toISOString()} className="text-sm text-gray-500 dark:text-gray-400">
                    {essay.date}
                  </time>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-2 mb-3">
                    <Link to={`/essays/${essay.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {essay.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {essay.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                to="/projects"
                className="inline-block text-primary-600 dark:text-primary-400 hover:underline"
              >
                View all projects →
              </Link>
              <a
                href="/Full_Stack_Resume.pdf"
                download
                className="inline-block text-primary-600 dark:text-primary-400 hover:underline"
              >
                Download resume →
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
