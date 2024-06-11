// src/components/UpdateProduct.js

import React, { useState } from 'react';

const UpdateProduct = ({ product, onUpdate }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      title,
      description,
      price,
      image
    };
    onUpdate(updatedProduct);
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
