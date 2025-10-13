import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';


function ProductCard({ product, onAddToCart }) {

  return (
    <div className="item">
      <Link to={`/products/${product.id}`}>
        <figure>
          <img src={product.image} alt={product.name} />
        </figure>
      </Link>
      <div className="info-product">
        <Link to={`/products/${product.id}`}><h2>{product.name}</h2></Link>
        <p className="price">{formatPrice(product.price)}</p>        
        {/* agregar lista de caracteristicas despues*/}
        <button
          className="btn-add-cart"
          onClick={() => onAddToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;