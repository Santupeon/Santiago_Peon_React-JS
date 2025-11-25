import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx'; 

function ProductList({ products }) {
  return (
    <Row>
      {products.map((product) => (
        // Definimos las columnas para diferentes tamaños de pantalla:
        // - xs={12}: 1 columna en pantallas extra pequeñas (móviles)
        // - sm={12}: 1 columna en pantallas pequeñas
        // - md={6}: 2 columnas en pantallas medianas
        // - lg={4}: 3 columnas en pantallas grandes y extra grandes
        <Col xs={12} sm={12} md={6} lg={4} key={product.id} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;