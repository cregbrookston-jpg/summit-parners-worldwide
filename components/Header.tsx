
import React, { useState, useEffect, useRef } from 'react';
import { Cart } from './Cart';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types';
import { IPHONE_PRODUCTS } from '../constants';

interface HeaderProps {
  onCheckout: () => void;
  isAuthenticated: boolean;
  onGoToAuth: () => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProductSelect: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCheckout, 
  isAuthenticated, 
  onGoToAuth, 
  onSignOut,
  searchQuery,
  onSearchChange,
  onProductSelect
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = IPHONE_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      onSignOut();
    } else {
      onGoToAuth();
    }
  };

  return (
    <>
      <header className="bg-[#131921] text-white shadow-md sticky top-0 z-40">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                <span className="text-2xl font-bold">iWholesale</span>
              </a>
            </div>

            <div ref={searchContainerRef} className="hidden md:flex flex-grow max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="Search for iPhone models..."
                  className="w-full h-10 pl-4 pr-10 text-sm bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  autoComplete="off"
                />
                <button className="absolute top-0 right-0 h-10 px-3 bg-orange-400 hover:bg-orange-500 text-white rounded-r-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                </button>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full mt-1 w-full bg-white text-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {suggestions.map(product => (
                      <li key={product.id}>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                          onClick={() => {
                            onProductSelect(product);
                            setShowSuggestions(false);
                          }}
                        >
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-contain" />
                          <span>{product.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={handleAuthAction} className="hidden sm:block hover:text-orange-400 transition-colors text-left">
                {isAuthenticated ? (
                  <>
                    <div>Hello, User</div>
                    <div className="font-bold">Sign Out</div>
                  </>
                ) : (
                  <>
                    <div>Hello, Sign in</div>
                    <div className="font-bold">Account & Lists</div>
                  </>
                )}
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative flex items-center hover:text-orange-400 transition-colors p-2">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
                <span className="hidden lg:inline ml-2 font-bold">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={onCheckout} />
    </>
  );
};
