import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage'; // 1. Importar la nueva página
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from './context/AuthContext';
import { useProducts } from './context/ProductContext';
import CartWidget from './components/CartWidget';

function App() {
  // El nuevo AuthContext nos da más información
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  // Los productos, el estado de carga y los errores ahora vienen del ProductContext
  const { products, loading, error } = useProducts();
  
  return (
    <>
      <header>
        <h1>Tienda VR</h1>
        <nav>
          <Link to="/products">Productos</Link>
          {isAdmin && <Link to="/admin/add-product">Añadir Producto</Link>}
          {isLoggedIn && <Link to="/checkout">Checkout</Link>}
        </nav>
        <div className="auth-section">
          {isLoggedIn ? (
            <>
              <span>Hola, {user.name}</span>
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
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route 
            path="/products" 
            element={
              loading ? <p>Loading products...</p> : 
              error ? <p style={{ color: 'red' }}>{error}</p> :
              <ProductsPage products={products} />
            } 
          />
          <Route 
            path="/products/:productId"
            element={
              <ProductDetailPage products={products} />
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                {isAdmin ? <AddProductPage /> : <Navigate to="/products" />}
              </ProtectedRoute>
            }
          />
          {/* 2. Añadir la nueva ruta de edición */}
          <Route
            path="/admin/edit-product/:productId"
            element={
              <ProtectedRoute>
                {isAdmin ? <EditProductPage /> : <Navigate to="/products" />}
              </ProtectedRoute>
            }
          />
          {/* Si un usuario logueado intenta ir a /login o /signup, lo redirigimos al inicio */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/products" replace /> : <LoginPage />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/products" replace /> : <SignUpPage />} />
          {/* Ruta para cualquier otra URL no encontrada */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/products" : "/login"} replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
