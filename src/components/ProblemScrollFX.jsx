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
  const anchorRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const cardsRef = useRef([])
  const revealRectRef = useRef(null)
  const dangerRectRef = useRef(null)
  const dangerPathRef = useRef(null)
  const chartRef = useRef(null)
  const resolutionRef = useRef(null)
  const resolutionLineRef = useRef(null)
  const resolutionPartsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [showResolution, setShowResolution] = useState(false)
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

    // Entrance — the whole section arrives a touch blurred and faded,
    // sharpening into place during the immediate handoff zone right
    // before the pin engages.
    const entranceBlur = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'top top',
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!pinRef.current) return
        const p = self.progress
        pinRef.current.style.filter = `blur(${(1 - p) * 12}px)`
        pinRef.current.style.opacity = String(0.35 + p * 0.65)
      },
    })

    const mm = gsap.matchMedia()

    mm.add('(min-width: 861px)', () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      const revealRect = revealRectRef.current
      const dangerRect = dangerRectRef.current
      const dangerPath = dangerPathRef.current
      const diag = diagRef.current
      const resolution = resolutionRef.current
      const resolutionLine = resolutionLineRef.current
      const resolutionParts = resolutionPartsRef.current.filter(Boolean)
      if (
        !track || !viewport || !revealRect || !dangerRect || !dangerPath ||
        !diag || !resolution || !resolutionLine || resolutionParts.length === 0
      ) return

      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth)

      // Resolution runway — extra scroll after horizontal completes
      // where the chart settles and the closing phrase reveals.
      const resolutionRunway = () => Math.round(window.innerHeight * 0.85)

      // Timeline phase boundary — fraction of total scroll covered by
      // the horizontal phase. Computed at setup so timeline positions
      // align with the actual scroll distances.
      const distance = getDistance()
      const runway = resolutionRunway()
      const total = Math.max(1, distance + runway)
      const H_END = distance / total            // ≈ 0.78 typically
      const DANGER_DUR = 0.16
      const DANGER_START = Math.max(0, H_END - DANGER_DUR)
      const R_START = Math.min(0.999, H_END + 0.02)

      // Initial state for everything that animates in.
      gsap.set(revealRect, { attr: { width: 0 } })
      gsap.set(dangerRect, { attr: { width: 0 } })
      gsap.set(dangerPath, { opacity: 0 })
      gsap.set(diag, { opacity: 1, filter: 'blur(0px)' })
      gsap.set(resolution, { opacity: 0 })
      gsap.set(resolutionLine, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(resolutionParts, { opacity: 0, y: 18 })

      let lastInResolution = false

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + resolutionRunway()}`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            gsap.set(revealRect, { attr: { width: 0 } })
            gsap.set(dangerRect, { attr: { width: 0 } })
            gsap.set(dangerPath, { opacity: 0 })
            gsap.set(diag, { opacity: 1, filter: 'blur(0px)' })
            gsap.set(resolution, { opacity: 0 })
            gsap.set(resolutionLine, { strokeDasharray: 1, strokeDashoffset: 1 })
            gsap.set(resolutionParts, { opacity: 0, y: 18 })
          },
          onUpdate: (self) => {
            const horizontalProgress = Math.min(1, self.progress / H_END)
            const revealedX = horizontalProgress * VIEWBOX_W
            const idx = PAIN_POINTS.reduce(
              (latest, point, pointIndex) =>
                revealedX >= point.x ? pointIndex : latest,
              0,
            )
            setActiveIndex(idx)

            const inResolution = self.progress >= R_START - 0.01
            if (inResolution !== lastInResolution) {
              lastInResolution = inResolution
              setShowResolution(inResolution)
            }
          },
        },
      })

      // ── Phase A — Horizontal scrub + chart reveal
      tl.to(track, { x: () => -getDistance(), duration: H_END }, 0)
      tl.to(revealRect, { attr: { width: VIEWBOX_W }, duration: H_END }, 0)

      // ── Phase B — Danger appears as we hit the last pain
      tl.to(
        dangerRect,
        { attr: { width: VIEWBOX_W - PAIN_POINTS[5].x }, duration: DANGER_DUR },
        DANGER_START,
      )
      tl.to(
        dangerPath,
        { opacity: 0.7, ease: 'power1.inOut', duration: DANGER_DUR },
        DANGER_START,
      )

      // ── Phase C — Settle: the crashed line softens, the diag dims
      //               AND blurs so the resolution overlay reads as the
      //               only thing in focus.
      tl.to(
        dangerPath,
        { opacity: 0.12, ease: 'power2.out', duration: 0.05 },
        H_END + 0.005,
      )
      tl.to(
        diag,
        {
          opacity: 0.12,
          filter: 'blur(8px)',
          ease: 'power2.out',
          duration: 0.1,
        },
        H_END,
      )

      // ── Phase D — Resolution: the closing phrase rises on a calm
      //               champagne line, inside the same pinned screen
      tl.to(
        resolution,
        { opacity: 1, ease: 'power2.out', duration: 0.05 },
        R_START,
      )
      tl.to(
        resolutionLine,
        { strokeDashoffset: 0, ease: 'power2.inOut', duration: 0.22 },
        R_START + 0.005,
      )
      tl.to(
        resolutionParts,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.11,
          stagger: 0.06,
        },
        R_START + 0.08,
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
          <div ref={anchorRef} className="pscroll__anchor">
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
            <div
              className={
                'pscroll__progress' +
                (showResolution ? ' is-resolved' : '')
              }
              aria-hidden="true"
            >
              <span className="pscroll__progress-state pscroll__progress-state--pains">
                <span className="pscroll__progress-cur">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="pscroll__progress-sep">/</span>
                <span className="pscroll__progress-total">
                  {String(PAINS.length).padStart(2, '0')}
                </span>
              </span>
              <span className="pscroll__progress-state pscroll__progress-state--resolution">
                <span className="pscroll__progress-cur">08</span>
                <span className="pscroll__progress-sep">·</span>
                <span className="pscroll__progress-total">Resolución</span>
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

        {/* ── Resolution overlay — appears in the same pinned screen as
            the closing beat of the diagnosis. The diag dims behind it,
            the red crash line softens, and the closing phrase rises on
            a calm champagne line. Part of the same section, not a new
            block underneath. ── */}
        <div
          ref={resolutionRef}
          className={
            'pscroll__resolution' +
            (showResolution ? ' is-visible' : '')
          }
          aria-hidden={!showResolution}
        >
          <div className="pscroll__resolution-frame">
            <svg
              className="pscroll__resolution-line"
              viewBox="0 0 600 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                ref={resolutionLineRef}
                x1="0" y1="1" x2="600" y2="1"
                stroke="var(--champagne)" strokeWidth="1.5"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className="pscroll__resolution-line-stroke"
              />
            </svg>
            <p className="pscroll__resolution-text">
              <span
                ref={(el) => (resolutionPartsRef.current[0] = el)}
                className="pscroll__resolution-part"
              >
                EXP existe para transformar
              </span>{' '}
              <span
                ref={(el) => (resolutionPartsRef.current[1] = el)}
                className="pscroll__resolution-part"
              >
                esfuerzos sueltos
              </span>{' '}
              <span
                ref={(el) => (resolutionPartsRef.current[2] = el)}
                className="pscroll__resolution-part"
              >
                en{' '}
                <span className="pscroll__resolution-accent">
                  crecimiento estructurado
                </span>
                .
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
