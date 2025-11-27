import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx'; 

function ProductList({ products }) {
  return (
    <Row>
      {products.map((product) => (
        <Col xs={12} sm={12} md={6} lg={4} key={product.id} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;