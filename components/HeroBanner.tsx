
import React from 'react';

export const HeroBanner: React.FC = () => {
  const heroImageUrl = 'https://images.unsplash.com/photo-1634403993433-a4e9a5a89689?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-8">
      <img
        src={heroImageUrl}
        alt="Collection of iPhones"
        className="w-full h-48 sm:h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            The Ultimate iPhone Collection
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover unbeatable wholesale prices on the latest models. Built for your business.
          </p>
        </div>
      </div>
    </div>
  );
};
