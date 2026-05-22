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

        <nav
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
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
  )
}
