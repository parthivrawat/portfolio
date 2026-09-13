import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

interface GitCommit {
  hash: string
  date: string
  subject: string
  body: string
}

const Changelog: React.FC = () => {
  const [commits, setCommits] = useState<GitCommit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch('/changelog.json')
        if (!response.ok) {
          throw new Error('Failed to load changelog')
        }
        const data = await response.json()
        setCommits(data)
      } catch (err) {
        console.error('Error loading changelog:', err)
        if (import.meta.env.DEV) {
          setError('Changelog is only available in production builds. Run `npm run build` to generate it.')
        } else {
          setError('Failed to load changelog data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchChangelog()
  }, [])

  const getCommitType = (subject: string): 'feature' | 'fix' | 'improvement' | 'security' => {
    const lower = subject.toLowerCase()
    if (lower.startsWith('feat') || lower.startsWith('feature')) return 'feature'
    if (lower.startsWith('fix') || lower.startsWith('bugfix')) return 'fix'
    if (lower.startsWith('security') || lower.startsWith('sec')) return 'security'
    return 'improvement'
  }

  const typeLabels: Record<string, string> = {
    feature: 'Feature',
    fix: 'Fix',
    improvement: 'Improvement',
    security: 'Security',
  }

  return (
    <>
      <Helmet>
        <title>Changelog | Parthiv Rawat</title>
        <meta
          name="description"
          content="Track the latest updates and improvements to this portfolio."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Changelog
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-12">
            A chronological record of improvements and maintenance from git history.
          </p>

          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading changelog...</p>
          ) : error ? (
            <p className="text-red-600 dark:text-red-400">{error}</p>
          ) : commits.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No changelog data available.</p>
          ) : (
            <div className="space-y-8">
              {commits.map((commit) => {
                const type = getCommitType(commit.subject)
                return (
                  <article key={commit.hash} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                    <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                      <time
                        dateTime={commit.date}
                        className="text-sm text-gray-500 dark:text-gray-500"
                      >
                        {new Date(commit.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {typeLabels[type]}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {commit.subject}
                    </h3>
                    {commit.body && (
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {commit.body}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Changelog
