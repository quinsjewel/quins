import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Truck, Award, MessageCircle, ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 px-4 lg:px-8 border-b border-[#d4af37]/20">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#165a44]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#881337]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Royal Headline & Story */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Royal Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 text-[#fbf3d3] text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={13} className="text-[#d4af37]" />
            <span>The Sovereign Collection • 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-wide mb-6">
            Heirloom Grandeur, <br />
            <span className="gold-gradient-text gold-subtle-glow">
              Crafted for Queens.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-lg sm:text-xl text-[#d4ded8] max-w-2xl leading-relaxed mb-8">
            Immerse yourself in authentic Indian heritage. Handcrafted with 24K micron gold electroplating and proprietary anti-tarnish protective lacquer. Indistinguishable from solid gold, built to treasure forever.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/bridal"
              className="btn-gold px-7 py-3 text-sm shine-effect no-underline"
            >
              <span>Explore Bridal Jewels</span>
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/anti-tarnish"
              className="btn-outline-gold px-6 py-3 text-sm no-underline"
            >
              <span>View Anti-Tarnish Daily Wear</span>
            </Link>
          </div>

          {/* 4 Trust Value Props */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-[#d4af37]/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0e3527] border border-[#d4af37]/30 text-[#d4af37]">
                <Shield size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Anti-Tarnish</h4>
                <p className="text-[11px] text-[#9db2a8]">Nano-Coated</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0e3527] border border-[#d4af37]/30 text-[#d4af37]">
                <Award size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">24K Plated</h4>
                <p className="text-[11px] text-[#9db2a8]">Heirloom Finish</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0e3527] border border-[#d4af37]/30 text-[#d4af37]">
                <Truck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pan-India</h4>
                <p className="text-[11px] text-[#9db2a8]">Free Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0e3527] border border-[#d4af37]/30 text-[#d4af37]">
                <MessageCircle size={16} className="text-[#25D366]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp</h4>
                <p className="text-[11px] text-[#9db2a8]">Instant Inquiries</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual Jewel Feature */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Golden Frame Ornament */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#d4af37] via-[#881337] to-[#d4af37] opacity-40 blur-sm" />
            
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#082218]">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Quins Royal Bridal Jewellery Masterpiece"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Luxury Glass Label */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#04140e]/85 backdrop-blur-md border border-[#d4af37]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-widest">
                      Featured Masterpiece
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Padmavati Imperial Polki Set
                    </h3>
                    <p className="text-xs text-[#a7bdba]">24K Micron Gold Plated • Uncut Kundan</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-gray-400">₹9,999</span>
                    <div className="text-base font-bold text-[#f7e6a1]">₹4,899</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
