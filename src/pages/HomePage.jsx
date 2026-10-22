import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { TrustBadges } from '../components/TrustBadges';
import { JewelryCare } from '../components/JewelryCare';
import { Sparkles, ArrowRight, Gem } from 'lucide-react';
import { getCategoryPath } from '../utils/categoryRoutes';

export function HomePage({ products = [], categories = [], onPayNow, searchQuery = '', onResetFilters }) {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const effectiveSearch = searchQuery || urlSearch;

  // Curated category spotlight cards
  const spotlightCategories = [
    {
      name: 'Bridal Collection',
      path: '/bridal',
      tag: 'Grand Royal Heirlooms',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      description: 'Padmavati Polki Chokers, Maang Tikkas & Imperial Multi-Layer Harams.'
    },
    {
      name: 'Anti-Tarnish',
      path: '/anti-tarnish',
      tag: '100% Waterproof Daily Wear',
      image: 'https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=600&q=80',
      description: '18K PVD coated chains, clover pendants & sweatproof zircon bangles.'
    },
    {
      name: 'Temple Jewellery',
      path: '/temple-jewellery',
      tag: 'Antique South Indian Artistry',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
      description: 'Goddess Lakshmi motifs, Kemp rubies & antique matte finish.'
    },
    {
      name: 'Earrings',
      path: '/earrings',
      tag: 'Chandbalis & Jhumkas',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
      description: 'Statement Kundan jhumkas, lightweight hoops & screw studs.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Royal Hero Banner */}
      <Hero />

      {/* 2. Spotlight Collections Ribbon */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-1">
              Curated Ateliers
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">
              Signature Royal Collections
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs text-[#a2b5ab]">
            Explore handcrafted imperial jewelry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {spotlightCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="glass-card group overflow-hidden rounded-2xl border border-[#d4af37]/25 hover:border-[#d4af37]/70 transition-all duration-300 block text-left no-underline"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#04120b]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04130d] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 badge-gold text-[10px]">
                  {cat.tag}
                </span>
              </div>
              <div className="p-4 bg-[#072118]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#fae59a] transition">
                    {cat.name}
                  </h3>
                  <ArrowRight size={15} className="text-[#d4af37] transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#9eb2a8] line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. The Complete Royal Vault Product Grid */}
      <section id="vault-collection" className="flex-1">
        <ProductGrid
          products={products}
          activeCategory="all"
          searchQuery={effectiveSearch}
          onPayNow={onPayNow}
          onResetFilters={onResetFilters}
        />
      </section>

      {/* 4. Trust Pillars */}
      <TrustBadges />

      {/* 5. Anti-Tarnish Jewelry Care Ritual */}
      <JewelryCare />
    </div>
  );
}
