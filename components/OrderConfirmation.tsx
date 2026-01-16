
import React from 'react';
import type { CartItem } from '../types';

interface OrderConfirmationProps {
  order: {
    items: CartItem[];
    total: number;
  };
  onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onContinueShopping }) => {
  const orderNumber = React.useMemo(() => Math.random().toString(36).substring(2, 11).toUpperCase(), []);
  const deliveryDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  const shippingCost = 50.00; // flat rate for wholesale
  const tax = order.total * 0.08;
  const finalTotal = order.total + shippingCost + tax;

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in">
      <div className="text-center border-b pb-6 mb-6">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully. A confirmation email has been sent.</p>
        <p className="text-gray-800 font-semibold mt-2">Order # {orderNumber}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
            <h2 className="text-xl font-bold mb-4">Shipping to:</h2>
            <div className="text-gray-700 space-y-1">
                <p className="font-semibold">Corporate Buyer Inc.</p>
                <p>123 Business Rd</p>
                <p>Suite 400</p>
                <p>Metropolis, NY 10001</p>
            </div>
             <h2 className="text-xl font-bold mt-6 mb-4">Estimated Delivery:</h2>
             <p className="text-gray-700 font-semibold">{deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${order.total.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax (est.)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2 mt-2"><span>Order Total</span><span>${finalTotal.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Items Ordered ({order.items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
        <ul className="space-y-4">
            {order.items.map(item => (
                 <li key={item.id} className="flex items-start space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                 </li>
            ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onContinueShopping}
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
