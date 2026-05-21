import React from 'react'
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion'
import { loadFont as loadDisplay } from '@remotion/google-fonts/CormorantGaramond'
import { loadFont as loadBody } from '@remotion/google-fonts/Inter'
import './ProblemMotion.css'

const { fontFamily: DISPLAY } = loadDisplay('normal', {
  weights: ['300', '400'],
  subsets: ['latin'],
})
const { fontFamily: BODY } = loadBody('normal', {
  weights: ['300', '400', '500'],
  subsets: ['latin'],
})

const COLORS = {
  black: '#000000',
  graphite: '#171717',
  light: '#f0ede8',
  champagne: '#D8B98C',
  gray: '#888888',
  muted: 'rgba(240, 237, 232, 0.5)',
}

// Editorial easing — same curve used across the site.
const EASE = Easing.bezier(0.22, 1, 0.36, 1)

const SCENE_FRAMES = 90   // 3s per scene at 30fps
const TOTAL_FRAMES = 360  // 12s

// ─────────────────────────── helpers ───────────────────────────

const fadeIn = (frame, start, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  })

const fadeOut = (frame, start, duration = 20) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  })

const rise = (frame, start, distance = 18, duration = 30) =>
  interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  })

const draw = (frame, start, duration = 32) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  })

// Each scene fades in at the start and out before handing off to the next.
const sceneOpacity = (frame, sceneDuration = SCENE_FRAMES, fadeFrames = 14) => {
  const inOp = fadeIn(frame, 0, fadeFrames)
  const outOp = fadeOut(frame, sceneDuration - fadeFrames, fadeFrames)
  return Math.min(inOp, outOp)
}

// Use a single scale factor so the comp adapts to vertical 9:16 too.
function useFit() {
  const { width, height } = useVideoConfig()
  const scale = Math.min(width / 1920, height / 1080)
  const isVertical = height > width
  return { width, height, scale, isVertical }
}

// ─────────────────────────── shared blocks ───────────────────────────

function Headline({ frame, start, top, text, size, italic }) {
  const op = fadeIn(frame, start, 24)
  const y = rise(frame, start, 18, 32)
  return (
    <div
      className={`pm-headline${italic ? ' pm-headline--italic' : ''}`}
      style={{
        top,
        fontFamily: DISPLAY,
        fontSize: size,
        opacity: op,
        transform: `translateY(${y}px)`,
      }}
    >
      {text}
    </div>
  )
}

function Subline({ frame, start, top, text, size, italic, color }) {
  const op = fadeIn(frame, start, 26)
  const y = rise(frame, start, 16, 30)
  return (
    <div
      className="pm-subline"
      style={{
        top,
        fontFamily: DISPLAY,
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: size,
        color: color || COLORS.light,
        opacity: op,
        transform: `translateY(${y}px)`,
      }}
    >
      {text}
    </div>
  )
}

function Hairline({ frame, start, x, y, width, vertical }) {
  const op = fadeIn(frame, start, 22) * 0.55
  const s = draw(frame, start, 30)
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: vertical ? 1 : width,
        height: vertical ? width : 1,
        background: COLORS.champagne,
        opacity: op,
        transform: vertical ? `scaleY(${s})` : `scaleX(${s})`,
        transformOrigin: vertical ? 'top center' : 'left center',
      }}
    />
  )
}

// ─────────────────────────── Scene 1 — Confusión ───────────────────────────

