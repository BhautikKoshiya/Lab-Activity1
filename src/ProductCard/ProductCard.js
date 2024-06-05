import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(product);

  

  const handleDelete = async () => {
    try {
      await axios.post('https://q8666rv2t0.execute-api.us-east-1.amazonaws.com/prod/deleteProduct', 
        { id: product.id }, 
        { headers: { 'Content-Type': 'application/json' } }
      ); 
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://q8666rv2t0.execute-api.us-east-1.amazonaws.com/prod/updateProduct/${product.id}`, formData);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Manufacturer: {product.manufacturer}</p>
        <p>Offer: {product.offer}</p>
        <button onClick={() => setIsModalOpen(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
          <input type="text" name="offer" value={formData.offer} onChange={handleChange} required />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </div>
  );
}

export default ProductCard;
