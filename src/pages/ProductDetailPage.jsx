import React from 'react';
import { useParams, Link } from 'react-router-dom';


const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

function ProductDetailPage({ products, onAddToCart }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div>
        <h2>Producto no encontrado</h2>
        <Link to="/products">Volver a Productos</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ maxWidth: '400px' }} />
      <p className="price">{formatPrice(product.price)}</p>
      <div className="product-features">
        <h3>Características:</h3>
        <ul>
          {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
      </div>
      <button onClick={() => onAddToCart(product)} className="btn-add-cart">Añadir al carrito</button>
      <Link to="/products">Volver a Productos</Link>
    </div>
  );
}

export default ProductDetailPage;