
import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import type { Product } from '../types';
import { IPHONE_PRODUCTS } from '../constants';

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onProductSelect, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from a service
    setTimeout(() => {
      setProducts(IPHONE_PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading iPhone Catalog...</p>
      </div>
    );
  }

  if (filteredProducts.length === 0 && !loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">No Results Found</h2>
        <p className="mt-2 text-gray-600">We couldn't find any products matching your search for "{searchQuery}".</p>
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Wholesale iPhones</h1>
      <p className="text-gray-600 mb-6">Bulk pricing available for all models. Click on a product for more details.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
        ))}
      </div>
    </div>
  );
};
