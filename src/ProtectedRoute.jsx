import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If not logged in, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If logged in, render the component that was passed as children
  return children;
};

export default ProtectedRoute;