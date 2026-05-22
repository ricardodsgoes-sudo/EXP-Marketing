import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import Header from './components/Header'
import HeroScrollSequence from './components/HeroScrollSequence'
import ProblemScrollFX from './components/ProblemScrollFX'
import MethodSection from './components/MethodSection'
import SolutionsPreview from './components/SolutionsPreview'
import FinalCTA from './components/FinalCTA'

export default function App() {
  useEffect(() => {
    // Skip smooth scroll if the user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // smoothTouch defaults to false — native momentum on mobile is better
    })

    // Drive Lenis from GSAP's ticker so ScrollTrigger (used inside
    // ProblemScrollFX) reads the interpolated scroll position and the pin
    // stays in lockstep with the smooth wheel.
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <HeroScrollSequence />
        <ProblemScrollFX />
        <MethodSection />
        <SolutionsPreview />
        <FinalCTA />
      </main>
    </>
  )
}
