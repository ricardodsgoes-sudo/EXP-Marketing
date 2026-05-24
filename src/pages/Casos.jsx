import RevealOnScroll from '../components/RevealOnScroll'
import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'
import './Casos.css'

const ARTIFACTS = [
  'Testimonios',
  'Antes y después',
  'Capturas de métricas',
  'Páginas creadas',
  'Campañas',
  'Creativos',
  'Resultados de mentoradas',
  'Estudios de caso',
]

export default function Casos() {
  return (
    <>
      <PageHero
        eyebrow="Casos EXP"
        title={
          <>
            Resultados, proyectos y estrategias
            <br />
            aplicadas al mercado beauty.
          </>
        }
        intro="Aquí reunimos casos, proyectos, campañas, páginas, contenidos y transformaciones construidas con estrategia, ejecución y análisis de datos."
      />

      <section
        className="casos-archive"
        aria-labelledby="casos-archive-title"
      >
        <div className="casos-archive__inner">
          <RevealOnScroll
            as="span"
            className="casos-archive__eyebrow"
          >
            Archivo selectivo
          </RevealOnScroll>

          <RevealOnScroll
            as="h2"
            id="casos-archive-title"
            className="casos-archive__title"
            delay={120}
          >
            Los resultados <em>se comparten</em>
            <br />
            en confianza.
          </RevealOnScroll>

          <RevealOnScroll
            as="p"
            className="casos-archive__body"
            delay={240}
          >
            Cada caso reúne procesos comerciales, métricas reales, decisiones
            estratégicas y datos sensibles del negocio. Por eso no los
            publicamos abiertamente. Los compartimos en sesiones de
            diagnóstico, bajo NDA, con quien evalúa trabajar con EXP.
          </RevealOnScroll>

          <RevealOnScroll
            as="p"
            className="casos-archive__body"
            delay={340}
          >
            En esas conversaciones presentamos lo que construimos junto a
            clínicas, marcas y profesionales del mercado beauty:
          </RevealOnScroll>

          <ul
            className="casos-archive__list"
            aria-label="Materiales que se comparten en el diagnóstico"
          >
            {ARTIFACTS.map((item, i) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="casos-archive__item"
                delay={i * 70}
              >
                <span className="casos-archive__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="casos-archive__label">{item}</span>
              </RevealOnScroll>
            ))}
          </ul>

          <RevealOnScroll
            as="p"
            className="casos-archive__note"
            delay={200}
          >
            Si quieres ver casos aplicados a tu segmento, escríbenos. Los
            compartimos en privado durante el diagnóstico estratégico.
          </RevealOnScroll>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
