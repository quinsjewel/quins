import React from 'react';
import { ShieldCheck, Award, Truck, Gem, RefreshCw, HeartHandshake } from 'lucide-react';

export function TrustBadges() {
  const pillars = [
    {
      icon: Gem,
      title: "24K Micron Gold Electroplating",
      desc: "Heirloom-grade heavy gold deposit creating the authentic luster and richness of real solid 22K/24K gold."
    },
    {
      icon: ShieldCheck,
      title: "100% Anti-Tarnish Protection",
      desc: "Proprietary nano-ceramic coating seals every crevice, ensuring resistance against sweat, humidity, and perfume."
    },
    {
      icon: Award,
      title: "Master Artisan Heritage",
      desc: "Sculpted by generational karigars from Jaipur, South India, and Rajkot with authentic Jadau and Kundan craftsmanship."
    },
    {
      icon: Truck,
      title: "Insured Velvet Box Delivery",
      desc: "Each jewel arrives cushioned in a royal emerald velvet heirloom box with pan-India express tamper-proof delivery."
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 border-y border-[#d4af37]/20 bg-[#03130d]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
            The Sovereign Standard
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">
            Why Queens Choose Quins
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#a4b8ae] mt-2">
            Imitation jewelry reimagined with luxury materials, meticulous finish, and enduring durability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#061e16] border border-[#d4af37]/25 hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#092b20] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#fae59a] transition">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#a2b5aa] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
