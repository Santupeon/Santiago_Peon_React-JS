import React from 'react';
import { useParams, Link } from 'react-router-dom';


const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

function ProductDetailPage({ products }) {
  const { productId } = useParams();
  // Comparamos string con string. 
  // El `productId` de la URL es un string, y el `p.id` de la API también es un string.
  const product = products.find(p => p.id === productId);

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
      {/* El botón de añadir al carrito ya no necesita onAddToCart, lo obtiene del contexto */}
      <Link to="/products">Volver a Productos</Link>
    </div>
  );
}

export default ProductDetailPage;