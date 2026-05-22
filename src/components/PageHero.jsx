import RevealOnScroll from './RevealOnScroll'

/* Editorial hero used at the top of internal pages.
   Props: eyebrow, title, intro (optional) */
export default function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__inner">
        <RevealOnScroll as="span" className="page-hero__eyebrow" delay={0}>
          {eyebrow}
        </RevealOnScroll>

        <RevealOnScroll
          as="h1"
          id="page-hero-title"
          className="page-hero__title"
          delay={140}
        >
          {title}
        </RevealOnScroll>

        {intro && (
          <RevealOnScroll as="p" className="page-hero__intro" delay={300}>
            {intro}
          </RevealOnScroll>
        )}

        <span className="page-hero__rule" aria-hidden="true" />
      </div>
    </section>
  )
}
