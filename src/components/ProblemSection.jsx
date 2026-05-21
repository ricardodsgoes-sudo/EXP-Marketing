import { useEffect, useRef, useState } from 'react'
import RevealOnScroll from './RevealOnScroll'

/* Editorial line icons — thin stroke, currentColor, no fills.
   Each one is sized via CSS (.timeline-card__icon) to ~36px. */
const IconConfusion = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="15" />
    <path d="M20 11 L20 14" />
    <path d="M14 17 L11 14" />
    <path d="M26 17 L29 14" />
    <path d="M20 20 L24 24" />
    <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

const IconLeak = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 8 L34 8 L24 22 L24 32 L16 32 L16 22 Z" />
    <path d="M28 26 L33 31" />
    <path d="M33 26 L28 31" />
  </svg>
)

const IconUnsteadyGrowth = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 33 L13 22 L18 27 L25 12 L33 19" />
    <path d="M27 12 L33 12 L33 18" />
    <path d="M5 33 L33 33" opacity="0.4" />
  </svg>
)

const CARDS = [
  {
    num: '01',
    title: 'Confusión',
    short: 'Mucho esfuerzo, poca claridad y sin dirección.',
    body:
      'Muchas profesionales del mercado beauty publican, atienden, invierten y crean ofertas sin una estructura clara. El negocio se mueve, pero no necesariamente avanza.',
    points: [
      'Instagram sin dirección',
      'Acciones sueltas',
      'Ofertas sin estrategia',
      'Decisiones basadas en intuición',
    ],
    Icon: IconConfusion,
  },
  {
    num: '02',
    title: 'Fuga de oportunidades',
    short: 'El problema no siempre es falta de demanda. Es falta de proceso.',
    body:
      'Cuando no existe un embudo claro, los leads llegan sin seguimiento, las campañas pierden fuerza y las oportunidades se enfrían antes de convertirse en ventas.',
    points: [
      'Tráfico sin embudo',
      'Leads sin proceso comercial',
      'Atención sin método',
      'Ventas poco previsibles',
    ],
    Icon: IconLeak,
  },
  {
    num: '03',
    title: 'Crecimiento sin control',
    short: 'Crecer sin mirar los números limita la próxima etapa.',
    body:
      'Sin datos, métricas y gestión, el crecimiento depende de recomendaciones, suerte o del movimiento del algoritmo. La EXP entra para transformar esfuerzo suelto en crecimiento estructurado.',
    points: [
      'Números invisibles',
      'Falta de posicionamiento',
      'Decisiones sin claridad',
      'Crecimiento dependiente del algoritmo',
    ],
    Icon: IconUnsteadyGrowth,
  },
]

export default function ProblemSection() {
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Find the card whose vertical center is closest to the viewport center,
  // and mark it as active. rAF-throttled so it tracks Lenis-driven scroll.
  useEffect(() => {
    if (reducedMotion) return

    let rafId = null

    function update() {
      rafId = null
      const cards = cardsRef.current.filter(Boolean)
      if (cards.length === 0) return

      const viewportCenter = window.innerHeight / 2
      let bestIdx = 0
      let bestDist = Infinity
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - viewportCenter)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      })
      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx))
    }

    function onScroll() {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  return (
    <section className="problem" aria-labelledby="problem-title">
      <div className="problem__inner">
        <div className="problem__intro">
          <RevealOnScroll as="span" className="problem__eyebrow" delay={0}>
            El problema
          </RevealOnScroll>

          <RevealOnScroll
            as="h2"
            id="problem-title"
            className="problem__title"
            delay={160}
          >
            Los negocios beauty no se estancan por falta de talento.
            <br />
            Se estancan por falta de estrategia.
          </RevealOnScroll>

          <RevealOnScroll as="p" className="problem__body" delay={340}>
            Muchas profesionales, clínicas y marcas del mercado beauty tienen
            técnica, calidad y potencial de crecimiento. Pero siguen vendiendo
            por debajo de lo que podrían porque no tienen una estructura clara
            de marketing, ventas y gestión.
          </RevealOnScroll>
        </div>

        <ol className="problem__timeline" aria-label="Fases de la problemática">
          {CARDS.map((card, i) => {
            const isActive = reducedMotion || i === activeIndex
            return (
              <li
                key={card.num}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`timeline-card${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="timeline-card__marker" aria-hidden="true" />

                <article className="timeline-card__panel">
                  <span className="timeline-card__icon" aria-hidden="true">
                    <card.Icon />
                  </span>
                  <span className="timeline-card__num">{card.num}</span>
                  <h3 className="timeline-card__title">{card.title}</h3>
                  <p className="timeline-card__short">{card.short}</p>

                  <div
                    className="timeline-card__details"
                    aria-hidden={!isActive}
                  >
                    <div className="timeline-card__details-inner">
                      <p className="timeline-card__body">{card.body}</p>
                      <ul className="timeline-card__points">
                        {card.points.map((p) => (
                          <li key={p} className="timeline-card__point">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="problem__impact-wrap">
        <RevealOnScroll
          as="p"
          className="problem__impact"
          variant="parallax-soft"
          delay={200}
        >
          EXP existe para transformar esfuerzos sueltos en{' '}
          <span className="problem__impact-accent">crecimiento estructurado</span>.
        </RevealOnScroll>
      </div>
    </section>
  )
}
