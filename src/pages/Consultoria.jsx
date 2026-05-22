import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const FOR_WHOM = [
  'Clínicas y marcas beauty que ya facturan y quieren un próximo nivel.',
  'Negocios con equipo y operación, pero sin método claro de crecimiento.',
  'Quien necesita un diagnóstico técnico antes de invertir en tráfico o branding.',
  'Profesionales que quieren un plan estratégico para los próximos 6–12 meses.',
]

const PROCESS = [
  {
    num: '01',
    title: 'Diagnóstico',
    text: 'Inmersión en marca, embudo, ofertas, números y posicionamiento. Lectura del momento real del negocio.',
  },
  {
    num: '02',
    title: 'Plan estratégico',
    text: 'Direccionamientos concretos para marketing, ventas, embudo y gestión. Prioridades, no listas infinitas.',
  },
  {
    num: '03',
    title: 'Roadmap',
    text: 'Calendario de implementación por trimestres, con métricas y puntos de revisión claros.',
  },
  {
    num: '04',
    title: 'Acompañamiento',
    text: 'Sesiones de seguimiento para ajustar el plan según los datos del propio negocio.',
  },
]

export default function Consultoria() {
  return (
    <>
      <PageHero
        eyebrow="Consultoría Estratégica EXP"
        title={
          <>
            Diagnóstico, dirección
            <br />
            y plan de crecimiento.
          </>
        }
        intro="Una mirada estratégica profunda sobre tu negocio beauty. No es una lista de tareas: es una dirección clara para los próximos meses, basada en tus números, tu mercado y tu fase."
      />

      <section className="page-section" aria-labelledby="consult-for-whom">
        <div className="page-section__inner page-section__inner--split">
          <RevealOnScroll as="div" className="page-section__lead">
            <span className="page-section__eyebrow">Para quién</span>
            <h2 id="consult-for-whom" className="page-section__title">
              Para negocios beauty que necesitan dirección, no más ejecución suelta.
            </h2>
          </RevealOnScroll>

          <ul className="bullet-list" aria-label="Perfil ideal">
            {FOR_WHOM.map((item) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="bullet-list__item"
                delay={80}
              >
                {item}
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="page-section page-section--alt"
        aria-labelledby="consult-process"
      >
        <div className="page-section__inner">
          <RevealOnScroll as="div" className="page-section__lead page-section__lead--center">
            <span className="page-section__eyebrow">Cómo trabajamos</span>
            <h2 id="consult-process" className="page-section__title">
              Cuatro fases para salir del diagnóstico con un plan.
            </h2>
          </RevealOnScroll>

          <ol className="process-line">
            {PROCESS.map((p, i) => (
              <RevealOnScroll
                key={p.num}
                as="li"
                className="process-line__item"
                delay={i * 100}
              >
                <span className="process-line__num">{p.num}</span>
                <h3 className="process-line__title">{p.title}</h3>
                <p className="process-line__text">{p.text}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
