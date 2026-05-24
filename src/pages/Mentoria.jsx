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
import expMark from '../assets/mentoria/exp-mark.webp'

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

/* Outcomes regrouped into three thematic blocks. Items keep their
   original copy; the numbering runs 01→06 across the whole list so
   the reader sees a single progression even though the layout
   splits into three columns. */
const OUTCOME_THEMES = [
  {
    label: 'Estrategia',
    items: [
      { n: '01', text: 'Posicionamiento más claro.' },
      { n: '02', text: 'Oferta más estratégica.' },
    ],
  },
  {
    label: 'Ejecución',
    items: [
      { n: '03', text: 'Contenido con intención.' },
      { n: '04', text: 'Proceso comercial más organizado.' },
    ],
  },
  {
    label: 'Visión',
    items: [
      { n: '05', text: 'Lectura de métricas esenciales.' },
      { n: '06', text: 'Visión empresarial para crecer con más seguridad.' },
    ],
  },
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

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)'
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)'
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)'
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)'

const FOR_WHOM_ENTRANCE_CLIPS = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const FOR_WHOM_EXIT_CLIPS = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

function getNearestSide(e) {
  const box = e.currentTarget.getBoundingClientRect()
  const sides = [
    { side: 'left', proximity: Math.abs(box.left - e.clientX) },
    { side: 'right', proximity: Math.abs(box.right - e.clientX) },
    { side: 'top', proximity: Math.abs(box.top - e.clientY) },
    { side: 'bottom', proximity: Math.abs(box.bottom - e.clientY) },
  ]

  return sides.sort((a, b) => a.proximity - b.proximity)[0].side
}

