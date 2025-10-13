import React from 'react';
import ProductCard from './ProductCard.jsx'; 

function ProductList({ products, onAddToCart }) {
  return (
    <div className="container-items">
      {products.map((product) => (

        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;