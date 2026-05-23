import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import FinalCTA from '../components/FinalCTA'

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
  },
  {
    num: '02',
    title: 'Plan estratégico',
    text:
      'Organizamos prioridades y definimos una ruta clara para estructurar tu crecimiento.',
  },
  {
    num: '03',
    title: 'Acompañamiento',
    text:
      'Te guiamos en decisiones de marketing, ventas, contenido, oferta y gestión.',
  },
  {
    num: '04',
    title: 'Evolución',
    text:
      'Ajustamos la estrategia basada en resultados y avanzamos a nuevos pasos.',
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

/* ─────── Editorial step icons (one per timeline phase) ───────
   Each icon is a layered composition (ambient backdrop → faint
   structural elements → main strokes → champagne focal point with
   halo). Stroked elements carry pathLength="1" so GSAP can draw
   them in via stroke-dashoffset. Inspired by editorial diagrams
   (Vignelli / Aicher / Apple year-in-review).
   ──────────────────────────────────────────────────────────── */

function IconDiagnostico() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="step-icon"
      aria-hidden="true"
      focusable="false"
    >
      {/* ── Ambient: sparse 3×3 dot grid behind the lens ── */}
      <g className="step-icon__ambient">
        {[28, 50, 72].map((y) =>
          [28, 50, 72].map((x) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.5" />
          )),
        )}
      </g>

      {/* ── Faint: outer 3/4 arc (incomplete — editorial open frame) ── */}
      <path
        d="M 50 8 A 42 42 0 1 0 92 50"
        className="step-icon__faint"
        pathLength="1"
      />
      {/* Cardinal tick marks pointing inward */}
      <line x1="50" y1="2" x2="50" y2="8" className="step-icon__faint" pathLength="1" />
      <line x1="50" y1="92" x2="50" y2="98" className="step-icon__faint" pathLength="1" />
      <line x1="2" y1="50" x2="8" y2="50" className="step-icon__faint" pathLength="1" />
      <line x1="92" y1="50" x2="98" y2="50" className="step-icon__faint" pathLength="1" />

      {/* ── Main diagnostic lens (slightly off-center for asymmetry) ── */}
      <circle cx="44" cy="52" r="24" pathLength="1" />
      <circle cx="44" cy="52" r="16" className="step-icon__faint" pathLength="1" />

      {/* Internal crosshair, faded */}
      <line x1="44" y1="32" x2="44" y2="72" className="step-icon__hint" pathLength="1" />
      <line x1="24" y1="52" x2="64" y2="52" className="step-icon__hint" pathLength="1" />

      {/* Scattered data points — varied weight */}
      <circle cx="32" cy="42" r="1.2" className="step-icon__dot" />
      <circle cx="40" cy="38" r="1.4" className="step-icon__dot" />
      <circle cx="52" cy="44" r="1.0" className="step-icon__dot" />
      <circle cx="34" cy="56" r="1.2" className="step-icon__dot" />
      <circle cx="50" cy="62" r="1.0" className="step-icon__dot" />
      <circle cx="40" cy="68" r="1.3" className="step-icon__dot" />

      {/* Identifier hairline traveling to a bracket label */}
      <path d="M 47 49 L 78 30 L 88 30" pathLength="1" />
      <line x1="86" y1="26" x2="86" y2="34" pathLength="1" />

      {/* ── Champagne focal: insight + concentric halo ── */}
      <circle
        cx="47"
        cy="49"
        r="6.5"
        className="step-icon__accent-ring"
        pathLength="1"
      />
      <circle cx="47" cy="49" r="3.5" className="step-icon__accent" />
    </svg>
  )
}

