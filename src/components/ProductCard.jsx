import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from '../utils/formatters'; 
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';

// 1. Creamos nuestros componentes de estilo
const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain; /* Cambiamos de 'cover' a 'contain' */
  background-color: #f8f9fa; /* Añadimos un fondo claro para que no se vea vacío */
  padding: 0.5rem; /* Un poco de espacio interior */
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Hace que el cuerpo de la tarjeta ocupe el espacio disponible */
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #212529; /* Un negro suave, mucho más legible */
  margin-bottom: 0.5rem;
  text-shadow: none; /* Eliminamos cualquier sombra de texto heredada */

  /* --- Estilos para truncar el texto y mantener la altura --- */
  
  /* Establecemos una altura mínima para el título (aprox. 2 líneas) */
  min-height: 3em; 
  
  /* Propiedades para cortar el texto después de 2 líneas y añadir "..." */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
`;

const CardPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40; /* Un gris oscuro profesional en lugar del rosa */
  margin-bottom: 1rem;
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const AddToCartButton = styled.button`
  /* Aseguramos que el botón sea clickable aunque esté dentro del enlace */
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  background-color: #888888;
  border: 2px solid #000000;
  cursor: pointer;
  transition: background-color 0.25s;
  color: var(--text-color-dark);

  &:hover {
    background-color: var(--primary-color);
  }
`;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const { deleteProduct } = useProducts(); // Obtenemos la función para eliminar

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <CardWrapper>
        <CardImage src={product.image} alt={product.name} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardPrice>{formatPrice(product.price)}</CardPrice>
          <AddToCartButton onClick={(e) => { e.preventDefault(); addToCart(product); }}>Añadir al carrito</AddToCartButton>
          {/* Re-introducimos los botones de administrador */}
          {isAdmin && (
            <AdminActions>
              <Link to={`/admin/edit-product/${product.id}`} onClick={(e) => e.stopPropagation()}>
                <button>Editar</button>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevenimos la navegación
                  e.stopPropagation(); // Detenemos la propagación del clic
                  if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
                    deleteProduct(product.id);
                  }
                }}
                style={{ backgroundColor: '#9b0303', color: 'white' }}
              >
                Eliminar
              </button>
            </AdminActions>
          )}
        </CardBody>
      </CardWrapper>
    </Link>
  );
}

export default ProductCard;