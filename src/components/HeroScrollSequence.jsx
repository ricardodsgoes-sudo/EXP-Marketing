import { useEffect, useRef } from 'react'

// Resolve all frame URLs at build time via Vite's glob import
const frameModules = import.meta.glob(
  '../assets/hero-sequence/frame-*.{png,webp,jpg,jpeg}',
  { query: '?url', import: 'default', eager: true }
)
const FRAME_URLS = Object.keys(frameModules)
  .sort()
  .map((k) => frameModules[k])
const TOTAL_FRAMES = FRAME_URLS.length // 240

const END_FRAME_INDEX = TOTAL_FRAMES - 1

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

// Draw an image into the canvas using object-fit: cover, with:
//   H_BIAS    – horizontal bias of the source crop (0.5 = center, 0 = far left).
//   V_BIAS    – vertical anchor of the destination (0 = top, 1 = bottom).
//   ZOOM_OUT  – destination scale (1 = fills canvas, <1 reduces zoom and
//               leaves dark margin around the image; the canvas background
//               matches the photo backdrop so it blends seamlessly).
// Anchored to the right and to the bottom — the empty 12% at the top sits
// where the navbar overlays, so the model is fully visible below the header.
const H_BIAS   = 0.32
const V_BIAS   = 1.0
const ZOOM_OUT = 0.88

function drawCoverTop(ctx, img, w, h) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih || !w || !h) return
  const canvasRatio = w / h
  const imgRatio    = iw / ih
  let sx, sy, sw, sh
  if (imgRatio > canvasRatio) {
    // Image wider than canvas — trim left/right, bias horizontally
    sh = ih
    sw = ih * canvasRatio
    sx = (iw - sw) * H_BIAS
    sy = 0
  } else {
    // Image taller than canvas — trim bottom, align to top
    sw = iw
    sh = iw / canvasRatio
    sx = 0
    sy = 0
  }
  const dw = w * ZOOM_OUT
  const dh = h * ZOOM_OUT
  const dx = w - dw                // right-anchored
  const dy = (h - dh) * V_BIAS     // V_BIAS 0=top, 1=bottom
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
}