function animateForWhomCard(e, entering) {
  const overlay = e.currentTarget.querySelector('.mentoria-forwhom__overlay')
  if (!overlay) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const side = e.clientX ? getNearestSide(e) : 'left'
  const clips = entering ? FOR_WHOM_ENTRANCE_CLIPS[side] : FOR_WHOM_EXIT_CLIPS[side]
  const finalClip = clips[clips.length - 1]

  overlay.getAnimations().forEach((animation) => animation.cancel())

  if (reduceMotion) {
    overlay.style.clipPath = finalClip
    return
  }

  const animation = overlay.animate(
    { clipPath: clips },
    {
      duration: 360,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  )

  animation.onfinish = () => {
    overlay.style.clipPath = finalClip
  }
}

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

    const refreshScrollTriggers = () => ScrollTrigger.refresh()
    let loadRefreshAdded = false

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
          gsap.set(card, {
            zIndex: i + 1,
            y: i * 8,
          })

          // Image zoom-out: as each card travels from below the fold
          // up to its sticky top, its image scales from 1.5 → 1.
          // Mirrors the `imageScale = useTransform(scrollYProgress,
          // [0, 1], [2, 1])` from the original Motion snippet.
          const img = card.querySelector('.mentoria-stack__img')
          if (img) {
            gsap.fromTo(
              img,
              {
                scale: 1.18,
                transformOrigin: 'center center',
                willChange: 'transform',
              },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 105%',
                  end: 'top 16%',
                  scrub: 0.75,
                  invalidateOnRefresh: true,
                },
              },
            )
          }

          if (i === cards.length - 1) return
          const targetScale = 1 - (cards.length - i) * 0.035
          const nextCard = cards[i + 1]
          gsap.to(card, {
            scale: targetScale,
            y: i * 8 - 18,
            opacity: 0.92,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 88%',
              end: 'top 32%',
              scrub: 0.35,
            },
          })
        })

        requestAnimationFrame(refreshScrollTriggers)
        window.addEventListener('load', refreshScrollTriggers, { once: true })
        loadRefreshAdded = true
      }

      /* ── Outcomes: themes scaffold in first, then numbered items
         fill them in — "structure appears, then content lands". ── */
      if (outcomesRef.current) {
        const trigger = {
          trigger: outcomesRef.current,
          start: 'top 78%',
        }

        const labels = outcomesRef.current.querySelectorAll(
          '.mentoria-outcomes__theme-label',
        )
        if (labels.length) {
          gsap.from(labels, {
            y: 14,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: trigger,
          })
        }

        const items = outcomesRef.current.querySelectorAll(
          '.mentoria-outcomes__item',
        )
        if (items.length) {
          gsap.from(items, {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.07,
            delay: 0.22,
            scrollTrigger: trigger,
          })
        }
      }

    })

    return () => {
      if (loadRefreshAdded) {
        window.removeEventListener('load', refreshScrollTriggers)
      }
      ctx.revert()
    }
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
                tabIndex={0}
                onMouseEnter={(e) => animateForWhomCard(e, true)}
                onMouseLeave={(e) => animateForWhomCard(e, false)}
                onFocus={(e) => animateForWhomCard(e, true)}
                onBlur={(e) => animateForWhomCard(e, false)}
              >
                <span className="mentoria-forwhom__overlay" aria-hidden="true" />
                <span className="mentoria-forwhom__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
        style={{ '--mentoria-mark-url': `url(${expMark})` }}
      >
        <div className="mentoria-how__inner">
          <header className="mentoria-how__header">
            <RevealOnScroll
              as="span"
              className="mentoria-how__eyebrow"
              delay={0}
            >
              Método de acompañamiento
            </RevealOnScroll>

            <RevealOnScroll
              as="h2"
              id="mentoria-how-title"
              className="mentoria-how__title"
              delay={80}
            >
              Cómo funciona la Mentoría EXP
            </RevealOnScroll>

            <RevealOnScroll
              as="p"
              className="mentoria-how__lead"
              delay={140}
            >
              Avanzamos por etapas claras: primero leemos tu negocio, después
              ordenamos prioridades y acompañamos las decisiones que sostienen
              el crecimiento.
            </RevealOnScroll>

            <RevealOnScroll
              as="div"
              className="mentoria-how__track"
              aria-label="Secuencia de cuatro pasos de la mentoría"
              delay={200}
            >
              {STEPS.map((step, i) => (
                <span
                  key={step.num}
                  className="mentoria-how__track-step"
                  style={{ '--i': i }}
                >
                  <span>{step.num}</span>
                  {step.title}
                </span>
              ))}
            </RevealOnScroll>
          </header>

          <div className="mentoria-stack" role="list">
            {STEPS.map((step, i) => (
              <article
                key={step.num}
                className="mentoria-stack__card"
                role="listitem"
                ref={(el) => (stepRefs.current[i] = el)}
                style={{ '--stack-offset': `${i * 28}px`, '--i': i }}
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
          <header className="mentoria-outcomes__header">
            <RevealOnScroll
              as="span"
              className="mentoria-outcomes__eyebrow"
              delay={0}
            >
              Lo que vas a desarrollar durante la mentoría
            </RevealOnScroll>

            <RevealOnScroll
              as="h2"
              id="mentoria-outcomes-title"
              className="mentoria-outcomes__title"
              delay={140}
            >
              Vas a salir con dirección,
              <br />
              no con más tácticas.
            </RevealOnScroll>
          </header>

          <div className="mentoria-outcomes__grid">
            {OUTCOME_THEMES.map((theme) => (
              <article
                key={theme.label}
                className="mentoria-outcomes__theme"
              >
                <h3 className="mentoria-outcomes__theme-label">
                  {theme.label}
                </h3>
                <ul className="mentoria-outcomes__list">
                  {theme.items.map((item) => (
                    <li
                      key={item.n}
                      className="mentoria-outcomes__item"
                    >
                      <span
                        className="mentoria-outcomes__num"
                        aria-hidden="true"
                      >
                        {item.n}
                      </span>
                      <span className="mentoria-outcomes__text">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 6. FINAL CTA (shared component) ─────────── */}
      <FinalCTA />
    </>
  )
}
