import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import StatsMarquee from '../components/StatsMarquee.jsx';
import BrandCarousel from '../components/BrandCarousel.jsx';

function FeatureIcon({ type }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 28 28',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  if (type === 'roller') {
    return (
      <svg {...common}>
        <rect
          x="4"
          y="6"
          width="16"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M20 9.5h4M10 13v8M7.5 21h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === 'paint') {
    return (
      <svg {...common}>
        <path
          d="M7 7h11a3 3 0 0 1 3 3v2H7V7Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 12v9M12 12v5c0 2 2 3 4 1v-3c0-2 2-3 4-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === 'durable') {
    return (
      <svg {...common}>
        <path
          d="m9 18 10-10"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8 12 6 10a4 4 0 0 1 6-6l2 2M20 16l2 2a4 4 0 0 1-6 6l-2-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M9 13v9H6v-9h3Zm0 2h4l2-6c.3-1-.4-2-1.4-2h-.5L12 11H9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 10h4c1.5 0 2.5 1.2 2.1 2.6l-1 4.2c-.3 1.3-1.4 2.2-2.7 2.2H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  useReveal();

  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

useEffect(() => {
  document.title = 'Paint Roller Manufacturer in India | Leensfoam';

  let metaDescription = document.querySelector(
    'meta[name="description"]'
  );

  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }

  metaDescription.setAttribute(
    'content',
    'Leensfoam is a paint roller manufacturer and supplier in India, offering OEM paint rollers, private-label paint rollers, bulk paint roller supply, roller covers and refills for B2B requirements.'
  );

  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);

          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (videoWrapRef.current) {
      observer.observe(videoWrapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero hero-light" id="home">
        <div className="hero-grid">

          <div className="hero-text">

            {/* MAIN HEADING - KEPT UNCHANGED */}
            <h1 className="reveal">
              Every stroke starts{' '}
              <span className="logo-gradient">with the roller.</span>
            </h1>

            {/* SEO KEYWORDS ADDED NATURALLY TO EXISTING CONTENT */}
            <p className="hero-sub reveal">
              Leensfoam is a paint roller manufacturer in India and a paint
              roller manufacturing company serving painters, contractors,
              dealers and distributors. We offer high-quality foam and fabric
              paint rollers, OEM and private-label paint roller manufacturing,
              and bulk paint roller supply for B2B requirements, with 140+
              products engineered in-house and supplied across India.
            </p>

            <div className="hero-features reveal">

              <div className="hero-feature">
                <span className="feature-icon">
                  <FeatureIcon type="roller" />
                </span>
                <span>
                  Smooth
                  <br />
                  Finish
                </span>
              </div>

              <div className="feature-divider" />

              <div className="hero-feature">
                <span className="feature-icon">
                  <FeatureIcon type="paint" />
                </span>
                <span>
                  High Paint
                  <br />
                  Absorption
                </span>
              </div>

              <div className="feature-divider" />

              <div className="hero-feature">
                <span className="feature-icon">
                  <FeatureIcon type="durable" />
                </span>
                <span>
                  Durable &amp;
                  <br />
                  Long Lasting
                </span>
              </div>

              <div className="feature-divider" />

              <div className="hero-feature">
                <span className="feature-icon">
                  <FeatureIcon type="thumb" />
                </span>
                <span>
                  Comfortable
                  <br />
                  Grip
                </span>
              </div>

            </div>

            <div className="hero-actions reveal">
              <Link to="/products" className="btn-solid">
                Explore the range →
              </Link>

              <Link to="/about" className="btn-ghost">
                Our story ↓
              </Link>
            </div>

            <div className="scroll-cue">
              <div className="scroll-line" />
              SCROLL
            </div>

          </div>

          <div className="hero-visual reveal">
            <img
              src="/assets/roller-hero.png"
              alt="Leensfoam paint rollers"
              className="hero-roller-img"
            />
          </div>

        </div>
      </section>

      <StatsMarquee />

      {/* ================= FULL RANGE ================= */}
      <section className="full-range-section" ref={sectionRef}>

        {/* TOP CONTENT */}
        <div className="full-range-container">

          {/* LEFT SIDE - TEXT */}
          <div className="full-range-text">

            <div className="full-range-eyebrow">
              THE FULL RANGE
            </div>

            <h2>
              Rollers built for
              <br />
              every surface,
              <br />
              every job.
            </h2>

           <p>
              From foam rollers for smooth finishes to fabric roller covers for
              textured surfaces, explore our range of paint rollers, roller covers
              and paint roller refills for professional painting applications.
            </p>

            <button
              className="full-range-button"
              onClick={() => {
                window.location.href = '/products';
              }}
            >
              View all products
            </button>

          </div>

          {/* RIGHT SIDE - LARGE VIDEO */}
          <div
            className={`full-range-image video-reveal${
              videoVisible ? ' video-visible' : ''
            }`}
            ref={videoWrapRef}
          >
            <video
              ref={videoRef}
              src="/assets/leensfoamrolleranimation.mp4"
              muted
              loop
              playsInline
            />
          </div>

        </div>

        {/* CATEGORY CARDS */}
        <div className="roller-category-grid">

          {/* CARD 1 */}
          <div className="roller-category-card">

            <div className="roller-card-content">

              <div className="roller-card-icon">
                🏠
              </div>

              <h3>
                Interior Rollers
              </h3>

              <p>
                Smooth, even finishes
                <br />
                for interior walls
              </p>

              <span className="roller-card-arrow">
                →
              </span>

            </div>

            <img
              src="/assets/interior roller.png"
              alt="Interior paint rollers by Leensfoam"
              className="roller-card-image"
            />

          </div>

          {/* CARD 2 */}
          <div className="roller-category-card">

            <div className="roller-card-content">

              <div className="roller-card-icon">
                ▦
              </div>

              <h3>
                Exterior Rollers
              </h3>

              <p>
                Built for textured and
                <br />
                rough surfaces
              </p>

              <span className="roller-card-arrow">
                →
              </span>

            </div>

            <img
              src="/assets/exterior roller.png"
              alt="Exterior paint rollers by Leensfoam"
              className="roller-card-image"
            />

          </div>

          {/* CARD 3 */}
          <div className="roller-category-card">

            <div className="roller-card-content">

              <div className="roller-card-icon">
                ▤
              </div>

              <h3>
                Foam Rollers
              </h3>

              <p>
                Clean application
                <br />
                for smooth finishes
              </p>

              <span className="roller-card-arrow">
                →
              </span>

            </div>

            <img
              src="/assets/foam roller.png"
              alt="Foam paint rollers by Leensfoam"
              className="roller-card-image"
            />

          </div>

          {/* CARD 4 */}
          <div className="roller-category-card">

            <div className="roller-card-content">

              <div className="roller-card-icon">
                ☆
              </div>

              <h3>
                Specialty Rollers
              </h3>

              <p>
                Purpose-built solutions
                <br />
                for specific applications
              </p>

              <span className="roller-card-arrow">
                →
              </span>

            </div>

            <img
              src="/assets/specialty roller.png"
              alt="Specialty paint rollers by Leensfoam"
              className="roller-card-image"
            />

          </div>

        </div>

      </section>

      {/* ================= CRAFT / MANUFACTURING ================= */}
      <section id="craft">

        <div className="craft reveal">

          <div className="craft-grid">

            <div>

              <h2>
                Built on experience. <em>Driven by quality.</em>
              </h2>

              <p>
                Founded in 2000, Leensfoam was shaped by expertise going back
                to 1982 — long before it was a company, it was a craft. We
                import raw materials from Bengaluru, Mumbai and Istanbul, and
                manufacture every roller in-house.
              </p>

              <p>
                40+ years of experience, 500 + products,
                distribution across 20 Indian states.
              </p>

              <div style={{ marginTop: '30px' }}>
                <Link to="/about" className="btn-ghost">
                  Read our full story →
                </Link>
              </div>

            </div>

            <div className="craft-list">

              {/* ITEM 1 */}
              <div className="craft-item">

                <div className="craft-icon" aria-hidden="true">

                  {/* Shield icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                  >
                    <path
                      d="M12 3L20 6V11C20 16.5 16.5 20 12 21C7.5 20 4 16.5 4 11V6L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12L10.5 14.5L16 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                </div>

                <div className="craft-content">

                  <h4>
                    Premium raw materials
                  </h4>

                  <p>
                    Sourced from trusted global suppliers, checked before
                    production begins.
                  </p>

                </div>

              </div>

              {/* ITEM 2 */}
              <div className="craft-item">

                <div className="craft-icon" aria-hidden="true">

                  {/* Consistent performance / target icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="1"
                      fill="currentColor"
                    />
                  </svg>

                </div>

                <div className="craft-content">

                  <h4>
                    Advanced manufacturing
                  </h4>

                  <p>
                    Modern machinery with quality checks at every stage of
                    the line.
                  </p>

                </div>

              </div>

              {/* ITEM 3 */}
              <div className="craft-item">

                <div className="craft-icon" aria-hidden="true">

                  {/* Paint roller icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                  >
                    <path
                      d="M5 5H17C18.1 5 19 5.9 19 7V9C19 10.1 18.1 11 17 11H7C5.9 11 5 10.1 5 9V5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M12 11V16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M12 16H15"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M15 16V21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>

                </div>

                <div className="craft-content">

                  <h4>
                    Professional results
                  </h4>

                  <p>
                    Professional paint rollers engineered for consistent
                    coverage, smooth finish and reliable performance.
                  </p>

                </div>

              </div>

              {/* ITEM 4 */}
              <div className="craft-item">

                <div className="craft-icon" aria-hidden="true">

                  {/* Truck icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                  >
                    <path
                      d="M3 6H14V17H3V6Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M14 10H18L21 13V17H14V10Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="7"
                      cy="18"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <circle
                      cx="17"
                      cy="18"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>

                </div>

                <div className="craft-content">

                  <h4>
                    Reliable and timely supply
                  </h4>

                  <p>
                    Same-day availability for standard products, backed by
                    real relationships.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <BrandCarousel />

      {/* ================= CTA ================= */}
      <section className="cta-band">

        <div className="reveal">

          <span className="section-eyebrow cta-eyebrow">
            GET IN TOUCH
          </span>

          <h2>
            Ready to stock rollers that{' '}
            <em>actually perform?</em>
          </h2>

          <Link to="/contact" className="btn-solid">
            Request the dealer catalogue
          </Link>

        </div>

      </section>
    </>
  );
}
