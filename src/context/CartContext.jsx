import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === productToAdd.id);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        return [...currentCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = { cart, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};