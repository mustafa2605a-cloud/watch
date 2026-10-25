import React from 'react';
import { Layers, Sparkles, Shield, Cpu } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#09090c] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
            Metrology & Mechanical Integrity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            Craftsmanship Governed by <br />
            <span className="italic text-gold-gradient font-normal">Absolute Precision</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            At VELTRON, the creation of a mechanical timepiece is treated as an architectural endeavor.
            Every component is machined to tolerances measured in microns, then hand-finished by master watchmakers
            dedicated to enduring excellence.
          </p>
        </div>

        {/* Feature Split 1: Micromechanical Calibers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#141418] border border-white/10 group">
            <img
              src="/assets/aistudio/watch1_9d5552dd.jpg"
              alt="High-Precision VELTRON Chronograph Caliber"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059]">01. Caliber Calibration</span>
              <p className="font-serif text-base text-white font-medium">Column-Wheel & Horizontal Clutch Mechanism</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              <Cpu className="w-4 h-4 text-[#c5a059]" />
              <span>Micromechanical Heart</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
              Every Beat Engineered with Invariant Rhythm
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Our column-wheel chronographs require up to 330 distinct hand-finished components.
              The push-pieces engage with a crisp, tactile resistance engineered to eliminate recoil
              and stutter upon chronograph start, stop, and reset.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span><strong>28,800 vph (4 Hz)</strong> high-frequency balance wheel ensuring exceptional chronometric stability.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span><strong>Glucydur balance wheel & Nivarox hairspring</strong> resistant to magnetic disruption and thermal expansion.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span><strong>Twin-barrel mainspring</strong> delivering continuous, unvarying torque throughout its 72-hour power reserve.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Split 2: Materials & Metallurgy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 lg:pr-6 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              <Layers className="w-4 h-4 text-[#c5a059]" />
              <span>Materials Chosen With Purpose</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
              Aerospace Grade 5 Titanium & Mirror-Polished Gold
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              We select metals and compounds based on acoustic resonance, tensile strength, and tactile warmth.
              From hypoallergenic Grade 5 titanium machined on 5-axis CNC apparatus to our proprietary 18K rose gold alloy,
              every case is sculpted for permanence.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#121216] border border-white/5 space-y-1">
                <h4 className="text-xs font-semibold text-white font-mono uppercase text-[#e8c882]">Grade 5 Titanium</h4>
                <p className="text-zinc-400 text-[11px] leading-relaxed">40% lighter than steel with double the tensile toughness for extreme exploration.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#121216] border border-white/5 space-y-1">
                <h4 className="text-xs font-semibold text-white font-mono uppercase text-[#e8c882]">Zirconia Ceramic</h4>
                <p className="text-zinc-400 text-[11px] leading-relaxed">Diamond-hard bezel inserts impervious to UV degradation, scratches, and salt water.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#141418] border border-white/10 group order-1 lg:order-2">
            <img
              src="/assets/aistudio/watch4_bf70b33a.jpg"
              alt="Sculptural Titanium Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059]">02. Material Engineering</span>
              <p className="font-serif text-base text-white font-medium">Satin-Brushed Titanium & Mineral Slate Geometry</p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-3">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <h4 className="font-serif text-lg text-white font-medium">Hand Anglage</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Each bridge bevel is hand-smoothed using gentian wood and diamond paste to create a mirror-polished 45-degree chamfer.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-3">
            <Layers className="w-5 h-5 text-[#c5a059]" />
            <h4 className="font-serif text-lg text-white font-medium">Côtes de Genève</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Linear ribbing executed onto bridges to disperse light reflections and trap microscopic dust particles away from gears.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-3">
            <Shield className="w-5 h-5 text-[#c5a059]" />
            <h4 className="font-serif text-lg text-white font-medium">Double-Domed Sapphire</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Synthesized corundum crystals treated with multi-layer anti-reflective coatings on both exterior and interior faces.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-3">
            <Cpu className="w-5 h-5 text-[#c5a059]" />
            <h4 className="font-serif text-lg text-white font-medium">70-Hour Dynamism</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Twin mainspring architecture ensuring effortless autonomy throughout long weekends without winding interruption.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
