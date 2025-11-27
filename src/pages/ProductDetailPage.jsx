import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductContext';


const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

function ProductDetailPage() {
  const { productId } = useParams();
  const { products, loading } = useProducts();

  // Calculamos el producto en cada renderizado
  const product = !loading ? products.find(p => p.id === productId) : null;

  if (loading) {
    return (
      <p>Cargando producto...</p>
    );
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Producto no encontrado - Tienda VR</title>
        </Helmet>
        <div>
          <h2>Producto no encontrado</h2>
          <Link to="/products">Volver a Productos</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Tienda VR`}</title>
      </Helmet>
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p className="price">{formatPrice(product.price)}</p>
        <div className="product-features">
          <h3>Características:</h3>
          <ul>
            {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
        </div>
        <Link to="/products">Volver a Productos</Link>
      </div>
    </>
  );
}

export default ProductDetailPage;