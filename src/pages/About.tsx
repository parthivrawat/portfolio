import { Helmet } from 'react-helmet-async'
import { skills, experiences, achievements, coreStrengths, learningGoals } from '@/data/aboutData'

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Parthiv Rawat</title>
        <meta
          name="description"
          content="Learn about my journey as a full-stack developer, skills, and professional experience"
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            About
          </h1>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To create elegant and efficient solutions that solve real-world problems through clean code, 
              inclusive design, and collaborative teamwork.
            </p>
            <a
              href="/Full_Stack_Resume.pdf"
              download
              className="inline-block mt-6 text-primary-600 dark:text-primary-400 hover:underline"
            >
              Download resume →
            </a>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Toolkit
            </h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.title} className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <article key={`${exp.company}-${exp.title}`} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {exp.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    {exp.date} | {exp.location}
                  </p>
                  <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                    {exp.duties.map((duty, i) => (
                      <li key={i}>{duty}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Achievements
            </h2>
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.title} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Core Strengths
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {coreStrengths.join(', ')}.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Learning Focus
            </h2>
            <div className="space-y-8">
              {Object.entries(learningGoals).map(([key, topics]) => {
                const sectionLabels: Record<string, string> = {
                  programmingLanguages: 'Programming Languages',
                  artificialIntelligence: 'Artificial Intelligence',
                  systemDesign: 'System Design',
                }
                
                const renderTopics = (items: string[] | Record<string, string[]>) => {
                  if (Array.isArray(items)) {
                    return (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {items.join(', ')}
                      </p>
                    )
                  }
                  return (
                    <div className="mt-2 space-y-2">
                      {Object.entries(items).map(([sub, subItems]) => (
                        <div key={sub}>
                          <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                            {sub}:{' '}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {subItems.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                }
                
                return (
                  <div key={key} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {sectionLabels[key]}
                    </h3>
                    {renderTopics(topics)}
                  </div>
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}

export default About
