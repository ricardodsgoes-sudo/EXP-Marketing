import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const CASES = [
  {
    num: '01',
    client: 'Clínica de estética avanzada',
    segment: 'Estética avanzada · multiprofesional',
    metric: '+182%',
    metricLabel: 'crecimiento en facturación / 9 meses',
    summary:
      'Reestructuración de posicionamiento, ofertas y embudo. Foco en autoridad técnica y previsibilidad comercial.',
  },
  {
    num: '02',
    client: 'Marca de cosmética profesional',
    segment: 'Producto · B2B + B2C',
    metric: '4,2×',
    metricLabel: 'retorno sobre inversión en tráfico',
    summary:
      'Construcción de embudo de captación, contenido editorial y estructura de campañas con lectura semanal de números.',
  },
  {
    num: '03',
    client: 'Profesional independiente · biomédica',
    segment: 'Mentoría EXP Beauty Growth',
    metric: '+340%',
    metricLabel: 'agenda llena / 4 meses',
    summary:
      'Del Instagram sin dirección a una agenda llena, con ticket medio mayor y proceso de cierre estructurado.',
  },
]

export default function Casos() {
  return (
    <>
      <PageHero
        eyebrow="Casos EXP"
        title={
          <>
            Resultados reales
            <br />
            de negocios beauty.
          </>
        }
        intro="Una muestra de lo que pasa cuando esfuerzo y técnica encuentran estrategia. Cada caso reúne contexto, decisiones y números, no solo el titular."
      />

      <section className="page-section" aria-labelledby="cases-list">
        <h2 id="cases-list" className="visually-hidden">
          Casos seleccionados
        </h2>
        <div className="page-section__inner">
          <ol className="case-list">
            {CASES.map((c, i) => (
              <RevealOnScroll
                key={c.num}
                as="li"
                className="case-row"
                delay={i * 110}
              >
                <span className="case-row__num">{c.num}</span>
                <div className="case-row__body">
                  <span className="case-row__segment">{c.segment}</span>
                  <h3 className="case-row__client">{c.client}</h3>
                  <p className="case-row__summary">{c.summary}</p>
                </div>
                <div className="case-row__metric">
                  <span className="case-row__metric-value">{c.metric}</span>
                  <span className="case-row__metric-label">{c.metricLabel}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ol>

          <RevealOnScroll as="p" className="case-list__note" delay={200}>
            Más casos publicados pronto. Los detalles completos se comparten en
            las sesiones de diagnóstico bajo NDA.
          </RevealOnScroll>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
