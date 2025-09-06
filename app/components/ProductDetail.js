"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


export default function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
const { isAuthenticated, userId } = useAuth();
   const router = useRouter();
  // Fetch product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/listings/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);



  const handleAddToCart = async () => {
//   if (!isAuthenticated) return alert("Please login first");

  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ productId: productId, quantity: 1 }),
  });

  const data = await res.json();
  setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    router.push("/")
  console.log("Cart updated:", data);
};

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % 3);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + 3) % 3);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!product) return <div className="text-center p-8 text-red-500">Product not found</div>;

  const images = [product.image, product.image, product.image]; // Expand if multiple images
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-lg mx-auto p-4 space-y-6">
        
        {/* Product Image Carousel */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={images[currentIndex]}
            alt={product.title}
            className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
          />
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center">
            <ChevronLeft size={20} className="text-gray-700"/>
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center">
            <ChevronRight size={20} className="text-gray-700"/>
          </button>
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Image Dots */}
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-emerald-600" : "bg-gray-300"}`}
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold">₹{product.price * quantity}</span>
            {product.originalPrice > product.price && <span className="text-black line-through">₹{product.originalPrice}</span>}
          </div>
          <p className="text-gray-900">{product.description}</p>

    

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-2xl font-bold text-lg transition-all duration-300 cursor-pointer shadow-lg ${
              addedToCart ? "bg-green-500 text-white" : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
            }`}
          >
            {addedToCart ? "✓ Added to Cart!" : `Add to Cart • ₹${product.price * quantity}`}
          </button>
        </div>
      </div>
    </div>
  );
}
