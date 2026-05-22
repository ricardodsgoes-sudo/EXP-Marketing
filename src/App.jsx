import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Soluciones from './pages/Soluciones'
import Mentoria from './pages/Mentoria'
import Consultoria from './pages/Consultoria'
import MarketingDigital from './pages/MarketingDigital'
import Casos from './pages/Casos'
import SobreEXP from './pages/SobreEXP'

export default function App() {
  useEffect(() => {
    // Skip smooth scroll if the user prefers reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Skip Lenis on touch-only devices — native momentum is better and
    // we save ~10KB of runtime + a permanent RAF loop. matchMedia
    // '(hover: hover)' is the standard touch detection: true on
    // mouse/trackpad devices, false on phones and most tablets.
    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (!supportsHover) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/mentoria" element={<Mentoria />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/marketing-digital" element={<MarketingDigital />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/sobre" element={<SobreEXP />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
