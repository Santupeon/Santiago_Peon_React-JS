import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'https://6924cff882b59600d7217107.mockapi.io';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Falló la carga de productos desde la API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const productToSend = {
        ...newProduct,
        price: newProduct.price.toString(),
        features: newProduct.features,
      };

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSend),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto en la API');
      }

      await fetchProducts();
    } catch (error) {
      console.error("Error en addProduct:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el producto');
    setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
  };

  const updateProduct = async (productId, updatedData) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Error al actualizar el producto');
    await fetchProducts();
  };

  const value = { products, loading, error, addProduct, deleteProduct, updateProduct };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};