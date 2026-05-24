import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SocialIcon from '../components/SocialIcon'
import heroMarketing from '../assets/generated-heroes/marketing-digital-hero-generated.png'
import socialPhoto from '../assets/marketing-digital/service-social-media.png'
import traficoPhoto from '../assets/marketing-digital/service-trafico-pago.png'
import landingPhoto from '../assets/marketing-digital/service-landing-pages.png'
import funnelPhoto from '../assets/marketing-digital/service-embudo-ventas.png'
import expWordmark from '../assets/exp-wordmark-light.png'
import './MarketingDigital.css'

/* Inline brand chip — small SVG icon + name, used where the copy
   mentions a specific platform (Meta, Google, Instagram, WhatsApp).
   Keeps editorial type rhythm by sitting on the baseline. */
function BrandChip({ name, label }) {
  return (
    <span className="md-brand-chip" aria-label={label || name}>
      <SocialIcon name={name} size={14} />
      <span className="md-brand-chip__label">{label}</span>
    </span>
  )
}

const SERVICES = [
  {
    num: '01',
    id: 'social-media',
    title: 'Social Media Estratégico',
    text: (
      <>
        No creamos solo publicaciones bonitas. Creamos comunicación con
        intención en{' '}
        <BrandChip name="instagram" label="Instagram" /> y{' '}
        <BrandChip name="tiktok" label="TikTok" />: atraer, educar, generar
        deseo, romper objeciones y vender.
      </>
    ),
    photo: socialPhoto,
    photoSide: 'right',
    platforms: ['instagram', 'tiktok'],
    deliverables: [
      'Planificación editorial',
      'Estrategia de contenido',
      'Reels',
      'Carruseles',
      'Stories',
      'Calendario de contenido',
      'Dirección creativa',
      'Leyendas persuasivas',
    ],
  },
  {
    num: '02',
    id: 'trafico-pago',
    title: 'Tráfico Pago',
    text: (
      <>
        Campañas en{' '}
        <BrandChip name="meta" label="Meta Ads" /> y{' '}
        <BrandChip name="google" label="Google Ads" /> con foco en leads,
        ventas, agendamientos y crecimiento previsible.
      </>
    ),
    photo: traficoPhoto,
    photoSide: 'left',
    platforms: ['meta', 'google'],
    deliverables: [
      'Estructuración de campañas',
      'Creativos para anuncios',
      'Segmentación',
      'Pruebas A/B',
      'Optimización',
      'Informes',
      'Análisis de CAC, CPL y ROI',
    ],
  },
  {
    num: '03',
    id: 'landing-pages',
    title: 'Landing Pages y Páginas de Venta',
    text:
      'Páginas creadas para transformar visitantes en leads, aplicaciones, agendamientos o ventas.',
    photo: landingPhoto,
    photoSide: 'right',
    platforms: [],
    deliverables: [
      'Página de aplicación',
      'Página de servicios',
      'Página de mentoría',
      'Página de curso',
      'Página para clínica',
      'Página de captación',
      'Copy de la página',
      'Estructura de conversión',
    ],
  },
  {
    num: '04',
    id: 'embudo',
    title: 'Embudo de Ventas',
    text: (
      <>
        Estructuramos la jornada entre anuncio, contenido, página,{' '}
        <BrandChip name="whatsapp" label="WhatsApp" /> y cierre.
      </>
    ),
    photo: funnelPhoto,
    photoSide: 'left',
    platforms: ['whatsapp'],
    deliverables: [
      'Flujo de captación',
      'Estrategia de WhatsApp',
      'Scripts de atención',
      'Recuperación de leads',
      'Jornada de compra',
      'Ruptura de objeciones',
      'Proceso comercial',
    ],
  },
]

