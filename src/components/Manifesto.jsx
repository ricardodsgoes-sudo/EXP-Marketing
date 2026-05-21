import { useEffect, useRef, useState } from 'react'

export default function Manifesto() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`manifesto${visible ? ' manifesto--visible' : ''}`}
      aria-labelledby="manifesto-title"
    >
      <div className="manifesto__inner">
        <h2 id="manifesto-title" className="manifesto__title">
          Crecimiento beauty con estrategia,<br />
          no improvisación.
        </h2>

        <div className="manifesto__rule" aria-hidden="true" />

        <div className="manifesto__cols">
          <p className="manifesto__col">
            EXP Marketing ayuda a profesionales, emprendedoras y dueñas
            de clínicas del área beauty a atraer clientas cualificadas,
            vender con más previsibilidad y organizar su crecimiento a
            través de mentoría, consultoría y servicios estratégicos
            de marketing digital.
          </p>
          <p className="manifesto__col">
            Del diagnóstico a la ejecución, unimos estrategia, contenido,
            tráfico, páginas, embudos y análisis de datos para transformar
            negocios beauty en operaciones más lucrativas, organizadas
            y previsibles.
          </p>
        </div>
      </div>
    </section>
  )
}
