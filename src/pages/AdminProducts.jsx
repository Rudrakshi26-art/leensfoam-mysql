import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const emptyProduct = {
    id: '',
    cat: '',
    tag: '',
    name: '',
    description: '',
    image: '',
    c1: '',
    c2: '',
  };

  const [newProduct, setNewProduct] = useState(emptyProduct);

  // =====================================================
  // GET PRODUCTS
  // =====================================================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}/api/products`
      );

      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();

      setProducts(data);

    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to load products.');
    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // PRODUCT ORDER
  // =====================================================

  const moveProduct = (index, direction) => {
    const newProducts = [...products];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= newProducts.length) {
      return;
    }

    [newProducts[index], newProducts[newIndex]] = [
      newProducts[newIndex],
      newProducts[index],
    ];

    setProducts(newProducts);
  };

  const saveProductOrder = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/products/reorder`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productIds: products.map((product) => product.id),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to save product order'
        );
      }

      await fetchProducts();

      alert('Product order saved successfully!');
    } catch (err) {
      console.error('Save order error:', err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const handleEdit = (product) => {
    setEditingProduct({
      ...product,
    });

    if (product.image) {
      setImagePreview(
        `${API_URL}/assets/products/${encodeURIComponent(
          product.image
        )}`
      );
    } else {
      setImagePreview('');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditingProduct((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // =====================================================
  // UPLOAD IMAGE
  // =====================================================

  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      setUploadingImage(true);

      const token = localStorage.getItem('adminToken');

      const formData = new FormData();

      formData.append('image', file);

      const response = await fetch(
        `${API_URL}/api/products/upload-image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to upload image'
        );
      }

      return data.filename;

    } catch (err) {
      console.error('Image upload error:', err);
      alert(err.message);
      return null;

    } finally {
      setUploadingImage(false);
    }
  };


  // =====================================================
  // NEW PRODUCT IMAGE
  // =====================================================

  const handleNewProductImage = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const filename = await uploadImage(file);

  if (filename) {
    const uploadedImageUrl =
      `${API_URL}/assets/products/${encodeURIComponent(filename)}`;

    setImagePreview(uploadedImageUrl);

    setNewProduct((current) => ({
      ...current,
      image: filename,
    }));
  } else {
    e.target.value = '';
  }
};

  // =====================================================
  // EDIT PRODUCT IMAGE
  // =====================================================

  const handleEditProductImage = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const filename = await uploadImage(file);

  if (filename) {
    const uploadedImageUrl =
      `${API_URL}/assets/products/${encodeURIComponent(filename)}`;

    setImagePreview(uploadedImageUrl);

    setEditingProduct((current) => ({
      ...current,
      image: filename,
    }));
  } else {
    e.target.value = '';
  }
};

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      setSaving(true);

      const token = localStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cat: editingProduct.cat,
            tag: editingProduct.tag,
            name: editingProduct.name,
            description: editingProduct.description,
            image: editingProduct.image,
            c1: editingProduct.c1,
            c2: editingProduct.c2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update product'
        );
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? editingProduct
            : product
        )
      );

      setEditingProduct(null);
      setImagePreview('');

      alert('Product updated successfully!');

    } catch (err) {
      console.error('Update error:', err);
      alert(err.message);

    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // NEW PRODUCT INPUT
  // =====================================================

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to add product'
        );
      }

      await fetchProducts();

      setNewProduct(emptyProduct);
      setImagePreview('');
      setShowAddForm(false);

      alert('Product added successfully!');

    } catch (err) {
      console.error('Add product error:', err);
      alert(err.message);

    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete product'
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      alert('Product deleted successfully!');

    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message);
    }
  };


  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setNewProduct(emptyProduct);
    setImagePreview('');
    setShowAddForm(true);
  };


  // =====================================================
  // CLOSE ADD FORM
  // =====================================================

  const closeAddForm = () => {
    setShowAddForm(false);
    setNewProduct(emptyProduct);
    setImagePreview('');
  };


  // =====================================================
  // PRODUCT IMAGE URL
  // =====================================================

  const getProductImage = (image) => {
    if (!image) return '';

    return `${API_URL}/assets/products/${encodeURIComponent(
      image
    )}`;
  };


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: '#0b1930',
            }}
          >
            Manage Products
          </h1>

          <p
            style={{
              marginTop: '8px',
              color: '#667085',
            }}
          >
            Manage all Leensfoam products from the admin panel.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={saveProductOrder}
            disabled={saving}
            style={primaryButton}
          >
            {saving ? 'Saving Order...' : 'Save Order'}
          </button>

          <button
            onClick={openAddForm}
            style={primaryButton}
          >
            + Add Product
          </button>
        </div>
      </div>


      {/* LOADING */}

      {loading && (
        <p style={{ color: '#667085' }}>
          Loading products...
        </p>
      )}


      {/* ERROR */}

      {error && (
        <p style={{ color: '#d92d20' }}>
          {error}
        </p>
      )}


      {/* PRODUCTS */}

      {!loading && !error && (
        <div>

          {products.map((product, index) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #e1e5eb',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '16px',
                background: '#fff',
                boxShadow:
                  '0 4px 20px rgba(10, 25, 48, 0.05)',
              }}
            >

              {/* PRODUCT IMAGE */}

              {product.image && (
                <img
                  src={getProductImage(product.image)}
                  alt={product.name}
                  style={{
                    width: '140px',
                    height: '100px',
                    objectFit: 'contain',
                    display: 'block',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    background: '#f5f6f8',
                  }}
                />
              )}

              <h2
                style={{
                  marginTop: 0,
                  color: '#0b1930',
                }}
              >
                {product.name}
              </h2>

              <p>
                <strong>ID:</strong> {product.id}
              </p>

              <p>
                <strong>Category:</strong> {product.cat}
              </p>

              <p>
                <strong>Tag:</strong> {product.tag}
              </p>

              <p>
                <strong>Description:</strong>{' '}
                {product.description}
              </p>

              <p>
                <strong>Image:</strong>{' '}
                {product.image || 'No image'}
              </p>

              <p>
                <strong>Color 1:</strong>{' '}
                {product.c1 || 'Not set'}
              </p>

              <p>
                <strong>Color 2:</strong>{' '}
                {product.c2 || 'Not set'}
              </p>


              {/* ACTION BUTTONS */}

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '20px',
                  flexWrap: 'wrap',
                }}
              >

                <button
                  onClick={() => moveProduct(index, -1)}
                  disabled={index === 0}
                  style={secondaryButton}
                >
                  ↑ Move Up
                </button>

                <button
                  onClick={() => moveProduct(index, 1)}
                  disabled={index === products.length - 1}
                  style={secondaryButton}
                >
                  ↓ Move Down
                </button>

                <button
                  onClick={() => handleEdit(product)}
                  style={primaryButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  style={deleteButton}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}


          {products.length === 0 && (
            <p style={{ color: '#667085' }}>
              No products found.
            </p>
          )}

        </div>
      )}


      {/* =================================================
          EDIT PRODUCT MODAL
      ================================================= */}

      {editingProduct && (
        <div style={overlayStyle}>

          <div style={modalStyle}>

            <h2 style={{ marginTop: 0 }}>
              Edit Product
            </h2>

            <form onSubmit={handleSave}>

              <label>Product ID</label>

              <input
                value={editingProduct.id}
                disabled
                style={inputStyle}
              />


              <label>Product Name</label>

              <input
                name="name"
                value={editingProduct.name || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />


              <label>Category</label>

              <input
                name="cat"
                value={editingProduct.cat || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />


              <label>Tag</label>

              <input
                name="tag"
                value={editingProduct.tag || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />


              <label>Description</label>

              <textarea
                name="description"
                value={editingProduct.description || ''}
                onChange={handleChange}
                required
                rows="4"
                style={inputStyle}
              />


              {/* IMAGE UPLOAD */}

              <label>Product Image</label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleEditProductImage}
                style={inputStyle}
              />


              {uploadingImage && (
                <p style={{ color: '#667085' }}>
                  Uploading image...
                </p>
              )}


              {imagePreview && (
                <div
                  style={{
                    marginBottom: '18px',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '180px',
                      height: '130px',
                      objectFit: 'contain',
                      background: '#f5f6f8',
                      borderRadius: '10px',
                      border: '1px solid #e1e5eb',
                    }}
                  />
                </div>
              )}


              <p
                style={{
                  fontSize: '13px',
                  color: '#667085',
                  marginTop: '-8px',
                }}
              >
                {editingProduct.image || 'No image selected'}
              </p>


              <label>Color 1</label>

              <input
                name="c1"
                value={editingProduct.c1 || ''}
                onChange={handleChange}
                placeholder="#000000"
                style={inputStyle}
              />


              <label>Color 2</label>

              <input
                name="c2"
                value={editingProduct.c2 || ''}
                onChange={handleChange}
                placeholder="#000000"
                style={inputStyle}
              />


              <div style={buttonRowStyle}>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  style={primaryButton}
                >
                  {saving
                    ? 'Saving...'
                    : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setImagePreview('');
                  }}
                  style={secondaryButton}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* =================================================
          ADD PRODUCT MODAL
      ================================================= */}

      {showAddForm && (
        <div style={overlayStyle}>

          <div style={modalStyle}>

            <h2 style={{ marginTop: 0 }}>
              Add Product
            </h2>

            <form onSubmit={handleAddProduct}>

              <label>Product ID</label>

              <input
                name="id"
                value={newProduct.id}
                onChange={handleNewProductChange}
                placeholder="e.g. new-roller"
                required
                style={inputStyle}
              />


              <label>Product Name</label>

              <input
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                placeholder="Product name"
                required
                style={inputStyle}
              />


              <label>Category</label>

              <input
                name="cat"
                value={newProduct.cat}
                onChange={handleNewProductChange}
                placeholder="e.g. foam"
                required
                style={inputStyle}
              />


              <label>Tag</label>

              <input
                name="tag"
                value={newProduct.tag}
                onChange={handleNewProductChange}
                placeholder="Product tag"
                required
                style={inputStyle}
              />


              <label>Description</label>

              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                placeholder="Product description"
                rows="4"
                required
                style={inputStyle}
              />


              {/* IMAGE UPLOAD */}

              <label>Product Image</label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleNewProductImage}
                style={inputStyle}
              />


              {uploadingImage && (
                <p style={{ color: '#667085' }}>
                  Uploading image...
                </p>
              )}


              {imagePreview && (
                <div
                  style={{
                    marginBottom: '18px',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '180px',
                      height: '130px',
                      objectFit: 'contain',
                      background: '#f5f6f8',
                      borderRadius: '10px',
                      border: '1px solid #e1e5eb',
                    }}
                  />
                </div>
              )}


              <p
                style={{
                  fontSize: '13px',
                  color: '#667085',
                  marginTop: '-8px',
                }}
              >
                {newProduct.image || 'No image selected'}
              </p>


              <label>Color 1</label>

              <input
                name="c1"
                value={newProduct.c1}
                onChange={handleNewProductChange}
                placeholder="#000000"
                style={inputStyle}
              />


              <label>Color 2</label>

              <input
                name="c2"
                value={newProduct.c2}
                onChange={handleNewProductChange}
                placeholder="#000000"
                style={inputStyle}
              />


              <div style={buttonRowStyle}>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  style={primaryButton}
                >
                  {saving
                    ? 'Adding...'
                    : 'Add Product'}
                </button>

                <button
                  type="button"
                  onClick={closeAddForm}
                  style={secondaryButton}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  marginTop: '6px',
  marginBottom: '18px',
  border: '1px solid #d5dbe5',
  borderRadius: '8px',
  outline: 'none',
  fontSize: '15px',
  fontFamily: 'inherit',
};


const primaryButton = {
  padding: '10px 18px',
  border: 'none',
  borderRadius: '8px',
  background: '#0b1930',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  whiteSpace: 'nowrap',
};


const deleteButton = {
  padding: '10px 18px',
  border: 'none',
  borderRadius: '8px',
  background: '#d92d20',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
};


const secondaryButton = {
  padding: '10px 18px',
  border: '1px solid #d5dbe5',
  borderRadius: '8px',
  background: '#fff',
  color: '#0b1930',
  cursor: 'pointer',
  fontWeight: '600',
};


const buttonRowStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
};


const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  zIndex: 1000,
};


const modalStyle = {
  width: '100%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
  background: '#fff',
  borderRadius: '16px',
  padding: '30px',
  boxSizing: 'border-box',
};
