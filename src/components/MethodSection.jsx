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
        const PILLAR_THRESHOLDS = [0.02, 0.27, 0.52, 0.77]
        gsap.to(railRef.current, {
          '--rail-progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 80%',
            end: 'bottom 65%',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress
              const reached = PILLAR_THRESHOLDS.filter((t) => p >= t).length
              if (reached !== lastReachedRef.current) {
                lastReachedRef.current = reached
                setReachedCount(reached)
              }
            },
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

        <div ref={railRef} className="method__rail">
          <span className="method__rail-track" aria-hidden="true" />
          <span className="method__rail-ghost" aria-hidden="true" />
          <span className="method__rail-active" aria-hidden="true" />

          <ol className="method__pillars">
            {PILLARS.map((p, i) => (
              <li
                key={p.num}
                ref={(el) => (pillarsRef.current[i] = el)}
                className={
                  'method__pillar' + (i < reachedCount ? ' is-reached' : '')
                }
              >
                <span className="method__pillar-node" aria-hidden="true" />
                <span className="method__pillar-num">{p.num}</span>
                <h3 className="method__pillar-title">{p.title}</h3>
                <span className="method__pillar-rule" aria-hidden="true" />
                <p className="method__pillar-text">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