function SceneConfusion() {
  const frame = useCurrentFrame()
  const { isVertical } = useFit()
  const op = sceneOpacity(frame)

  const scatter = isVertical
    ? [
        { text: 'Instagram sin dirección', x: '6%',  y: '12%' },
        { text: 'Tráfico sin embudo',      x: '46%', y: '18%' },
        { text: 'Ofertas sin estrategia',  x: '8%',  y: '76%' },
        { text: 'Leads sin proceso',       x: '44%', y: '82%' },
        { text: 'Números invisibles',      x: '10%', y: '88%' },
        { text: 'Sin posicionamiento',     x: '46%', y: '94%' },
      ]
    : [
        { text: 'Instagram sin dirección', x: '8%',  y: '18%' },
        { text: 'Tráfico sin embudo',      x: '62%', y: '14%' },
        { text: 'Ofertas sin estrategia',  x: '5%',  y: '76%' },
        { text: 'Leads sin proceso',       x: '66%', y: '78%' },
        { text: 'Números invisibles',      x: '13%', y: '88%' },
        { text: 'Sin posicionamiento',     x: '64%', y: '88%' },
      ]

  return (
    <AbsoluteFill className="pm-scene" style={{ opacity: op }}>
      {scatter.map((w, i) => {
        const start = 4 + i * 5
        const y = rise(frame, start, 14, 24)
        const o = fadeIn(frame, start, 22) * 0.6
        return (
          <div
            key={i}
            className="pm-scatter"
            style={{
              left: w.x,
              top: w.y,
              fontFamily: BODY,
              fontSize: isVertical ? 20 : 22,
              opacity: o,
              transform: `translateY(${y}px)`,
            }}
          >
            {w.text}
          </div>
        )
      })}

      {/* Disconnected hairlines — premium editorial detail */}
      <Hairline frame={frame} start={18} x="32%" y="34%" width={80} />
      <Hairline frame={frame} start={26} x="72%" y="42%" width={120} />
      <Hairline frame={frame} start={34} x="20%" y="60%" width={56} />
      <Hairline frame={frame} start={40} x="58%" y="62%" width={92} />

      <Headline
        frame={frame}
        start={28}
        top="40%"
        text="Mucho esfuerzo."
        size={isVertical ? 88 : 116}
      />
      <Headline
        frame={frame}
        start={52}
        top="52%"
        text="Poca claridad."
        size={isVertical ? 88 : 116}
        italic
      />
    </AbsoluteFill>
  )
}

// ─────────────────────────── Scene 2 — Fuga de oportunidades ───────────────────────────