export default function HeroScrollSequence() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas  = canvasRef.current
    if (!section || !canvas || TOTAL_FRAMES === 0) return

    const ctx   = canvas.getContext('2d')
    const state = {
      images:       new Array(TOTAL_FRAMES).fill(null),
      currentFrame: 0,
    }
    let rafId = null

    // ── Render helpers ─────────────────────────────────────────────

    function render(index) {
      const img = state.images[index]
      if (!img) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCoverTop(ctx, img, canvas.width, canvas.height)
    }

    // Find and render the nearest loaded frame to state.currentFrame
    function renderBest() {
      let f = state.currentFrame
      if (!state.images[f]) {
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          if (f - d >= 0 && state.images[f - d])              { f = f - d; break }
          if (f + d < TOTAL_FRAMES && state.images[f + d])    { f = f + d; break }
        }
      }
      if (state.images[f]) render(f)
    }

    function setSize() {
      const wrap   = canvas.parentElement
      canvas.width  = wrap.offsetWidth
      canvas.height = wrap.offsetHeight
      renderBest()
    }

    // ── Reduced motion: show last frame only ───────────────────────

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ResizeObserver keeps the canvas bitmap in sync with its container's
    // CSS dimensions, regardless of why the container resized (window
    // resize, layout shift, HMR-driven CSS updates, etc.).
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement)

    if (prefersReduced) {
      state.currentFrame = END_FRAME_INDEX
      const img = new Image()
      img.onload = () => {
        state.images[END_FRAME_INDEX] = img
        setSize()
      }
      img.src = FRAME_URLS[END_FRAME_INDEX]
      setSize()
      return () => ro.disconnect()
    }

    // ── Mobile: load only the last frame statically ────────────────

    if (window.innerWidth <= 860) {
      state.currentFrame = END_FRAME_INDEX
      const img = new Image()
      img.onload = () => {
        state.images[END_FRAME_INDEX] = img
        setSize()
      }
      img.src = FRAME_URLS[END_FRAME_INDEX]
      setSize()
      return () => ro.disconnect()
    }

    // ── Desktop: progressive frame loading ─────────────────────────
    //
    // Eagerly loading 240 frames in parallel was blocking LCP and
    // saturating the network on cold loads. New strategy:
    //   - Initial burst: first ~24 frames + last 1 (covers first paint
    //     + immediate scroll + the reduced-motion-equivalent end state)
    //   - Deferred bulk: the remaining frames load on requestIdleCallback
    //     (or a short timeout fallback), so they never compete with
    //     the critical path.

    const PRIORITY_BATCH = 24
    const loadedSet = new Set()

    function loadFrame(i) {
      if (i < 0 || i >= TOTAL_FRAMES) return
      if (loadedSet.has(i)) return
      loadedSet.add(i)
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        state.images[i] = img
        if (Math.abs(i - state.currentFrame) <= 5) renderBest()
      }
      img.src = FRAME_URLS[i]
    }

    // Priority frames first — eagerly loaded so the canvas paints
    // immediately and the user can scroll through the opening beat
    // without dropped frames.
    for (let i = 0; i < PRIORITY_BATCH && i < TOTAL_FRAMES; i++) {
      loadFrame(i)
    }
    loadFrame(END_FRAME_INDEX)

    // Bulk load the remaining frames once the browser is idle.
    const bulkLoad = () => {
      for (let i = PRIORITY_BATCH; i < TOTAL_FRAMES; i++) loadFrame(i)
    }
    let bulkHandle
    if ('requestIdleCallback' in window) {
      bulkHandle = requestIdleCallback(bulkLoad, { timeout: 2500 })
    } else {
      bulkHandle = setTimeout(bulkLoad, 1200)
    }

    // ── Scroll → frame computation ─────────────────────────────────

    function compute() {
      // Map progress to window.scrollY (not rect.top) so the animation
      // starts on the very first pixel of scroll, without a dead zone
      // while the header height is being scrolled past.
      const stickyEnd = section.offsetTop + section.offsetHeight - window.innerHeight
      const p         = clamp01(stickyEnd > 0 ? window.scrollY / stickyEnd : 0)
      state.currentFrame = Math.round(p * END_FRAME_INDEX)
      renderBest()
    }

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(compute)
    }

    setSize()
    compute() // set initial frame
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
      if (typeof bulkHandle === 'number') {
        clearTimeout(bulkHandle)
      } else if (bulkHandle && 'cancelIdleCallback' in window) {
        cancelIdleCallback(bulkHandle)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="hss" aria-label="Hero">
      <div className="hss__sticky">
        <HssXDecor />

        <div className="hss__content">
          <span className="hss__eyebrow">EXP Marketing</span>

          <h1 className="hss__headline">
            Acelera 12 meses<br />
            de crecimiento<br />
            en 6 meses.
          </h1>

          <p className="hss__sub">
            Marketing, ventas y gestión para negocios beauty.
          </p>

          <div className="hss__actions">
            <a
              href="#cta"
              className="hss__btn hss__btn--primary"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById('cta')
                if (!target) return
                if (window.__lenis) {
                  window.__lenis.scrollTo(target, { offset: -80 })
                } else {
                  target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Solicitar diagnóstico estratégico
            </a>
            <a
              href="#"
              className="hss__btn hss__btn--ghost"
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              Conocer las soluciones de EXP
            </a>
          </div>
        </div>

        <div className="hss__image-wrap" aria-hidden="true">
          <canvas ref={canvasRef} className="hss__canvas" />
        </div>
      </div>
    </section>
  )
}

function HssXDecor() {
  return (
    <svg
      className="hss__x-decor"
      viewBox="0 0 560 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0"   y1="0"   x2="560" y2="700" stroke="#D8B98C" strokeWidth="0.75" />
      <line x1="560" y1="0"   x2="0"   y2="700" stroke="#D8B98C" strokeWidth="0.75" />
    </svg>
  )
}
