import React, { useState } from 'react';
import { ArrowUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

export const Footer: React.FC = () => {
  const { scrollToSection, setSelectedCollectionFilter } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setNewsletterEmail('');
    }
  };

  const handleCollectionClick = (colId: string) => {
    setSelectedCollectionFilter(colId);
    scrollToSection('catalogue');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-zinc-400 text-xs">
      {/* Newsletter Strip */}
      <div className="border-b border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
              The VELTRON Gazette
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Receive Private Atelier Bulletins
            </h3>
            <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
              Be the first to examine unreleased small-series complications, private collector salon viewings,
              and horological monographs.
            </p>

            {subscribed ? (
              <div className="py-3 px-4 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e8c882] text-xs flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#c5a059]" />
                <span>Thank you. Your address is registered with the private desk in Geneva.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 flex max-w-md mx-auto gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  className="flex-1 bg-[#121216] border border-white/10 rounded px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-colors whitespace-nowrap"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#121216] flex items-center justify-center p-1 overflow-hidden">
                  <img
                    src="/assets/aistudio/Design_luxury_watch_brand_logo_20261025103521_cf703313.jpg"
                    alt="VELTRON Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-150"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-white">
                    VELTRON
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-[#c5a059] uppercase -mt-1 font-medium">
                    Genève
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 font-light text-xs leading-relaxed max-w-sm">
                Dedicated to micromechanical sovereignty, aerospace metallurgy, and architectural precision.
                Handcrafted timepieces conceived without compromise.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>5-Year Comprehensive Atelier Guarantee</span>
              </div>
            </div>

            {/* Timepiece Series */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">Collections</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCollectionClick('Obsidian')}
                    className="hover:text-white transition-colors"
                  >
                    VELTRON Obsidian
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCollectionClick('Aurum')}
                    className="hover:text-white transition-colors"
                  >
                    VELTRON Aurum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCollectionClick('Apex')}
                    className="hover:text-white transition-colors"
                  >
                    VELTRON Apex
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCollectionClick('Chronos')}
                    className="hover:text-white transition-colors"
                  >
                    VELTRON Chronos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCollectionFilter('All');
                      scrollToSection('catalogue');
                    }}
                    className="text-[#c5a059] hover:underline transition-colors"
                  >
                    Full Atelier Catalogue →
                  </button>
                </li>
              </ul>
            </div>

            {/* Atelier & Maison */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">Maison</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('craftsmanship')} className="hover:text-white transition-colors">
                    Micromechanical Craft
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('story')} className="hover:text-white transition-colors">
                    Our Design Ethos
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    Private Boutiques & Salons
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    Bespoke Commissions
                  </button>
                </li>
              </ul>
            </div>

            {/* Client Relations */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">Concierge</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    Warranty & Servicing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    Insured White-Glove Courier
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    30-Day Atelier Return
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('concierge')} className="hover:text-white transition-colors">
                    Book Salon Appointment
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-[#040405]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} VELTRON Genève S.A. All rights reserved.</span>
            <span>·</span>
            <span>Haute Horlogerie</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Acquisition</span>
            <span className="hover:text-zinc-300 cursor-pointer">Authenticity Registry</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full border border-white/10 hover:border-[#c5a059] text-zinc-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
