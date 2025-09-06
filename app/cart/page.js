"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, X, ArrowRight, Package, Heart } from "lucide-react";
import Link from 'next/link';
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [removingItems, setRemovingItems] = useState(new Set());

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate total
  useEffect(() => {
    const sum = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(sum);
  }, [cartItems]);

  const handleRemove = async (productId) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      setTimeout(() => {
        setCartItems(data.items || []);
        setRemovingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 300);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleCheckout = () => {
    if (!cartItems.length) return alert("Cart is empty");
    alert(`Proceeding to checkout. Total: ₹${total}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700 mt-4">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-50 via-green-50 to-orange-50 w-[90%] mx-auto">
      


      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 px-4 sm:px-6">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Package size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link href="/" className="bg-gradient-to-r from-green-600 to-green-600 text-white px-8 py-3 cursor-pointer rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Start Shopping
            </Link>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item._id}
              className={`group bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start justify-between transition-all duration-300 ${
                removingItems.has(item.product._id)
                  ? "opacity-0 scale-95 translate-x-full"
                  : "opacity-100 scale-100"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInLeft 0.6s ease-out forwards",
              }}
            >
              {/* Product Info */}
              <div className="flex items-center sm:items-start space-x-4 w-full sm:w-auto">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {item.quantity}
                  </div>
                </div>

                <div className="flex-1 min-w-0 mt-2 sm:mt-0">
                  <h2 className="font-bold text-gray-800 text-lg sm:text-xl truncate">
                    {item.product.title}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1 mb-2">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ₹{item.product.price}
                    </span>
                    <span className="text-gray-500 text-sm">× {item.quantity}</span>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    Subtotal: ₹{item.product.price * item.quantity}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex mt-4 sm:mt-0 sm:flex-col sm:ml-4 space-x-2 sm:space-x-0 sm:space-y-2">
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                  disabled={removingItems.has(item.product._id)}
                >
                  <X size={18} />
                </button>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl space-y-6 sticky bottom-4 w-full sm:w-auto mx-auto sm:mx-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                Total to pay
              </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{total}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-green-600 via-green-600 to-green-500 hover:from-green-700 hover:via-green-700 hover:to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
