import RevealOnScroll from '../components/RevealOnScroll'
import FinalCTA from '../components/FinalCTA'
import heroPortrait from '../assets/generated-heroes/sobre-exp-hero-generated.png'
import institutionalPhoto from '../assets/mentoria/evolucion.webp'
import expWordmark from '../assets/exp-wordmark-light.png'
import './SobreEXP.css'

const SCOPE = [
  'Posicionamiento',
  'Oferta',
  'Comunicación',
  'Embudo',
  'Atención comercial',
  'Métricas',
  'Oportunidades reales de crecimiento',
]

export default function SobreEXP() {
  return (
    <>
      {/* Custom dark editorial hero — 2-column magazine spread: text on
          the left, portrait on the right. Replaces the default light
          PageHero so Sobre EXP keeps the dark-first brand voice. */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <RevealOnScroll as="span" className="about-hero__eyebrow" delay={0}>
              Sobre EXP
            </RevealOnScroll>

            <RevealOnScroll
              as="h1"
              id="about-hero-title"
              className="about-hero__title"
              delay={140}
            >
              EXP Marketing: crecimiento
              <br />
              estratégico para{' '}
              <span className="about-hero__title-accent">negocios beauty</span>.
            </RevealOnScroll>

            <RevealOnScroll as="p" className="about-hero__intro" delay={300}>
              Nacimos para ayudar a profesionales, clínicas y marcas del mercado
              beauty a dejar de crecer en el improviso y construir operaciones
              más lucrativas, organizadas y previsibles.
            </RevealOnScroll>

            <RevealOnScroll as="span" className="about-hero__rule" delay={460} aria-hidden="true" />
          </div>

          <RevealOnScroll as="div" className="about-hero__visual" delay={220}>
            <img
              src={heroPortrait}
              alt=""
              className="about-hero__photo"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
            <span className="about-hero__photo-frame" aria-hidden="true" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Institutional copy — asymmetric editorial spread: photo on the
          left (smaller, magazine-style), text on the right. */}
      <section className="about-institutional" aria-labelledby="about-vision">
        <div className="about-institutional__inner">
          <RevealOnScroll as="div" className="about-institutional__visual">
            <img
              src={institutionalPhoto}
              alt=""
              className="about-institutional__photo"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <img
              src={expWordmark}
              alt=""
              className="about-institutional__wordmark"
              aria-hidden="true"
            />
          </RevealOnScroll>

          <div className="about-institutional__copy">
            <RevealOnScroll as="span" className="about-institutional__eyebrow">
              Quiénes somos
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="about-vision"
              className="about-institutional__title"
              delay={120}
            >
              Marketing, ventas, gestión y datos
              <br />
              uniéndose en un mismo método.
            </RevealOnScroll>
            <RevealOnScroll as="p" className="about-institutional__body" delay={240}>
              EXP Marketing une marketing digital, ventas, gestión y análisis de
              datos para crear soluciones de crecimiento para el mercado beauty.
            </RevealOnScroll>
            <RevealOnScroll as="p" className="about-institutional__body" delay={360}>
              Trabajamos con una visión completa del negocio: no miramos solo
              publicaciones, anuncios o páginas. Miramos posicionamiento, oferta,
              comunicación, embudo, atención comercial, métricas y oportunidades
              reales de crecimiento.
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Scope — the seven angles, inline editorial list */}
      <section className="about-scope" aria-labelledby="about-scope-title">
        <div className="about-scope__inner">
          <RevealOnScroll as="span" className="about-scope__eyebrow">
            Visión completa
          </RevealOnScroll>
          <RevealOnScroll as="h2" id="about-scope-title" className="about-scope__title" delay={120}>
            Siete ángulos. Una misma lectura del negocio.
          </RevealOnScroll>
          <ul className="about-scope__list" aria-label="Ángulos de análisis">
            {SCOPE.map((item, i) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="about-scope__item"
                delay={i * 70}
              >
                <span className="about-scope__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="about-scope__label">{item}</span>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* Positioning phrase — the climactic editorial statement */}
      <section className="about-positioning" aria-labelledby="about-positioning-title">
        <div className="about-positioning__inner">
          <RevealOnScroll as="span" className="about-positioning__eyebrow">
            Posicionamiento
          </RevealOnScroll>

          <h2 id="about-positioning-title" className="visually-hidden">
            Marketing sin gestión genera movimiento. Marketing con estrategia
            genera crecimiento.
          </h2>

          <RevealOnScroll as="p" className="about-positioning__line about-positioning__line--muted">
            Marketing <em>sin gestión</em>
            <br />
            genera <span className="about-positioning__word">movimiento</span>.
          </RevealOnScroll>

          <RevealOnScroll as="span" className="about-positioning__divider" delay={240} aria-hidden="true" />

          <RevealOnScroll as="p" className="about-positioning__line about-positioning__line--bright" delay={380}>
            Marketing <em>con estrategia</em>
            <br />
            genera{' '}
            <span className="about-positioning__word about-positioning__word--accent">
              crecimiento
            </span>
            .
          </RevealOnScroll>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
