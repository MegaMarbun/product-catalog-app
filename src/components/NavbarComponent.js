import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import ProductList from './ProductList'; // Import ProductList component

const HomePage = () => {
  const [showProductList, setShowProductList] = useState(false); // State untuk mengontrol tampilan ProductList
  const [bestSellers, setBestSellers] = useState([]); // State untuk produk best seller
  const [loadingBestSellers, setLoadingBestSellers] = useState(true); // State untuk status loading

  useEffect(() => {
    // Ambil data produk dari endpoint
    fetch('https://611a1a2fcbf1b30017eb54c1.mockapi.io/products')
      .then(response => response.json())
      .then(data => {
        // Pilih beberapa produk untuk best seller (misalnya, produk pertama sebagai best seller)
        const selectedBestSellers = data.slice(0, 4); // Ambil 4 produk pertama
        setBestSellers(selectedBestSellers);
        setLoadingBestSellers(false);
      })
      .catch(error => {
        console.error('Error fetching best sellers:', error);
        setLoadingBestSellers(false);
      });
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Product Catalog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link onClick={() => setShowProductList(true)}>List Product</Nav.Link>
              <Nav.Link href="/product">Product Detail</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showProductList ? (
        <ProductList />
      ) : (
        <>
          {/* Background Section */}
          <div style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGZvb2R8ZW58MHx8fHwxNjg4MzUzOTgw&ixlib=rb-4.0.3&q=80&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 56px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: '800px' }}>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Welcome to Product Catalog App</h1>
              <p style={{ fontSize: '1.5rem' }}>Explore our collection of delicious food products</p>
              <Button className="btn btn-primary btn-lg mt-4" onClick={() => setShowProductList(true)}>Browse Products</Button>
            </div>
          </div>

          {/* Best Seller Section */}
          <div className="best-sellers-section py-5">
            <Container>
              <h2 className="text-center mb-4">Bestseller Products</h2>
              {loadingBestSellers ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Row>
                  {bestSellers.map(product => (
                    <Col key={product.id} md={3} className="mb-4">
                      <Card className="h-100 best-seller-card">
                        <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                        <Card.Body>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text>
                            {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
                          </Card.Text>
                          <Card.Text>
                            <strong>${product.price}</strong>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </div>

          {/* Footer Section */}
          <footer style={{ backgroundColor: '#343a40', color: '#fff', padding: '20px 0' }}>
            <Container>
              <Row>
                <Col md={4}>
                  <h5>About Us</h5>
                  <p>We provide a wide range of delicious food products to satisfy your taste buds. Discover and enjoy our offerings!</p>
                </Col>
                <Col md={4}>
                  <h5>Links</h5>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                    <li><a href="#!" style={{ color: '#fff', textDecoration: 'none' }}>List Product</a></li>
                    <li><a href="#!" style={{ color: '#fff', textDecoration: 'none' }}>Product Detail</a></li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5>Contact Us</h5>
                  <p>Email: contact@productcatalog.com</p>
                  <p>Phone: +123 456 7890</p>
                  <p>Address: 123 Food Street, Flavor Town</p>
                </Col>
              </Row>
              <hr style={{ borderColor: '#495057' }} />
              <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Product Catalog App. All rights reserved.</p>
              </div>
            </Container>
          </footer>
        </>
      )}
    </>
  );
};

export default HomePage;
