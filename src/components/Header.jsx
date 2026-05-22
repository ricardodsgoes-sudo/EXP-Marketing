import { useState, useEffect } from 'react'
import logo from '../assets/logo-branca.jpeg'

const navLinks = [
  { label: 'Soluciones', href: '#' },
  { label: 'Mentoría', href: '#' },
  { label: 'Consultoría', href: '#' },
  { label: 'Marketing Digital', href: '#' },
  { label: 'Casos', href: '#' },
  { label: 'Sobre EXP', href: '#' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">

        <a href="#" className="header__logo" aria-label="EXP Marketing">
          <img
            src={logo}
            alt="EXP Marketing"
            width="76"
            height="76"
            fetchpriority="high"
            decoding="async"
          />
        </a>

        <nav
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="header__nav-list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="header__nav-link"
                  aria-disabled="true"
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false) }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href="#cta" className="header__cta" onClick={(e) => {
            e.preventDefault()
            const target = document.getElementById('cta')
            if (!target) return
            if (window.__lenis) {
              window.__lenis.scrollTo(target, { offset: -80 })
            } else {
              target.scrollIntoView({ behavior: 'smooth' })
            }
          }}>
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
