import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import FinalCTA from '../components/FinalCTA'
import stepImageDiagnostico from '../assets/mentoria/diagnostico.webp'
import stepImagePlan from '../assets/mentoria/plan.webp'
import stepImageAcompanamiento from '../assets/mentoria/acompanamiento.webp'
import stepImageEvolucion from '../assets/mentoria/evolucion.webp'

/* ────────────────────────────────────────────────────────────────
   Content data — kept here so the JSX below stays a layout file.
   ──────────────────────────────────────────────────────────────── */

const PAIN_ITEMS = [
  'Publicas sin una estrategia clara.',
  'Tienes clientes, pero no constantes.',
  'No sabes cómo atraer a las clientas que realmente quieres.',
  'Sientes que te falta estructura y dirección.',
  'Quieres escalar, pero no sabes por dónde empezar.',
]

const GAIN_ITEMS = [
  'Claridad sobre tu negocio y posicionamiento.',
  'Ofertas más fuertes y estratégicas.',
  'Contenido con dirección.',
  'Ventas con más previsibilidad.',
  'Decisiones basadas en números, no solo intuición.',
]

const FOR_WHOM = [
  'Quieres salir del improviso.',
  'Quieres aprender marketing y gestión.',
  'Quieres vender más procedimientos, cursos o mentorías.',
  'Quieres mejorar tu posicionamiento.',
  'Quieres construir una visión más empresarial.',
]

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico inicial',
    text:
      'Entendemos tu momento actual, tu negocio, tu posicionamiento, tus ofertas, tus canales y tus números.',
    image: stepImageDiagnostico,
    imageAlt: 'Diagnóstico estratégico — análisis del momento actual del negocio',
  },
  {
    num: '02',
    title: 'Plan estratégico',
    text:
      'Organizamos prioridades y definimos una ruta clara para estructurar tu crecimiento.',
    image: stepImagePlan,
    imageAlt: 'Plan estratégico — ruta de crecimiento',
  },
  {
    num: '03',
    title: 'Acompañamiento',
    text:
      'Te guiamos en decisiones de marketing, ventas, contenido, oferta y gestión.',
    image: stepImageAcompanamiento,
    imageAlt: 'Acompañamiento — mentoría continua',
  },
  {
    num: '04',
    title: 'Evolución',
    text:
      'Ajustamos la estrategia basada en resultados y avanzamos a nuevos pasos.',
    image: stepImageEvolucion,
    imageAlt: 'Evolución — crecimiento sostenido',
  },
]

const OUTCOMES = [
  'Posicionamiento más claro.',
  'Oferta más estratégica.',
  'Contenido con intención.',
  'Proceso comercial más organizado.',
  'Lectura de métricas esenciales.',
  'Visión empresarial para crecer con más seguridad.',
]

/* ──────────────────────────── Icons ──────────────────────────── */

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

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

