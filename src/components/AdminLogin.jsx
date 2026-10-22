import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, KeyRound, Crown, ArrowLeft } from 'lucide-react';
import { StoreService } from '../services/store';

export function AdminLogin({ onLoginSuccess, onReturnToStore }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (StoreService.adminLogin(password)) {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#030e09] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0e3b2e]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#881337]/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Secret Vault Card */}
      <div 
        className={`w-full max-w-md p-8 rounded-2xl bg-[#061e16]/95 border border-[#d4af37]/40 shadow-2xl backdrop-blur-xl relative z-10 transition-transform ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {/* Return to store link */}
        <button
          onClick={onReturnToStore}
          className="text-xs text-[#a2b7ac] hover:text-[#f7e6a1] flex items-center gap-1.5 mb-6 transition"
        >
          <ArrowLeft size={14} />
          <span>Return to Public Boutique</span>
        </button>

        {/* QUINS Sovereign Logo Emblem */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#d4af37] mx-auto mb-3.5 shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-black p-1.5 transition-transform hover:scale-105 duration-300">
            <img 
              src="/quins-logo.png" 
              alt="QUINS Sovereign" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-royal text-2xl font-bold tracking-widest text-white gold-gradient-text gold-subtle-glow">
              QUINS SOVEREIGN
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mt-1">
            Restricted Admin Portal
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[#3b0813] border border-[#e11d48] text-xs text-[#fca5a5] mb-4 flex items-center gap-2">
            <ShieldAlert size={16} />
            <span>Invalid Master Password. Access denied.</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#cad6cf] block mb-1.5">
              Enter Sovereign Master Key:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Master Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="royal-input pl-10 pr-10 py-2.5 text-sm"
                autoFocus
              />
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-gold w-full py-3 text-sm font-bold tracking-wider uppercase mt-2"
          >
            Unlock Admin Console
          </button>
        </form>

        {/* Master Key Hint */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-[#8ea397]">
          Default Master Key: <code className="text-[#f7e6a1] bg-[#03130d] px-2 py-0.5 rounded border border-[#d4af37]/30">quins2026</code>
        </div>
      </div>
    </div>
  );
}
