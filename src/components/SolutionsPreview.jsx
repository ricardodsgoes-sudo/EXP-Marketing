import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from './RevealOnScroll'
import './SolutionsPreview.css'

const SOLUTIONS = [
  {
    num: '01',
    title: 'Mentoría EXP Beauty Growth',
    text: 'Para profesionales de la belleza que quieren aprender a estructurar su propio negocio, vender más, posicionarse en redes sociales, crear ofertas más fuertes y entender sus números con acompañamiento estratégico.',
    cta: 'Conocer la mentoría',
  },
  {
    num: '02',
    title: 'Consultoría Estratégica EXP',
    text: 'Para negocios beauty que necesitan un diagnóstico profundo, un plan de crecimiento y una dirección estratégica personalizada para marketing, ventas, embudo y gestión.',
    cta: 'Solicitar consultoría',
  },
  {
    num: '03',
    title: 'Servicios EXP Marketing Digital',
    text: 'Para clínicas, marcas y profesionales que quieren contratar servicios individuales o combinados de marketing digital para acelerar su crecimiento con ejecución profesional.',
    cta: 'Ver servicios',
  },
]

export default function SolutionsPreview() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(
        ['.solutions__eyebrow', '.solutions__title', '.solutions__subtitle'],
        {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      )

      const cardInners = gsap.utils.toArray('.solutions__card-inner')
      cardInners.forEach((card, index) => {
        const startY = index === 1 ? 10 : 18
        const endY = index === 1 ? -18 : index === 0 ? -10 : -24

        gsap.fromTo(
          card,
          { y: startY },
          {
            y: endY,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="solutions"
      aria-labelledby="solutions-title"
    >
      <div className="solutions__container">
        <header className="solutions__header">
          <span className="solutions__eyebrow">Soluciones EXP</span>
          <h2 id="solutions-title" className="solutions__title">
            Soluciones EXP para cada fase de tu negocio beauty
          </h2>
          <p className="solutions__subtitle">
            Puedes aprender, recibir dirección estratégica o contratar a
            nuestro equipo para ejecutar.
          </p>
        </header>

        <div className="solutions__grid">
          {SOLUTIONS.map((solution, index) => (
            <RevealOnScroll
              key={solution.num}
              as="article"
              className="solutions__card"
              delay={index * 120}
              threshold={0.18}
            >
              <div className="solutions__card-inner">
                <div className="solutions__card-head">
                  <span className="solutions__num">{solution.num}</span>
                  <span className="solutions__line" aria-hidden="true" />
                </div>
                <h3 className="solutions__card-title">{solution.title}</h3>
                <p className="solutions__card-text">{solution.text}</p>
                <a className="solutions__cta" href="#">
                  <span>{solution.cta}</span>
                  <span className="solutions__cta-mark" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
