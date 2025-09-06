"use client";
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, Package } from 'lucide-react';
// import { useAuth } from "@/context/AuthContext";


const AddListingPopup = ({ isOpen, onClose, onAdd }) => {
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    image: "",
    condition: "",
    sustainability: "",
    seller: ""
  });

  const handleSubmit = async () => {
  try {
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newListing),
    });

    if (!res.ok) throw new Error("Failed to add product");
    onClose();
    const savedProduct = await res.json();
    console.log("Saved product:", savedProduct);

    // Optional: call a parent function to update the listing in UI
    onAdd(savedProduct);

    // Reset form
    setNewListing({
      title: "",
      description: "",
      category: "",
      price: "",
      originalPrice: "",
      image: "",
      condition: "",
      sustainability: "",
      seller: ""
    });

    onClose();
  } catch (error) {
    console.error(error);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-green-50  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add a New Product</h2>
          </div>
          <button onClick={onClose} className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newListing.title}
              onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Product title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={newListing.description}
              onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Describe your product"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={newListing.category}
              onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Category"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={newListing.price}
                onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price</label>
              <input
                type="number"
                value={newListing.originalPrice}
                onChange={(e) => setNewListing({ ...newListing, originalPrice: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Original Price"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={newListing.image}
              onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
            <input
              type="text"
              value={newListing.condition}
              onChange={(e) => setNewListing({ ...newListing, condition: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="New / Like New / Used"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sustainability</label>
            <input
              type="text"
              value={newListing.sustainability}
              onChange={(e) => setNewListing({ ...newListing, sustainability: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Eco-friendly info (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Seller</label>
            <input
              type="text"
              value={newListing.seller}
              onChange={(e) => setNewListing({ ...newListing, seller: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Your name / store name"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-8 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

const MyListings = () => {
//   const { isAuthenticated, userId } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal] = useState(false);
  // Fetch user listings from API
  useEffect(() => {
    // if (!isAuthenticated) return;
    const userId = localStorage.getItem("userId")

    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/products?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setListings(data || []);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListings(listings.filter(item => item._id !== productId));
    } catch (err) {
      console.error("Failed to delete listing:", err);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFilter === 'all' || listing.status?.toLowerCase() === selectedFilter)
  );

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-gray-700">Please log in to see your listings.</p>
//       </div>
//     );
//   }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 p-3 rounded-xl shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
              <p className="text-green-600 font-medium">Manage your products</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-200">
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add New</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Filter */}
        {/* <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>

          <button className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2 bg-white text-gray-700">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div> */}

        {/* Listings Grid */}
        <div className="grid gap-6">
          {filteredListings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100">
              <div className="flex items-center p-6">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-6 shadow-inner">
                  {listing.image ? <img src={listing.image} alt={listing.title} className="w-full h-full object-cover rounded-lg" /> : "📦"}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 cursor-pointer transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {/* <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Price</span>
                      <span className="font-semibold text-green-600 text-lg">₹{listing.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Category</span>
                      <span className="font-medium text-gray-700">{listing.category}</span>
                    </div>
                    {/* <div>
                      <span className="text-gray-500 block">Status</span>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        listing.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {listing.status}
                      </span>
                    </div> */}
                    {/* <div>
                      <span className="text-gray-500 block">Seller</span>
                      <span className="font-medium text-gray-700">{listing.owner}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters, or create your first listing!</p>
            <button onClick={()=>{ setShowModal(true); }} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Create Your First Listing</span>
            </button>
          </div>
        )}
        <AddListingPopup isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default MyListings;
