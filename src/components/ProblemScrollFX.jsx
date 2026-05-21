import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProblemScrollFX.css'

const PAINS = [
  'Publican en Instagram sin dirección.',
  'Invierten en tráfico sin embudo.',
  'Crean ofertas sin estrategia.',
  'Atienden leads sin proceso comercial.',
  'Crecen sin mirar los números.',
  'No saben cómo posicionarse.',
  'Y terminan dependiendo de recomendaciones, suerte o del movimiento del algoritmo.',
]

// Chart anchors — one per card, plotted in a 700×60 viewBox so each card
// owns a 100-unit horizontal slot and its point sits at the horizontal
// center of the slot. The macro shape narrates the diagnosis (rise →
// peak → drops → crash). Around these anchors we build a TradingView-
// flavored composition: a jagged "price" line that passes through every
// anchor, two smoothed moving averages for context, plus dashed/dotted
// horizontal reference levels.
const PAIN_POINTS = [
  { x: 50,  y: 38 },
  { x: 150, y: 18 },
  { x: 250, y: 36 },
  { x: 350, y: 24 },
  { x: 450, y: 40 },
  { x: 550, y: 30 },
  { x: 650, y: 52 },
]

const VIEWBOX_W = 700
const VIEWBOX_H = 60
const CHART_SCROLL_DURATION = 1

// Deterministic PRNG — keeps the jagged line identical across renders
// so React re-renders don't produce flicker.
function makeRng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Build a TradingView-style jagged line that passes exactly through each
// anchor. Noise amplitude tapers to zero at the endpoints of every
// segment (sin πt), so the dots always sit on the line.
function buildNoisyPath(points, { samples = 24, amplitude = 13, seed = 137 } = {}) {
  const rng = makeRng(seed)
  const out = []
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    for (let j = 0; j < samples; j++) {
      const t = j / samples
      const x = a.x + (b.x - a.x) * t
      const baseY = a.y + (b.y - a.y) * t
      const taper = Math.sin(t * Math.PI)
      const noise = (rng() * 2 - 1) * amplitude * taper
      out.push({
        x,
        y: Math.max(3, Math.min(VIEWBOX_H - 3, baseY + noise)),
      })
    }
  }
  out.push(points[points.length - 1])
  return out
}

function toPathD(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ')
}

const NOISY_POINTS = buildNoisyPath(PAIN_POINTS)
const PRIMARY_PATH = toPathD(NOISY_POINTS)

