import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, Shield, Award, CheckCircle2 } from 'lucide-react';
import { resolveCategoryFromSlug, CATEGORY_METADATA } from '../utils/categoryRoutes';

export function CategoryPage({ 
  categoryKey, 
  products = [], 
  categories = [], 
  onPayNow,
  searchQuery = '',
  onResetFilters
}) {
  const { slug } = useParams();

  // Resolve category name: either passed explicitly via dedicated route prop or extracted from URL slug
  const categoryName = useMemo(() => {
    if (categoryKey) return categoryKey;
    if (slug) return resolveCategoryFromSlug(slug, categories);
    return 'Bridal Collection';
  }, [categoryKey, slug, categories]);

  // Retrieve bespoke metadata or provide dynamic fallback
  const meta = useMemo(() => {
    if (CATEGORY_METADATA[categoryName]) {
      return CATEGORY_METADATA[categoryName];
    }
    return {
      title: `${categoryName} Collection`,
      subtitle: `Explore handcrafted royal ${categoryName.toLowerCase()} finished in 24K micron gold plating with anti-tarnish assurance.`,
      bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
      tag: 'Handcrafted Sovereign Collection'
    };
  }, [categoryName]);

  // Filter products for this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase());
  }, [products, categoryName]);

  const breadcrumbs = [
    { label: categoryName, to: null }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Category Dedicated Hero Banner */}
      <section className="relative overflow-hidden py-14 md:py-20 px-4 lg:px-8 border-b border-[#d4af37]/30 bg-[#04160f]">
        
        {/* Background Banner with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={meta.bannerImage}
            alt={categoryName}
            className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04130d] via-[#04130d]/80 to-[#04130d]/90" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-left">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Collection Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#fbf3d3] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={13} className="text-[#d4af37]" />
            <span>{meta.tag}</span>
          </div>

          {/* Category Title */}
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {meta.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-base sm:text-lg text-[#d0dfd7] max-w-2xl leading-relaxed mb-6">
            {meta.subtitle}
          </p>

          {/* Highlights bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#d4af37]/20 text-xs text-[#cad8d1]">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-[#2ac38e]" />
              <span>100% Anti-Tarnish Finish</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={15} className="text-[#d4af37]" />
              <span>24K Micron Gold Electroplated</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#2ac38e]" />
              <span>{categoryProducts.length} Sovereign Jewels Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Product Grid with interactive filters */}
      <main className="flex-1 py-8">
        <ProductGrid
          products={products}
          activeCategory={categoryName}
          searchQuery={searchQuery}
          onPayNow={onPayNow}
          onResetFilters={onResetFilters}
        />
      </main>
    </div>
  );
}
