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
  // State for the shopping cart
  const [cart, setCart] = useState([]);
  // State for the products, loading status, and errors
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchProducts = () => {
      setLoading(true);
      setError(null);
      // Simulate a 1-second network delay
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
  }, []); // The empty array [] means this effect runs only once

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If it exists, update the quantity
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // If it's a new product, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
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
