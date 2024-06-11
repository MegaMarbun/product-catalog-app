import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Modal, InputGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // Set limit to 10 products per page
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [remainingProducts, setRemainingProducts] = useState(0); // Total remaining products on the first page
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  }); // State for new product
  const [notFound, setNotFound] = useState(false); // State for not found products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products?page=${page}&limit=${limit}${searchQuery ? `&search=${searchQuery}` : ''}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        const totalProducts = response.headers.get('X-Total-Count'); // Total count from the response headers
        const totalPages = Math.ceil(totalProducts / limit);
        
        setProducts(data);
        setTotalPages(totalPages);

        // Set not found state
        setNotFound(data.length === 0);

        // Calculate remaining products on the first page
        const remaining = totalProducts % limit;
        setRemainingProducts(remaining);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Ensure products is an empty array if there's an error
      }
    };

    fetchProducts();
  }, [page, limit, searchQuery]);

  const handleDelete = (id) => {
    fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (page === 1) return; // Do nothing if already on the first page
    setPage(page => page - 1);
  };

  const goToNextPage = () => {
    if (page === totalPages) return; // Do nothing if already on the last page
    setPage(page => page + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://611a1a2fcbf1b30017eb54c1.mockapi.io/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) throw new Error('Failed to add product');

      const addedProduct = await response.json();
      setProducts([addedProduct, ...products]);
      setShowAddModal(false); // Close the modal
      setNewProduct({ title: '', description: '', price: '', image: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Product List</h2>
        <Form className="d-flex" onSubmit={handleSearch}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search products"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </InputGroup>
        </Form>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Product</Button>
      </div>

      <div className="row">
        {notFound ? (
          <div className="col-12 text-center">
            <h5>No products found.</h5>
          </div>
        ) : (
          Array.isArray(products) && products.map(product => (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} alt={product.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>${product.price}</strong>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Link to={`/product/${product.id}`} className="btn btn-success stretched-link">Detail</Link>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                </Card.Footer>
              </Card>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-4">
        <Button variant="secondary" className="mr-2" onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} variant={page === index + 1 ? 'primary' : 'secondary'} className="mr-2" onClick={() => goToPage(index + 1)}>
            {index + 1}
          </Button>
        ))}
        <Button variant="secondary" onClick={goToNextPage} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      {/* Modal for Add Product */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter title" 
                value={newProduct.title} 
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter description" 
                value={newProduct.description} 
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter price" 
                value={newProduct.price} 
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter image URL" 
                value={newProduct.image} 
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductList;
