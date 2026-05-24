import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import heroPortrait from '../assets/mentoria/diagnostico.webp'
import detailPhoto from '../assets/mentoria/plan.webp'
import expWordmark from '../assets/exp-wordmark-light.png'
import './Consultoria.css'

const FOR_WHOM = [
  'Ya tienen una operación funcionando.',
  'Quieren entender dónde están perdiendo dinero.',
  'Necesitan claridad sobre qué hacer primero.',
  'Quieren mejorar marketing, ventas y gestión.',
  'Necesitan revisar oferta, posicionamiento y embudo.',
  'Quieren tomar decisiones basadas en datos.',
  'Buscan una mirada estratégica externa.',
]

const ANALYSIS = [
  'Posicionamiento',
  'Oferta',
  'Comunicación',
  'Instagram',
  'Tráfico pago',
  'Embudo de ventas',
  'Página o landing page',
  'Proceso comercial',
  'Métricas',
  'Costes, margen y facturación',
  'Oportunidades de crecimiento',
]

const DELIVERABLES = [
  'Diagnóstico estratégico',
  'Mapa de bloqueos',
  'Plan de acción',
  'Prioridades de ejecución',
  'Recomendaciones de marketing',
  'Recomendaciones de gestión',
  'Próximos pasos comerciales',
]

