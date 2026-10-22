import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Heart,
  PackageCheck
} from 'lucide-react';
import { StoreService } from '../services/store';

// Official WhatsApp SVG icon
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.34 7.35 9.04 7.42 8.78 7.7C8.52 7.98 7.79 8.66 7.79 10.05C7.79 11.44 8.8 12.78 8.94 12.97C9.08 13.15 11.02 16.15 14 17.43C14.73 17.74 15.29 17.93 15.74 18.07C16.47 18.3 17.14 18.27 17.66 18.19C18.24 18.11 19.45 17.46 19.7 16.75C19.95 16.05 19.95 15.45 19.88 15.33C19.8 15.2 19.62 15.13 19.34 14.99C19.07 14.85 17.71 14.18 17.46 14.09C17.21 14 17.02 13.95 16.84 14.23C16.65 14.51 16.13 15.13 15.97 15.31C15.81 15.5 15.65 15.52 15.37 15.38C15.1 15.24 14.21 14.95 13.16 14.01C12.34 13.28 11.78 12.37 11.62 12.1C11.46 11.82 11.6 11.67 11.74 11.53C11.86 11.41 12.01 11.21 12.15 11.05C12.29 10.89 12.34 10.77 12.43 10.59C12.52 10.4 12.48 10.24 12.41 10.1C12.34 9.96 11.79 8.61 11.56 8.06C11.33 7.53 11.1 7.6 10.93 7.59C10.77 7.59 10.58 7.58 10.39 7.58C10.21 7.58 9.91 7.65 9.66 7.93"/>
    </svg>
  );
}

export function ProductModal({ product, onClose, onPayNow }) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const isInStock = product.inStock !== false;
  const whatsappUrl = StoreService.generateWhatsAppLink(product);

  const images = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : [product.image, ...(product.additionalImages || [])].filter(Boolean);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleWhatsAppClick = () => {
    if (!isInStock) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePayNowClick = () => {
    if (!isInStock) return;
    onClose();
    onPayNow(product);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-animated relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#061e16] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#04120b] text-gray-300 hover:text-white border border-[#d4af37]/30 hover:border-[#d4af37] transition z-20"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-[#04120b] border border-[#d4af37]/25 shadow-lg">
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-cover object-center ${
                  !isInStock ? 'grayscale opacity-60' : ''
                }`}
              />

              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {product.tag && (
                  <span className="badge-gold">{product.tag}</span>
                )}
                {isInStock ? (
                  <span className="badge-in-stock">
                    <span className="dot-pulse bg-[#2ac38e]" /> In Stock
                  </span>
                ) : (
                  <span className="badge-out-of-stock">
                    <span className="dot-pulse bg-[#e11d48]" /> Sold Out
                  </span>
                )}
              </div>

              {!isInStock && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="border border-[#e11d48] bg-[#3b0813]/90 text-[#fca5a5] px-5 py-2 rounded-lg font-royal font-bold text-base tracking-widest uppercase">
                    Sold Out
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      activeImage === img ? 'border-[#d4af37]' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurance in Modal */}
            <div className="p-3.5 rounded-xl bg-[#092b20]/60 border border-[#d4af37]/20 flex items-center justify-between text-xs text-[#d2ded8]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#d4af37]" />
                <span>Anti-Tarnish Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={16} className="text-[#d4af37]" />
                <span>Free Pan-India Delivery</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Buying Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between gap-2 text-xs text-[#d4af37] font-semibold mb-2">
                <span className="uppercase tracking-widest">{product.category}</span>
                <span className="font-mono text-[#8b9e95]">SKU: {product.id}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#f5d061]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#f5d061] text-[#f5d061]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">{product.rating || 4.9}</span>
                <span className="text-xs text-[#8da398]">({product.reviewsCount || 120} verified reviews)</span>
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-xl bg-[#07241a] border border-[#d4af37]/25">
                <span className="text-2xl sm:text-3xl font-bold text-[#fbf3d3] font-sans">
                  ₹{(product.price || 0).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-[#2ac38e] bg-[#2ac38e]/10 px-2 py-0.5 rounded border border-[#2ac38e]/30">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#cbd6d0] leading-relaxed mb-6 font-serif">
                {product.description}
              </p>

              {/* Specifications Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase font-bold text-[#d4af37] tracking-wider mb-2.5">
                    Royal Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="p-2 rounded bg-[#04160f] border border-[#d4af37]/15">
                        <span className="text-[#8e9f96] block text-[10px] uppercase font-semibold">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Section */}
            <div className="pt-4 border-t border-[#d4af37]/25 flex flex-col gap-3">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                disabled={!isInStock}
                className={`btn-whatsapp w-full text-sm sm:text-base py-3 font-semibold ${
                  !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
                }`}
              >
                <WhatsAppIcon size={20} />
                <span>{isInStock ? 'Buy from WhatsApp' : 'Sold Out on WhatsApp'}</span>
              </button>

              {/* Pay Now Button */}
              <button
                onClick={handlePayNowClick}
                disabled={!isInStock}
                className={`btn-gold w-full text-sm sm:text-base py-3 font-semibold ${
                  !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
                }`}
              >
                <CreditCard size={18} />
                <span>{isInStock ? 'Pay Now (Razorpay / Instant UPI)' : 'Item Out of Stock'}</span>
              </button>

              {!isInStock && (
                <p className="text-center text-xs text-[#fca5a5] italic mt-1 font-serif">
                  * This heirloom piece is currently sold out. Check back soon or contact our royal stylist.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
