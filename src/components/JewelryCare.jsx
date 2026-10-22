import React, { useState } from 'react';
import { Sparkles, Shield, Droplets, Wind, Sun, Heart } from 'lucide-react';

export function JewelryCare() {
  const [activeTab, setActiveTab] = useState(0);

  const tips = [
    {
      title: "Wear After Perfume & Lotions",
      icon: Wind,
      detail: "Apply your perfumes, hairsprays, and cosmetics before wearing your Quins jewelry. While our Anti-Tarnish coating resists light spray, limiting harsh alcohol exposure extends the 24K plating radiance for 3+ years."
    },
    {
      title: "Dry Soft Cloth Wipe",
      icon: Sparkles,
      detail: "After a royal celebration or festive evening, gently wipe your jewelry with the complimentary velvet cloth provided in your packaging. This removes body oils and preserves the uncut stone polish."
    },
    {
      title: "Store in Air-Sealed Velvet Box",
      icon: Shield,
      detail: "Always store each piece individually in your Quins signature emerald velvet pouch or box. Storing them separately prevents surface friction and protects delicate seed pearls and kundan settings."
    },
    {
      title: "Keep Away from Heavy Chemicals",
      icon: Droplets,
      detail: "Our daily wear Anti-Tarnish range is waterproof and sweatproof. For traditional Jadau and Polki sets with intricate dori braided threads, avoid soaking in chlorinated pool water."
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 relative overflow-hidden border border-[#d4af37]/35">
        
        {/* Glow corner */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
              Longevity & Craftsmanship
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mb-4">
              The Anti-Tarnish Care Ritual
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#cbd6d0] leading-relaxed mb-6">
              Every Quins creation is sealed with our proprietary double e-coat nano-lacquer. Follow our four simple royal guidelines to keep your heirlooms sparkling like the day they left the workshop.
            </p>
            <div className="p-4 rounded-xl bg-[#03130d] border border-[#d4af37]/30 inline-flex items-center gap-3">
              <Shield className="text-[#2ac38e]" size={24} />
              <div>
                <h4 className="text-xs font-bold text-white">1-Year Royal Assurance</h4>
                <p className="text-[11px] text-[#93a79c]">Guaranteed plating stability across pan-India climates.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#04160f]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0e3527] flex items-center justify-center text-[#d4af37] mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-[#a2b5aa] leading-relaxed">
                    {tip.detail}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
