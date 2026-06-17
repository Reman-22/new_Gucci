import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "./ProductCard";

type Props = {
  onClose: () => void;
};

const TRENDING = ["Handbags", "Belts", "Wallets"];

import { useDebounce } from "../hooks/useDebounce";
import { useMemo } from "react";
import { useModalBack } from "../hooks/useModalBack";

export function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // [PERFORMANCE] Debounce search query to prevent heavy filter execution on every keystroke
  const debouncedQuery = useDebounce(query, 300);

  // Coveted products (grab first 3)
  const coveted = PRODUCTS.slice(0, 3);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    
    // [MEMORY LEAK PREVENTION] Unbind listener
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Bind physical back button to close modal
  useModalBack(true, onClose, "search-modal");

  // [PERFORMANCE] Memoize the search results so they are only recalculated when the debounced query actually changes
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    
    const q = debouncedQuery.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.parentCategory.toLowerCase().includes(q) ||
        p.artisan.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* ───── Top Header ───── */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-transparent">
        <div className="w-10" /> {/* Spacer for centering */}
        <Link to="/" onClick={onClose} className="font-serif text-[20px] md:text-[24px] tracking-[0.35em] text-[var(--color-ink)]">
          MAISON ARTÉ
        </Link>
        <button onClick={onClose} className="p-2 text-[var(--color-ink)] hover:opacity-60 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* ───── Search Input Area ───── */}
      <div className="max-w-4xl mx-auto w-full px-6 pt-10 pb-8 text-center">
        <label htmlFor="search-input" className="block text-[11px] tracking-[0.25em] uppercase text-[var(--color-ink-muted)] mb-4 transition-all duration-300">
          Search for:
        </label>
        <div className="relative border-b border-[var(--color-rule)] pb-2 mb-8 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus-within:border-[var(--color-ink)] focus-within:scale-[1.02] focus-within:pb-4 group">
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-center text-[24px] md:text-[32px] font-light outline-none bg-transparent placeholder-[var(--color-rule)] transition-all duration-700 text-[var(--color-ink)] group-focus-within:font-normal"
            placeholder="Type your search here..."
          />
        </div>
        
        {/* Trending */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
          <span>Trending:</span>
          {TRENDING.map((t) => (
            <button key={t} onClick={() => setQuery(t)} className="hover:text-[var(--color-ink)] transition-colors underline underline-offset-4 decoration-1 decoration-[var(--color-rule)] hover:decoration-[var(--color-ink)]">
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ───── Bottom Layout (Sidebar + Content) ───── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-16 overflow-y-auto">
        
        {/* Left Sidebar */}
        <div className="md:col-span-3 space-y-12">
          <div>
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)] mb-6">New In</h3>
            <ul className="space-y-4">
              <li><Link to="/category/Women" onClick={onClose} className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">Women</Link></li>
              <li><Link to="/category/Men" onClick={onClose} className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">Men</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)] mb-6">Find The Perfect Gift</h3>
            <ul className="space-y-4">
              <li><Link to="/category/Gifts" onClick={onClose} className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">Gift Guide</Link></li>
              <li><Link to="/services" onClick={onClose} className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">Store Locations</Link></li>
              <li><Link to="/services" onClick={onClose} className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">Book an Appointment</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-9">
          {debouncedQuery.trim() === "" ? (
            <>
              <h3 className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)] mb-8">Most Coveted</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {coveted.map((p) => (
                  <div key={p.id} onClick={onClose}>
                    <ProductCard product={p} priority={true} />
                  </div>
                ))}
              </div>
            </>
          ) : searchResults.length > 0 ? (
            <>
              <h3 className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)] mb-8">
                Search Results ({searchResults.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {searchResults.map((p) => (
                  <div key={p.id} onClick={onClose}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-[24px]">No matching items found for "{debouncedQuery}"</p>
              <p className="mt-4 text-[13px] text-[var(--color-ink-muted)]">Try checking your spelling or use a more general term.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
