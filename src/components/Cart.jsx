import React from 'react';
import { formatPrice } from '../utils/formatters';

function Cart({ cartItems, onRemoveFromCart }) {

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            
            <div key={item.id} className="cart-item">
              <span>{item.quantity}x {item.name}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
              <button onClick={() => onRemoveFromCart(item.id)} className="remove-item-btn">
                &times;
              </button>
            </div>
          ))}
          <hr />
          <strong className="cart-total">Total: {formatPrice(total)}</strong>
        </>
      )}
    </div>
  );
}

export default Cart;