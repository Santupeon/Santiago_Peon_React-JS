import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const EmptyCartWrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const CheckoutPage = () => {
  // Obtenemos todo lo que necesitamos de nuestro CartContext
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculamos el total del carrito
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Si el carrito está vacío, mostramos un mensaje amigable
  if (cart.length === 0) {
    return (
      <EmptyCartWrapper>
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has agregado productos.</p>
        <Link to="/products" className="btn-add-cart" style={{ textDecoration: 'none', display: 'inline-block', background: 'var(--primary-color)' }}>
          Explorar Productos
        </Link>
      </EmptyCartWrapper>
    );
  }

  // Si hay productos, mostramos la lista
  return (
    <div className="cart-container">
      <h2>Resumen de tu Compra</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>
            {item.name} (x{item.quantity})
          </span>
          <span>{formatPrice(item.price * item.quantity)}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="remove-item-btn"
          >
            &times;
          </button>
        </div>
      ))}
      <strong className="cart-total">Total: {formatPrice(cartTotal)}</strong>
      <button onClick={clearCart} className="btn-action" style={{ width: '100%', marginTop: '1rem' }}>Vaciar Carrito</button>
    </div>
  );
};

export default CheckoutPage;