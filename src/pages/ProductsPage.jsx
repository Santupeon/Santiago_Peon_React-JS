import React from 'react';
import { Container } from 'react-bootstrap';
import ProductList from '../components/ProductList';

const ProductsPage = ({ products }) => {
  return (
    <Container className="my-4">
      <h2>Nuestros Productos</h2>
      <ProductList products={products} />
    </Container>
  );
};

export default ProductsPage;