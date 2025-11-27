import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css'
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from './context/AuthContext';
import { useProducts } from './context/ProductContext';
import CartWidget from './components/CartWidget';

function App() {
  const { isLoggedIn, isAdmin, logout, authLoading } = useAuth();
  
  if (authLoading) {
    return <div>Loading Authentication...</div>;
  }

  return (
    <>
      <header>
        <nav>
          {isLoggedIn && <Link to="/products">Productos</Link>}
          {isAdmin && <Link to="/admin/add-product">Añadir Producto</Link>}
          {isLoggedIn && <Link to="/checkout">Checkout</Link>}
        </nav>
        <div className="auth-section">
          {isLoggedIn ? (
            <>
                <button onClick={logout} className="btn-action">Cerrar Sesión</button>
              <CartWidget />
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/signup">Registrarse</Link>
            </>
          )}
        </div>
      </header>
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          {/* If logged in, redirect from /login to /products. Otherwise, show LoginPage. */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/products" replace /> : <LoginPage />} 
          />
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/products" replace /> : <SignUpPage />} 
          />

          {/* Protected Routes */}
          <Route 
            path="/products" 
            element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/products/:productId"
            element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>}
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                {isAdmin ? <AddProductPage /> : <Navigate to="/products" />}
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/edit-product/:productId" 
            element={
              <ProtectedRoute>
                {isAdmin ? <EditProductPage /> : <Navigate to="/products" />}
              </ProtectedRoute>
            } 
          />

          {/* Catch-all and Root Redirects */}
          {/* Redirect to /products if logged in, otherwise to /login */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/products" : "/login"} replace />} />
        </Routes>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  )
}

export default App
