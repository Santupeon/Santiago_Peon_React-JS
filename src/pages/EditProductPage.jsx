import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProducts } from '../context/ProductContext';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa; /* Un gris claro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333; /* Texto oscuro para el contenido de la caja */
  text-align: center;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  label {
    margin-right: 0.5rem;
  }

  div {
    margin-bottom: 1rem;
  }
`;

const EditProductPage = () => {
  const { products, updateProduct } = useProducts();
  const { productId } = useParams(); // Obtenemos el ID del producto de la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    features: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Este useEffect se encarga de encontrar el producto y llenar el formulario
  useEffect(() => {
    const productToEdit = products.find(p => p.id === productId);
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price.toString(),
        image: productToEdit.image,
        features: productToEdit.features.join(', '), // Convertimos el array a un string para el textarea
      });
      setLoading(false);
    } else if (products.length > 0) {
      // Si los productos ya cargaron pero no encontramos este, redirigimos
      navigate('/products');
    }
  }, [products, productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio debe ser un número mayor a 0.';
    if (!formData.features) newErrors.features = 'Añade al menos una característica.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      image: formData.image || 'https://via.placeholder.com/300',
      features: formData.features.split(',').map(feature => feature.trim()),
    };

    try {
      await updateProduct(productId, updatedProduct);
      alert('¡Producto actualizado con éxito!');
      navigate('/products');
    } catch (error) {
      alert('Error al actualizar el producto. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <FormWrapper>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        </div>
        <div>
          <label>URL de la Imagen:</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <div>
          <label>Características (separadas por comas):</label>
          <textarea name="features" value={formData.features} onChange={handleChange} rows="10"></textarea>
          {errors.features && <p style={{ color: 'red' }}>{errors.features}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </FormWrapper>
  );
};

export default EditProductPage;