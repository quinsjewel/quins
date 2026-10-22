import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Check, RefreshCw, Sparkles } from 'lucide-react';

export function ProductGrid({ 
  products = [], 
  activeCategory = 'all', 
  searchQuery = '', 
  onPayNow,
  onResetFilters
}) {
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Filter products based on search, category, price, and stock
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== 'all' && item.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        const matchesSku = (item.id || '').toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc && !matchesSku) {
          return false;
        }
      }

      // 3. Price Filter
      if (selectedPriceRange === 'under1500' && item.price >= 1500) return false;
      if (selectedPriceRange === '1500to3000' && (item.price < 1500 || item.price > 3000)) return false;
      if (selectedPriceRange === '3000to5000' && (item.price < 3000 || item.price > 5000)) return false;
      if (selectedPriceRange === 'above5000' && item.price <= 5000) return false;

      // 4. In Stock Filter
      if (inStockOnly && item.inStock === false) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
      return 0; // featured/default
    });
  }, [products, activeCategory, searchQuery, selectedPriceRange, inStockOnly, sortBy]);

  return (
    <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Filter and Controls Bar */}
      <div className="glass-panel p-4 sm:p-5 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Active Collection Name & Product Count */}
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#d4af37]" />
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-white capitalize">
                {activeCategory === 'all' ? 'The Complete Royal Vault' : activeCategory}
              </h2>
            </div>
            <p className="text-xs text-[#a5b8b0] mt-0.5">
              Showing <span className="text-[#f7e6a1] font-semibold">{filteredProducts.length}</span> handcrafted royal jewels
            </p>
          </div>

          {/* Right Controls: Price Filters, Stock Toggle, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Price Range Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under1500', label: '< ₹1.5K' },
                { id: '1500to3000', label: '₹1.5K - ₹3K' },
                { id: '3000to5000', label: '₹3K - ₹5K' },
                { id: 'above5000', label: '> ₹5K' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriceRange(p.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                    selectedPriceRange === p.id
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fbf3d3] font-semibold'
                      : 'border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* In Stock Only Switch */}
            <label className="flex items-center gap-2 cursor-pointer bg-[#07241a] border border-[#d4af37]/20 px-3 py-1.5 rounded-full text-xs text-gray-200 select-none hover:border-[#d4af37]/40">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-[#2ac38e] w-3.5 h-3.5"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#07241a] border border-[#d4af37]/25 px-3 py-1.5 rounded-full text-xs text-gray-200">
              <ArrowUpDown size={13} className="text-[#d4af37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-200 text-xs outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#051c14] text-white">Sort: Featured</option>
                <option value="priceAsc" className="bg-[#051c14] text-white">Price: Low to High</option>
                <option value="priceDesc" className="bg-[#051c14] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#051c14] text-white">Customer Rating</option>
                <option value="newest" className="bg-[#051c14] text-white">Newest Arrivals</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPayNow={onPayNow}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-12 text-center max-w-lg mx-auto my-12 border border-[#d4af37]/30">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#0d3427] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
            <RefreshCw size={24} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-2">
            No Royal Jewels Found
          </h3>
          <p className="text-sm text-[#9db2a8] mb-6">
            We couldn't find any jewellery matching your exact filters. Try broadening your criteria or exploring other collections.
          </p>
          <button
            onClick={() => {
              setSelectedPriceRange('all');
              setInStockOnly(false);
              onResetFilters();
            }}
            className="btn-gold text-xs px-6 py-2.5"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}
