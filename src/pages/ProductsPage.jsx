import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage = ({ products, onAddToCart }) => {
  return (
    <>
      <h2>Nuestros Productos</h2>
      <ProductList products={products} onAddToCart={onAddToCart} />
    </>
  );
};

export default ProductsPage;