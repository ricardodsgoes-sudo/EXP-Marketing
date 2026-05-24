import RevealOnScroll from './RevealOnScroll'

/* Editorial hero used at the top of internal pages.
   Props: eyebrow, title, intro (optional), image (optional) */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '' }) {
  return (
    <section
      className={`page-hero${image ? ' page-hero--with-image' : ''}`}
      aria-labelledby="page-hero-title"
    >
      {image && (
        <RevealOnScroll as="div" className="page-hero__visual" delay={220}>
          <img
            src={image}
            alt={imageAlt}
            className="page-hero__image"
            loading="eager"
            decoding="async"
            aria-hidden={imageAlt ? undefined : 'true'}
          />
          <span className="page-hero__image-frame" aria-hidden="true" />
        </RevealOnScroll>
      )}

      <div className="page-hero__inner">
        <div className="page-hero__copy">
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
      </div>
    </section>
  )
}