function IconPlan() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="step-icon"
      aria-hidden="true"
      focusable="false"
    >
      {/* ── Ambient: sparse 4×4 dot grid ── */}
      <g className="step-icon__ambient">
        {[18, 38, 58, 78].map((y) =>
          [18, 38, 58, 78].map((x) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.5" />
          )),
        )}
      </g>

      {/* ── Faint: discarded earlier-route in dashes ── */}
      <path
        d="M 14 84 L 32 84 L 32 58 L 60 58 L 60 32"
        className="step-icon__hint-dashed"
        pathLength="1"
      />

      {/* ── Outer bracket (top-left + bottom-right editorial frame) ── */}
      <path d="M 8 22 L 8 8 L 22 8" className="step-icon__faint" pathLength="1" />
      <path d="M 78 92 L 92 92 L 92 78" className="step-icon__faint" pathLength="1" />

      {/* Distance scale tick marks (right side) */}
      <line x1="92" y1="38" x2="96" y2="38" className="step-icon__faint" pathLength="1" />
      <line x1="92" y1="48" x2="96" y2="48" className="step-icon__faint" pathLength="1" />
      <line x1="92" y1="58" x2="96" y2="58" className="step-icon__faint" pathLength="1" />

      {/* Compass-like N tick (upper right) */}
      <line x1="88" y1="12" x2="88" y2="20" className="step-icon__faint" pathLength="1" />
      <path d="M 84 16 L 88 12 L 92 16" className="step-icon__faint" pathLength="1" />

      {/* ── Main strategic route (right-angled, deliberate) ── */}
      <path
        d="M 14 84 L 14 64 L 42 64 L 42 38 L 72 38 L 72 22"
        pathLength="1"
      />
      {/* Arrowhead at destination */}
      <path d="M 66 28 L 72 22 L 78 28" pathLength="1" />

      {/* Waypoint nodes (hollow rings) */}
      <circle cx="14" cy="84" r="2.2" className="step-icon__dot" />
      <circle cx="14" cy="64" r="2.4" className="step-icon__node" pathLength="1" />
      <circle cx="42" cy="64" r="2.4" className="step-icon__node" pathLength="1" />
      <circle cx="42" cy="38" r="2.4" className="step-icon__node" pathLength="1" />

      {/* ── Champagne destination + halo ── */}
      <circle
        cx="72"
        cy="22"
        r="6.5"
        className="step-icon__accent-ring"
        pathLength="1"
      />
      <circle cx="72" cy="22" r="3.6" className="step-icon__accent" />
    </svg>
  )
}

function IconAcompanamiento() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="step-icon"
      aria-hidden="true"
      focusable="false"
    >
      {/* ── Ambient: time-axis tick row at the very bottom ── */}
      <g className="step-icon__ambient">
        {[10, 24, 38, 52, 66, 80, 94].map((x) => (
          <line key={x} x1={x} y1="90" x2={x} y2="93" />
        ))}
        <line x1="8" y1="92" x2="96" y2="92" />
      </g>

      {/* ── Faint: editorial brackets at start and end ── */}
      <path d="M 6 28 L 4 28 L 4 60 L 6 60" className="step-icon__faint" pathLength="1" />
      <path d="M 94 28 L 96 28 L 96 60 L 94 60" className="step-icon__faint" pathLength="1" />

      {/* Distance annotation hairline along the bottom */}
      <line x1="14" y1="82" x2="86" y2="82" className="step-icon__hint" pathLength="1" />
      <line x1="14" y1="80" x2="14" y2="84" className="step-icon__hint" pathLength="1" />
      <line x1="86" y1="80" x2="86" y2="84" className="step-icon__hint" pathLength="1" />

      {/* ── Two parallel paths (mentor leading slightly above) ── */}
      <path
        d="M 8 32 Q 30 28, 50 32 T 92 32"
        pathLength="1"
      />
      <path
        d="M 8 60 Q 30 56, 50 60 T 92 60"
        pathLength="1"
      />

      {/* Touchpoint connectors (5 ticks between the paths) */}
      <line x1="22" y1="32" x2="22" y2="60" className="step-icon__faint" pathLength="1" />
      <line x1="36" y1="32" x2="36" y2="60" className="step-icon__faint" pathLength="1" />
      <line x1="64" y1="32" x2="64" y2="60" className="step-icon__faint" pathLength="1" />
      <line x1="78" y1="32" x2="78" y2="60" className="step-icon__faint" pathLength="1" />

      {/* Endpoint nodes */}
      <circle cx="8" cy="32" r="2" className="step-icon__node" pathLength="1" />
      <circle cx="92" cy="32" r="2" className="step-icon__dot" />
      <circle cx="8" cy="60" r="2" className="step-icon__node" pathLength="1" />
      <circle cx="92" cy="60" r="2" className="step-icon__dot" />

      {/* ── Champagne central touchpoint: line + endpoints + halo ── */}
      <line
        x1="50"
        y1="32"
        x2="50"
        y2="60"
        className="step-icon__accent-line"
        pathLength="1"
      />
      <circle
        cx="50"
        cy="46"
        r="9"
        className="step-icon__accent-ring"
        pathLength="1"
      />
      <circle cx="50" cy="32" r="2.6" className="step-icon__accent" />
      <circle cx="50" cy="60" r="2.6" className="step-icon__accent" />
    </svg>
  )
}

