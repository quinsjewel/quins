import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowLeft,
  Share2, 
  Check, 
  Package, 
  HelpCircle,
  Gem,
  Award,
  ZoomIn,
  Play,
  Film,
  Video,
  Eye
} from 'lucide-react';
import { StoreService } from '../services/store';
import { getCategoryPath } from '../utils/categoryRoutes';
import { parseYouTubeVideo } from '../utils/mediaUtils';

// Official WhatsApp SVG icon
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.34 7.35 9.04 7.42 8.78 7.7C8.52 7.98 7.79 8.66 7.79 10.05C7.79 11.44 8.8 12.78 8.94 12.97C9.08 13.15 11.02 16.15 14 17.43C14.73 17.74 15.29 17.93 15.74 18.07C16.47 18.3 17.14 18.27 17.66 18.19C18.24 18.11 19.45 17.46 19.7 16.75C19.95 16.05 19.95 15.45 19.88 15.33C19.8 15.2 19.62 15.13 19.34 14.99C19.07 14.85 17.71 14.18 17.46 14.09C17.21 14 17.02 13.95 16.84 14.23C16.65 14.51 16.13 15.13 15.97 15.31C15.81 15.5 15.65 15.52 15.37 15.38C15.1 15.24 14.21 14.95 13.16 14.01C12.34 13.28 11.78 12.37 11.62 12.1C11.46 11.82 11.6 11.67 11.74 11.53C11.86 11.41 12.01 11.21 12.15 11.05C12.29 10.89 12.34 10.77 12.43 10.59C12.52 10.4 12.48 10.24 12.41 10.1C12.34 9.96 11.79 8.61 11.56 8.06C11.33 7.53 11.1 7.6 10.93 7.59C10.77 7.59 10.58 7.58 10.39 7.58C10.21 7.58 9.91 7.65 9.66 7.93"/>
    </svg>
  );
}

