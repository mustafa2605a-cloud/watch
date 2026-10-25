import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { WATCH_PRODUCTS, WatchProduct } from '../data/products.ts';
import { useShop } from '../context/ShopContext.tsx';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openProductModal,
    formatPrice,
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results: WatchProduct[] = term.trim()
    ? WATCH_PRODUCTS.filter((w) => {
        const q = term.toLowerCase();
        return (
          w.name.toLowerCase().includes(q) ||
          w.collection.toLowerCase().includes(q) ||
          w.tagline.toLowerCase().includes(q) ||
          w.specs.caseMaterial.toLowerCase().includes(q) ||
          w.specs.caliber.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: WatchProduct) => {
    setIsSearchOpen(false);
    openProductModal(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#08080a]">
          <Search className="w-5 h-5 text-[#c5a059] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by model, series (Obsidian, Aurum, Apex, Chronos), or titanium..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 border border-white/10 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {term.trim() === '' ? (
            <div className="py-8 text-center text-xs text-zinc-500 space-y-3">
              <p>Quick Searches in the Atelier:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Obsidian', 'Rose Gold', 'Titanium', 'Chronograph', 'Apex', 'Enamel'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTerm(s)}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-zinc-300 rounded border border-white/5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400">
              No timepieces found matching &ldquo;{term}&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase text-[#c5a059] px-2 mb-2">
                Matching Timepieces ({results.length})
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain bg-[#08080a] p-1 rounded border border-white/5"
                    />
                    <div>
                      <h4 className="text-xs font-serif text-white font-medium group-hover:text-[#c5a059] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-light">
                        Series {product.collection} · {product.specs.caliber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-200 tabular-nums">
                      {formatPrice(product.priceUSD)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
