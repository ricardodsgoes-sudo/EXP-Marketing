import logoBranca from '../assets/logo-branca.jpeg'
import './Footer.css'

const SOLUTIONS = [
  { label: 'Mentoría', href: '#' },
  { label: 'Consultoría', href: '#' },
  { label: 'Marketing Digital', href: '#' },
  { label: 'Diagnóstico', href: '#' },
]

const EXP_LINKS = [
  { label: 'Sobre EXP', href: '#' },
  { label: 'Casos', href: '#' },
  { label: 'Recursos', href: '#' },
  { label: 'Contacto', href: '#' },
]

const LEGAL_LINKS = [
  { label: 'Política de privacidad', href: '#' },
  { label: 'Términos de uso', href: '#' },
]

const SOCIAL = [
  { name: 'instagram', label: 'Instagram', href: '#' },
  { name: 'whatsapp', label: 'WhatsApp', href: '#' },
  { name: 'youtube', label: 'YouTube', href: '#' },
  { name: 'linkedin', label: 'LinkedIn', href: '#' },
]

function SocialIcon({ name }) {
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true" focusable="false">
          <path d="M20.5 12a8.5 8.5 0 0 1-12.95 7.27L3.5 20.5l1.32-3.94A8.5 8.5 0 1 1 20.5 12Z" />
          <path d="M8.6 9.2c.1-.7.7-1.3 1.4-1.3.3 0 .5.2.6.5l.5 1.4c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.2-.2.5-.3.8-.2l1.4.5c.3.1.5.3.5.6 0 .7-.6 1.3-1.3 1.4-3 .2-5.6-2.4-5.4-5.4Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true" focusable="false">
          <rect x="2.5" y="6" width="19" height="12" rx="3" />
          <path d="m10.5 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <line x1="7.2" y1="10.5" x2="7.2" y2="17" />
          <circle cx="7.2" cy="7.3" r="1" fill="currentColor" stroke="none" />
          <path d="M11 17v-6.5M11 13c0-3.4 6-3.4 6 0V17" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__cols">
          {/* Col 1 — Brand */}
          <div className="footer__col footer__col--brand">
            <a href="#" className="footer__logo" aria-label="EXP Marketing">
              <img
                src={logoBranca}
                alt="EXP Marketing"
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="footer__tagline">
              Marketing, ventas y gestión para negocios beauty.
            </p>
          </div>

          {/* Col 2 — Soluciones */}
          <nav className="footer__col" aria-label="Soluciones">
            <h3 className="footer__col-title">Soluciones</h3>
            <ul className="footer__list">
              {SOLUTIONS.map((item) => (
                <li key={item.label}>
                  <a
                    className="footer__link"
                    href={item.href}
                    aria-disabled="true"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — EXP */}
          <nav className="footer__col" aria-label="EXP">
            <h3 className="footer__col-title">EXP</h3>
            <ul className="footer__list">
              {EXP_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    className="footer__link"
                    href={item.href}
                    aria-disabled="true"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Contacto */}
          <div className="footer__col footer__col--contact">
            <h3 className="footer__col-title">Contacto</h3>
            <p className="footer__text">
              Solicita un diagnóstico estratégico y descubre qué necesita ser
              ajustado para crecer con más claridad.
            </p>
            <a
              href="#"
              className="footer__button"
              aria-disabled="true"
            >
              Solicitar diagnóstico
            </a>
            <ul className="footer__social" aria-label="Redes sociales">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="footer__social-link"
                    aria-label={s.label}
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} EXP Marketing. Todos los derechos reservados.
          </p>
          <ul className="footer__legal">
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  className="footer__legal-link"
                  href={item.href}
                  aria-disabled="true"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
