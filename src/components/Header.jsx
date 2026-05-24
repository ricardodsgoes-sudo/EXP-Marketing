import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/exp-wordmark-light.png'

const navLinks = [
  { label: 'Soluciones', to: '/soluciones' },
  { label: 'Mentoría', to: '/mentoria' },
  { label: 'Consultoría', to: '/consultoria' },
  { label: 'Marketing Digital', to: '/marketing-digital' },
  { label: 'Casos', to: '/casos' },
  { label: 'Sobre EXP', to: '/sobre' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // CTA "Diagnóstico": if we're on home, smooth-scroll to #cta. Otherwise
  // navigate home and scroll once the section is in the DOM.
  const handleDiagnosticoClick = (e) => {
    e.preventDefault()
    const scrollToCta = () => {
      const target = document.getElementById('cta')
      if (!target) return
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -80 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (location.pathname === '/') {
      scrollToCta()
    } else {
      navigate('/')
      // Wait for the home tree to mount before scrolling.
      requestAnimationFrame(() => requestAnimationFrame(scrollToCta))
    }
  }

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner">

          <Link to="/" className="header__logo" aria-label="EXP Marketing">
            <img
              src={logo}
              alt="EXP Marketing"
              width="567"
              height="255"
              fetchpriority="high"
              decoding="async"
            />
          </Link>

          <nav className="header__nav" aria-label="Navegación principal">
            <ul className="header__nav-list">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      'header__nav-link' + (isActive ? ' header__nav-link--active' : '')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a
              href="/#cta"
              className="header__cta"
              onClick={handleDiagnosticoClick}
            >
              Diagnóstico
            </a>

            <button
              className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu — rendered as sibling to <header> so it escapes the
          header's backdrop-filter containing block. Solid background, own
          close button, full viewport coverage. */}
      <div
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="mobile-menu__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6 L18 18 M6 18 L18 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <ul className="mobile-menu__list">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <NavLink to={to} className="mobile-menu__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="/#cta"
          className="mobile-menu__cta"
          onClick={handleDiagnosticoClick}
        >
          Diagnóstico
        </a>
      </div>
    </>
  )
}