function IconEvolucion() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="step-icon"
      aria-hidden="true"
      focusable="false"
    >
      {/* ── Ambient: Y-axis ticks + faint grid baseline ── */}
      <g className="step-icon__ambient">
        <line x1="8" y1="14" x2="8" y2="88" />
        <line x1="6" y1="14" x2="10" y2="14" />
        <line x1="6" y1="36" x2="10" y2="36" />
        <line x1="6" y1="58" x2="10" y2="58" />
        <line x1="6" y1="80" x2="10" y2="80" />
        <line x1="8" y1="88" x2="92" y2="88" />
      </g>

      {/* ── Faint: previous baseline performance (a flat curve) ── */}
      <path
        d="M 12 78 Q 30 76, 48 78 T 88 76"
        className="step-icon__faint"
        pathLength="1"
      />

      {/* Annotation bracket showing the growth range (right side) */}
      <path d="M 90 18 L 94 18 L 94 76 L 90 76" className="step-icon__hint" pathLength="1" />
      <line x1="84" y1="46" x2="90" y2="46" className="step-icon__hint" pathLength="1" />

      {/* Dashed prediction extending past the peak */}
      <path
        d="M 76 22 L 88 8"
        className="step-icon__hint-dashed"
        pathLength="1"
      />

      {/* ── Main ascending stepped curve ── */}
      <path
        d="M 12 78 L 12 66 L 30 66 L 30 50 L 48 50 L 48 36 L 66 36 L 66 22 L 76 22"
        pathLength="1"
      />

      {/* Arrowhead at the trajectory tip */}
      <path d="M 84 12 L 88 8 L 92 12" pathLength="1" />

      {/* Corner data nodes */}
      <circle cx="12" cy="78" r="1.8" className="step-icon__dot" />
      <circle cx="30" cy="66" r="1.8" className="step-icon__dot" />
      <circle cx="48" cy="50" r="2" className="step-icon__dot" />
      <circle cx="66" cy="36" r="2" className="step-icon__dot" />

      {/* Vertical reference lines from each plateau down to the baseline */}
      <line x1="30" y1="66" x2="30" y2="88" className="step-icon__hint" pathLength="1" />
      <line x1="48" y1="50" x2="48" y2="88" className="step-icon__hint" pathLength="1" />
      <line x1="66" y1="36" x2="66" y2="88" className="step-icon__hint" pathLength="1" />

      {/* ── Champagne peak with halo ── */}
      <circle
        cx="76"
        cy="22"
        r="7"
        className="step-icon__accent-ring"
        pathLength="1"
      />
      <circle cx="76" cy="22" r="3.6" className="step-icon__accent" />
    </svg>
  )
}

const STEP_ICONS = [IconDiagnostico, IconPlan, IconAcompanamiento, IconEvolucion]

/* ────────────────────────────────────────────────────────────── */

