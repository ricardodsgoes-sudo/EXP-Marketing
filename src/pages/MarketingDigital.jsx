import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const SERVICES = [
  {
    num: '01',
    title: 'Gestión de Instagram',
    text: 'Estrategia editorial, dirección creativa, producción de contenido y gestión continua para construir autoridad y demanda.',
  },
  {
    num: '02',
    title: 'Tráfico pago',
    text: 'Campañas en Meta Ads y Google con estructura de embudo, segmentación basada en datos y lectura semanal de performance.',
  },
  {
    num: '03',
    title: 'Embudo de ventas',
    text: 'Diseño y montaje de embudos: páginas, automatizaciones, scripts de atención y flujo comercial integrado.',
  },
  {
    num: '04',
    title: 'Branding & identidad',
    text: 'Posicionamiento, narrativa de marca, identidad visual y aplicación coherente en todos los puntos de contacto.',
  },
  {
    num: '05',
    title: 'Sitio editorial',
    text: 'Sitio profesional con identidad propia, performance, SEO y orientado a la conversión real, no solo presencia.',
  },
  {
    num: '06',
    title: 'CRM y comercial',
    text: 'Estructuración del proceso comercial: pipeline, seguimiento, indicadores y rituales para no perder oportunidades.',
  },
]

export default function MarketingDigital() {
  return (
    <>
      <PageHero
        eyebrow="EXP Marketing Digital"
        title={
          <>
            Ejecución profesional
            <br />
            para crecer con dirección.
          </>
        }
        intro="Servicios individuales o combinados de marketing digital, gestionados por nuestro equipo. Pensados para clínicas, marcas y profesionales que ya tienen claridad y necesitan velocidad de ejecución."
      />

      <section className="page-section" aria-labelledby="md-services">
        <div className="page-section__inner">
          <RevealOnScroll as="div" className="page-section__lead page-section__lead--center">
            <span className="page-section__eyebrow">Servicios</span>
            <h2 id="md-services" className="page-section__title">
              Combina lo que tu fase necesita.
            </h2>
            <p className="page-section__subtitle">
              Cada servicio se entrega con método EXP: planeación, ejecución y lectura de resultados.
            </p>
          </RevealOnScroll>

          <ol className="module-grid">
            {SERVICES.map((s, i) => (
              <RevealOnScroll
                key={s.num}
                as="li"
                className="module-card"
                delay={i * 80}
              >
                <span className="module-card__num">{s.num}</span>
                <h3 className="module-card__title">{s.title}</h3>
                <p className="module-card__text">{s.text}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