export default function Consultoria() {
  return (
    <>
      {/* ───── Hero — dark editorial spread ───── */}
      <section className="consult-hero" aria-labelledby="consult-hero-title">
        <div className="consult-hero__inner">
          <div className="consult-hero__copy">
            <RevealOnScroll as="span" className="consult-hero__eyebrow" delay={0}>
              Consultoría EXP
            </RevealOnScroll>

            <RevealOnScroll
              as="h1"
              id="consult-hero-title"
              className="consult-hero__title"
              delay={140}
            >
              Para negocios beauty que
              <br />
              necesitan{' '}
              <span className="consult-hero__title-accent">
                dirección estratégica
              </span>{' '}
              personalizada.
            </RevealOnScroll>

            <RevealOnScroll as="p" className="consult-hero__lead" delay={280}>
              La consultoría es ideal para negocios que necesitan un plan claro
              de crecimiento, análisis de bloqueos y dirección estratégica para
              marketing, ventas y gestión.
            </RevealOnScroll>

            <RevealOnScroll as="p" className="consult-hero__support" delay={400}>
              Analizamos tu negocio en profundidad y entregamos un plan de acción
              objetivo para acelerar el crecimiento, mejorar decisiones y
              corregir los puntos que están limitando tus resultados.
            </RevealOnScroll>

            <RevealOnScroll as="div" className="consult-hero__actions" delay={540}>
              <Link to="/#cta" className="consult-btn consult-btn--primary">
                Solicitar consultoría
              </Link>
              <Link to="/#cta" className="consult-btn consult-btn--link">
                Hablar con EXP
                <span aria-hidden="true">→</span>
              </Link>
            </RevealOnScroll>
          </div>

          <RevealOnScroll as="div" className="consult-hero__visual" delay={220}>
            <img
              src={heroPortrait}
              alt=""
              className="consult-hero__photo"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
            <span className="consult-hero__photo-frame" aria-hidden="true" />
            <span className="consult-hero__photo-tag" aria-hidden="true">
              Estrategia · Diagnóstico · Plan
            </span>
          </RevealOnScroll>
        </div>
      </section>

      {/* ───── Para quién es — 7 bullets, numbered editorial list ───── */}
      <section className="consult-for-whom" aria-labelledby="consult-fw-title">
        <div className="consult-for-whom__inner">
          <div className="consult-for-whom__lead">
            <RevealOnScroll as="span" className="consult-eyebrow">
              Para quién es
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="consult-fw-title"
              className="consult-section-title"
              delay={120}
            >
              La Consultoría EXP es ideal
              <br />
              para negocios que…
            </RevealOnScroll>
          </div>

          <ol className="consult-for-whom__list">
            {FOR_WHOM.map((item, i) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="consult-for-whom__item"
                delay={i * 70}
              >
                <span className="consult-for-whom__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="consult-for-whom__text">{item}</span>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── Qué analizamos — 11 areas in a grid ───── */}
      <section className="consult-analysis" aria-labelledby="consult-an-title">
        <div className="consult-analysis__inner">
          <div className="consult-analysis__lead">
            <RevealOnScroll as="span" className="consult-eyebrow">
              Qué incluye
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="consult-an-title"
              className="consult-section-title"
              delay={120}
            >
              Qué analizamos
              <br />
              en la consultoría.
            </RevealOnScroll>
            <RevealOnScroll as="p" className="consult-analysis__intro" delay={240}>
              Once áreas cruzadas para mapear bloqueos y oportunidades reales
              de crecimiento.
            </RevealOnScroll>
          </div>

          <ul className="consult-analysis__grid" aria-label="Áreas analizadas">
            {ANALYSIS.map((item, i) => (
              <RevealOnScroll
                key={item}
                as="li"
                className="consult-analysis__cell"
                delay={i * 40}
              >
                <span className="consult-analysis__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="consult-analysis__label">{item}</span>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── Entrega final — climax + deliverables ───── */}
      <section className="consult-delivery" aria-labelledby="consult-del-title">
        <div className="consult-delivery__inner">
          <RevealOnScroll as="div" className="consult-delivery__visual">
            <img
              src={detailPhoto}
              alt=""
              className="consult-delivery__photo"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <span className="consult-delivery__photo-frame" aria-hidden="true" />
            <img
              src={expWordmark}
              alt=""
              className="consult-delivery__wordmark"
              aria-hidden="true"
            />
          </RevealOnScroll>

          <div className="consult-delivery__copy">
            <RevealOnScroll as="span" className="consult-eyebrow">
              Entrega final
            </RevealOnScroll>
            <RevealOnScroll
              as="h2"
              id="consult-del-title"
              className="consult-delivery__title"
              delay={120}
            >
              Al final de la consultoría,
              <br />
              tendrás un{' '}
              <span className="consult-accent">plan claro de acción</span>.
            </RevealOnScroll>
            <RevealOnScroll as="p" className="consult-delivery__body" delay={240}>
              No se trata solo de una reunión de ideas. La consultoría entrega
              dirección, prioridades y un plan práctico para saber qué ajustar,
              qué ejecutar y qué medir.
            </RevealOnScroll>

            <ul className="consult-delivery__list" aria-label="Entregables">
              {DELIVERABLES.map((item, i) => (
                <RevealOnScroll
                  key={item}
                  as="li"
                  className="consult-delivery__item"
                  delay={360 + i * 60}
                >
                  <span className="consult-delivery__check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── CTA final — consultoria specific ───── */}
      <section className="consult-cta" aria-labelledby="consult-cta-title">
        <div className="consult-cta__inner">
          <RevealOnScroll as="span" className="consult-cta__eyebrow">
            Diagnóstico estratégico
          </RevealOnScroll>
          <RevealOnScroll
            as="h2"
            id="consult-cta-title"
            className="consult-cta__title"
            delay={120}
          >
            ¿Tu negocio necesita{' '}
            <span className="consult-accent">claridad</span>
            <br />
            antes de invertir más en marketing?
          </RevealOnScroll>
          <RevealOnScroll as="p" className="consult-cta__body" delay={240}>
            Solicita una consultoría estratégica y entiende qué está frenando
            tu crecimiento antes de seguir invirtiendo sin dirección.
          </RevealOnScroll>
          <RevealOnScroll as="div" className="consult-cta__actions" delay={360}>
            <Link to="/#cta" className="consult-btn consult-btn--primary">
              Solicitar consultoría EXP
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
