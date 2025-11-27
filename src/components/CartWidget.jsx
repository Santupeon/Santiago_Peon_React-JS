import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/checkout" className="cart-widget">
      <>
        <FaShoppingCart /> {totalItems > 0 && <span>({totalItems})</span>}
      </>
    </Link>
  );
};

export default CartWidget;