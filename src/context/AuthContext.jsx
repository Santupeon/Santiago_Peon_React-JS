import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'https://6924cff882b59600d7217107.mockapi.io';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    // Simulate an auth check or token refresh if needed
    setTimeout(() => {
      setAuthLoading(false);
    }, 200);
  }, []);

  const isLoggedIn = !!user;
  const isAdmin = !!user?.admin;

  const login = async (name, password) => {
    const response = await fetch(`${API_URL}/users?search=${name}`);
    const users = await response.json();
    const foundUser = users[0];

    if (foundUser && foundUser.password === password) {
      const userData = { id: foundUser.id, name: foundUser.name, admin: foundUser.admin };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    throw new Error('Nombre de usuario o contraseña incorrectos');
  };

  const signup = async (name, password) => {
    const checkResponse = await fetch(`${API_URL}/users`);
    const allUsers = await checkResponse.json();

    const userExists = allUsers.some(user => user.name === name);

    if (userExists) {
      throw new Error('El nombre de usuario ya está en uso.');
    }

    const newUser = {
      name,
      password,
      admin: false,
    };

    const createResponse = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!createResponse.ok) {
      throw new Error('No se pudo crear la cuenta.');
    }

    await login(name, password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, isLoggedIn, isAdmin, login, signup, logout, authLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};