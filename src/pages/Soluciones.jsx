import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import expX from '../assets/exp-x-light.png'
import solucionesHero from '../assets/soluciones-hero.png'

const PATHS = [
  {
    num: '01',
    title: 'Mentoría EXP\nBeauty Growth',
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
    title: 'Consultoría\nEstratégica EXP',
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
    title: 'Servicios EXP\nMarketing Digital',
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
    cta: 'Ver servicios',
    to: '/marketing-digital',
  },
]

const COMPARISON_ROWS = [
  {
    label: 'Objetivo',
    mentoria: 'Aprender a estructurar tu negocio y mejorar tus resultados.',
    consultoria:
      'Recibir dirección estratégica y un plan de crecimiento.',
    md: 'Delegar la ejecución de marketing digital para crecer más rápido.',
  },
  {
    label: 'Ideal para',
    mentoria:
      'Profesionales que quieren aprender y tomar el control de su negocio.',
    consultoria:
      'Negocios que necesitan claridad, estrategia y optimizar resultados.',
    md: 'Clínicas, marcas y profesionales que quieren delegar la ejecución y enfocarse en su negocio.',
  },
  {
    label: 'Enfoque',
    mentoria:
      'Educación + acompañamiento para desarrollar habilidades y tomar mejores decisiones.',
    consultoria:
      'Análisis profundo + estrategia personalizada + plan de acción con dirección.',
    md: 'Ejecución profesional de acciones de marketing digital con foco en resultados.',
  },
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  )
}

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
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)
  const pathsRef = useRef(null)

  const handleCompareClick = (e) => {
    e.preventDefault()
    scrollToAnchor('comparar-soluciones')
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Paths section rises over the hero — scrubbed translate so the
      // off-white sheet lifts up while the hero stays anchored. Combined
      // with the negative margin + rounded top edge in CSS, this reads
      // as a true parallax cover-up.
      if (pathsRef.current && heroRef.current) {
        gsap.fromTo(
          pathsRef.current,
          { y: 140 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: pathsRef.current,
              start: 'top bottom',
              end: 'top 30%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      // Hero content drifts up slightly slower than the page scroll, so
      // it appears to linger as the paths section rises over it.
      if (heroContentRef.current && heroRef.current) {
        gsap.to(heroContentRef.current, {
          y: -48,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section
        className="sol-hero"
        aria-labelledby="sol-hero-title"
        ref={heroRef}
      >
        {/* Background layers: champagne X watermark + subtle diagonal accents */}
        <img
          src={expX}
          alt=""
          className="sol-hero__x-mark"
          aria-hidden="true"
          draggable="false"
        />
        <svg
          className="sol-hero__lines"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="0" y1="0" x2="1000" y2="1000" />
          <line x1="1000" y1="0" x2="0" y2="1000" />
        </svg>
        <span className="sol-hero__glow" aria-hidden="true" />

        <RevealOnScroll as="div" className="sol-hero__visual" delay={580}>
          <div className="sol-hero__image-wrap">
            <img
              src={solucionesHero}
              alt=""
              className="sol-hero__image"
              draggable="false"
            />
          </div>
        </RevealOnScroll>

        <div className="sol-hero__inner">
          <div className="sol-hero__content" ref={heroContentRef}>
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

            <RevealOnScroll as="p" className="sol-hero__subtitle" delay={260}>
              Puedes aprender, recibir dirección estratégica o contratar a
              nuestro equipo para ejecutar.
            </RevealOnScroll>

            <RevealOnScroll as="p" className="sol-hero__support" delay={360}>
              Cada negocio beauty vive un momento diferente. Por eso, EXP
              organiza sus soluciones en tres caminos: mentoría, consultoría
              estratégica y servicios de marketing digital.
            </RevealOnScroll>

            <RevealOnScroll as="div" className="sol-hero__actions" delay={480}>
              <Link to="/#cta" className="sol-btn sol-btn--primary">
                Solicitar diagnóstico estratégico
              </Link>
              <a
                href="#comparar-soluciones"
                className="sol-btn sol-btn--ghost-light"
                onClick={handleCompareClick}
              >
                Comparar soluciones
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── 2. PATHS ────────────────────────────────────────── */}
      <section
        className="sol-paths"
        aria-labelledby="sol-paths-title"
        ref={pathsRef}
      >
        <div className="sol-paths__head">
          <RevealOnScroll
            as="h2"
            id="sol-paths-title"
            className="sol-paths__title"
          >
            Elige el camino más adecuado para tu momento
          </RevealOnScroll>
          <RevealOnScroll as="p" className="sol-paths__body" delay={140}>
            No todas las soluciones sirven para la misma etapa. La clave es
            entender si tu negocio necesita aprender, recibir dirección o
            delegar la ejecución.
          </RevealOnScroll>
        </div>

        <div className="sol-paths__grid">
          {PATHS.map((path, i) => (
            <PathCard key={path.num} {...path} index={i} />
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
            <h2 id="sol-compare-title" className="sol-compare__title">
              No todas las soluciones sirven para el mismo momento.
            </h2>
            <span className="sol-compare__rule" aria-hidden="true" />
            <p className="sol-compare__intro">
              Antes de elegir una solución, es importante entender si tu
              negocio necesita conocimiento, dirección o ejecución.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            as="div"
            className="compare-table"
            delay={160}
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
                <div className="compare-table__row-label" role="rowheader">
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
        <img
          src={expX}
          alt=""
          className="sol-diag__x sol-diag__x--left"
          aria-hidden="true"
          draggable="false"
        />
        <img
          src={expX}
          alt=""
          className="sol-diag__x sol-diag__x--right"
          aria-hidden="true"
          draggable="false"
        />
        <div className="sol-diag__inner">
          <div className="sol-diag__text">
            <RevealOnScroll as="span" className="sol-diag__eyebrow">
              Diagnóstico estratégico
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="sol-diag-title"
              className="sol-diag__title"
              delay={140}
            >
              Si no sabes qué solución elegir,
              <br />
              empieza por el diagnóstico.
            </RevealOnScroll>
            <RevealOnScroll as="p" className="sol-diag__body" delay={260}>
              El diagnóstico estratégico ayuda a entender qué está frenando tu
              crecimiento y cuál es el camino más adecuado para tu momento
              actual: aprender, recibir dirección o delegar la ejecución.
            </RevealOnScroll>
          </div>
          <RevealOnScroll as="div" className="sol-diag__action" delay={380}>
            <Link to="/#cta" className="sol-btn sol-btn--primary sol-btn--lg">
              Solicitar diagnóstico estratégico
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}

function PathCard({ num, title, description, listLabel, list, cta, to }) {
  return (
    <article className="path-card">
      <RevealOnScroll as="span" className="path-card__num">
        <span className="path-card__num-text">{num}</span>
        <span className="path-card__num-dash" aria-hidden="true" />
      </RevealOnScroll>

      <RevealOnScroll as="h3" className="path-card__title" delay={80}>
        {title.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </RevealOnScroll>

      <RevealOnScroll as="p" className="path-card__text" delay={160}>
        {description}
      </RevealOnScroll>

      <RevealOnScroll as="div" className="path-card__list-wrap" delay={240}>
        <span className="path-card__list-label">{listLabel}</span>
        <ul className="path-card__list">
          {list.map((item) => (
            <li key={item} className="path-card__list-item">
              <span className="path-card__list-icon" aria-hidden="true">
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll as="div" className="path-card__cta-wrap" delay={320}>
        <Link to={to} className="path-card__cta">
          {cta}
        </Link>
      </RevealOnScroll>
    </article>
  )
}
