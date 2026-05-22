import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const PILLARS = [
  {
    num: '01',
    title: 'Estrategia antes que ejecución',
    text: 'No hay táctica que sostenga un negocio sin dirección. Toda entrega empieza por entender el momento real.',
  },
  {
    num: '02',
    title: 'Números como brújula',
    text: 'Decidimos con datos del propio negocio. Métricas claras, leídas con frecuencia, son lo que separa crecimiento de suerte.',
  },
  {
    num: '03',
    title: 'Posicionamiento como activo',
    text: 'Marca, narrativa y autoridad son inversión, no decoración. Se construyen con consistencia, no con tendencias.',
  },
  {
    num: '04',
    title: 'Método sobre intuición',
    text: 'Procesos repetibles para marketing, ventas y gestión. Lo que se puede medir, se puede mejorar.',
  },
]

export default function SobreEXP() {
  return (
    <>
      <PageHero
        eyebrow="Sobre EXP"
        title={
          <>
            Una agencia para
            <br />
            negocios beauty con ambición.
          </>
        }
        intro="EXP nace para llenar un vacío del mercado: estrategia real, lectura de números y dirección estructurada para profesionales y marcas del universo beauty."
      />

      <section className="page-section" aria-labelledby="about-manifesto">
        <div className="page-section__inner page-section__inner--narrow">
          <RevealOnScroll as="span" className="page-section__eyebrow">
            Manifiesto
          </RevealOnScroll>
          <RevealOnScroll
            as="h2"
            id="about-manifesto"
            className="page-section__title page-section__title--display"
            delay={120}
          >
            Creemos que el mercado beauty no necesita más ruido. Necesita
            <span className="page-section__title-accent"> claridad</span>.
          </RevealOnScroll>
          <RevealOnScroll as="p" className="page-section__body" delay={260}>
            La mayoría de los negocios beauty no se estancan por falta de talento.
            Se estancan por falta de estrategia. Nosotros existimos para
            transformar técnica y esfuerzo suelto en crecimiento estructurado,
            con marca fuerte, embudo claro y números bajo control.
          </RevealOnScroll>
          <RevealOnScroll as="p" className="page-section__body" delay={360}>
            Trabajamos con profesionales que quieren aprender, con negocios que
            necesitan dirección y con marcas que buscan ejecución profesional.
            Tres puntos de entrada, una misma manera de pensar: estrategia
            primero, números después, estética siempre.
          </RevealOnScroll>
        </div>
      </section>

      <section
        className="page-section page-section--alt"
        aria-labelledby="about-pillars"
      >
        <div className="page-section__inner">
          <RevealOnScroll as="div" className="page-section__lead page-section__lead--center">
            <span className="page-section__eyebrow">Pilares</span>
            <h2 id="about-pillars" className="page-section__title">
              Lo que sostiene nuestra forma de trabajar.
            </h2>
          </RevealOnScroll>

          <ol className="module-grid module-grid--2col">
            {PILLARS.map((p, i) => (
              <RevealOnScroll
                key={p.num}
                as="li"
                className="module-card"
                delay={i * 100}
              >
                <span className="module-card__num">{p.num}</span>
                <h3 className="module-card__title">{p.title}</h3>
                <p className="module-card__text">{p.text}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
