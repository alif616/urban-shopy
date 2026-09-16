import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/common/Toaster';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCurrentUser } from './store/slices/authSlice';
import { fetchCart } from './store/slices/cartSlice';
import { fetchWishlist } from './store/slices/wishlistSlice';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) dispatch(fetchCurrentUser());
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-confirmation/:id" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
