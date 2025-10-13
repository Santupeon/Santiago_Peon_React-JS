import React from 'react';
import ProductCard from './ProductCard.jsx'; // Import the single card component

function ProductList({ products, onAddToCart }) {
  return (
    <div className="container-items">
      {products.map((product) => (
        // For each product in our data, render a ProductCard component
        // We pass the entire product object as a prop
        // The `key` is crucial for React to efficiently update the list
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;