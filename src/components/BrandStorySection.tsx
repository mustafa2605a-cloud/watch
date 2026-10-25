import React from 'react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 sm:py-32 bg-[#08080a] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side: The VELTRON Insignia & Watch Atelier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] p-8 shadow-2xl flex flex-col items-center text-center group">
              <div className="w-36 h-36 rounded-full border border-[#c5a059]/40 bg-[#0a0a0d] p-3 flex items-center justify-center overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-black">
                <img
                  src="/assets/aistudio/Design_luxury_watch_brand_logo_20261025103521_cf703313.jpg"
                  alt="VELTRON Official Crest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-150"
                />
              </div>

              <span className="font-cinzel text-2xl font-bold tracking-[0.25em] text-white">
                VELTRON
              </span>
              <span className="text-xs font-mono tracking-[0.35em] text-[#c5a059] uppercase mt-1">
                Genève
              </span>

              <p className="text-xs text-zinc-400 font-light mt-4 max-w-xs leading-relaxed">
                The chevron shield and watch hands in the VELTRON emblem represent the fusion of forward-looking geometry and perpetual horological discipline.
              </p>

              <div className="w-16 h-[1px] bg-[#c5a059]/30 my-6" />

              <div className="grid grid-cols-2 gap-4 w-full text-left text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Design Philosophy</span>
                  <span className="text-zinc-300">Architectural Purity</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Caliber Standard</span>
                  <span className="text-zinc-300">High-Beat Column Wheel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Side */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                The VELTRON Manifesto
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Born From The Belief That True Luxury Is <span className="italic font-normal text-gold-gradient">Uncompromised</span>
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                VELTRON was founded on a singular premise: that modern luxury watchmaking should not merely repeat past conventions,
                nor rely on artificial scarcity or marketing myths. Instead, it must earn its standing through palpable mechanical presence,
                architectural rigor, and uncompromising material execution.
              </p>

              <p>
                Our timepieces are conceived as mechanical sculptures for the wrist. We reject hollow ornamentation in favor
                of clean lines, high-contrast legibility, and hand-finished surfaces that reward microscopic scrutiny.
              </p>

              <p>
                From the tension of our column-wheel pushers to the silent glide of our dual-direction oscillating rotors,
                every sensation is calibrated to communicate confidence, power, and timeless poise.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[#c5a059] uppercase text-[11px] block">01. Precision</span>
                <p className="font-medium text-white">Micron Tolerances</p>
                <p className="text-zinc-400 text-[11px]">Chronometric rigor verified across multiple positions and temperatures.</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[#c5a059] uppercase text-[11px] block">02. Power</span>
                <p className="font-medium text-white">Architectural Presence</p>
                <p className="text-zinc-400 text-[11px]">Assertive silhouettes sculpted from aerospace titanium and solid gold.</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[#c5a059] uppercase text-[11px] block">03. Permanence</span>
                <p className="font-medium text-white">Generational Integrity</p>
                <p className="text-zinc-400 text-[11px]">Designed to maintain mechanical mastery for generations to come.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
