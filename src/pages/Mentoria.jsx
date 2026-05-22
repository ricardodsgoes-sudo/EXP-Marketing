import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const FOR_WHOM = [
  'Profesionales del mercado beauty que ya facturan, pero sin estructura clara.',
  'Esteticistas, biomédicas, dermatos y profesionales independientes.',
  'Pequeñas clínicas o estudios listos para profesionalizar la gestión.',
  'Quien quiere aprender a leer sus números y tomar decisiones con base estratégica.',
]

const MODULES = [
  {
    num: '01',
    title: 'Posicionamiento',
    text: 'Cómo construir una marca personal o de clínica que comunique autoridad y atraiga el público correcto.',
  },
  {
    num: '02',
    title: 'Contenido con dirección',
    text: 'Cómo estructurar un Instagram que vende: pilares, formatos, ritmo de publicación y narrativa de oferta.',
  },
  {
    num: '03',
    title: 'Embudo y conversión',
    text: 'Del primer contacto a la venta: cómo organizar atención, seguimiento y cierre sin depender de la intuición.',
  },
  {
    num: '04',
    title: 'Ofertas y pricing',
    text: 'Cómo construir ofertas más fuertes, escalonadas y rentables, con argumentación clara de valor.',
  },
  {
    num: '05',
    title: 'Números del negocio',
    text: 'Las métricas mínimas que toda profesional beauty debería leer cada semana para decidir con datos.',
  },
  {
    num: '06',
    title: 'Rutina y gestión',
    text: 'Cómo organizar la semana del negocio: agenda, equipo, marketing y comercial sin caos.',
  },
]

export default function Mentoria() {
  return (
    <>
      <PageHero
        eyebrow="Mentoría EXP Beauty Growth"
        title={
          <>
            Aprende a estructurar
            <br />
            tu propio negocio beauty.
          </>
        }
        intro="Un acompañamiento estratégico para profesionales del mercado beauty que quieren dejar de depender del algoritmo y construir un negocio que crece con dirección, método y números."
      />

      <section className="page-section" aria-labelledby="mentoria-for-whom">
        <div className="page-section__inner page-section__inner--split">
          <RevealOnScroll as="div" className="page-section__lead">
            <span className="page-section__eyebrow">Para quién</span>
            <h2 id="mentoria-for-whom" className="page-section__title">
              Para profesionales beauty listas para profesionalizar el negocio.
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
        aria-labelledby="mentoria-modules"
      >
        <div className="page-section__inner">
          <RevealOnScroll as="div" className="page-section__lead page-section__lead--center">
            <span className="page-section__eyebrow">Qué vas a desarrollar</span>
            <h2 id="mentoria-modules" className="page-section__title">
              Seis ejes para transformar esfuerzo suelto en crecimiento.
            </h2>
          </RevealOnScroll>

          <ol className="module-grid">
            {MODULES.map((m, i) => (
              <RevealOnScroll
                key={m.num}
                as="li"
                className="module-card"
                delay={i * 90}
              >
                <span className="module-card__num">{m.num}</span>
                <h3 className="module-card__title">{m.title}</h3>
                <p className="module-card__text">{m.text}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
