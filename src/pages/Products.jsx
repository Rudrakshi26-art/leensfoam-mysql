import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';
import ProductCard from '../components/ProductCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const FILTERS = [
  { key: 'all', label: 'All Products' },
  { key: 'foam', label: 'Foam Rollers' },
  { key: 'interior', label: 'Fabric — Interior' },
  { key: 'exterior', label: 'Fabric — Exterior' },
  { key: 'specialty', label: 'Specialty' },
  { key: 'handles', label: 'Handles' },
];

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useReveal([filter, products.length]);
    useEffect(() => {
    document.title = 'Paint Rollers | Foam & Fabric Rollers | Leensfoam';

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
      'Explore Leensfoam paint rollers, foam rollers, fabric rollers and specialty rollers for interior and exterior painting applications.'
    );
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        if (!API_URL) {
          throw new Error('VITE_API_URL is not configured');
        }

        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visible = products.filter(
    (p) => filter === 'all' || p.cat === filter
  );

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Products</span>
        </div>

        <h1>Rollers built for every surface, every job.</h1>

        <p>
          From soft foam finishes on drywall to heavy-nap fabric rollers for
          textured exteriors — filter by category to find the right nap for
          the job.
        </p>
      </div>

      <section style={{ paddingTop: 0 }}>
        <div className="filter-row reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="product-loader">
            <div className="loader-circle"></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p style={{ color: 'var(--muted)' }}>
            {error}
          </p>
        )}

        {/* PRODUCTS */}
        {!loading && !error && (
          <div className="product-grid">
            {visible.map((p, i) => (
              <ProductCard
                product={p}
                index={i}
                key={p.id}
              />
            ))}
          </div>
        )}

        {/* NO PRODUCTS */}
        {!loading && !error && visible.length === 0 && (
          <p style={{ color: 'var(--muted)' }}>
            No products in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
