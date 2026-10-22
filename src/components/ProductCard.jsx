import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  CreditCard, 
  Star, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StoreService } from '../services/store';

// Official WhatsApp SVG icon for crystal clear high-fidelity branding
function WhatsAppIcon({ size = 16, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.34 7.35 9.04 7.42 8.78 7.7C8.52 7.98 7.79 8.66 7.79 10.05C7.79 11.44 8.8 12.78 8.94 12.97C9.08 13.15 11.02 16.15 14 17.43C14.73 17.74 15.29 17.93 15.74 18.07C16.47 18.3 17.14 18.27 17.66 18.19C18.24 18.11 19.45 17.46 19.7 16.75C19.95 16.05 19.95 15.45 19.88 15.33C19.8 15.2 19.62 15.13 19.34 14.99C19.07 14.85 17.71 14.18 17.46 14.09C17.21 14 17.02 13.95 16.84 14.23C16.65 14.51 16.13 15.13 15.97 15.31C15.81 15.5 15.65 15.52 15.37 15.38C15.1 15.24 14.21 14.95 13.16 14.01C12.34 13.28 11.78 12.37 11.62 12.1C11.46 11.82 11.6 11.67 11.74 11.53C11.86 11.41 12.01 11.21 12.15 11.05C12.29 10.89 12.34 10.77 12.43 10.59C12.52 10.4 12.48 10.24 12.41 10.1C12.34 9.96 11.79 8.61 11.56 8.06C11.33 7.53 11.1 7.6 10.93 7.59C10.77 7.59 10.58 7.58 10.39 7.58C10.21 7.58 9.91 7.65 9.66 7.93"/>
    </svg>
  );
}

export function ProductCard({ product, onPayNow }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const isInStock = product.inStock !== false;
  const whatsappUrl = StoreService.generateWhatsAppLink(product);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleOpenDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    if (!isInStock) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePayNowClick = (e) => {
    e.stopPropagation();
    if (!isInStock) return;
    if (onPayNow) {
      onPayNow(product);
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80";

  return (
    <div 
      className="glass-card group flex flex-col justify-between h-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container (routes to /product/:productId) */}
      <div 
        className="relative aspect-[4/4.5] overflow-hidden bg-[#04120b] cursor-pointer" 
        onClick={handleOpenDetails}
      >
        {/* Main Image */}
        <img
          src={imgError ? fallbackImage : (product.image || fallbackImage)}
          alt={product.name}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
            isHovered && isInStock ? 'scale-108' : 'scale-100'
          } ${!isInStock ? 'opacity-50 grayscale contrast-125' : ''}`}
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none gap-2 z-10">
          {product.tag && (
            <span className="badge-gold shadow-md">
              {product.tag}
            </span>
          )}

          {isInStock ? (
            <span className="badge-in-stock shadow-md backdrop-blur-md">
              <span className="dot-pulse bg-[#2ac38e]" />
              In Stock
            </span>
          ) : (
            <span className="badge-out-of-stock shadow-md backdrop-blur-md">
              <span className="dot-pulse bg-[#e11d48]" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Prominent 'SOLD OUT' Watermark if Out of Stock */}
        {!isInStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center pointer-events-none p-4 text-center">
            <div className="border-2 border-[#e11d48] text-[#fca5a5] px-4 py-1.5 rounded-lg font-royal font-bold text-sm tracking-widest uppercase bg-[#3b0813]/90 shadow-2xl">
              Sold Out
            </div>
            <p className="text-[11px] text-gray-300 mt-2 font-serif">
              Temporarily out of royal inventory
            </p>
          </div>
        )}

        {/* View Details Hover Badge */}
        {isInStock && (
          <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#04140e]/90 text-[#fbf3d3] border border-[#d4af37]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:border-[#d4af37] flex items-center gap-1.5 text-xs font-semibold px-3">
            <span>View Details</span>
            <ArrowRight size={13} className="text-[#d4af37]" />
          </div>
        )}
      </div>

      {/* 2. Product Information Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
              {product.category}
            </span>

            <div className="flex items-center gap-1 text-[11px] text-[#fbf3d3]">
              <Star size={12} className="text-[#f5d061] fill-[#f5d061]" />
              <span className="font-semibold">{product.rating || 4.9}</span>
              <span className="text-[#889d93]">({product.reviewsCount || 48})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={handleOpenDetails}
            className="font-serif font-bold text-base sm:text-lg text-white leading-snug line-clamp-2 hover:text-[#fae498] transition cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-sans text-lg sm:text-xl font-bold text-[#fbf3d3]">
              ₹{(product.price || 0).toLocaleString('en-IN')}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}

            {discountPercent && (
              <span className="text-[11px] font-bold text-[#2ac38e] bg-[#2ac38e]/10 px-1.5 py-0.5 rounded border border-[#2ac38e]/20">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* 3. Action Buttons Section */}
        <div className="pt-2 border-t border-[#d4af37]/15 flex flex-col gap-2">
          {/* a) "Buy from WhatsApp" Button */}
          <button
            onClick={handleWhatsAppClick}
            disabled={!isInStock}
            className={`btn-whatsapp w-full text-xs sm:text-sm py-2.5 ${
              !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
            }`}
            title={isInStock ? "Inquire & Buy directly on WhatsApp" : "Item Sold Out"}
          >
            <WhatsAppIcon size={16} />
            <span>{isInStock ? 'Buy from WhatsApp' : 'Unavailable on WhatsApp'}</span>
          </button>

          {/* b) "Pay Now" Button (Indian Payment Gateway / UPI) */}
          <button
            onClick={handlePayNowClick}
            disabled={!isInStock}
            className={`btn-gold w-full text-xs sm:text-sm py-2.5 ${
              !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
            }`}
            title={isInStock ? "Instant Online Checkout (Razorpay / UPI)" : "Item Sold Out"}
          >
            <CreditCard size={15} />
            <span>{isInStock ? 'Pay Now (UPI / Card)' : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
