import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact-footer">
      <div className="foot-grid">

        <div className="foot-brand">
          <img src="/assets/leensfoam.png" alt="Leensfoam logo" />

        </div>

        <div>
          <h5>COMPANY</h5>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5>PRODUCTS</h5>

          <ul>
            <li><Link to="/products">Foam Rollers</Link></li>
            <li><Link to="/products">Fabric Rollers</Link></li>
            <li><Link to="/products">Specialty Rollers</Link></li>
          </ul>
        </div>

        <div>
          <h5>CONTACT</h5>

          <ul>
            <li>
              <a href="tel:+919888887978">
                +91 98888 87978
              </a>
            </li>

            <li>
              <a href="mailto:info@leensfoam.com">
                info@leensfoam.com
              </a>
            </li>

            <li>
              <a href="#">
                201/202/203, Sunshine Heights,<br />
                Near Dhuri Gate No. 1, Behind IPOL,<br />
                Village Waliv, Vasai East,<br />
                Dist. Palghar, Maharashtra – 401208, India.
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="foot-bottom">
        <span>
          © 2026 Leensfoam Private Limited. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
