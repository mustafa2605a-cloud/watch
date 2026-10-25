import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WATCH_COLLECTIONS } from '../data/products.ts';
import { useShop } from '../context/ShopContext.tsx';

export const CollectionsSection: React.FC = () => {
  const { setSelectedCollectionFilter, scrollToSection } = useShop();

  const handleSelectCollection = (collectionId: string) => {
    setSelectedCollectionFilter(collectionId);
    scrollToSection('catalogue');
  };

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#09090b] relative">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase mb-2">
              Curated Series
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              The VELTRON Collections
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedCollectionFilter('All');
                scrollToSection('catalogue');
              }}
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a059] hover:text-white transition-colors"
            >
              <span>View All Timepieces</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Editorial Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {WATCH_COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => handleSelectCollection(col.id)}
              className="group cursor-pointer relative rounded-xl overflow-hidden bg-[#121216] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-500 flex flex-col justify-between min-h-[440px] p-8 sm:p-10 shadow-2xl"
            >
              {/* Card Background Image with Rich Scrim */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={col.heroImage}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.70] group-hover:scale-105 group-hover:brightness-[0.80] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-[#09090c]/70 to-transparent" />
                <div className="absolute inset-0 bg-[#08080a]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Card Top: Numbering & Ethos */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#c5a059]">
                  0{idx + 1}. SERIES
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-medium px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10">
                  Haute Horlogerie
                </span>
              </div>

              {/* Card Bottom: Content & CTA */}
              <div className="relative z-10 space-y-3 pt-24">
                <div className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 font-medium">
                  {col.tagline}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-gold-gradient transition-colors">
                  {col.title}
                </h3>
                <p className="text-zinc-300 text-sm font-light line-clamp-2 max-w-md leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-4 flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#e8c882] group-hover:text-white transition-colors">
                  <span>Explore Series</span>
                  <div className="w-6 h-6 rounded-full border border-[#c5a059]/40 flex items-center justify-center group-hover:border-white transition-colors">
                    <ArrowRight className="w-3 h-3 text-[#c5a059] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
