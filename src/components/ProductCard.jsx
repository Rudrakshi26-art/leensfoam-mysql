const IMAGE_MAP = {
  'textured-exterior-roller-1788614148971.JPG':
    'Textured Exterior Roller.JPG',

  'microfibre-interior-roller-1788614203451.JPG':
    'Microfibre Interior Roller.JPG',

  'high-density-foam-roller-1788614352935.JPG':
    'High-Density Foam Roller.JPG',

  'specialty-rollers-1788614335430.JPG':
    'Specialty Rollers.JPG',

  'exterior-fabric-roller-1788614319070.JPG':
    'Exterior Fabric Roller.JPG',

  'interior-fabric-roller-1788614298280.JPG':
    'Interior Fabric Roller.JPG',

  'polyether-foam-roller-1788614272980.JPG':
    'Polyether Foam Roller.JPG',

  'polyster-foam-roller-1788614397949.JPG':
    'Polyster Foam Roller.JPG',
};

export default function ProductCard({ product, index = 0 }) {
  const {
    id,
    tag,
    name,
    description,
    desc,
    image,
    imageUrl,
    c1,
    c2,
    is_new,
  } = product;

  const frontendImage = IMAGE_MAP[image] || image || '';

  const finalImageUrl =
    imageUrl ||
    (frontendImage
      ? `/assets/products/${encodeURIComponent(frontendImage)}`
      : '');

  return (
    <div
      className="product-card reveal"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div
        className="product-visual"
        style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${
            c1 || '#f5f5f5'
          }22, ${c2 || '#ffffff'}33)`,
        }}
      >
        {/* NEW Badge */}
        {Number(is_new) === 1 && (
          <span
            className="new-badge"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: '700',
              lineHeight: '1',
              borderRadius: '4px',
              background: '#000',
              color: '#fff',
              zIndex: 999,
              display: 'block',
            }}
          >
            NEW
          </span>
        )}

        {finalImageUrl && (
          <img
            src={finalImageUrl}
            alt={name || 'Product'}
            className="product-image"
          />
        )}
      </div>

      <span
        className="product-tag mono"
        style={{ background: c1 }}
      >
        {tag}
      </span>

      <span className="product-code mono">
        {String(id || '').toUpperCase()}
      </span>

      <h3>{name}</h3>

      <p>{description || desc}</p>

      </div>
  );
}
