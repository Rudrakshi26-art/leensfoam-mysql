import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive ? 'active' : undefined;
  const closeMenu = () => {
  setMenuOpen(false);
};

  return (
    <header
      style={{
        background: scrolled
          ? 'rgba(10,14,28,0.96)'
          : 'rgba(10,14,28,0.88)',
      }}
    >

      {/* Logo */}
      <NavLink
        to="/"
        className="brand"
        data-cursor="default"
      >
        <img
           src="/assets/leensfoam.png"
           alt="Leensfoam logo"
           className="header-logo"
        />

        <div className="brand-text">
          Leensfoam
          <span>PRIVATE LIMITED</span>
        </div>
      </NavLink>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {/* Navigation */}
      <nav className={menuOpen ? 'nav-open' : ''}>

        <NavLink
          to="/"
          end
          className={linkClass}
          data-cursor="default"
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={linkClass}
          data-cursor="products"
          onClick={closeMenu}
        >
          Products
        </NavLink>

        <NavLink
          to="/about"
          className={linkClass}
          data-cursor="about"
          onClick={closeMenu}
        >
          Why Leensfoam
        </NavLink>

        <NavLink
          to="/contact"
          className={linkClass}
          data-cursor="contact"
          onClick={closeMenu}
        >
          Contact
        </NavLink>

      </nav>

      {/* Download Brochure */}
      <a
        href="/brochure.pdf"
        download="Leensfoam-Brochure.pdf"
        className="cta-btn"
      >
        Download Brochure →
      </a>
    </header>
  );
}
