import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
overlay: {
  backgroundColor: 'rgba(0, 0, 0, 1)' // Reduced opacity
},
content: {
  width: 50%,
  position: 'absolute',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  width: '250px', // Reduced width further
  padding: '20px', // Adjusted padding for better spacing
  borderRadius: '12px', // Slightly rounded corners for a softer look
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: 'none',
  overflow: 'auto',
}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  button {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

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
      await axios.put(`https://q8666rv2t0.execute-api.us-east-1.amazonaws.com/prod/updateProduct`, formData);
      setIsModalOpen(false);
      window.location.reload();
      
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
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

      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
      >
        <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
        <Form onSubmit={handleUpdate}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
          <input type="text" name="offer" value={formData.offer} onChange={handleChange} required />
          <button type="submit">Update</button>
        </Form>
      </StyledModal>
    </div>
  );
}

export default ProductCard;
