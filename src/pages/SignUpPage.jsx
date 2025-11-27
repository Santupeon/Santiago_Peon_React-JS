import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333; 
  text-align: center; 

  h2 {
    text-align: center; 
    margin-bottom: 1.5rem;
  }

  p {
    text-align: center;
    margin-top: 1rem;
  }

  label {
    margin-right: 0.5rem;
  }
`;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {
      await signup(name, password);
      navigate('/products'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta - Tienda VR</title>
      </Helmet>
      <FormWrapper>
        <h2>Crear Cuenta</h2>
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
          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </FormWrapper>
    </>
  );
};

export default SignUpPage;