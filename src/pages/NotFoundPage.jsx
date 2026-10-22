import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sparkles, ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#d4af37] bg-black mb-6 shadow-[0_0_35px_rgba(212,175,55,0.4)] p-1">
        <img src="/quins-logo.png" alt="QUINS" className="w-full h-full object-contain" />
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
        Error 404 • Chamber Not Found
      </span>

      <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        Royal Chamber Not Found
      </h1>

      <p className="font-serif text-base sm:text-lg text-[#a2b5ab] max-w-md mx-auto mb-8 leading-relaxed">
        The royal jewelry chamber or page you are seeking does not exist or has been relocated to another palace vault.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="btn-gold text-xs px-7 py-3.5 flex items-center gap-2 no-underline">
          <Home size={15} />
          <span>Return to Public Boutique</span>
        </Link>
        <Link to="/bridal" className="btn-outline-gold text-xs px-6 py-3.5 no-underline">
          <span>Explore Bridal Jewels</span>
        </Link>
      </div>
    </div>
  );
}
