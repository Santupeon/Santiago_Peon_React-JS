import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Cart from './components/Cart'
import { products as mockProducts } from './data/products.js'; // Import mock data
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';

function App() {

  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          setProducts(mockProducts);
        } catch (err) {
          setError('Failed to load products.');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchProducts();
  }, []); 


  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };


  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <>
      <header>
        <Link to="/"><h1>Tienda</h1></Link>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>
        <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/products" 
            element={
              loading ? <p>Loading products...</p> : 
              error ? <p style={{ color: 'red' }}>{error}</p> :
              <ProductsPage products={products} onAddToCart={handleAddToCart} />
            } 
          />
          <Route 
            path="/products/:productId"
            element={
              <ProductDetailPage products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
