import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
