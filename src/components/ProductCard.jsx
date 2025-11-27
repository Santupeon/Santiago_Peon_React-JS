import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify'; 
import { FaEdit, FaTrash, FaCartPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';


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
  padding: 0.5rem;
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
  text-shadow: none;
  min-height: 3em;
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
  button {
    flex: 1;
  }
`;

const AddToCartButton = styled.button`
  /* Aseguramos que el botón sea clickable aunque esté dentro del enlace */
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  const { deleteProduct } = useProducts(); 
  const navigate = useNavigate();
  
  const ConfirmToast = ({ closeToast, productId, productName }) => (
    <div>
      <p>¿Estás seguro de que quieres eliminar "{productName}"?</p>
      <button
        onClick={() => {
          toast.promise(
            deleteProduct(productId),
            {
              pending: `Eliminando "${productName}"...`,
              success: `¡"${productName}" eliminado con éxito!`,
              error: `Error al eliminar "${productName}".`
            }
          );
          closeToast();
        }}
        style={{ marginRight: '10px' }}
      >
        Sí, eliminar
      </button>
      <button onClick={closeToast}>
        No
      </button>
    </div>
  );

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <CardWrapper>
        <CardImage src={product.image} alt={product.name} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardPrice>{formatPrice(product.price)}</CardPrice>
          <AddToCartButton onClick={(e) => { e.preventDefault(); addToCart(product); }}>
            <FaCartPlus /> Añadir al carrito
          </AddToCartButton>
          {isAdmin && (
            <AdminActions>
              <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/admin/edit-product/${product.id}`);
              }}>
                <FaEdit /> Editar
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  toast(
                    ({ closeToast }) => (
                      <ConfirmToast
                        closeToast={closeToast}
                        productId={product.id}
                        productName={product.name}
                      />
                    ),
                    { autoClose: false, closeOnClick: false } 
                  );
                }}
                style={{ backgroundColor: '#9b0303', color: 'white' }}
              >
                <FaTrash /> Eliminar
              </button>
            </AdminActions>
          )}
        </CardBody>
      </CardWrapper>
    </Link>
  );
}

export default ProductCard;