import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useReveal from '../hooks/useReveal.js';

const TIMELINE = [
  {
    yr: '1982',
    title: 'Where the expertise began',
    body: 'Long before Leensfoam existed as a company, the foundational know-how in foam and fabric roller manufacturing was already being built — the craft that everything since is rooted in.',
  },
  {
    yr: '2000',
    title: 'Leensfoam Private Limited founded',
    body: 'Leensfoam was established in Vasai, Maharashtra, turning two decades of hands-on expertise into a dedicated roller manufacturing business.',
  },
  {
    yr: 'Today',
    title:  '140+ products, 15+ states',
    body: 'A full range of foam and fabric rollers, manufactured in-house with imported raw materials and distributed to dealers and contractors across India.',
  },
];

export default function About() {
  useReveal();

  useEffect(() => {
    document.title = 'About Leensfoam | Paint Roller Manufacturer in India';

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
      'Learn about Leensfoam, a paint roller manufacturer in India offering foam and fabric rollers for painters, contractors, dealers and paint companies.'
    );

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      'href',
      'https://leensfoam-mysql.vercel.app/about'
    );
  }, []);

  return (
    <>
{/* 
<div className="page-header">
  <div className="breadcrumb">
    <Link to="/">Home</Link> / <span>Why Leensfoam</span>
  </div>

  <h1>Built on experience. Driven by quality.</h1>

  <p>
    Every Leensfoam roller carries expertise going back to 1982 — long
    before it was a company, it was a craft.
  </p>
</div>
*/}

{/* =====================================================
    ENGINEERED FOR BETTER PERFORMANCE
===================================================== */}

<section className="precision-section" style={{ paddingTop: '120px' }}>
  <div className="precision-container">

    <div className="precision-intro reveal">
      <span className="section-eyebrow precision-eyebrow">
        MADE WITH PRECISION
      </span>

      <h2>
        Engineered for <span className="better-performance">Better Performance.</span>
      </h2>

      <p>
        Every component of a Leensfoam roller is designed with
        purpose — from the handle and frame to the core and
        premium fabric.
      </p>
    </div>

    <div className="precision-image reveal">
      <img
        src="/assets/roller expload.png"
        alt="Leensfoam roller components"
      />
    </div>

  </div>
</section>
{/* =====================================================
    OUR STORY — COMMENTED OUT
=====================================================

<section style={{ paddingTop: 0 }}>
  <div className="section-head reveal">
    <div>
      <span className="section-eyebrow">OUR STORY</span>
      <h2>From craft to company.</h2>
    </div>

    <p>
      We import raw materials from Bengaluru, Mumbai and Istanbul, and
      manufacture every roller in-house — so quality is checked at
      every stage, not just the last one.
    </p>
  </div>

  <div className="reveal">
    <div className="timeline">
      {TIMELINE.map((t) => (
        <div className="timeline-item" key={t.yr}>
          <span className="yr">{t.yr}</span>

          <div>
            <h4>{t.title}</h4>
            <p>{t.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

===================================================== */}

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section>
        <div className="section-head reveal">
          <div>
            <span className="section-eyebrow">WHY LEENSFOAM</span>
            <h2>Why choose us</h2>
          </div>
        </div>

        <div className="why-grid reveal">

          {/* PREMIUM QUALITY FABRICS */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/premium-quality.png"
                alt=""
              />
            </div>

            <h4>Premium Quality Fabrics</h4>

            <p>
              Engineered for excellent paint pickup, smooth application and a
              professional finish.
            </p>
          </div>

          {/* MADE WITH PRIDE */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/made-with-pride.png"
                alt=""
              />
            </div>

            <h4>Made with Pride</h4>

            <p>
              Every roller is manufactured with care, precision and a
              commitment to delivering dependable quality.
            </p>
          </div>

          {/* CONSISTENT PERFORMANCE */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/consistent-performance.png"
                alt=""
              />
            </div>

            <h4>Consistent Performance</h4>

            <p>
              Strict quality control ensures uniform performance and
              consistency from batch to batch.
            </p>
          </div>

          {/* BUILT FOR PROFESSIONALS */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/trusted-partner.png"
                alt=""
              />
            </div>

            <h4>Built for Professionals</h4>

            <p>
              Designed to meet the demanding requirements of painters,
              contractors, retailers and paint companies.
            </p>
          </div>

          {/* RELIABLE SUPPLY */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/reliable-supply.png"
                alt=""
              />
            </div>

            <h4>Reliable Supply</h4>

            <p>
              Strong manufacturing capabilities help us deliver quality
              products on time, across India.
            </p>
          </div>

          {/* MANUFACTURING EXPERTISE */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/manufacturing.png"
                alt=""
              />
            </div>

            <h4>Manufacturing Expertise</h4>

            <p>
              Our experience and manufacturing know-how allow us to
              continuously improve our products and processes.
            </p>
          </div>

          {/* MADE IN INDIA */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/made-in-india.png"
                alt=""
              />
            </div>

            <h4>Made in India</h4>

            <p>
              Proudly manufactured in India, combining local expertise with
              professional manufacturing standards.
            </p>
          </div>

          {/* TRUSTED PARTNER */}

          <div className="why-card">
            <div className="ic">
              <img
                src="/assets/icon/partnership.png"
                alt=""
              />
            </div>

            <h4>Your Trusted Manufacturing Partner</h4>

            <p>
              We don't just supply painting rollers—we build long-term
              partnerships through quality, consistency and service.
            </p>
          </div>

        </div>
      </section>

{/* =====================================================
    BUILT TO SUPPLY. BUILT TO SCALE.
=====================================================

<section className="supply-section">
  <div className="supply-container">

    <div className="supply-intro reveal">
      <span className="section-eyebrow">
        BUILT TO SUPPLY. BUILT TO SCALE.
      </span>

      <h1>
        Your Reliable Manufacturing <span className="growth-text">Partner for Growth.</span>
      </h1>

      <Link to="/contact" className="supply-btn">
        <span>TALK TO OUR TEAM</span>
        <span className="supply-arrow">→</span>
      </Link>
    </div>

    <div className="supply-grid reveal">
      ...
    </div>

  </div>
</section>

===================================================== */}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="cta-band">
        <div className="reveal">

          <span
            className="section-eyebrow"
            style={{
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            GET IN TOUCH
          </span>

          <h2>
            Ready to stock rollers that{' '}

            <em
              style={{
                color: 'var(--orange)',
                fontStyle: 'normal',
              }}
            >
              actually perform?
            </em>
          </h2>

          <Link
            to="/contact"
            className="btn-solid"
          >
            Request the dealer catalogue
          </Link>

        </div>
      </section>
    </>
  );
}