export default function MarketingDigital() {
  const pageRef = useRef(null)
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

    const ctx = gsap.context(() => {
      // ── Hero: word-by-word reveal of the title ─────────────────
      const heroWords = document.querySelectorAll('.md-hero__title-word')
      if (heroWords.length > 0) {
        gsap.from(heroWords, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.055,
        })
      }

      // Hero supporting copy + CTAs, staggered after title
      gsap.from(
        ['.md-hero__eyebrow', '.md-hero__lead', '.md-hero__support', '.md-hero__actions'],
        {
          y: 22,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35,
        },
      )

      // Hero photo: zoom-out reveal + scroll parallax
      gsap.from('.md-hero__photo', {
        scale: 1.08,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      })
      gsap.to('.md-hero__photo', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.md-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      gsap.from('.md-hero__photo-frame', {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      })

      // ── Service sections: per-section reveal + parallax ──────
      document.querySelectorAll('.md-service').forEach((section) => {
        const title = section.querySelector('.md-service__title')
        const meta = section.querySelectorAll('.md-service__eyebrow, .md-service__text')
        const deliverables = section.querySelectorAll('.md-service__deliverable')
        const photo = section.querySelector('.md-service__photo')
        const photoFrame = section.querySelector('.md-service__photo-frame')

        if (title) {
          gsap.from(title, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
            },
          })
        }

        if (meta.length > 0) {
          gsap.from(meta, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          })
        }

        if (deliverables.length > 0) {
          gsap.from(deliverables, {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: section.querySelector('.md-service__deliverables'),
              start: 'top 82%',
            },
          })
        }

        if (photo) {
          gsap.fromTo(
            photo,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        if (photoFrame) {
          gsap.from(photoFrame, {
            opacity: 0,
            scale: 0.96,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          })
        }
      })

      // ── CTA final: word-by-word reveal ─────────────────────────
      const ctaWords = document.querySelectorAll('.md-cta__title-word')
      if (ctaWords.length > 0) {
        gsap.from(ctaWords, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.md-cta',
            start: 'top 76%',
          },
        })
      }

      gsap.from(['.md-cta__body', '.md-cta__actions'], {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.md-cta',
          start: 'top 70%',
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={pageRef} className={`md-page${reducedMotion ? ' md-page--reduced' : ''}`}>
      {/* ───── Hero ───── */}
      <section className="md-hero" aria-labelledby="md-hero-title">
        <div className="md-hero__inner">
          <div className="md-hero__copy">
            <span className="md-hero__eyebrow">Marketing Digital EXP</span>

            <h1 id="md-hero-title" className="md-hero__title">
              {'Marketing digital estratégico para negocios beauty que quieren'
                .split(' ')
                .map((word, i) => (
                  <span key={`w1-${i}`} className="md-hero__title-word">
                    {word}{' '}
                  </span>
                ))}
              <span className="md-hero__title-accent">
                {'vender más y crecer con previsibilidad.'
                  .split(' ')
                  .map((word, i) => (
                    <span key={`w2-${i}`} className="md-hero__title-word">
                      {word}{' '}
                    </span>
                  ))}
              </span>
            </h1>

            <p className="md-hero__lead">
              En EXP no creamos acciones sueltas. Creamos estrategias digitales
              conectadas con posicionamiento, contenido, tráfico, páginas,
              embudos y análisis de datos.
            </p>

            <p className="md-hero__support">
              Cuatro frentes que funcionan como un sistema único: cada pieza
              alimenta la siguiente.
            </p>

            <div className="md-hero__actions">
              <Link to="/#cta" className="md-btn md-btn--primary">
                Solicitar diagnóstico estratégico
              </Link>
              <a href="#services" className="md-btn md-btn--link">
                Ver servicios disponibles
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="md-hero__visual">
            <img
              src={heroMarketing}
              alt=""
              className="md-hero__photo"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
            <span className="md-hero__photo-frame" aria-hidden="true" />
            <img
              src={expWordmark}
              alt=""
              className="md-hero__wordmark"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ───── Services ───── */}
      <div id="services" className="md-services">
        {SERVICES.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className={`md-service md-service--${service.photoSide}`}
            aria-labelledby={`md-${service.id}-title`}
          >
            <div className="md-service__inner">
              <div className="md-service__copy">
                <span className="md-service__eyebrow">
                  <span className="md-service__num">{service.num}</span>
                  <span className="md-service__divider" aria-hidden="true" />
                  Servicio
                </span>

                <h2
                  id={`md-${service.id}-title`}
                  className="md-service__title"
                >
                  {service.title}
                </h2>

                <p className="md-service__text">{service.text}</p>

                <ul
                  className="md-service__deliverables"
                  aria-label={`Entregas para ${service.title}`}
                >
                  {service.deliverables.map((item) => (
                    <li key={item} className="md-service__deliverable">
                      <span className="md-service__check" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M2 7.5L5.5 11L12 3"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md-service__visual">
                <img
                  src={service.photo}
                  alt=""
                  className="md-service__photo"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <span className="md-service__photo-frame" aria-hidden="true" />
                <span className="md-service__photo-tag" aria-hidden="true">
                  {service.num} · {service.title.split(' ')[0]}
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ───── CTA final ───── */}
      <section className="md-cta" aria-labelledby="md-cta-title">
        <div className="md-cta__inner">
          <span className="md-cta__eyebrow">Diagnóstico estratégico</span>

          <h2 id="md-cta-title" className="md-cta__title">
            {'¿Quieres saber qué servicio puede generar más impacto en tu negocio'
              .split(' ')
              .map((word, i) => (
                <span key={`cta-${i}`} className="md-cta__title-word">
                  {word}{' '}
                </span>
              ))}
            <span className="md-cta__title-accent">
              {'ahora?'
                .split(' ')
                .map((word, i) => (
                  <span key={`ctaa-${i}`} className="md-cta__title-word">
                    {word}{' '}
                  </span>
                ))}
            </span>
          </h2>

          <p className="md-cta__body">
            Solicita un diagnóstico estratégico y analizaremos si tu prioridad
            debe ser contenido, tráfico, páginas, embudo o una combinación de
            servicios.
          </p>

          <div className="md-cta__actions">
            <Link to="/#cta" className="md-btn md-btn--primary">
              Solicitar diagnóstico estratégico
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
