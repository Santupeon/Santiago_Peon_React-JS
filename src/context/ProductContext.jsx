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
      const transformedData = data.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0,
        features: product.features || []
      }));
      setProducts(transformedData);
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
        features: newProduct.features, // Se envía el array directamente
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
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto en la API');
      }

      // Actualizamos el estado local para reflejar el cambio inmediatamente
      setProducts(currentProducts => 
        currentProducts.filter(p => p.id !== productId)
      );
    } catch (error) {
      console.error("Error en deleteProduct:", error);
      throw error;
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const productToSend = {
        ...updatedData,
        price: updatedData.price.toString(),
      };

      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSend),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto en la API');
      }

      // Volvemos a cargar todos los productos para tener la lista actualizada
      await fetchProducts();
    } catch (error) {
      console.error("Error en updateProduct:", error);
      throw error;
    }
  };

  const value = { products, loading, error, addProduct, deleteProduct, updateProduct };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};