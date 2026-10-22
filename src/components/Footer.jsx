import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Phone, Mail, MapPin } from 'lucide-react';
import { StoreService } from '../services/store';
import { getCategoryPath } from '../utils/categoryRoutes';

// Official WhatsApp SVG icon
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.34 7.35 9.04 7.42 8.78 7.7C8.52 7.98 7.79 8.66 7.79 10.05C7.79 11.44 8.8 12.78 8.94 12.97C9.08 13.15 11.02 16.15 14 17.43C14.73 17.74 15.29 17.93 15.74 18.07C16.47 18.3 17.14 18.27 17.66 18.19C18.24 18.11 19.45 17.46 19.7 16.75C19.95 16.05 19.95 15.45 19.88 15.33C19.8 15.2 19.62 15.13 19.34 14.99C19.07 14.85 17.71 14.18 17.46 14.09C17.21 14 17.02 13.95 16.84 14.23C16.65 14.51 16.13 15.13 15.97 15.31C15.81 15.5 15.65 15.52 15.37 15.38C15.1 15.24 14.21 14.95 13.16 14.01C12.34 13.28 11.78 12.37 11.62 12.1C11.46 11.82 11.6 11.67 11.74 11.53C11.86 11.41 12.01 11.21 12.15 11.05C12.29 10.89 12.34 10.77 12.43 10.59C12.52 10.4 12.48 10.24 12.41 10.1C12.34 9.96 11.79 8.61 11.56 8.06C11.33 7.53 11.1 7.6 10.93 7.59C10.77 7.59 10.58 7.58 10.39 7.58C10.21 7.58 9.91 7.65 9.66 7.93"/>
    </svg>
  );
}

export function Footer({ categories = [] }) {
  const settings = StoreService.getSettings();

  const handleWhatsAppContact = () => {
    const phone = (settings.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const msg = `Hello ${settings.brandName || "Queens"}! I have a question regarding your royal jewellery collections.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <footer className="bg-[#030d08] border-t border-[#d4af37]/30 pt-16 pb-12 px-4 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Bio */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3 mb-3 no-underline group">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d4af37] bg-black shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105">
              <img 
                src={settings.logoUrl || "/quins-logo.png"} 
                alt={settings.brandName || "QUINS"} 
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-royal text-2xl font-bold tracking-widest gold-gradient-text leading-none">
                {settings.brandName || "QUINS"}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37] font-sans mt-1">
                {settings.brandSubtitle || "Curated Premium Jewelry Collection"}
              </span>
            </div>
          </Link>
          <p className="font-serif text-sm text-[#a4b8ae] leading-relaxed mb-6">
            Handcrafting imperial elegance with 24K micron gold plating, uncut polki stones, and lifetime anti-tarnish assurance. Designed to bestow the grandeur of queens upon every occasion.
          </p>

          <button
            onClick={handleWhatsAppContact}
            className="btn-whatsapp text-xs py-2.5 px-4 inline-flex items-center gap-2"
          >
            <WhatsAppIcon size={16} />
            <span>Connect with Royal Concierge</span>
          </button>
        </div>

        {/* Dynamic Collections Links (React Router Links) */}
        <div className="lg:col-span-3">
          <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#f7e6a1]">
            Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-[#a4b8ae]">
            <li>
              <Link 
                to="/" 
                className="hover:text-white transition hover:translate-x-1 duration-200 inline-block no-underline"
              >
                All Royal Jewels
              </Link>
            </li>
            {categories.slice(0, 6).map((cat) => (
              <li key={cat}>
                <Link 
                  to={getCategoryPath(cat)} 
                  className="hover:text-white transition hover:translate-x-1 duration-200 inline-block no-underline"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust & Guarantees */}
        <div className="lg:col-span-2">
          <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#f7e6a1]">
            Assurance
          </h4>
          <ul className="space-y-2.5 text-xs text-[#a4b8ae]">
            <li>100% Anti-Tarnish Finish</li>
            <li>24K Micron Gold Plating</li>
            <li>Skin-Safe & Lead Free</li>
            <li>Free Express Pan-India</li>
            <li>Royal Velvet Gift Box</li>
            <li>Razorpay & UPI Verified</li>
          </ul>
        </div>

        {/* Contact Concierge */}
        <div className="lg:col-span-3">
          <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#f7e6a1]">
            Royal Concierge
          </h4>
          <div className="space-y-3 text-xs text-[#a4b8ae]">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#25D366]" />
              <span>WhatsApp: +{settings.whatsappNumber || "91 98765 43210"}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-[#d4af37]" />
              <span>concierge@quinsjewels.com</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={14} className="text-[#d4af37] shrink-0 mt-0.5" />
              <span>Heritage Ateliers: Jaipur & Mumbai, India</span>
            </p>
            <p className="text-[11px] text-[#7d9388] pt-2">
              Hours: Mon - Sat, 10:00 AM - 8:00 PM IST
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright notice ONLY (Strictly NO admin link as per requirement) */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7e9389] gap-4">
        <div>
          © 2026 {settings.brandName || "QUINS"} Royal Imitation Jewellery. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Royal Service</span>
          <span>•</span>
          <span>Anti-Tarnish Warranty</span>
        </div>
      </div>
    </footer>
  );
}
