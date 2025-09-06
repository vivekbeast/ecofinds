"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Menu, ShoppingCart, Leaf, Recycle, Heart, Star, ArrowRight, ChevronDown, Grid, List } from 'lucide-react';
import BannerCarousel from "./components/BannerCarousel";
import Header from "./components/NavBar";
import Link from 'next/link';
const EcoFindsHomepage = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set());
  const [products, setProducts] = useState([]);

  // Sample data for sustainable marketplace
  const bannerImages = [
    {
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=400&fit=crop',
      title: 'Give Furniture a Second Life',
      subtitle: 'Discover pre-loved treasures for your home'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: 'Sustainable Fashion Revolution',
      subtitle: 'Style that doesn\'t cost the Earth'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
      title: 'Tech That Keeps Giving',
      subtitle: 'Refurbished electronics with warranties'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/listings");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: 'Vintage Leather Armchair',
  //     price: '$180',
  //     originalPrice: '$450',
  //     image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
  //     condition: 'Excellent',
  //     sustainability: 'Saves 89% CO2',
  //     rating: 4.8,
  //     seller: 'GreenHome Co.'
  //   },
  //   {
  //     id: 2,
  //     name: 'MacBook Pro 2021 Refurbished',
  //     price: '$1,299',
  //     originalPrice: '$2,399',
  //     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
  //     condition: 'Like New',
  //     sustainability: 'Certified Refurbished',
  //     rating: 4.9,
  //     seller: 'TechCycle'
  //   },
  //   {
  //     id: 3,
  //     name: 'Designer Wool Coat',
  //     price: '$85',
  //     originalPrice: '$320',
  //     image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
  //     condition: 'Very Good',
  //     sustainability: 'Fashion Forward',
  //     rating: 4.6,
  //     seller: 'StyleCircle'
  //   },
  //   {
  //     id: 4,
  //     name: 'Reclaimed Wood Dining Table',
  //     price: '$420',
  //     originalPrice: '$1,200',
  //     image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop',
  //     condition: 'Good',
  //     sustainability: 'Upcycled Material',
  //     rating: 4.7,
  //     seller: 'WoodRevive'
  //   },
  //   {
  //     id: 5,
  //     name: 'Professional Camera Kit',
  //     price: '$890',
  //     originalPrice: '$1,800',
  //     image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
  //     condition: 'Excellent',
  //     sustainability: 'Extended Lifecycle',
  //     rating: 4.8,
  //     seller: 'LensMasters'
  //   },
  //   {
  //     id: 6,
  //     name: 'Vintage Ceramic Vase Set',
  //     price: '$45',
  //     originalPrice: '$120',
  //     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
  //     condition: 'Very Good',
  //     sustainability: 'Artisan Crafted',
  //     rating: 4.5,
  //     seller: 'VintageVibe'
  //   }
  // ];

  // Banner auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (productId) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Wishlist */}
      <button 
        onClick={() => toggleLike(product._id)}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
          likedItems.has(product._id) 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
        }`}
      >
        <Heart size={16} fill={likedItems.has(product._id) ? 'currentColor' : 'none'} />
      </button>

      {/* Sustainability tag */}
      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
        {product.sustainability}
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.condition}</span>
        <div className="flex items-center">
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
        {product.title}
      </h3>
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">by {product.seller}</span>

        {/* ✅ Redirect to product detail page */}
        <Link href={`/products/${product._id}`}>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 cursor-pointer rounded-full text-sm transition-colors duration-200 flex items-center space-x-1">
            <span>View</span>
            <ArrowRight size={12} />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
<div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
  {/* Search */}
  <div className="flex-1 relative w-full">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={18}
    />
    <input
      type="text"
      placeholder="Search for sustainable treasures..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                 focus:ring-2 focus:ring-green-200 focus:border-green-500 
                 text-gray-800 placeholder-gray-400 text-sm transition-all"
    />
  </div>

  {/* Filters */}
  <div className="flex items-center gap-3 w-full lg:w-auto">
    {/* Sort Dropdown */}
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg 
                   px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-sm
                   focus:ring-2 focus:ring-green-200 focus:border-green-500
                   hover:border-green-400 hover:bg-green-50 cursor-pointer transition"
      >
        <option>Relevance</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Recently Added</option>
        <option>Most Sustainable</option>
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        size={16}
      />
    </div>

    {/* Filter Button */}
    <button
      className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg 
                 text-sm font-medium text-gray-700 shadow-sm
                 hover:bg-green-50 hover:border-green-400 hover:text-green-700 
                 focus:ring-2 focus:ring-green-200 transition"
    >
      <Filter size={16} className="text-gray-500 group-hover:text-green-600" />
      <span>Filters</span>
    </button>
  </div>
</div>


        <div className="grid lg:grid-cols-1 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 flex justify-center items-center flex-row w-full">
           <BannerCarousel bannerImages={bannerImages} />
          </div>


          {/* Products Grid */}
          <div className="lg:col-span-3">

          
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Sustainable Treasures</h2>
                <p className="text-gray-600">2,847 items found • Saving the planet, one purchase at a time</p>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Load More */}
            {/* <div className="text-center mt-12">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <span>Load More Treasures</span>
                <ChevronDown size={18} />
              </button>
            </div> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Leaf className="text-white" size={20} />
                </div>
                <span className="text-lg font-bold">EcoFinds</span>
              </div>
              <p className="text-gray-300 text-sm">
                Extending product lifecycles, reducing waste, and building a sustainable future together.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">All Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Furniture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Sustainability Impact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eco Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seller Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quality Promise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 EcoFinds. All rights reserved. Building a sustainable future, one find at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoFindsHomepage;