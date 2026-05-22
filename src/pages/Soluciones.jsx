import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'

const PATHS = [
  {
    num: '01',
    title: 'Mentoría EXP Beauty Growth',
    description:
      'Para profesionales de la belleza que quieren aprender a estructurar su propio negocio, vender más, posicionarse en redes sociales, crear ofertas más fuertes y entender sus números con acompañamiento estratégico.',
    listLabel: 'Ideal para quien',
    list: [
      'Quiere salir del improviso.',
      'Quiere aprender marketing y gestión.',
      'Quiere vender más procedimientos, cursos o mentorías.',
      'Quiere mejorar su posicionamiento.',
      'Quiere construir una visión más empresarial.',
    ],
    cta: 'Conocer la mentoría',
    to: '/mentoria',
  },
  {
    num: '02',
    title: 'Consultoría Estratégica EXP',
    description:
      'Para negocios beauty que necesitan un diagnóstico profundo, un plan de crecimiento y una dirección estratégica personalizada para marketing, ventas, embudo y gestión.',
    listLabel: 'Ideal para quien',
    list: [
      'Ya tiene una operación funcionando.',
      'Quiere entender dónde está perdiendo dinero.',
      'Necesita claridad sobre los próximos pasos.',
      'Quiere estructurar el crecimiento con estrategia.',
      'Necesita una mirada externa y un plan de acción.',
    ],
    cta: 'Solicitar consultoría',
    to: '/consultoria',
  },
  {
    num: '03',
    title: 'Servicios EXP Marketing Digital',
    description:
      'Para clínicas, marcas y profesionales que quieren contratar servicios individuales o combinados de marketing digital para acelerar su crecimiento con ejecución profesional.',
    listLabel: 'Servicios',
    list: [
      'Social Media',
      'Gestión de Tráfico Pago',
      'Landing Pages',
      'Páginas de Venta',
      'Embudos de Conversión',
      'Copywriting',
      'Creativos para anuncios',
      'Planificación de contenido',
      'Análisis de métricas',
    ],
    listColumns: 2,
    cta: 'Ver servicios',
    to: '/marketing-digital',
  },
]

const COMPARISON_ROWS = [
  {
    label: 'Objetivo',
    mentoria:
      'Aprender a construir crecimiento con acompañamiento estratégico.',
    consultoria:
      'Recibir diagnóstico, dirección y prioridades para tomar mejores decisiones.',
    md: 'Delegar la ejecución a un equipo especializado.',
  },
  {
    label: 'Ideal para',
    mentoria:
      'Profesionales que quieren aprender y estructurar su propio crecimiento.',
    consultoria:
      'Negocios que necesitan claridad estratégica antes de seguir invirtiendo.',
    md: 'Marcas, clínicas y profesionales que quieren ejecución profesional.',
  },
  {
    label: 'Enfoque',
    mentoria: 'Formación, acompañamiento y visión empresarial.',
    consultoria: 'Diagnóstico, estrategia, embudo, ventas y gestión.',
    md: 'Contenido, tráfico, páginas, embudos, copy y métricas.',
  },
]

function scrollToAnchor(id) {
  const target = document.getElementById(id)
  if (!target) return
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -80 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Soluciones() {
  const handleCompareClick = (e) => {
    e.preventDefault()
    scrollToAnchor('comparar-soluciones')
  }

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="sol-hero" aria-labelledby="sol-hero-title">
        <span className="sol-hero__x" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <path
              d="M30 30 L170 170"
              stroke="var(--champagne)"
              strokeWidth="1"
            />
            <path
              d="M170 30 L30 170"
              stroke="var(--champagne)"
              strokeWidth="1"
            />
          </svg>
        </span>

        <div className="sol-hero__inner">
          <RevealOnScroll as="span" className="sol-hero__eyebrow" delay={0}>
            Soluciones EXP
          </RevealOnScroll>

          <RevealOnScroll
            as="h1"
            id="sol-hero-title"
            className="sol-hero__title"
            delay={140}
          >
            Soluciones EXP para cada fase de tu negocio beauty
          </RevealOnScroll>

          <RevealOnScroll as="p" className="sol-hero__subtitle" delay={280}>
            Puedes aprender, recibir dirección estratégica o contratar a nuestro
            equipo para ejecutar.
          </RevealOnScroll>

          <RevealOnScroll as="p" className="sol-hero__support" delay={380}>
            Cada negocio beauty vive un momento diferente. Por eso, EXP organiza
            sus soluciones en tres caminos: mentoría, consultoría estratégica y
            servicios de marketing digital.
          </RevealOnScroll>

          <RevealOnScroll as="div" className="sol-hero__actions" delay={480}>
            <Link to="/#cta" className="sol-btn sol-btn--primary">
              Solicitar diagnóstico estratégico
            </Link>
            <a
              href="#comparar-soluciones"
              className="sol-btn sol-btn--ghost"
              onClick={handleCompareClick}
            >
              Comparar soluciones
            </a>
          </RevealOnScroll>

          <span className="sol-hero__rule" aria-hidden="true" />
        </div>
      </section>

      {/* ── 2. PATHS ────────────────────────────────────────── */}
      <section className="sol-paths" aria-labelledby="sol-paths-title">
        <div className="sol-paths__intro">
          <RevealOnScroll as="span" className="sol-paths__eyebrow">
            Tres caminos
          </RevealOnScroll>
          <RevealOnScroll
            as="h2"
            id="sol-paths-title"
            className="sol-paths__title"
            delay={120}
          >
            Elige el camino más adecuado para tu momento
          </RevealOnScroll>
          <RevealOnScroll as="p" className="sol-paths__body" delay={240}>
            No todas las soluciones sirven para la misma etapa. La clave es
            entender si tu negocio necesita aprender, recibir dirección o
            delegar la ejecución.
          </RevealOnScroll>
        </div>

        <div className="sol-paths__list">
          {PATHS.map((path, i) => (
            <PathBlock key={path.num} {...path} index={i} />
          ))}
        </div>
      </section>

      {/* ── 3. COMPARISON ───────────────────────────────────── */}
      <section
        className="sol-compare"
        id="comparar-soluciones"
        aria-labelledby="sol-compare-title"
      >
        <div className="sol-compare__inner">
          <RevealOnScroll as="div" className="sol-compare__head">
            <span className="sol-compare__eyebrow">Comparar</span>
            <h2 id="sol-compare-title" className="sol-compare__title">
              No todas las soluciones sirven para el mismo momento.
            </h2>
            <p className="sol-compare__intro">
              Antes de elegir una solución, es importante entender si tu negocio
              necesita conocimiento, dirección o ejecución.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            as="div"
            className="compare-table"
            delay={200}
            role="table"
            aria-label="Comparación entre las tres soluciones EXP"
          >
            <div className="compare-table__head" role="row">
              <span aria-hidden="true" />
              <span className="compare-table__col" role="columnheader">
                Mentoría
              </span>
              <span className="compare-table__col" role="columnheader">
                Consultoría
              </span>
              <span className="compare-table__col" role="columnheader">
                Marketing Digital
              </span>
            </div>

            {COMPARISON_ROWS.map((row) => (
              <div className="compare-table__row" role="row" key={row.label}>
                <div
                  className="compare-table__row-label"
                  role="rowheader"
                >
                  {row.label}
                </div>
                <div className="compare-table__cell" role="cell">
                  <span className="compare-table__cell-label">Mentoría</span>
                  <p>{row.mentoria}</p>
                </div>
                <div className="compare-table__cell" role="cell">
                  <span className="compare-table__cell-label">
                    Consultoría
                  </span>
                  <p>{row.consultoria}</p>
                </div>
                <div className="compare-table__cell" role="cell">
                  <span className="compare-table__cell-label">
                    Marketing Digital
                  </span>
                  <p>{row.md}</p>
                </div>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── 4. DIAGNÓSTICO CTA ──────────────────────────────── */}
      <section className="sol-diag" aria-labelledby="sol-diag-title">
        <div className="sol-diag__inner">
          <RevealOnScroll as="span" className="sol-diag__eyebrow">
            Diagnóstico estratégico
          </RevealOnScroll>
          <RevealOnScroll
            as="h2"
            id="sol-diag-title"
            className="sol-diag__title"
            delay={140}
          >
            Si no sabes qué solución elegir, empieza por el diagnóstico.
          </RevealOnScroll>
          <RevealOnScroll as="p" className="sol-diag__text" delay={260}>
            El diagnóstico estratégico ayuda a entender qué está frenando tu
            crecimiento y cuál es el camino más adecuado para tu momento actual:
            aprender, recibir dirección o delegar la ejecución.
          </RevealOnScroll>
          <RevealOnScroll
            as="div"
            className="sol-diag__action"
            delay={380}
          >
            <Link to="/#cta" className="sol-btn sol-btn--primary sol-btn--lg">
              Solicitar diagnóstico estratégico
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}

function PathBlock({
  num,
  title,
  description,
  listLabel,
  list,
  listColumns = 1,
  cta,
  to,
  index,
}) {
  const variant = index % 2 === 0 ? 'a' : 'b'
  return (
    <article className={`path-block path-block--${variant}`}>
      <div className="path-block__inner">
        <RevealOnScroll as="span" className="path-block__num">
          {num}
        </RevealOnScroll>

        <div className="path-block__body">
          <RevealOnScroll as="h3" className="path-block__title" delay={80}>
            {title}
          </RevealOnScroll>

          <RevealOnScroll as="p" className="path-block__text" delay={160}>
            {description}
          </RevealOnScroll>

          <RevealOnScroll as="div" className="path-block__list-wrap" delay={240}>
            <span className="path-block__list-label">{listLabel}</span>
            <ul
              className={
                'path-block__list' +
                (listColumns === 2 ? ' path-block__list--2col' : '')
              }
            >
              {list.map((item) => (
                <li key={item} className="path-block__list-item">
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll as="div" className="path-block__cta-wrap" delay={320}>
            <Link to={to} className="path-block__cta">
              <span>{cta}</span>
              <span className="path-block__cta-mark" aria-hidden="true">
                →
              </span>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  )
}