export default function Mentoria() {
  const heroRef = useRef(null)
  const heroPhotoRef = useRef(null)
  const heroContentRef = useRef(null)
  const painGainRef = useRef(null)
  const forWhomRef = useRef(null)
  const howRef = useRef(null)
  const stepLineRef = useRef(null)
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

      /* ── Cómo funciona: champagne line draws across as section
         scrolls into view, then 01-04 cards reveal stagger. ── */
      if (stepLineRef.current && howRef.current) {
        gsap.fromTo(
          stepLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: howRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 0.8,
            },
          },
        )
      }

      if (stepRefs.current.length && howRef.current) {
        gsap.from(stepRefs.current.filter(Boolean), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.16,
          scrollTrigger: {
            trigger: howRef.current,
            start: 'top 60%',
          },
        })

        // Per-step cinematic reveal — 4 weight tiers staged in sequence
        // (ambient → faint/hint → main → accent) so the icon assembles
        // itself like a technical drawing being rendered live. After the
        // sequence settles, a subtle ambient motion loop keeps the
        // composition "alive" without distracting from the copy.
        stepRefs.current.filter(Boolean).forEach((el, i) => {
          const num = el.querySelector('.mentoria-step__num')
          const icon = el.querySelector('.step-icon')
          const stepDelay = i * 0.22

          if (num) {
            gsap.from(num, {
              scale: 0.7,
              opacity: 0,
              duration: 0.7,
              ease: 'back.out(1.6)',
              delay: stepDelay + 0.6, // number arrives after the icon is mostly drawn
              scrollTrigger: {
                trigger: howRef.current,
                start: 'top 60%',
              },
            })
          }

          if (!icon) return

          const ambient = icon.querySelectorAll('.step-icon__ambient > *')
          const faintStrokes = icon.querySelectorAll(
            '.step-icon__faint[pathLength], .step-icon__hint[pathLength], .step-icon__hint-dashed[pathLength]',
          )
          const mainStrokes = icon.querySelectorAll(
            '[pathLength]:not(.step-icon__faint):not(.step-icon__hint):not(.step-icon__hint-dashed):not(.step-icon__accent-ring):not(.step-icon__accent-line)',
          )
          const nodes = icon.querySelectorAll('.step-icon__node')
          const dots = icon.querySelectorAll('.step-icon__dot')
          const accentRing = icon.querySelector('.step-icon__accent-ring')
          const accentLine = icon.querySelector('.step-icon__accent-line')
          const accents = icon.querySelectorAll('.step-icon__accent')

          const trigger = {
            trigger: howRef.current,
            start: 'top 60%',
          }

          // 1) Ambient grid fades in (gentle, low opacity target)
          if (ambient.length) {
            gsap.from(ambient, {
              opacity: 0,
              duration: 0.45,
              ease: 'power1.out',
              stagger: { each: 0.012, from: 'random' },
              delay: stepDelay,
              scrollTrigger: trigger,
            })
          }

          // 2) Faint structural strokes draw in (rings, brackets, axes)
          if (faintStrokes.length) {
            gsap.from(faintStrokes, {
              strokeDashoffset: 1,
              duration: 0.85,
              ease: 'power2.inOut',
              stagger: 0.05,
              delay: stepDelay + 0.25,
              scrollTrigger: trigger,
            })
          }

          // 3) Main strokes draw in (the primary composition)
          if (mainStrokes.length) {
            gsap.from(mainStrokes, {
              strokeDashoffset: 1,
              duration: 1.1,
              ease: 'power2.inOut',
              stagger: 0.06,
              delay: stepDelay + 0.55,
              scrollTrigger: trigger,
            })
          }

          // 4) Hollow nodes scale in
          if (nodes.length) {
            gsap.from(nodes, {
              opacity: 0,
              scale: 0.4,
              transformOrigin: '50% 50%',
              transformBox: 'fill-box',
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.05,
              delay: stepDelay + 1.0,
              scrollTrigger: trigger,
            })
          }

          // 5) Solid data dots ping in (slight overshoot for "punch")
          if (dots.length) {
            gsap.from(dots, {
              opacity: 0,
              scale: 0.2,
              transformOrigin: '50% 50%',
              transformBox: 'fill-box',
              duration: 0.55,
              ease: 'back.out(2)',
              stagger: 0.04,
              delay: stepDelay + 1.1,
              scrollTrigger: trigger,
            })
          }

          // 6) Champagne halo ring draws in
          if (accentRing) {
            gsap.from(accentRing, {
              strokeDashoffset: 1,
              opacity: 0,
              duration: 0.95,
              ease: 'power3.out',
              delay: stepDelay + 1.3,
              scrollTrigger: trigger,
            })
          }

          // 7) Champagne accent line (Acompañamiento)
          if (accentLine) {
            gsap.from(accentLine, {
              strokeDashoffset: 1,
              duration: 0.75,
              ease: 'power3.out',
              delay: stepDelay + 1.35,
              scrollTrigger: trigger,
            })
          }

          // 8) Champagne focal points — final pop with overshoot
          if (accents.length) {
            gsap.from(accents, {
              opacity: 0,
              scale: 0,
              transformOrigin: '50% 50%',
              transformBox: 'fill-box',
              duration: 0.85,
              ease: 'back.out(2.6)',
              stagger: 0.08,
              delay: stepDelay + 1.45,
              scrollTrigger: trigger,
            })
          }

          // ── Post-entry ambient motion (kicks in after full reveal) ──
          //
          // Halo: slow opacity breath — keeps the focal point "alive"
          // without distraction (12s loop, ±10% opacity).
          if (accentRing) {
            gsap.to(accentRing, {
              opacity: 0.28,
              duration: 4,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: stepDelay + 2.6,
              scrollTrigger: trigger,
            })
          }
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

      {/* ─────────── 4. CÓMO FUNCIONA (timeline 4 pasos) ─────────── */}
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

          <div className="mentoria-how__timeline" role="list">
            <span
              className="mentoria-how__line"
              aria-hidden="true"
              ref={stepLineRef}
            />
            {STEPS.map((step, i) => {
              const StepIcon = STEP_ICONS[i]
              return (
                <article
                  key={step.num}
                  className="mentoria-step"
                  role="listitem"
                  ref={(el) => (stepRefs.current[i] = el)}
                >
                  <div className="mentoria-step__icon-wrap">
                    <StepIcon />
                  </div>
                  <span className="mentoria-step__num">{step.num}</span>
                  <h3 className="mentoria-step__title">{step.title}</h3>
                  <p className="mentoria-step__text">{step.text}</p>
                </article>
              )
            })}
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
