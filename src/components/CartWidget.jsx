import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el hook para usar el contexto del carrito

const CartWidget = () => {
  const { cart } = useCart(); // Obtenemos el estado del carrito

  // Calculamos la cantidad total de ítems en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-widget">
      🛒 {totalItems > 0 && <span>({totalItems})</span>}
    </div>
  );
};

export default CartWidget;