import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa; /* Un gris claro en lugar de blanco puro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333; /* Color de texto oscuro para el contenido de la caja */
  text-align: center; /* Centramos todo el contenido */

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  p {
    text-align: center;
    margin-top: 1rem;
  }

  label {
    /* Añadimos un margen a la derecha de la etiqueta para crear espacio */
    margin-right: 0.5rem; 
  }
`;

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(name, password);
      navigate('/products'); // Redirige a la página de productos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormWrapper>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link>
      </p>
    </FormWrapper>
  );
};

export default LoginPage;