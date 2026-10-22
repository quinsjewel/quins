import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  Crown, 
  ShieldCheck
} from 'lucide-react';
import { StoreService } from '../services/store';
import { getCategoryPath } from '../utils/categoryRoutes';

export function Header({ 
  searchQuery = '', 
  onSearchChange
}) {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState(StoreService.getSettings());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const navigate = useNavigate();
  const location = useLocation();

  // Load and subscribe to store updates
  useEffect(() => {
    const loadCategories = () => {
      setCategories(StoreService.getCategories());
      setSettings(StoreService.getSettings());
    };
    loadCategories();

    const handleUpdate = () => {
      loadCategories();
    };

    window.addEventListener('quins_store_updated', handleUpdate);
    return () => window.removeEventListener('quins_store_updated', handleUpdate);
  }, []);

  // Sync search query from props
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppContact = () => {
    const phone = (settings.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const msg = `Hello ${settings.brandName || "Queens"}! I would like to inquire about your royal jewellery collections and custom bridal orders.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Royal Announcement Top Bar */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #2b0811 0%, #062319 50%, #2b0811 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)'
        }}
        className="text-xs py-2 px-4 text-center font-sans tracking-wider text-[#fceec8] flex items-center justify-center gap-2 overflow-hidden"
      >
        <Sparkles size={13} className="text-[#d4af37] animate-pulse" />
        <span className="font-medium text-center truncate">
          {settings.announcementText || "✨ FESTIVE ROYAL SALE: Flat 20% OFF on Temple & Bridal Collections | Free Royal Velvet Box on Orders > ₹1,999 ✨"}
        </span>
        <Sparkles size={13} className="text-[#d4af37] animate-pulse" />
      </div>

      {/* 2. Main Brand & Search Navigation */}
      <div 
        style={{
          backgroundColor: scrolled ? 'rgba(4, 18, 13, 0.96)' : 'rgba(6, 25, 18, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}
        className="px-4 lg:px-8 py-3.5 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d4af37] hover:bg-[#0c3325] rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo "QUINS" (Routes to Home '/') */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 sm:gap-3 select-none group no-underline py-0.5"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#d4af37]/70 shadow-[0_0_14px_rgba(212,175,55,0.35)] bg-black shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#f7e6a1]">
              <img 
                src={settings.logoUrl || "/quins-logo.png"} 
                alt={settings.brandName || "QUINS"} 
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="font-royal font-bold text-xl sm:text-2xl lg:text-3xl tracking-widest gold-gradient-text gold-subtle-glow leading-none"
              >
                {settings.brandName || "QUINS"}
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[#c5a045] font-sans mt-0.5 font-medium truncate max-w-[170px] sm:max-w-none">
                {settings.brandSubtitle || "Curated Premium Jewelry Collection"}
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search bridal chokers, anti-tarnish chains, bangles..."
                value={localSearch}
                onChange={handleSearchInputChange}
                className="royal-input pl-10 pr-10 py-2 text-sm rounded-full text-white placeholder-emerald-200/40"
              />
              <Search 
                size={16} 
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" 
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* VIP WhatsApp Stylist button */}
            <button
              onClick={handleWhatsAppContact}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 transition"
              title="Chat with Royal Stylist on WhatsApp"
            >
              <Phone size={13} className="text-[#25D366]" />
              <span>Royal Stylist</span>
            </button>

            {/* Guarantee Tag */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#ebd89e] border border-[#d4af37]/20 px-3 py-1.5 rounded-full bg-[#d4af37]/5">
              <ShieldCheck size={14} className="text-[#d4af37]" />
              <span>100% Anti-Tarnish</span>
            </div>

            {/* Currency Pill */}
            <div className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#f7e6a1] bg-[#0c3123] border border-[#d4af37]/30">
              ₹ INR
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="md:hidden mt-3 pt-2 border-t border-[#d4af37]/10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jewels, bangles, chokers..."
              value={localSearch}
              onChange={handleSearchInputChange}
              className="royal-input pl-9 pr-9 py-2 text-xs rounded-full text-white placeholder-emerald-200/40"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]" />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  if (onSearchChange) onSearchChange('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 3. Dynamic Category Navigation Tabs (Multi-Page Route Navigation) */}
      <nav 
        style={{
          backgroundColor: 'rgba(5, 20, 15, 0.95)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.22)'
        }}
        className="hidden lg:block px-4 py-1.5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto scrollbar-none py-1">
          {/* 'All Jewels' Tab -> Home '/' */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => `
              px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border
              ${isActive 
                ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fbf3d3] shadow-[0_0_12px_rgba(212,175,55,0.25)]' 
                : 'border-transparent text-[#c3d1cb] hover:text-white hover:border-[#d4af37]/50'
              }
            `}
          >
            All Jewels
          </NavLink>

          {/* Dynamically Rendered Categories mapped to dedicated routes */}
          {categories.map((category) => {
            const targetPath = getCategoryPath(category);
            return (
              <NavLink
                key={category}
                to={targetPath}
                className={({ isActive }) => `
                  px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border
                  ${isActive 
                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fbf3d3] shadow-[0_0_12px_rgba(212,175,55,0.25)]' 
                    : 'border-transparent text-[#c3d1cb] hover:text-white hover:border-[#d4af37]/50'
                  }
                `}
              >
                {category}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] z-50 bg-[#03110c]/98 backdrop-blur-2xl border-t border-[#d4af37]/20 p-6 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Mobile Drawer Brand Emblem */}
            <div className="flex items-center gap-3 pb-3 mb-1 border-b border-[#d4af37]/20">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#d4af37] bg-black shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                <img 
                  src={settings.logoUrl || "/quins-logo.png"} 
                  alt="QUINS" 
                  className="w-full h-full object-cover scale-105" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-royal font-bold text-lg text-white gold-gradient-text leading-none">
                  {settings.brandName || "QUINS"}
                </span>
                <span className="text-[8px] uppercase tracking-widest text-[#d4af37] font-sans mt-0.5">
                  {settings.brandSubtitle || "Curated Premium Jewelry Collection"}
                </span>
              </div>
            </div>

            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
              Jewellery Collections
            </span>

            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                text-left px-4 py-3 rounded-xl text-sm font-semibold transition border flex items-center justify-between
                ${isActive
                  ? 'bg-[#d4af37]/20 text-[#fef4cf] border-[#d4af37]'
                  : 'text-gray-300 border-white/5 hover:bg-[#08291d]'
                }
              `}
            >
              <span>✨ All Jewels</span>
              <span className="text-[10px] text-[#d4af37]">Explore →</span>
            </NavLink>

            {categories.map((category) => {
              const targetPath = getCategoryPath(category);
              return (
                <NavLink
                  key={category}
                  to={targetPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    text-left px-4 py-3 rounded-xl text-sm font-semibold transition border flex items-center justify-between
                    ${isActive
                      ? 'bg-[#d4af37]/20 text-[#fef4cf] border-[#d4af37]'
                      : 'text-gray-300 border-white/5 hover:bg-[#08291d]'
                    }
                  `}
                >
                  <span>{category}</span>
                  <span className="text-[10px] text-[#d4af37]">Explore →</span>
                </NavLink>
              );
            })}

            <div className="pt-6 mt-4 border-t border-[#d4af37]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppContact();
                }}
                className="btn-whatsapp w-full text-sm py-3"
              >
                <Phone size={16} />
                <span>Chat with Royal Stylist</span>
              </button>
              <div className="text-center text-xs text-[#a0b5ab]">
                100% Anti-Tarnish Guarantee • Free Pan-India Delivery
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
