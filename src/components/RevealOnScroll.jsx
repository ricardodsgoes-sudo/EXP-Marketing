import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll wrapper. Adds `.is-visible` to the element once it
 * enters the viewport. Uses transform + opacity only — no layout shift.
 *
 * Props:
 *   as          – HTML tag to render (default 'div')
 *   variant     – base animation class: 'reveal-up' (default) or 'parallax-soft'
 *   delay       – ms before the transition starts (default 0)
 *   threshold   – IntersectionObserver threshold (default 0.15)
 *   rootMargin  – IntersectionObserver rootMargin
 *   className   – extra classes appended to the variant
 *
 * Behavior is short-circuited under `prefers-reduced-motion: reduce` —
 * the element renders in its visible state without any transition.
 */
export default function RevealOnScroll({
  children,
  as: Tag = 'div',
  variant = 'reveal-up',
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  const cls = [variant, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ')

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <Tag ref={ref} className={cls} style={style} {...rest}>
      {children}
    </Tag>
  )
}