function SceneFuga() {
  const frame = useCurrentFrame()
  const { isVertical } = useFit()
  const op = sceneOpacity(frame)

  // Each word enters from above, drifts down the funnel.
  // Non-survivors fade out mid-descent.
  const words = [
    { text: 'Atención', start: 0,  survives: true,  xOff: 0 },
    { text: 'Interés',  start: 7,  survives: false, xOff: -50 },
    { text: 'Mensajes', start: 14, survives: false, xOff: 50 },
    { text: 'Leads',    start: 22, survives: true,  xOff: -20 },
    { text: 'Ventas',   start: 30, survives: true,  xOff: 28 },
  ]

  return (
    <AbsoluteFill className="pm-scene" style={{ opacity: op }}>
      <Funnel frame={frame} isVertical={isVertical} />

      {words.map((w, i) => {
        const enter = w.start + 4
        const exit = w.start + 56
        const yPct = interpolate(frame, [enter, exit], [12, 58], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.linear,
        })
        const inOp = fadeIn(frame, w.start, 12)
        const outOp = w.survives ? 1 : fadeOut(frame, w.start + 26, 14)
        const o = inOp * outOp
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${yPct}%`,
              left: '50%',
              transform: `translate(calc(-50% + ${w.xOff}px), -50%)`,
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: isVertical ? 28 : 32,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: w.survives ? COLORS.light : COLORS.gray,
              opacity: o * 0.95,
              whiteSpace: 'nowrap',
            }}
          >
            {w.text}
          </div>
        )
      })}

      <Subline
        frame={frame}
        start={52}
        top="72%"
        text="El problema no siempre es falta de demanda."
        size={isVertical ? 38 : 56}
      />
      <Subline
        frame={frame}
        start={66}
        top="82%"
        text="Es falta de proceso."
        size={isVertical ? 38 : 56}
        italic
      />
    </AbsoluteFill>
  )
}

function Funnel({ frame, isVertical }) {
  const len = 1100
  const d = draw(frame, 4, 44)
  const dashOffset = (1 - d) * len
  // Funnel proportions tighten on vertical so the V doesn't get squashed.
  const left  = isVertical ? { x1: 280, x2: 460 } : { x1: 520, x2: 860 }
  const right = isVertical ? { x1: 800, x2: 620 } : { x1: 1400, x2: 1060 }
  const viewBox = isVertical ? '0 0 1080 1920' : '0 0 1920 1080'
  const ys = isVertical ? { y1: 240, y2: 1180 } : { y1: 140, y2: 760 }

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox={viewBox}
      preserveAspectRatio="none"
    >
      <line
        x1={left.x1}  y1={ys.y1}
        x2={left.x2}  y2={ys.y2}
        stroke={COLORS.champagne}
        strokeWidth={1.2}
        strokeDasharray={len}
        strokeDashoffset={dashOffset}
        opacity={0.45}
      />
      <line
        x1={right.x1} y1={ys.y1}
        x2={right.x2} y2={ys.y2}
        stroke={COLORS.champagne}
        strokeWidth={1.2}
        strokeDasharray={len}
        strokeDashoffset={dashOffset}
        opacity={0.45}
      />
    </svg>
  )
}

// ─────────────────────────── Scene 3 — Crecimiento sin control ───────────────────────────

function SceneCrecimiento() {
  const frame = useCurrentFrame()
  const { isVertical } = useFit()
  const op = sceneOpacity(frame)

  // Scattered start → 2x3 grid that "aligns" around frame 38–66.
  const metrics = isVertical
    ? [
        { label: 'CAC',         scatter: { x: 12, y: 12 }, grid: { x: 20, y: 24 } },
        { label: 'ROI',         scatter: { x: 60, y: 8  }, grid: { x: 56, y: 24 } },
        { label: 'Conversión',  scatter: { x: 30, y: 22 }, grid: { x: 20, y: 34 } },
        { label: 'Facturación', scatter: { x: 56, y: 30 }, grid: { x: 56, y: 34 } },
        { label: 'Leads',       scatter: { x: 14, y: 42 }, grid: { x: 20, y: 44 } },
        { label: 'Seguimiento', scatter: { x: 60, y: 46 }, grid: { x: 56, y: 44 } },
      ]
    : [
        { label: 'CAC',         scatter: { x: 12, y: 18 }, grid: { x: 22, y: 22 } },
        { label: 'ROI',         scatter: { x: 76, y: 14 }, grid: { x: 48, y: 22 } },
        { label: 'Conversión',  scatter: { x: 22, y: 30 }, grid: { x: 70, y: 22 } },
        { label: 'Facturación', scatter: { x: 70, y: 28 }, grid: { x: 22, y: 36 } },
        { label: 'Leads',       scatter: { x: 14, y: 42 }, grid: { x: 48, y: 36 } },
        { label: 'Seguimiento', scatter: { x: 76, y: 40 }, grid: { x: 70, y: 36 } },
      ]

  const alignStart = 38
  const alignDur = 30

  return (
    <AbsoluteFill className="pm-scene" style={{ opacity: op }}>
      {metrics.map((m, i) => {
        const appear = 2 + i * 3
        const inOp = fadeIn(frame, appear, 22)
        const t = interpolate(frame, [alignStart, alignStart + alignDur], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE,
        })
        const x = m.scatter.x + (m.grid.x - m.scatter.x) * t
        const y = m.scatter.y + (m.grid.y - m.scatter.y) * t
        const opacity = inOp * (0.45 + 0.55 * t)
        return (
          <div
            key={m.label}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: isVertical ? 24 : 28,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: COLORS.light,
              opacity,
              whiteSpace: 'nowrap',
            }}
          >
            {m.label}
          </div>
        )
      })}

      {/* Two thin alignment rails drawing in as the metrics settle */}
      <Rail frame={frame} start={42} top={isVertical ? '28%' : '26%'} />
      <Rail frame={frame} start={50} top={isVertical ? '38%' : '40%'} />

      <Subline
        frame={frame}
        start={62}
        top={isVertical ? '64%' : '60%'}
        text="Crecer sin mirar los números"
        size={isVertical ? 38 : 56}
      />
      <Subline
        frame={frame}
        start={72}
        top={isVertical ? '72%' : '70%'}
        text="limita la próxima etapa."
        size={isVertical ? 38 : 56}
        italic
      />
    </AbsoluteFill>
  )
}

function Rail({ frame, start, top }) {
  const s = draw(frame, start, 34)
  const op = fadeIn(frame, start, 24) * 0.5
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '50%',
        width: '64%',
        height: 1,
        background: COLORS.champagne,
        opacity: op,
        transform: `translateX(-50%) scaleX(${s})`,
        transformOrigin: 'center',
      }}
    />
  )
}

// ─────────────────────────── Scene 4 — Estructura ───────────────────────────

function SceneEstructura() {
  const frame = useCurrentFrame()
  const { isVertical } = useFit()
  const op = sceneOpacity(frame, SCENE_FRAMES, 16)

  const pillars = [
    { num: '01', label: 'Diagnóstico' },
    { num: '02', label: 'Estrategia' },
    { num: '03', label: 'Ejecución' },
    { num: '04', label: 'Gestión' },
  ]

  return (
    <AbsoluteFill className="pm-scene" style={{ opacity: op }}>
      <BgX frame={frame} isVertical={isVertical} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: isVertical ? '14%' : '22%',
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isVertical ? 28 : 0,
          padding: isVertical ? '0 10%' : '0 12%',
        }}
      >
        {pillars.map((p, i) => {
          const start = 6 + i * 7
          const o = fadeIn(frame, start, 26)
          const y = rise(frame, start, 22, 32)
          const lineScale = draw(frame, start + 4, 28)
          return (
            <div
              key={p.num}
              className="pm-pillar"
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                fontFamily: DISPLAY,
              }}
            >
              <div className="pm-pillar__num" style={{ fontFamily: BODY }}>
                {p.num}
              </div>
              <div
                className="pm-pillar__line"
                style={{
                  height: isVertical ? 64 : 96,
                  transform: `scaleY(${lineScale})`,
                }}
              />
              <div className="pm-pillar__label" style={{ fontSize: isVertical ? 30 : 38 }}>
                {p.label}
              </div>
            </div>
          )
        })}
      </div>

      <FinalPhrase frame={frame} isVertical={isVertical} />
    </AbsoluteFill>
  )
}

function BgX({ frame, isVertical }) {
  const d = draw(frame, 0, 50)
  const len = 2400
  const off = (1 - d) * len
  const op = fadeIn(frame, 0, 30) * 0.7
  const vb = isVertical ? '0 0 1080 1920' : '0 0 1920 1080'
  const w = isVertical ? 1080 : 1920
  const h = isVertical ? 1920 : 1080
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox={vb}
      preserveAspectRatio="none"
    >
      <line
        x1={0} y1={0} x2={w} y2={h}
        stroke={COLORS.champagne}
        strokeWidth={1}
        strokeDasharray={len}
        strokeDashoffset={off}
        opacity={op * 0.18}
      />
      <line
        x1={w} y1={0} x2={0} y2={h}
        stroke={COLORS.champagne}
        strokeWidth={1}
        strokeDasharray={len}
        strokeDashoffset={off}
        opacity={op * 0.18}
      />
    </svg>
  )
}

function FinalPhrase({ frame, isVertical }) {
  const ruleOp = fadeIn(frame, 48, 18)
  const op1 = fadeIn(frame, 56, 26)
  const op2 = fadeIn(frame, 70, 26)
  const y1 = rise(frame, 56, 14, 28)
  const y2 = rise(frame, 70, 14, 28)
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: isVertical ? '10%' : '12%',
        textAlign: 'center',
      }}
    >
      <span
        className="pm-rule"
        style={{ opacity: ruleOp }}
      />
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: isVertical ? 38 : 52,
          lineHeight: 1.2,
          letterSpacing: '-0.012em',
          color: COLORS.light,
          opacity: op1,
          transform: `translateY(${y1}px)`,
          padding: '0 6%',
        }}
      >
        EXP existe para transformar esfuerzos sueltos en
      </div>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: isVertical ? 40 : 56,
          lineHeight: 1.2,
          letterSpacing: '-0.012em',
          color: COLORS.champagne,
          opacity: op2,
          transform: `translateY(${y2}px)`,
          marginTop: 6,
        }}
      >
        crecimiento estructurado.
      </div>
    </div>
  )
}

// ─────────────────────────── root composition ───────────────────────────

export default function ProblemMotion() {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Sequence from={0}   durationInFrames={SCENE_FRAMES} layout="none">
        <SceneConfusion />
      </Sequence>
      <Sequence from={90}  durationInFrames={SCENE_FRAMES} layout="none">
        <SceneFuga />
      </Sequence>
      <Sequence from={180} durationInFrames={SCENE_FRAMES} layout="none">
        <SceneCrecimiento />
      </Sequence>
      <Sequence from={270} durationInFrames={SCENE_FRAMES} layout="none">
        <SceneEstructura />
      </Sequence>
    </AbsoluteFill>
  )
}
