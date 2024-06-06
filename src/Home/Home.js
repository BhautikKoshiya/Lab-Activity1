import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Home() {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    manufacturer: '',
    offer: '',
    image: '',
  });
  const navigate =  useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://q8666rv2t0.execute-api.us-east-1.amazonaws.com/prod/createProduct', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate("/products");
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const onClickProduct = async (e) => {
    // window.location.href = '/products';
    navigate("/products")
  };  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <Button variant="primary" type="submit" className="w-100" onClick={onClickProduct}>
                  Click here to Check All Product
        </Button>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Add New Product</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter product description"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter product price"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQuantity" className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter product quantity"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formManufacturer" className="mb-3">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    name="manufacturer"
                    placeholder="Enter product manufacturer"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formOffer" className="mb-3">
                  <Form.Label>Offer</Form.Label>
                  <Form.Control
                    type="text"
                    name="offer"
                    placeholder="Enter product offer"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleFileChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
