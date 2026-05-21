import heroImage from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="hero">
      <HeroXDecor />

      <div className="hero__content">
        <span className="hero__eyebrow">EXP Marketing</span>

        <h1 className="hero__headline">
          Acelera 12 meses<br />
          de crecimiento<br />
          en 6 meses.
        </h1>

        <div className="hero__rule" aria-hidden="true" />

        <p className="hero__sub">
          Marketing, ventas y gestión para negocios beauty.
        </p>

        <p className="hero__body">
          Ayudamos a profesionales, emprendedoras y clínicas beauty a crecer
          con más claridad, previsibilidad y estrategia.
        </p>

        <div className="hero__actions">
          <a href="#cta" className="hero__btn hero__btn--primary">
            Solicitar diagnóstico estratégico
          </a>
          <a
            href="#"
            className="hero__btn hero__btn--ghost"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            Conocer soluciones
          </a>
        </div>
      </div>

      <div className="hero__image-wrap">
        <img
          src={heroImage}
          alt="EXP Marketing — visión editorial"
          className="hero__image"
        />
      </div>
    </section>
  )
}

function HeroXDecor() {
  return (
    <svg
      className="hero__x-decor"
      viewBox="0 0 560 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="0" x2="560" y2="700" stroke="#D8B98C" strokeWidth="0.75" />
      <line x1="560" y1="0" x2="0" y2="700" stroke="#D8B98C" strokeWidth="0.75" />
    </svg>
  )
}
