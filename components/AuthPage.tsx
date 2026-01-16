
import React, { useState } from 'react';

interface AuthPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    /*
    * =================================================================================
    * DEVELOPER INTEGRATION NOTE: FIREBASE AUTHENTICATION
    * =================================================================================
    * The following is pseudo-code for integrating with Firebase Auth. You would need
    * to initialize Firebase in your app and get the `auth` instance.
    *
    * import { auth } from './firebase-config'; // Your firebase setup file
    * import { 
    *   createUserWithEmailAndPassword, 
    *   signInWithEmailAndPassword 
    * } from "firebase/auth";
    *
    * try {
    *   if (isSignUp) {
    *     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    *     console.log('User signed up:', userCredential.user);
    *   } else {
    *     const userCredential = await signInWithEmailAndPassword(auth, email, password);
    *     console.log('User logged in:', userCredential.user);
    *   }
    *   onLoginSuccess();
    * } catch (err) {
    *   setError(err.message);
    * } finally {
    *   setIsLoading(false);
    * }
    * =================================================================================
    */

    // --- Current simulation of the above Firebase flow ---
    console.log(`Simulating ${isSignUp ? 'sign up' : 'login'} for email: ${email}`);
    setTimeout(() => {
      // Simulate a potential error
      if (password.length < 6) {
        setError('Simulated Error: Password should be at least 6 characters.');
        setIsLoading(false);
      } else {
        console.log('Simulated success!');
        onLoginSuccess();
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
       <button onClick={onBack} className="text-sm text-blue-600 hover:underline mb-6">&larr; Back to shopping</button>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {isSignUp ? 'Create an Account' : 'Sign In'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>
        
        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

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
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>

       <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-6 rounded-md" role="alert">
          <p className="font-bold">Developer Note:</p>
          <p>This form is ready for Firebase integration. The submit handler contains pseudo-code showing how to use `createUserWithEmailAndPassword` and `signInWithEmailAndPassword`.</p>
        </div>
    </div>
  );
};
