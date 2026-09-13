import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function RouteAnnouncer() {
  const location = useLocation()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage('Navigated to: ' + (document.title || 'a new page'))
    }, 100)

    return () => clearTimeout(timeout)
  }, [location])

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

export default RouteAnnouncer
