import React, { createContext, useState, useContext } from 'react';

/**
 * 1. Creación del Contexto
 * Este es el objeto que los componentes usarán para consumir el estado del carrito.
 */
const CartContext = createContext();

/**
 * Hook personalizado para usar el contexto del carrito más fácilmente.
 * En lugar de importar useContext y CartContext en cada componente,
 * solo importaremos useCart().
 */
export const useCart = () => {
  return useContext(CartContext);
};

/**
 * 2. Creación del Proveedor (Provider)
 * Este componente envolverá a toda nuestra aplicación (o a las partes que necesiten
 * acceso al carrito) y les proveerá el estado y las funciones.
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (productToAdd) => {
    setCart((currentCart) => {
      // Revisa si el producto ya está en el carrito
      const existingProduct = currentCart.find((item) => item.id === productToAdd.id);

      if (existingProduct) {
        // Si ya existe, mapea el carrito y aumenta la cantidad del producto existente
        return currentCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: (item.quantity || 1) + 1 } // Si no tiene quantity, asume 1
            : item
        );
      } else {
        // Si es un producto nuevo, lo agrega al carrito con cantidad 1
        return [...currentCart, { ...productToAdd, quantity: 1 }];
      }
    });
    console.log(`${productToAdd.name} fue añadido al carrito.`);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  // El valor que proveeremos a los componentes hijos
  const value = { cart, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};