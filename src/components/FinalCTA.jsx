import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FinalCTA.css'

export default function FinalCTA() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)
  const xRefs = useRef([])
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

      // Subtle parallax on the 4 corner X motifs — each runs at a
      // slightly different speed so the section gains dimensional
      // gravity without distracting from the headline.
      const parallaxAmounts = [-44, -28, 36, 52]
      xRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: -parallaxAmounts[i] * 0.5 },
          {
            y: parallaxAmounts[i] * 0.5,
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
      })
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
      <span
        ref={(el) => (xRefs.current[0] = el)}
        className="final-cta__x final-cta__x--tl"
        aria-hidden="true"
      />
      <span
        ref={(el) => (xRefs.current[1] = el)}
        className="final-cta__x final-cta__x--tr"
        aria-hidden="true"
      />
      <span
        ref={(el) => (xRefs.current[2] = el)}
        className="final-cta__x final-cta__x--bl"
        aria-hidden="true"
      />
      <span
        ref={(el) => (xRefs.current[3] = el)}
        className="final-cta__x final-cta__x--br"
        aria-hidden="true"
      />

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