export function ProductDetailsPage({ products = [], onPayNow }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Find product
  const product = useMemo(() => {
    return products.find(p => p.id.toLowerCase() === (productId || '').toLowerCase()) || null;
  }, [products, productId]);

  const [activeImage, setActiveImage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeMediaTab, setActiveMediaTab] = useState('photos'); // 'photos' | 'video'
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  // Extract all 5-6 product photos
  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return [product.image, ...(product.additionalImages || [])].filter(Boolean);
  }, [product]);

  // Parse all YouTube video links
  const parsedVideos = useMemo(() => {
    if (!product?.youtubeVideos || !Array.isArray(product.youtubeVideos)) return [];
    return product.youtubeVideos
      .map((url, i) => {
        const parsed = parseYouTubeVideo(url);
        if (!parsed) return null;
        return { ...parsed, slotIndex: i + 1 };
      })
      .filter(Boolean);
  }, [product]);

  useEffect(() => {
    if (product) {
      setActiveImage(images[0] || product.image || '');
      setActiveMediaTab('photos');
      setActiveVideoIdx(0);
    }
  }, [product, images]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#0a2b20] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
          <Sparkles size={28} />
        </div>
        <h2 className="font-royal text-2xl font-bold text-white mb-2">Jewel Not Found in Vault</h2>
        <p className="text-sm text-[#9db2a8] mb-6 max-w-md">
          The requested heirloom jewelry item does not exist or may have been retired from the collection.
        </p>
        <Link to="/" className="btn-gold text-xs px-6 py-3">
          Explore All Jewels
        </Link>
      </div>
    );
  }

  const isInStock = product.inStock !== false;
  const whatsappUrl = StoreService.generateWhatsAppLink(product);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category.toLowerCase() === product.category.toLowerCase() && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: product.category, to: getCategoryPath(product.category) },
    { label: product.name, to: null }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Quins Royal Imitation Jewellery`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppClick = () => {
    if (!isInStock) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePayNowClick = () => {
    if (!isInStock) return;
    if (onPayNow) {
      onPayNow(product);
    }
  };

  // Zoom-on-hover handler
  const handleMouseMove = (e) => {
    if (!isInStock) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Top Navigation Row: Back Button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#d4af37]/20">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-[#a2b6ab] hover:text-[#f7e6a1] flex items-center gap-1.5 transition"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-[#07241a] hover:bg-[#0c3627] text-[#f7e6a1] border border-[#d4af37]/30 transition"
            title="Share this Royal Jewel"
          >
            {copiedLink ? <Check size={14} className="text-[#2ac38e]" /> : <Share2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        
        {/* Left Column: Interactive Image Gallery & Video Player */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Media Switcher Tabs (Photos vs Video) if YouTube videos exist */}
          {parsedVideos.length > 0 && (
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#061e16] border border-[#d4af37]/25">
              <button
                type="button"
                onClick={() => setActiveMediaTab('photos')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeMediaTab === 'photos'
                    ? 'bg-[#d4af37] text-black font-bold shadow'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye size={14} />
                <span>Photo Gallery ({images.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeMediaTab === 'video'
                    ? 'bg-[#e11d48] text-white font-bold shadow'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Play size={14} className="fill-current" />
                <span>Watch Video & Shorts ({parsedVideos.length})</span>
              </button>
            </div>
          )}

          {/* VIEW A: INTERACTIVE PHOTO HERO VIEWER */}
          {activeMediaTab === 'photos' && (
            <>
              <div 
                className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-[#04120b] border border-[#d4af37]/30 shadow-2xl zoom-hero-box cursor-crosshair group select-none"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => isInStock && setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                  }}
                  className={`w-full h-full object-cover object-center pointer-events-none transition-transform duration-200 ease-out ${
                    !isInStock ? 'grayscale opacity-60' : ''
                  }`}
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-10">
                  {product.tag && (
                    <span className="badge-gold shadow-lg">{product.tag}</span>
                  )}
                  {isInStock ? (
                    <span className="badge-in-stock shadow-lg">
                      <span className="dot-pulse bg-[#2ac38e]" /> In Stock
                    </span>
                  ) : (
                    <span className="badge-out-of-stock shadow-lg">
                      <span className="dot-pulse bg-[#e11d48]" /> Sold Out
                    </span>
                  )}
                </div>

                {/* Floating Zoom Hint Badge */}
                {isInStock && (
                  <div className={`pointer-events-none absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-[#f7e6a1] border border-[#d4af37]/30 flex items-center gap-1.5 transition-opacity duration-300 z-10 ${
                    isZoomed ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <ZoomIn size={13} className="text-[#d4af37]" />
                    <span className="hidden sm:inline">Hover to inspect royal finish</span>
                    <span className="sm:hidden">Touch & hold to zoom</span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!isInStock && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="border-2 border-[#e11d48] bg-[#3b0813]/90 text-[#fca5a5] px-6 py-2.5 rounded-xl font-royal font-bold text-lg tracking-widest uppercase shadow-2xl">
                      Sold Out
                    </div>
                    <p className="text-xs text-gray-300 mt-3 font-serif max-w-xs">
                      This royal heirloom is currently out of stock. Contact our stylist to pre-order for next handcrafted batch.
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnails Gallery (5 to 6 photos) */}
              {images.length > 1 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5 px-0.5">
                    <span className="text-[#f7e6a1] font-semibold">Angles & Craftsmanship ({images.length} views):</span>
                    <span className="text-[10px] text-[#8e9f96]">Click to swap main view</span>
                  </div>
                  <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImage === img 
                            ? 'border-[#d4af37] ring-2 ring-[#d4af37]/60 shadow-[0_0_14px_rgba(212,175,55,0.45)] scale-105' 
                            : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                        title={`View photo angle ${idx + 1}`}
                      >
                        <img src={img} alt={`Jewel angle ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded bg-black/80 text-[#f7e6a1]">
                          #{idx + 1}
                        </span>
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 text-[8px] font-bold px-1 rounded bg-[#d4af37] text-black">
                            Main
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* VIEW B: EMBEDDED YOUTUBE VIDEO / SHORTS PLAYER */}
          {activeMediaTab === 'video' && parsedVideos.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#04120b] border border-[#d4af37]/35 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-3">
                <div className="flex items-center gap-2">
                  <Film size={18} className="text-red-400" />
                  <span className="font-royal text-sm sm:text-base font-bold text-white">
                    Royal Video & Shorts Showcase
                  </span>
                </div>

                {parsedVideos.length > 1 && (
                  <div className="flex gap-2">
                    {parsedVideos.map((vid, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVideoIdx(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                          activeVideoIdx === idx
                            ? 'bg-[#d4af37] text-black font-bold shadow'
                            : 'bg-[#07241a] text-gray-300 hover:text-white border border-[#d4af37]/25'
                        }`}
                      >
                        <Play size={10} className={activeVideoIdx === idx ? 'fill-black' : ''} />
                        <span>{vid.isShort ? `Shorts #${idx + 1}` : `Video #${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Video Player with responsive 16:9 or 9:16 layout */}
              {parsedVideos[activeVideoIdx] && (
                <div className="w-full flex justify-center py-1">
                  {parsedVideos[activeVideoIdx].isShort ? (
                    <div className="w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-2xl bg-black relative">
                      <iframe
                        src={parsedVideos[activeVideoIdx].embedUrl}
                        title={`${product.name} Royal Short`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-black relative">
                      <iframe
                        src={parsedVideos[activeVideoIdx].embedUrl}
                        title={`${product.name} Cinematic Video`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-[#8ea398] pt-1 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#2ac38e]" /> In-Website Playback (No Redirection)
                </span>
                <span className="font-mono text-[10px] text-[#f7e6a1]">
                  {parsedVideos[activeVideoIdx]?.isShort ? '9:16 Vertical Reel' : '16:9 Cinematic'}
                </span>
              </div>
            </div>
          )}

          {/* Trust Value Props Card */}
          <div className="p-4 rounded-xl bg-[#061e16] border border-[#d4af37]/25 grid grid-cols-2 gap-4 text-xs text-[#cad7d0]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-[#2ac38e] shrink-0" />
              <div>
                <strong className="text-white block">100% Anti-Tarnish</strong>
                <span className="text-[11px] text-[#93a79d]">Nano Ceramic Coated</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Truck size={20} className="text-[#d4af37] shrink-0" />
              <div>
                <strong className="text-white block">Pan-India Express</strong>
                <span className="text-[11px] text-[#93a79d]">Velvet Gift Box Included</span>
              </div>
            </div>
          </div>

          {/* Additional Dedicated Video Player Section below the gallery when in photo mode */}
          {activeMediaTab === 'photos' && parsedVideos.length > 0 && (
            <div className="p-4 rounded-xl bg-[#051c14] border border-[#d4af37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                  <Play size={18} className="fill-red-400" />
                </div>
                <div>
                  <h4 className="font-royal font-bold text-white text-xs sm:text-sm">
                    Watch Product Video & Shorts
                  </h4>
                  <p className="text-[11px] text-[#8ea398]">
                    {parsedVideos.length} video(s) available • Experience 360° shine
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className="btn-gold py-1.5 px-3.5 text-xs font-semibold shrink-0"
              >
                Watch Now
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Title, Pricing, Actions & Specifications */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between gap-2 text-xs text-[#d4af37] font-semibold mb-2">
              <Link 
                to={getCategoryPath(product.category)}
                className="uppercase tracking-widest hover:underline text-[#f7e6a1]"
              >
                {product.category}
              </Link>
              <span className="font-mono text-[#8fa399]">Product ID: {product.id}</span>
            </div>

            {/* Title */}
            <h1 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-[#f5d061]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#f5d061] text-[#f5d061]" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">{product.rating || 4.9}</span>
              <span className="text-xs text-[#8ea398]">({product.reviewsCount || 128} customer appraisals)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#062017] border border-[#d4af37]/35 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl sm:text-4xl font-bold text-[#fbf3d3]">
                  ₹{(product.price || 0).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-[#2ac38e] bg-[#2ac38e]/15 px-2.5 py-1 rounded-full border border-[#2ac38e]/30">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#93a79d] mt-1.5">
                Inclusive of all taxes • Free Insured Pan-India Express Delivery
              </p>
            </div>

            {/* Action Buttons (The Two Primary Actions) */}
            <div className="space-y-3 mb-8">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                disabled={!isInStock}
                className={`btn-whatsapp w-full py-3.5 text-sm sm:text-base font-semibold shadow-xl ${
                  !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
                }`}
                title={isInStock ? "Buy or Inquire directly on WhatsApp" : "Item Sold Out"}
              >
                <WhatsAppIcon size={20} />
                <span>{isInStock ? 'Buy from WhatsApp' : 'Unavailable on WhatsApp'}</span>
              </button>

              {/* Pay Now Button */}
              <button
                onClick={handlePayNowClick}
                disabled={!isInStock}
                className={`btn-gold w-full py-3.5 text-sm sm:text-base font-bold shadow-xl shine-effect ${
                  !isInStock ? 'opacity-40 cursor-not-allowed filter grayscale' : ''
                }`}
                title={isInStock ? "Instant Online Checkout (Razorpay / UPI)" : "Item Sold Out"}
              >
                <CreditCard size={18} />
                <span>{isInStock ? 'Pay Now (Instant UPI / Cards)' : 'Sold Out'}</span>
              </button>

              {!isInStock && (
                <p className="text-center text-xs text-[#fca5a5] italic mt-1 font-serif">
                  * Marked as Sold Out. Inquire via WhatsApp for custom batch reservations.
                </p>
              )}
            </div>

            {/* Story & Description */}
            <div className="mb-8">
              <h3 className="font-royal text-sm uppercase tracking-wider text-[#d4af37] font-bold mb-2">
                Royal Description
              </h3>
              <p className="font-serif text-sm sm:text-base text-[#d0ded7] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Royal Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-8">
                <h3 className="font-royal text-sm uppercase tracking-wider text-[#d4af37] font-bold mb-3">
                  Heirloom Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-xl bg-[#04160f] border border-[#d4af37]/15">
                      <span className="text-[#8e9f96] block text-[10px] uppercase font-semibold">{key}</span>
                      <span className="text-white font-medium text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Related Jewels from this Collection */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#d4af37]/25">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-1">
                Complementary Heirlooms
              </span>
              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">
                More from {product.category}
              </h2>
            </div>
            <Link 
              to={getCategoryPath(product.category)} 
              className="btn-outline-gold text-xs py-2 px-4"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onPayNow={onPayNow}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
