
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { CartProvider } from './context/CartContext';
import { GeminiAssistant } from './components/GeminiAssistant';
import type { Product, CartItem } from './types';
import { useCart } from './hooks/useCart';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CheckoutPage } from './components/CheckoutPage';
import { AuthPage } from './components/AuthPage';

type View = 'listing' | 'detail' | 'checkout' | 'confirmation' | 'auth';

const AppContent: React.FC = () => {
  const [view, setView] = useState<View>('listing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{ items: CartItem[], total: number } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, totalPrice, clearCart } = useCart();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    setSearchQuery(''); // Clear search when a product is selected
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setView('listing');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setView('checkout');
  };

  const handlePlaceOrder = () => {
    setConfirmedOrder({ items: [...cartItems], total: totalPrice });
    clearCart();
    setSelectedProduct(null);
    setView('confirmation');
  };

  const handleContinueShopping = () => {
    setConfirmedOrder(null);
    setView('listing');
  };

  const handleGoToAuth = () => {
    setView('auth');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('listing');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // User is already on the listing page or another main page, so no need to change view.
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const renderView = () => {
    switch(view) {
      case 'detail':
        return <ProductDetail product={selectedProduct!} onBack={handleBackToList} />
      case 'checkout':
        return <CheckoutPage onPlaceOrder={handlePlaceOrder} onBack={() => setView('listing')} />
      case 'confirmation':
        return <OrderConfirmation order={confirmedOrder!} onContinueShopping={handleContinueShopping} />
      case 'auth':
        return <AuthPage onLoginSuccess={handleLoginSuccess} onBack={() => setView('listing')} />;
      case 'listing':
      default:
        return <ProductGrid onProductSelect={handleProductSelect} searchQuery={searchQuery} />
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header 
        onCheckout={handleCheckout} 
        isAuthenticated={isAuthenticated}
        onGoToAuth={handleGoToAuth}
        onSignOut={handleSignOut}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onProductSelect={handleProductSelect}
      />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
