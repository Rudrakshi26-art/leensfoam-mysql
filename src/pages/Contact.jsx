import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';

export default function Contact() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to your actual email/CRM endpoint
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 2600);
  }

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Contact</span>
        </div>

        <h1>Let's talk rollers.</h1>

        <p>
          Dealer enquiries, bulk orders, or questions about which roller
          suits your job — reach out and we'll get back to you.
        </p>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="contact-grid reveal">

          <div className="contact-info-card">
            <h3>Get in touch</h3>

            <div className="contact-row">
              <span className="lbl mono">PHONE</span>
              <a
                className="val"
                href="tel:+919888887978"
              >
                +91 98888 87978
              </a>
            </div>

            <div className="contact-row">
              <span className="lbl mono">EMAIL</span>
              <a
                className="val"
                href="mailto:info@leensfoam.com"
              >
                info@leensfoam.com
              </a>
            </div>

            <div className="contact-row">
              <span className="lbl mono">ADDRESS</span>

              <span className="val">
                201/202/203, Sunshine Heights,<br />
                Near Dhuri Gate No. 1, Behind IPOL,<br />
                Village Waliv, Vasai East,<br />
                Dist. Palghar, Maharashtra – 401208, India.
              </span>
            </div>

            <div className="contact-row">
              <span className="lbl mono">HOURS</span>
              <span className="val">
                Mon – Sat, 9:30 AM – 6:30 PM IST
              </span>
            </div>

            <div className="map-frame">
              <iframe
                title="Leensfoam location"
                src="https://maps.app.goo.gl/bdJvLRgyB19Jje9U8"
                loading="lazy"
              />
            </div>
          </div>

          <form id="contactForm" onSubmit={handleSubmit}>

            <div className="form-row-2">

              <div className="form-group">
                <label htmlFor="name">FULL NAME</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">PHONE</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interest">I'M INTERESTED IN</label>

              <select
                id="interest"
                name="interest"
                defaultValue="dealer"
              >
                <option value="dealer">
                  Becoming a dealer
                </option>

                <option value="bulk">
                  Bulk / wholesale order
                </option>

                <option value="product">
                  Product question
                </option>

                <option value="other">
                  Something else
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us what you need..."
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              {submitted
                ? 'Message sent ✓'
                : 'Send message'}
            </button>

            <p className="form-note">
              This form is a front-end demo — connect it to an email service
              or CRM endpoint before going live.
            </p>

          </form>

        </div>
      </section>
    </>
  );
}
