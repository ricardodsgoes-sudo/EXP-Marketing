import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FinalCTA.css'

export default function FinalCTA() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      })

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
      })
        .from(
          textRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.68',
        )
        .from(
          buttonRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className={`final-cta${reducedMotion ? ' final-cta--reduced' : ''}`}
      aria-labelledby="final-cta-title"
    >
      <span className="final-cta__x final-cta__x--tl" aria-hidden="true" />
      <span className="final-cta__x final-cta__x--tr" aria-hidden="true" />
      <span className="final-cta__x final-cta__x--bl" aria-hidden="true" />
      <span className="final-cta__x final-cta__x--br" aria-hidden="true" />

      <div className="final-cta__container">
        <h2
          ref={titleRef}
          id="final-cta-title"
          className="final-cta__title"
        >
          ¿Quieres saber qué está frenando el{' '}
          <span className="final-cta__title-accent">crecimiento</span> de tu
          negocio beauty?
        </h2>

        <p ref={textRef} className="final-cta__text">
          Solicita un diagnóstico estratégico y descubre qué necesita ser
          ajustado para crecer con más claridad, previsibilidad y estrategia.
        </p>

        <a
          ref={buttonRef}
          href="#"
          className="final-cta__button"
          aria-disabled="true"
        >
          <span className="final-cta__button-label">
            Solicitar diagnóstico estratégico
          </span>
        </a>
      </div>
    </section>
  )
}
