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

const AdminInfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  color: #495057;
  text-align: left;

  h4 {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
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
      navigate('/products'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        {console.log("Helmet running: Login")}
        <title>Iniciar Sesión - Tienda VR</title>
      </Helmet>
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
      <AdminInfoBox>
        <h4>Derechos de Administrador</h4>
        <p><strong>Usuario:</strong> admin</p>
        <p><strong>Contraseña:</strong> 1234</p>
      </AdminInfoBox>
        <p>
          ¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link>
        </p>
      </FormWrapper>
    </>
  );
};

export default LoginPage;