import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#9db0a6] py-3 overflow-x-auto scrollbar-none font-sans" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center gap-1 hover:text-[#f7e6a1] transition-colors shrink-0"
      >
        <Home size={13} className="text-[#d4af37]" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="text-[#d4af37]/60 shrink-0" />
            {isLast || !item.to ? (
              <span className="text-[#f7e6a1] font-semibold truncate shrink-0 max-w-[240px]">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.to} 
                className="hover:text-[#f7e6a1] transition-colors shrink-0 truncate max-w-[180px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
