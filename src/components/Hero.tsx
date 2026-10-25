import React from 'react';
import { ArrowDown, Compass, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

/**
 * Hero Section for VELTRON Genève
 * 
 * NOTE FOR FUTURE ANTIGRAVITY INTEGRATION:
 * The `#veltron-hero-canvas-slot` container below is modularly architected
 * so that the Google Antigravity scroll-driven watch canvas/video frames can
 * be injected directly into this viewport frame without restructuring the site.
 */
export const Hero: React.FC = () => {
  const { scrollToSection } = useShop();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-36 sm:pt-40 pb-16 overflow-hidden bg-[#08080a]"
    >
      {/* Background Lighting & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#c5a059]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-950/20 rounded-full blur-[130px]" />
        {/* Subtle grid lines for architectural precision */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] opacity-40" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column: Brand Statement & Typography */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-7 text-left">
            {/* Editorial Metadata Lead-in */}
            <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.3em] text-[#c5a059] uppercase">
              <span>Haute Horlogerie</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Atelier Genève</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>VELTRON</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.08] text-balance">
              The Architecture of <span className="italic font-normal text-gold-gradient">Timeless Power</span>
            </h1>

            {/* Brand Narrative */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              VELTRON conceives high-complication mechanical timepieces at the convergence of aerospace metallurgy,
              column-wheel precision, and timeless Swiss aesthetic discipline.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => scrollToSection('catalogue')}
                className="px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#c5a059]/20"
              >
                Explore The Collection
              </button>

              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="px-7 py-4 border border-white/20 text-white font-medium text-xs tracking-[0.2em] uppercase rounded-sm hover:border-[#c5a059] hover:text-[#c5a059] hover:bg-white/5 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Discover Our Craft</span>
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>5-Year Global Guarantee</span>
              </div>
              <span className="text-zinc-700">|</span>
              <span>White-Glove Insured Courier</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          {/* Modular slot architected for the future Google Antigravity scroll-driven animation */}
          <div
            id="veltron-hero-canvas-slot"
            className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8"
          >
            {/* Ambient Halo & Orbital Ring */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              
              {/* Outer atmospheric aura */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,rgba(197,160,89,0.02)_50%,transparent_70%)] pointer-events-none" />
              
              {/* Subtle hairline orbital circle with generous padding */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-[#c5a059]/15 pointer-events-none" />

              {/* Cardinal Horological Coordinates */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[#c5a059]/80 uppercase">XII</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[#c5a059]/80 uppercase">VI</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-[#c5a059]/80 uppercase">IX</span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-[#c5a059]/80 uppercase">III</span>

              {/* Floating Product Stage - Ample negative space so image NEVER merges with borders */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 sm:p-12 group">
                <div className="relative w-full h-full max-h-[420px] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/watch2_fc738d32.jpg"
                    alt="VELTRON Aurum Chronomaster Royale"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-105 rounded-xl"
                  />
                </div>

                {/* Refined Masterwork Label with Clean Offset Spacing */}
                <div className="mt-4 px-4 py-2 rounded-full bg-[#121216]/90 backdrop-blur-md border border-white/10 flex items-center gap-3 shadow-lg shadow-black/60">
                  <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-medium">Aurum Series</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs font-serif text-white">Chronomaster Royale</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[10px] font-mono text-zinc-400">18K Rose Gold</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Full-Width Engineering KPI Strip Below the Split */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 pt-10 border-t border-white/10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] uppercase">01. Architecture</span>
            <p className="text-sm font-semibold text-white">Column-Wheel Caliber</p>
            <p className="text-xs text-zinc-400">High-frequency 28,800 vph escapement</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] uppercase">02. Metallurgy</span>
            <p className="text-sm font-semibold text-white">Aerospace Grade 5</p>
            <p className="text-xs text-zinc-400">Titanium & proprietary 18K Aurum</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] uppercase">03. Autonomy</span>
            <p className="text-sm font-semibold text-white">72-Hour Power Reserve</p>
            <p className="text-xs text-zinc-400">Twin-barrel continuous torque</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] uppercase">04. Quality</span>
            <p className="text-sm font-semibold text-white">Geneva Atelier Standard</p>
            <p className="text-xs text-zinc-400">Hand-finished Côtes de Genève</p>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 flex justify-center mt-10">
        <button
          onClick={() => scrollToSection('collections')}
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-[#c5a059] transition-colors focus-visible:outline-none"
          aria-label="Scroll to collections"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Discover</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#c5a059]" />
        </button>
      </div>
    </section>
  );
};
