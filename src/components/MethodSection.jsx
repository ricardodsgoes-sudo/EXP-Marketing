import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MethodSection.css'

const PILLARS = [
  {
    num: '01',
    title: 'Diagnóstico',
    text: 'Analizamos tu posicionamiento, comunicación, embudo, canales de venta, números, oferta y oportunidades de crecimiento.',
  },
  {
    num: '02',
    title: 'Estrategia',
    text: 'Creamos un plan de acción con claridad sobre lo que necesita ser ajustado, priorizado y ejecutado.',
  },
  {
    num: '03',
    title: 'Ejecución',
    text: 'Aplicamos las acciones necesarias a través de contenido, tráfico, páginas, embudos, copy, campañas y procesos comerciales.',
  },
  {
    num: '04',
    title: 'Gestión',
    text: 'Acompañamos métricas, conversiones, CAC, ROI, facturación y oportunidades de mejora para ajustar la ruta con base en datos.',
  },
]

export default function MethodSection() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const pillarsRef = useRef([])
  const lastReachedRef = useRef(0)
  const [reachedCount, setReachedCount] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header items fade-up in sequence as the section enters view.
      gsap.from(
        ['.method__eyebrow', '.method__title', '.method__intro'],
        {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      )

      // Strategic rail draws progressively. The active line's transform
      // reads from the CSS custom property --rail-progress which GSAP
      // animates 0 → 1 in sync with scroll. The onUpdate also reveals
      // each pillar at the exact moment the rail crosses its node —
      // 0.00, 0.25, 0.50, 0.75 of the line.
      if (railRef.current) {
        const PILLAR_THRESHOLDS = [0.06, 0.26, 0.5, 0.72]
        const updateReached = (self) => {
          const p = self.progress
          const reached = PILLAR_THRESHOLDS.filter((t) => p >= t).length
          if (reached !== lastReachedRef.current) {
            lastReachedRef.current = reached
            setReachedCount(reached)
          }
        }

        gsap.to(railRef.current, {
          '--method-progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'bottom 72%',
            scrub: 1.25,
            invalidateOnRefresh: true,
            onUpdate: updateReached,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className={`method${reducedMotion ? ' method--reduced' : ''}`}
      aria-labelledby="method-title"
    >
      <div className="method__container">
        <header className="method__header">
          <span className="method__eyebrow">Cómo EXP acelera el crecimiento</span>
          <h2 id="method-title" className="method__title">
            Cómo aceleramos el{' '}
            <span className="method__title-accent">crecimiento</span> de tu
            negocio beauty
          </h2>
          <p className="method__intro">
            EXP trabaja uniendo diagnóstico, estrategia y ejecución para
            encontrar los bloqueos que impiden tu crecimiento y construir un
            plan claro de evolución.
          </p>
        </header>

        <div ref={railRef} className="method__map">
          <div className="method__visual" aria-hidden="true">
            <svg
              className="method__connectors"
              viewBox="0 0 620 500"
              preserveAspectRatio="none"
            >
              <path className="method__connector method__connector--one" d="M 92 156 H 218" />
              <path className="method__connector method__connector--two" d="M 222 66 V 148" />
              <path className="method__connector method__connector--three" d="M 392 168 H 560 V 112" />
              <path className="method__connector method__connector--four" d="M 322 386 V 448 H 118" />
              <path className="method__connector method__connector--cards" d="M 392 250 H 590" />
            </svg>

            <span className="method__orbit-label method__orbit-label--one">
              Diagnóstico profundo
            </span>
            <span className="method__orbit-label method__orbit-label--two">
              Estrategia clara
            </span>
            <span className="method__orbit-label method__orbit-label--three">
              Ejecución profesional
            </span>
            <span className="method__orbit-label method__orbit-label--four">
              Gestión con datos
            </span>

            <div className="method__wheel">
              <div className="method__wheel-progress" />
              <div className="method__wheel-ring">
                {PILLARS.map((p, i) => (
                  <span
                    key={p.num}
                    className={
                      'method__wheel-step method__wheel-step--' +
                      (i + 1) +
                      (i < reachedCount ? ' is-reached' : '')
                    }
                  >
                    {p.num}
                  </span>
                ))}
              </div>
              <div className="method__wheel-core">
                <span>EXP</span>
              </div>
            </div>
          </div>

          <ol className="method__strategy-list">
            {PILLARS.map((p, i) => (
              <li
                key={p.num}
                ref={(el) => (pillarsRef.current[i] = el)}
                className={
                  'method__strategy-card' + (i < reachedCount ? ' is-reached' : '')
                }
              >
                <span className="method__strategy-num">{p.num}</span>
                <div>
                  <h3 className="method__strategy-title">{p.title}</h3>
                  <p className="method__strategy-text">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
