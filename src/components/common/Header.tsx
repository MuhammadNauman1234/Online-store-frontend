import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  let cartCount = 3; // Example cart count, replace with actual state or props
  return (
    <header className="bg-green-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Store
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/items" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Items List
            </Link>
            <Link 
              to="/add-item" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Item
            </Link>
            <Link 
              to="/checkout" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Checkout
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center">
            <Link 
              to="/cart" 
              className="relative p-2 text-white hover:text-green-100 transition-colors"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-green-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
