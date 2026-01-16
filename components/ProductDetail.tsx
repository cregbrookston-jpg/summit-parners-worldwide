
import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onClick, children }) => (
  <div className="border-b">
    <h2>
      <button
        type="button"
        className="flex items-center justify-between w-full py-4 font-semibold text-left text-gray-800"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </h2>
    <div
      className={`grid overflow-hidden transition-all duration-300 ease-in-out text-gray-600 ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className="pb-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);


interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.specs.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.specs.storage[0]);
  const [quantity, setQuantity] = useState(10); // Default wholesale quantity
  const [addedMessage, setAddedMessage] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('display');

  const handleAccordionClick = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(`${quantity} units of ${product.name} added to cart!`);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const getPriceTier = (q: number) => {
    if (q >= 100) return product.price * 0.85;
    if (q >= 50) return product.price * 0.9;
    return product.price;
  }
  
  const currentPricePerUnit = getPriceTier(quantity);
  const totalPrice = currentPricePerUnit * quantity;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button onClick={onBack} className="text-sm text-blue-600 hover:underline mb-4">&larr; Back to all products</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-lg max-h-96" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="my-4">
            <h3 className="font-semibold text-gray-800">Color: <span className="font-normal">{selectedColor}</span></h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.specs.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                    selectedColor === color ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:border-gray-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h3 className="font-semibold text-gray-800">Storage: <span className="font-normal">{selectedStorage}</span></h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.specs.storage.map(storage => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                    selectedStorage === storage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:border-gray-500'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
          
          <div className="my-6">
             <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Specifications</h3>
             <AccordionItem title="Display" isOpen={openAccordion === 'display'} onClick={() => handleAccordionClick('display')}>
                <p>{product.specs.display}</p>
             </AccordionItem>
             <AccordionItem title="Camera" isOpen={openAccordion === 'camera'} onClick={() => handleAccordionClick('camera')}>
                <p>{product.specs.camera}</p>
             </AccordionItem>
             <AccordionItem title="Storage Options" isOpen={openAccordion === 'storage'} onClick={() => handleAccordionClick('storage')}>
                <ul className="list-disc list-inside">
                    {product.specs.storage.map(s => <li key={s}>{s}</li>)}
                </ul>
             </AccordionItem>
          </div>


          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800">Wholesale Pricing</h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>10-49 units: ${product.price.toFixed(2)}/unit</p>
                <p>50-99 units: ${(product.price * 0.9).toFixed(2)}/unit (10% off)</p>
                <p>100+ units: ${(product.price * 0.85).toFixed(2)}/unit (15% off)</p>
            </div>
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity (min. 10)</label>
              <input
                type="number"
                id="quantity"
                min="10"
                step="1"
                value={quantity}
                onChange={e => setQuantity(Math.max(10, parseInt(e.target.value, 10)))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
             <div className="mt-4">
                <p className="text-lg font-semibold">Price/Unit: <span className="text-green-600">${currentPricePerUnit.toFixed(2)}</span></p>
                <p className="text-2xl font-bold">Total: <span className="text-gray-900">${totalPrice.toFixed(2)}</span></p>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg"
            >
              Add to Cart
            </button>
            {addedMessage && <p className="text-green-600 text-center mt-2 font-semibold">{addedMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
