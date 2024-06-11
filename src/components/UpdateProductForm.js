import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

function UpdateProductForm({ show, handleClose, onSave, product }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, name, description, price: parseFloat(price), image };
    onSave(updatedProduct);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="formProductName">
            <FormLabel>Name</FormLabel>
            <FormControl type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormGroup>
          <FormGroup controlId="formProductDescription">
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" rows={3} placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </FormGroup>
          <FormGroup controlId="formProductPrice">
            <FormLabel>Price</FormLabel>
            <FormControl type="number" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </FormGroup>
          <FormGroup controlId="formProductImage">
            <FormLabel>Image URL</FormLabel>
            <FormControl type="text" placeholder="Enter product image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
          </FormGroup>
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateProductForm;
