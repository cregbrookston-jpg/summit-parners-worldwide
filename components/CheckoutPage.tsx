import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

interface CheckoutPageProps {
  onPlaceOrder: () => void;
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPlaceOrder, onBack }) => {
  const { cartItems, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const shippingCost = 50.00;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    /*
    * =================================================================================
    * DEVELOPER INTEGRATION NOTE: STRIPE PAYMENT LOGIC
    * =================================================================================
    * The following is pseudo-code for integrating with Stripe. You would need to
    * install '@stripe/react-stripe-js' and '@stripe/stripe-js' and wrap your
    * app with the <Elements> provider.
    *
    *
    * // 1. Get references to Stripe and Elements (hooks from @stripe/react-stripe-js)
    * const stripe = useStripe();
    * const elements = useElements();
    *
    * if (!stripe || !elements) {
    *   console.error("Stripe.js has not loaded yet.");
    *   setIsLoading(false);
    *   return;
    * }
    *
    * const cardElement = elements.getElement('card');
    *
    * // 2. Create a PaymentIntent on your Python backend.
    * // This should return a `client_secret`.
    * const res = await fetch('/api/create-payment-intent', {
    *   method: 'POST',
    *   headers: { 'Content-Type': 'application/json' },
    *   body: JSON.stringify({ amount: Math.round(finalTotal * 100) }), // Amount in cents
    * });
    * const { client_secret } = await res.json();
    *
    * // 3. Confirm the card payment on the client side.
    * const result = await stripe.confirmCardPayment(client_secret, {
    *   payment_method: {
    *     card: cardElement,
    *     billing_details: { name: 'Customer Name' }, // Collect from form
    *   },
    * });
    *
    * if (result.error) {
    *   console.error(result.error.message);
    *   // Show error to your customer
    *   setIsLoading(false);
    * } else {
    *   if (result.paymentIntent.status === 'succeeded') {
    *     console.log("Payment successful!");
    *     onPlaceOrder();
    *   }
    * }
    * =================================================================================
    */

    // --- Current simulation of the above backend/Stripe flow ---
    console.log("Simulating API call to Python backend and Stripe payment processing...");
    setTimeout(() => {
      console.log("Simulated payment successful!");
      setIsLoading(false);
      onPlaceOrder();
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
       <button onClick={onBack} className="text-sm text-blue-600 hover:underline mb-6">&larr; Back to shopping</button>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shipping & Payment Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="p-2 border rounded-md" required />
                <input type="email" placeholder="Email Address" className="p-2 border rounded-md" required />
                <input type="text" placeholder="Company Name (Optional)" className="p-2 border rounded-md sm:col-span-2" />
                <input type="text" placeholder="Address Line 1" className="p-2 border rounded-md sm:col-span-2" required />
                <input type="text" placeholder="City" className="p-2 border rounded-md" required />
                <input type="text" placeholder="State / Province" className="p-2 border rounded-md" required />
                <input type="text" placeholder="ZIP / Postal Code" className="p-2 border rounded-md" required />
                <input type="text" placeholder="Country" className="p-2 border rounded-md" required />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Payment Details</h2>
               <div className="bg-gray-100 p-4 rounded-lg">
                  <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
                      Credit or debit card
                  </label>
                  {/* A container for the Stripe Card Element will be mounted here. */}
                  <div id="card-element" className="p-3 border border-gray-300 rounded-md bg-white"></div>
                  {/* Used to display form errors from Stripe. */}
                  <div id="card-errors" role="alert" className="text-red-600 text-sm mt-2"></div>
              </div>
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-4 rounded-md" role="alert">
                <p className="font-bold">Developer Note:</p>
                <p>This is a placeholder for Stripe Elements. The UI is ready for integration. You would use Stripe.js to mount a secure `CardElement` in the space above. The form submission logic includes pseudo-code for handling the payment flow.</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                    <span className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax (est.)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2 mt-2"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Your Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};