export default function ProblemScrollFX() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const diagRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const cardsRef = useRef([])
  const revealRectRef = useRef(null)
  const dangerRectRef = useRef(null)
  const dangerPathRef = useRef(null)
  const chartRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    // Entrance blur — the whole pinned panel arrives blurred and
    // sharpens as the user scrolls toward it. Runs from when the
    // section's top hits the bottom of the viewport until it reaches
    // the top (where the pin takes over). Works on every viewport,
    // hence outside matchMedia.
    const entranceBlur = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!pinRef.current) return
        const p = self.progress
        pinRef.current.style.filter = `blur(${(1 - p) * 18}px)`
        pinRef.current.style.opacity = String(0.45 + p * 0.55)
      },
    })

    const mm = gsap.matchMedia()

    mm.add('(min-width: 861px)', () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      const revealRect = revealRectRef.current
      const dangerRect = dangerRectRef.current
      const dangerPath = dangerPathRef.current
      if (!track || !viewport || !revealRect || !dangerRect || !dangerPath) return

      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth)

      const finalRunwayPx = () => window.innerHeight * 0.35

      // Initial state. Reveal with one horizontal clip instead of SVG dash
      // drawing; dash patterns can repeat and create multiple visible chunks.
      gsap.set(revealRect, { attr: { width: 0 } })
      gsap.set(dangerRect, { attr: { width: 0 } })
      gsap.set(dangerPath, { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + finalRunwayPx()}`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            gsap.set(revealRect, { attr: { width: 0 } })
            gsap.set(dangerRect, { attr: { width: 0 } })
            gsap.set(dangerPath, { opacity: 0 })
          },
          onUpdate: (self) => {
            const chartProgress = Math.min(1, self.progress / CHART_SCROLL_DURATION)
            const revealedX = chartProgress * VIEWBOX_W
            const idx = PAIN_POINTS.reduce(
              (latest, point, pointIndex) =>
                revealedX >= point.x ? pointIndex : latest,
              0,
            )
            setActiveIndex(idx)
          },
        },
      })

      // Horizontal scrub and the active chart mask share the full
      // ScrollTrigger progress. The clip creates exactly one reveal front.
      tl.to(track, { x: () => -getDistance(), duration: CHART_SCROLL_DURATION }, 0)
      tl.to(
        revealRect,
        { attr: { width: VIEWBOX_W }, duration: CHART_SCROLL_DURATION },
        0,
      )
      tl.to(
        dangerRect,
        { attr: { width: VIEWBOX_W - PAIN_POINTS[5].x }, duration: 0.28 },
        0.72,
      )
      tl.to(
        dangerPath,
        { opacity: 0.68, ease: 'power1.inOut', duration: 0.28 },
        0.72,
      )
    })

    return () => {
      entranceBlur.kill()
      if (pinRef.current) {
        pinRef.current.style.filter = ''
        pinRef.current.style.opacity = ''
      }
      mm.revert()
    }
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className={`pscroll${reducedMotion ? ' pscroll--reduced' : ''}`}
      aria-labelledby="pscroll-title"
    >
      <div ref={pinRef} className="pscroll__pin">
        <div ref={diagRef} className="pscroll__diag">
          {/* ── LEFT: editorial copy + live counter ── */}
          <div className="pscroll__anchor">
            <span className="pscroll__eyebrow">El diagnóstico</span>
            <h2 id="pscroll-title" className="pscroll__title">
              Los negocios beauty no se estancan por falta de talento.
              <br />
              Se estancan por falta de estrategia.
            </h2>
            <p className="pscroll__intro">
              Muchas profesionales, clínicas y marcas del mercado beauty tienen
              técnica, calidad y potencial de crecimiento. Pero siguen vendiendo
              por debajo de lo que podrían porque no tienen una estructura clara
              de marketing, ventas y gestión.
            </p>
            <div className="pscroll__progress" aria-hidden="true">
              <span className="pscroll__progress-cur">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="pscroll__progress-sep">/</span>
              <span className="pscroll__progress-total">
                {String(PAINS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ── RIGHT: horizontal track of cards over the chart ── */}
          <div ref={viewportRef} className="pscroll__viewport">
            <div ref={trackRef} className="pscroll__track">
              {/* Chart layer — absolute, spans the full track width behind
                  the cards. Stretches via preserveAspectRatio="none" so
                  100 viewBox units == 1 card slot horizontally. Doesn't
                  participate in flex flow. */}
              <div ref={chartRef} className="pscroll__chart" aria-hidden="true">
                <svg
                  className="pscroll__chart-svg"
                  viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <clipPath id="pscroll-chart-reveal">
                      <rect
                        ref={revealRectRef}
                        x="0"
                        y="0"
                        width="0"
                        height={VIEWBOX_H}
                      />
                    </clipPath>
                    <clipPath id="pscroll-chart-danger-reveal">
                      <rect
                        ref={dangerRectRef}
                        x={PAIN_POINTS[5].x}
                        y="0"
                        width="0"
                        height={VIEWBOX_H}
                      />
                    </clipPath>
                  </defs>
                  <line
                    x1="0" y1={VIEWBOX_H - 4}
                    x2={VIEWBOX_W} y2={VIEWBOX_H - 4}
                    stroke="currentColor" strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="pscroll__chart-axis"
                  />
                  {[18, 32, 46].map((y) => (
                    <line
                      key={y}
                      x1="0" y1={y} x2={VIEWBOX_W} y2={y}
                      stroke="currentColor" strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      className="pscroll__chart-grid"
                    />
                  ))}
                  {/* Reference levels — dashed (resistance) + dotted
                      (support), TradingView-style horizontal markers. */}
                  <line
                    x1="0" y1="14" x2={VIEWBOX_W} y2="14"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="pscroll__chart-ref pscroll__chart-ref--dashed"
                  />
                  <line
                    x1="0" y1="46" x2={VIEWBOX_W} y2="46"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="pscroll__chart-ref pscroll__chart-ref--dotted"
                  />
                  {/* Active jagged "price" line — clipped horizontally as
                      the user scrolls, so only one continuous front can
                      appear. */}
                  <path
                    d={PRIMARY_PATH}
                    fill="none"
                    stroke="var(--champagne)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    clipPath="url(#pscroll-chart-reveal)"
                    className="pscroll__chart-line"
                  />
                  <path
                    ref={dangerPathRef}
                    d={PRIMARY_PATH}
                    fill="none"
                    stroke="#ff4b3e"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    clipPath="url(#pscroll-chart-danger-reveal)"
                    className="pscroll__chart-line-danger"
                  />
                </svg>

                {PAIN_POINTS.map((p, i) => (
                  <span
                    key={i}
                    className={
                      'pscroll__chart-dot' +
                      (i === activeIndex ? ' is-active' : '') +
                      (i < activeIndex ? ' is-past' : '') +
                      (i === PAIN_POINTS.length - 2 && i <= activeIndex
                        ? ' is-warning'
                        : '') +
                      (i === PAIN_POINTS.length - 1 && i <= activeIndex
                        ? ' is-failure'
                        : '')
                    }
                    style={{
                      left: `${(p.x / VIEWBOX_W) * 100}%`,
                      top: `${(p.y / VIEWBOX_H) * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Cards as direct flex children of the track */}
              {PAINS.map((text, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <article
                    key={i}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className={`pscroll__card${i === activeIndex ? ' is-active' : ''}`}
                  >
                    <span className="pscroll__card-num">{num}</span>
                    <span className="pscroll__card-rule" aria-hidden="true" />
                    <p className="pscroll__card-text">{text}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Final centered phrase ── */}
      </div>

      {/* â”€â”€ Final phrase below the pinned diagnosis, never overlaying it â”€â”€ */}
      <div className="pscroll__final">
        <span className="pscroll__final-rule" aria-hidden="true" />
        <p className="pscroll__final-text">
          EXP existe para transformar esfuerzos sueltos en{' '}
          <span className="pscroll__final-accent">crecimiento estructurado</span>.
        </p>
      </div>
    </section>
  )
}
