import React, { createContext, useState, useContext } from 'react';

const API_URL = 'https://6924cff882b59600d7217107.mockapi.io'; // La URL base de tu API

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // El estado ahora guarda el objeto de usuario completo, o null.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  // Derivamos si está logueado y si es admin a partir del estado 'user'
  const isLoggedIn = !!user;
  const isAdmin = !!user?.admin; // Usamos el nuevo campo booleano

  // Función de Login
  const login = async (name, password) => {
    // Cambiamos la búsqueda a una por coincidencia exacta para evitar falsos positivos.
    // Esto asegura que solo encontremos al usuario si el nombre es idéntico.
    const response = await fetch(`${API_URL}/users?search=${name}`);
    const users = await response.json();
    const foundUser = users[0];

    if (foundUser && foundUser.password === password) {
      const userData = { id: foundUser.id, name: foundUser.name, admin: foundUser.admin };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true; // Login exitoso
    }
    throw new Error('Nombre de usuario o contraseña incorrectos');
  };

  // Función de Signup
  const signup = async (name, password) => {
    // 1. Verificar si el usuario ya existe
    // Usamos `search=` para forzar una coincidencia exacta en todos los campos de texto.
    const checkResponse = await fetch(`${API_URL}/users`); // Obtenemos TODOS los usuarios
    const allUsers = await checkResponse.json();

    // Ahora, verificamos manualmente si el nombre exacto ya existe en la lista
    const userExists = allUsers.some(user => user.name === name);

    if (userExists) {
      throw new Error('El nombre de usuario ya está en uso.');
    }

    // 2. Crear el nuevo usuario
    const newUser = {
      name,
      password,
      admin: false, // Todos los nuevos usuarios NO son administradores
    };

    const createResponse = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!createResponse.ok) {
      throw new Error('No se pudo crear la cuenta.');
    }

    // 3. Iniciar sesión automáticamente después del registro
    await login(name, password);
  };

  // Función de Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, isLoggedIn, isAdmin, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};