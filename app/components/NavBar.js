"use client";
import React, { useEffect, useState } from 'react';
import { Menu, ShoppingCart, User, X, Leaf, Search, Heart, Bell } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Toggle this for testing
const {  setAuth, userId } = useAuth();


 useEffect(() => {
    if(localStorage.getItem("token") !== undefined){
      setIsAuthenticated(true);
    }
  },[]);
 const handleSignOut = () => {
    setAuth(null, null);
    setIsMobileMenuOpen(false);
    localStorage.clear();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center md:hidden">
              <button 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800">EcoFinds</h1>
                <p className="text-xs text-green-600 leading-none">Sustainable Marketplace</p>
              </div>
            </Link>

            {/* Right: Cart and Profile/Auth */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                // Authenticated state - show cart and profile
                <>
                  {/* <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Heart size={20} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">2</span>
                  </button> */}
                  
                  <Link href="/cart" className="relative p-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors">
                    <ShoppingCart size={20} className="text-gray-600" />
                  </Link>
                  
                  {/* <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-2 h-2"></span>
                  </button> */}
                  
                  <Link href="/profile" className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  </Link>
                </>
              ) : (
                // Non-authenticated state - show sign in button
                <div className=' flex flex-row gap-3'>
                 <Link href="/cart" className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <ShoppingCart size={20} className="text-gray-600" />
                  </Link>
                <Link href="/register" 
                  className="bg-green-500 hover:bg-green-600 text-white hidden md:flex px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                //   onClick={toggleAuth}
                >
                  Sign In
                </Link>
                
                </div>
                
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
            <div 
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Leaf className="text-white" size={20} />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-800">EcoFinds</h1>
                    <p className="text-xs text-green-600">Sustainable Marketplace</p>
                  </div>
                </div>
                <button 
                  className="p-2 rounded-md hover:bg-gray-900 cursor-pointer transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Section - if authenticated */}
              {/* {isAuthenticated && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">John Doe</p>
                      <p className="text-sm text-gray-600">john.doe@email.com</p>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Search Bar */}
              {/* <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search eco-friendly products..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div> */}

              {/* Navigation Links */}
              <nav className="p-4 space-y-2">
                {/* <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Search size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-800">Browse Products</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf size={16} className="text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Sell Products</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart size={16} className="text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-800">Environmental Impact</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800">Community</span>
                </a> */}

                {isAuthenticated && (
                  <>
                    {/* <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart size={16} className="text-red-600" />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-gray-800">Wishlist</span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">2</span>
                      </div>
                    </a> */}
                    
                    <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link href="/cart" className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart size={16} className="text-green-600" />
                      </Link>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-gray-800">Shopping Cart</span>
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">3</span>
                      </div>
                    </a>
                    
                    {/* <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bell size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-gray-800">Notifications</span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      </div>
                    </a> */}
                  </>
                )}
              </nav>

              {/* Bottom Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {/* <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                      Settings
                    </button> */}
                    <button 
                      className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" 
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Sign In
                    </Link>
                    <Link href="/register" className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;