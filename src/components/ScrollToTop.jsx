import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* On route change:
   - With a hash (e.g. "/#cta"), scrolls to the matching element after mount,
     using Lenis if available for consistency with the smooth wheel.
   - Without a hash, resets scroll to the top instantly. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait for the next route tree to mount before searching for the anchor.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id)
          if (!el) return
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
      return
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
