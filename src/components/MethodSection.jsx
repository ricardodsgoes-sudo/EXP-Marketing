import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import expLogo from '../assets/exp-x-light.png'
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
  const headerRef = useRef(null)
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

      // Header parallax — drifts slightly down as the section scrolls
      // past, so it appears to linger while the strategic map below
      // descends. Subtle differential, not a flight.
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -32 },
          {
            y: 32,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      // The map gets its own controlled scroll moment on desktop, so the
      // circular reveal can finish before the next section starts moving up.
      if (railRef.current) {
        const methodMedia = gsap.matchMedia()
        const PILLAR_THRESHOLDS = [0.06, 0.26, 0.5, 0.72]
        const updateReached = (self) => {
          const p = self.progress
          const finish = gsap.utils.clamp(0, 1, (p - 0.82) / 0.18)
          railRef.current?.style.setProperty('--method-finish', finish.toFixed(3))
          const reached = PILLAR_THRESHOLDS.filter((t) => p >= t).length
          if (reached !== lastReachedRef.current) {
            lastReachedRef.current = reached
            setReachedCount(reached)
          }
        }

        methodMedia.add('(min-width: 1101px)', () => {
          const tween = gsap.to(railRef.current, {
            '--method-progress': 1,
            ease: 'none',
            scrollTrigger: {
              trigger: railRef.current,
              start: 'top 106px',
              end: '+=760',
              scrub: 1.2,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: updateReached,
              onLeave: () => {
                railRef.current?.style.setProperty('--method-finish', '1')
                lastReachedRef.current = PILLARS.length
                setReachedCount(PILLARS.length)
              },
              onLeaveBack: () => {
                railRef.current?.style.setProperty('--method-finish', '0')
                lastReachedRef.current = 0
                setReachedCount(0)
              },
            },
          })

          return () => tween.scrollTrigger?.kill()
        })

        // Tablet — same as before (scroll-progress, no pin)
        methodMedia.add('(min-width: 761px) and (max-width: 1100px)', () => {
          const tween = gsap.to(railRef.current, {
            '--method-progress': 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              end: 'bottom 72%',
              scrub: 1.25,
              invalidateOnRefresh: true,
              onUpdate: updateReached,
              onLeave: () => {
                railRef.current?.style.setProperty('--method-finish', '1')
              },
              onLeaveBack: () => {
                railRef.current?.style.setProperty('--method-finish', '0')
              },
            },
          })

          return () => tween.scrollTrigger?.kill()
        })

        // Mobile — wheel pinned, cards rise one by one stacking on top of
        // each other. The card most recently raised covers the previous,
        // and the wheel's progress arc + active orbit label follow scroll.
        methodMedia.add('(max-width: 760px)', () => {
          const rail = railRef.current
          const cards = pillarsRef.current.filter(Boolean)
          if (!rail || cards.length < PILLARS.length) return

          // Cards 2-4 start off-screen below the carousel; card 1 is visible
          gsap.set(cards.slice(1), { y: '110%' })

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: rail,
              start: 'top top',
              end: '+=320%',
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                gsap.set(cards.slice(1), { y: '110%' })
              },
              onUpdate: (self) => {
                const p = self.progress
                rail.style.setProperty('--method-progress', p.toFixed(3))
                rail.style.setProperty(
                  '--method-finish',
                  p > 0.92 ? '1' : '0',
                )
                // Active card flips at the midpoint of each rise phase
                // so the orbit label changes when the new card is halfway
                // over the previous one.
                const reached = Math.max(1, Math.min(4, Math.round(p * 4)))
                if (reached !== lastReachedRef.current) {
                  lastReachedRef.current = reached
                  setReachedCount(reached)
                }
              },
              onLeave: () => {
                rail.style.setProperty('--method-progress', '1')
                rail.style.setProperty('--method-finish', '1')
                lastReachedRef.current = PILLARS.length
                setReachedCount(PILLARS.length)
              },
              onLeaveBack: () => {
                rail.style.setProperty('--method-progress', '0')
                rail.style.setProperty('--method-finish', '0')
                lastReachedRef.current = 0
                setReachedCount(0)
              },
            },
          })

          // Each card rises during a 25% phase of the timeline
          tl.to(cards[1], { y: '0%', duration: 0.25 }, 0.25)
          tl.to(cards[2], { y: '0%', duration: 0.25 }, 0.5)
          tl.to(cards[3], { y: '0%', duration: 0.25 }, 0.75)

          return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
            gsap.set(cards, { clearProps: 'transform' })
          }
        })

        return () => methodMedia.revert()
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
        <header ref={headerRef} className="method__header">
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

            {(() => {
              // On mobile, the 4 orbit labels collapse into a single slot
              // below the wheel and the active one fades in based on
              // scroll progress (reachedCount). Desktop ignores .is-active.
              const activeIndex = Math.max(0, reachedCount - 1)
              const orbitLabels = [
                'Diagnóstico profundo',
                'Estrategia clara',
                'Ejecución profesional',
                'Gestión con datos',
              ]
              return orbitLabels.map((label, i) => (
                <span
                  key={i}
                  className={
                    `method__orbit-label method__orbit-label--${['one','two','three','four'][i]}` +
                    (i === activeIndex ? ' is-active' : '')
                  }
                >
                  {label}
                </span>
              ))
            })()}

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
                <img src={expLogo} alt="" />
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
