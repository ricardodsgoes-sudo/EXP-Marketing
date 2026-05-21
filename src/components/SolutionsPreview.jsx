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
  return (
    <section className="solutions" aria-labelledby="solutions-title">
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
