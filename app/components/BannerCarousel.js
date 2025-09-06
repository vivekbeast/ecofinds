import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel({ bannerImages }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Auto-slide every 5s unless hovering
  useEffect(() => {
    if (hovering) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hovering, bannerImages.length]);

  const prevBanner = () =>
    setCurrentBannerIndex(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  const nextBanner = () =>
    setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md flex flex-row justify-center items-center w-full overflow-hidden h-[60vh] mb-6"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={bannerImages[currentBannerIndex].image}
          src={bannerImages[currentBannerIndex].image}
          alt={bannerImages[currentBannerIndex].title}
          className="w-full h-full object-cover flex flex-row justify-center items-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
          {bannerImages[currentBannerIndex].title}
        </h3>
        <p className="text-sm md:text-base opacity-90 max-w-md">
          {bannerImages[currentBannerIndex].subtitle}
        </p>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBannerIndex(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentBannerIndex
                ? "bg-white scale-125 shadow-md"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevBanner}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 cursor-pointer rounded-full text-white transition"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextBanner}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 cursor-pointer rounded-full text-white transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
