import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Header, Footer } from '@components/organisms'
import LoadingSpinner from '@components/atoms/LoadingSpinner'
import { RouteAnnouncer } from '@components'
import { ROUTES } from '@/constants/routes'

const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Projects = lazy(() => import('@pages/Projects'))
const Essays = lazy(() => import('@pages/Essays'))
const Essay = lazy(() => import('@pages/Essay'))
const Changelog = lazy(() => import('@pages/Changelog'))
const Contact = lazy(() => import('@pages/Contact'))
const NotFound = lazy(() => import('@pages/NotFound'))

function App() {
  return (
    <>
      <RouteAnnouncer />

      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Parthiv Rawat | Full-Stack Developer</title>
        <meta
          name="description"
          content="Full-stack developer building secure, cloud-native platforms with Go and React."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />

        <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.PROJECTS} element={<Projects />} />
              <Route path={ROUTES.ESSAYS} element={<Essays />} />
              <Route path={`${ROUTES.ESSAYS}/:slug`} element={<Essay />} />
              <Route path={ROUTES.CHANGELOG} element={<Changelog />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.UNDEFINED} element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
