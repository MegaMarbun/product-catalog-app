import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '' // Tambahkan image ke dalam state
  });

  useEffect(() => {
    // Mengambil produk berdasarkan id dari URL params
    fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setUpdatedProduct({
          title: data.title,
          description: data.description,
          price: data.price,
          image: data.image // Tambahkan inisialisasi image
        });
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdatedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Mengirim data produk yang diperbarui ke API
    fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setEditMode(false);
        // Kembali ke halaman daftar produk setelah update
        navigate('/product');
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleUpdate = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    if (window.confirm('Anda yakin ingin menghapus produk ini?')) {
      fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          // Kembali ke halaman daftar produk setelah delete
          navigate('/product');
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleBack = () => {
    // Kembali ke halaman daftar produk
    navigate('/product');
  };

  return (
    <div style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGZvb2R8ZW58MHx8fHwxNjg4MzUzOTgw&ixlib=rb-4.0.3&q=80&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center',
    }}>
      <div className="container">
        <h2 className="text-center mb-4">Detail Produk</h2>
        {product && (
          <div className="card mb-3">
            {editMode ? (
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Judul</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={updatedProduct.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Deskripsi</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL Gambar</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={updatedProduct.image}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-success" onClick={handleSave}>Simpan</button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Batal</button>
              </div>
            ) : (
              <>
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{product.name}</h6>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Harga:</strong> ${product.price}</p>
                  <div className="btn-group" role="group">
                    <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              </>
            )}
            <button className="btn btn-secondary mt-3" onClick={handleBack}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
