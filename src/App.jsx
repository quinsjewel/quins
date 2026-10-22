import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CheckoutModal } from './components/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StoreService } from './services/store';

// Inner component to handle header/footer visibility based on route
function AppLayout({ 
  products, 
  categories, 
  onPayNow, 
  selectedProductForCheckout, 
  onCloseCheckout,
  searchQuery,
  onSearchChange,
  onResetFilters
}) {
  const location = useLocation();
  const isAdminRoute = 
    location.pathname.startsWith('/queens-secret-admin') || 
    location.pathname.startsWith('/admin-portal');

  return (
    <div className="min-h-screen flex flex-col bg-[#04130d] text-white">
      {/* Scroll Reset on route transition */}
      <ScrollToTop />

      {/* Public Header (Hidden strictly on secret admin route) */}
      {!isAdminRoute && (
        <Header 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      )}

      {/* Main Multi-Page Route Outlet */}
      <div className="flex-1">
        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <HomePage 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          {/* Dedicated Category Routes */}
          <Route 
            path="/bridal" 
            element={
              <CategoryPage 
                categoryKey="Bridal Collection" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          <Route 
            path="/anti-tarnish" 
            element={
              <CategoryPage 
                categoryKey="Anti-Tarnish" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          <Route 
            path="/temple-jewellery" 
            element={
              <CategoryPage 
                categoryKey="Temple Jewellery" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          <Route 
            path="/traditional" 
            element={
              <CategoryPage 
                categoryKey="Traditional Jewels" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          <Route 
            path="/bangles" 
            element={
              <CategoryPage 
                categoryKey="Bangles" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          <Route 
            path="/earrings" 
            element={
              <CategoryPage 
                categoryKey="Earrings" 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          {/* Dynamic Category Route (Handles custom categories created in Admin Panel) */}
          <Route 
            path="/category/:slug" 
            element={
              <CategoryPage 
                products={products} 
                categories={categories} 
                onPayNow={onPayNow}
                searchQuery={searchQuery}
                onResetFilters={onResetFilters}
              />
            } 
          />

          {/* Independent Product Details Page Route */}
          <Route 
            path="/product/:productId" 
            element={
              <ProductDetailsPage 
                products={products} 
                onPayNow={onPayNow} 
              />
            } 
          />

          {/* Hidden Admin Routes */}
          <Route 
            path="/queens-secret-admin" 
            element={<AdminPage />} 
          />
          <Route 
            path="/admin-portal" 
            element={<AdminPage />} 
          />

          {/* 404 Royal Not Found */}
          <Route 
            path="*" 
            element={<NotFoundPage />} 
          />
        </Routes>
      </div>

      {/* Public Footer (Strictly hidden on admin route) */}
      {!isAdminRoute && (
        <Footer categories={categories} />
      )}

      {/* Global Indian Payment Gateway & UPI Checkout Modal */}
      {selectedProductForCheckout && (
        <CheckoutModal
          product={selectedProductForCheckout}
          onClose={onCloseCheckout}
        />
      )}
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(StoreService.getProducts());
  const [categories, setCategories] = useState(StoreService.getCategories());
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time synchronization when Admin updates data
  useEffect(() => {
    const handleStoreUpdate = () => {
      setProducts(StoreService.getProducts());
      setCategories(StoreService.getCategories());
    };
    window.addEventListener('quins_store_updated', handleStoreUpdate);
    return () => window.removeEventListener('quins_store_updated', handleStoreUpdate);
  }, []);

  return (
    <BrowserRouter>
      <AppLayout
        products={products}
        categories={categories}
        onPayNow={(product) => setSelectedProductForCheckout(product)}
        selectedProductForCheckout={selectedProductForCheckout}
        onCloseCheckout={() => setSelectedProductForCheckout(null)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetFilters={() => setSearchQuery('')}
      />
    </BrowserRouter>
  );
}