function ArrowIcon() {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────── */

export default function Mentoria() {
  const heroRef = useRef(null)
  const heroPhotoRef = useRef(null)
  const heroContentRef = useRef(null)
  const painGainRef = useRef(null)
  const forWhomRef = useRef(null)
  const howRef = useRef(null)
  const stepRefs = useRef([])
  const outcomesRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* ── Hero: editorial photo slow parallax (translate + scale) ── */
      if (heroPhotoRef.current && heroRef.current) {
        gsap.fromTo(
          heroPhotoRef.current,
          { y: -40, scale: 1.04 },
          {
            y: 60,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      /* ── Hero: text drifts upward slowly as you scroll past ── */
      if (heroContentRef.current && heroRef.current) {
        gsap.to(heroContentRef.current, {
          y: -36,
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

      /* ── Pain / Gain: stagger items in each column independently ── */
      if (painGainRef.current) {
        gsap.from(
          painGainRef.current.querySelectorAll('.mentoria-pg__item'),
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: painGainRef.current,
              start: 'top 75%',
            },
          },
        )
      }

      /* ── Cómo funciona: stacking cards. All cards share the same
         sticky context (siblings, not nested in per-card slots), so
         each card stays pinned at its own top offset while the next
         slides up to physically overlap it. As that happens, GSAP
         scrubs the previous card's scale down (transform-origin:
         top), so the older card peeks out from behind the newer
         one — building a visible deck.
         Skip on mobile: layout falls back to vertical flow there. ── */
      const cards = stepRefs.current.filter(Boolean)
      const isMobile = window.matchMedia('(max-width: 860px)').matches
      if (cards.length && !isMobile) {
        cards.forEach((card, i) => {
          // Image zoom-out: as each card travels from below the fold
          // up to its sticky top, its image scales from 1.5 → 1.
          // Mirrors the `imageScale = useTransform(scrollYProgress,
          // [0, 1], [2, 1])` from the original Motion snippet.
          const img = card.querySelector('.mentoria-stack__img')
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.5 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 0.4,
                },
              },
            )
          }

          if (i === cards.length - 1) return
          const targetScale = 1 - (cards.length - i) * 0.05
          const nextCard = cards[i + 1]
          gsap.to(card, {
            scale: targetScale,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.4,
            },
          })
        })
      }

      /* ── Outcomes: simple stagger fade-up ── */
      if (outcomesRef.current) {
        gsap.from(
          outcomesRef.current.querySelectorAll('.mentoria-outcomes__item'),
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: outcomesRef.current,
              start: 'top 78%',
            },
          },
        )
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ─────────── 1. HERO ─────────── */}
      <section
        className="mentoria-hero"
        aria-labelledby="mentoria-hero-title"
        ref={heroRef}
      >
        <div className="mentoria-hero__inner">
          <div className="mentoria-hero__content" ref={heroContentRef}>
            <RevealOnScroll
              as="span"
              className="mentoria-hero__eyebrow"
              delay={0}
            >
              Mentoría EXP Beauty Growth
            </RevealOnScroll>

            <RevealOnScroll
              as="h1"
              id="mentoria-hero-title"
              className="mentoria-hero__title"
              delay={140}
            >
              Estructura tu negocio beauty con más claridad, estrategia y
              visión empresarial.
            </RevealOnScroll>

            <RevealOnScroll
              as="p"
              className="mentoria-hero__lead"
              delay={260}
            >
              Acompañamiento estratégico para profesionales de la belleza que
              quieren vender más, posicionarse mejor y tomar decisiones con
              más seguridad.
            </RevealOnScroll>

            <RevealOnScroll
              as="p"
              className="mentoria-hero__support"
              delay={360}
            >
              La mentoría es para quienes quieren dejar de improvisar y
              empezar a construir un negocio beauty más organizado, rentable
              y previsible.
            </RevealOnScroll>

            <RevealOnScroll
              as="div"
              className="mentoria-hero__actions"
              delay={480}
            >
              <Link to="/#cta" className="mentoria-btn mentoria-btn--primary">
                Solicitar diagnóstico estratégico
              </Link>
              <a
                href="#mentoria-how"
                className="mentoria-btn mentoria-btn--link"
              >
                <span>Ver cómo funciona</span>
                <ArrowIcon />
              </a>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            as="div"
            className="mentoria-hero__visual"
            delay={420}
          >
            <div className="mentoria-hero__photo" ref={heroPhotoRef}>
              <span
                className="mentoria-photo-placeholder__label"
                aria-hidden="true"
              >
                Foto editorial · mentoría
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── 2. PAIN / GAIN ─────────── */}
      <section
        className="mentoria-pg"
        aria-label="Antes y después de la mentoría"
        ref={painGainRef}
      >
        <div className="mentoria-pg__inner">
          <div className="mentoria-pg__column mentoria-pg__column--pain">
            <RevealOnScroll
              as="span"
              className="mentoria-pg__eyebrow"
              delay={0}
            >
              Sientes que…
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              className="mentoria-pg__title"
              delay={140}
            >
              Trabajas mucho,
              <br />
              pero no creces como quieres.
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              className="mentoria-pg__body"
              delay={240}
            >
              Muchas profesionales beauty tienen técnica, talento y una buena
              entrega, pero siguen creciendo de forma desordenada porque no
              tienen una estructura clara de marketing, ventas y gestión.
            </RevealOnScroll>
            <ul className="mentoria-pg__list" aria-label="Síntomas comunes">
              {PAIN_ITEMS.map((item) => (
                <li
                  key={item}
                  className="mentoria-pg__item mentoria-pg__item--pain"
                >
                  <span className="mentoria-pg__icon" aria-hidden="true">
                    <XIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <span className="mentoria-pg__divider" aria-hidden="true" />

          <div className="mentoria-pg__column mentoria-pg__column--gain">
            <RevealOnScroll
              as="span"
              className="mentoria-pg__eyebrow mentoria-pg__eyebrow--gain"
              delay={0}
            >
              Con la Mentoría EXP tú…
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              className="mentoria-pg__title"
              delay={140}
            >
              Aprendes a construir
              <br />
              crecimiento con dirección.
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              className="mentoria-pg__body"
              delay={240}
            >
              La mentoría une estrategia, posicionamiento, oferta, contenido,
              ventas y números para ayudarte a tomar mejores decisiones y
              estructurar tu negocio con más claridad.
            </RevealOnScroll>
            <ul className="mentoria-pg__list" aria-label="Resultados">
              {GAIN_ITEMS.map((item) => (
                <li
                  key={item}
                  className="mentoria-pg__item mentoria-pg__item--gain"
                >
                  <span className="mentoria-pg__icon" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── 3. PARA QUIÉN ES ─────────── */}
      <section
        className="mentoria-forwhom"
        aria-labelledby="mentoria-forwhom-title"
        ref={forWhomRef}
      >
        <div className="mentoria-forwhom__inner">
          <div className="mentoria-forwhom__lead">
            <RevealOnScroll
              as="span"
              className="mentoria-forwhom__eyebrow"
              delay={0}
            >
              Para quién es
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="mentoria-forwhom-title"
              className="mentoria-forwhom__title"
              delay={140}
            >
              La Mentoría EXP es para ti si…
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              className="mentoria-forwhom__body"
              delay={260}
            >
              Esta mentoría fue creada para profesionales beauty que quieren
              dejar de decidir por intuición y empezar a construir
              crecimiento con más claridad.
            </RevealOnScroll>
          </div>

          <ul className="mentoria-forwhom__list" aria-label="Perfil ideal">
            {FOR_WHOM.map((item, i) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="mentoria-forwhom__item"
                delay={i * 80}
              >
                <span
                  className="mentoria-forwhom__rule"
                  aria-hidden="true"
                />
                <span className="mentoria-forwhom__text">{item}</span>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 4. CÓMO FUNCIONA (stacking cards) ─────────── */}
      <section
        className="mentoria-how"
        id="mentoria-how"
        aria-labelledby="mentoria-how-title"
        ref={howRef}
      >
        <div className="mentoria-how__inner">
          <RevealOnScroll
            as="span"
            className="mentoria-how__eyebrow"
            delay={0}
          >
            Cómo funciona la Mentoría EXP
          </RevealOnScroll>

          <h2 id="mentoria-how-title" className="visually-hidden">
            Los cuatro pasos del acompañamiento
          </h2>

          <div className="mentoria-stack" role="list">
            {STEPS.map((step, i) => (
              <article
                key={step.num}
                className="mentoria-stack__card"
                role="listitem"
                ref={(el) => (stepRefs.current[i] = el)}
                style={{ '--stack-offset': `${i * 18}px`, '--i': i }}
              >
                <div className="mentoria-stack__body">
                  <header className="mentoria-stack__head">
                    <span className="mentoria-stack__num">{step.num}</span>
                    <span
                      className="mentoria-stack__rule"
                      aria-hidden="true"
                    />
                    <span className="mentoria-stack__kicker">
                      Paso {i + 1} de {STEPS.length}
                    </span>
                  </header>
                  <h3 className="mentoria-stack__title">{step.title}</h3>
                  <p className="mentoria-stack__text">{step.text}</p>
                </div>
                <div className="mentoria-stack__media">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="mentoria-stack__img"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 5. LO QUE VAS A DESARROLLAR (outcomes) ─────────── */}
      <section
        className="mentoria-outcomes"
        aria-labelledby="mentoria-outcomes-title"
        ref={outcomesRef}
      >
        <div className="mentoria-outcomes__inner">
          <RevealOnScroll
            as="span"
            className="mentoria-outcomes__eyebrow"
            delay={0}
          >
            Lo que vas a desarrollar durante la mentoría
          </RevealOnScroll>

          <h2 id="mentoria-outcomes-title" className="visually-hidden">
            Resultados que vas a desarrollar
          </h2>

          <ul className="mentoria-outcomes__grid">
            {OUTCOMES.map((item) => (
              <li key={item} className="mentoria-outcomes__item">
                <span
                  className="mentoria-outcomes__icon"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 6. FINAL CTA (shared component) ─────────── */}
      <FinalCTA />
    </>
  )
}
