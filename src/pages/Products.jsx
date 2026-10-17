
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const getValidCategory = (category) =>
    FILTERS.some((f) => f.key === category)
      ? category
      : 'all';

  const [filter, setFilter] = useState(() =>
    getValidCategory(searchParams.get('category'))
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Update the selected filter when the URL category changes
  useEffect(() => {
    setFilter(
      getValidCategory(searchParams.get('category'))
    );
  }, [searchParams]);

  // Keep the URL synchronized when a filter button is clicked
  const handleFilterChange = (category) => {
    setFilter(category);

    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  useReveal([filter, products.length]);

  // SEO metadata
  useEffect(() => {
    document.title = 'Paint Rollers | Foam & Fabric Rollers | Leensfoam';

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      'href',
      'https://leensfoam.com/products'
    );

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

  // Fetch products from the backend
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

  // Filter products by the selected category
  const visible = products.filter((product) => {
    const productCategory = String(product.cat || '')
      .trim()
      .toLowerCase();

    return (
      filter === 'all' ||
      productCategory === filter
    );
  });

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Products</span>
        </div>

        <h1>Rollers built for every surface, every job.</h1>

        <p>
          From soft foam finishes on drywall to heavy-nap fabric
          rollers for textured exteriors — filter by category to
          find the right nap for the job.
        </p>
      </div>

      <section style={{ paddingTop: 0 }}>
        {/* Category filter buttons */}
        <div className="filter-row reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${
                filter === f.key ? ' active' : ''
              }`}
              onClick={() => handleFilterChange(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="product-loader">
            <div className="loader-circle"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p style={{ color: 'var(--muted)' }}>
            {error}
          </p>
        )}

        {/* Product list */}
        {!loading && !error && (
          <div className="product-grid">
            {visible.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                key={product.id}
              />
            ))}
          </div>
        )}

        {/* Empty category message */}
        {!loading && !error && visible.length === 0 && (
          <p style={{ color: 'var(--muted)' }}>
            No products in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
