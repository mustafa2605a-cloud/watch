import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useShop, Currency } from '../context/ShopContext.tsx';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
    setIsSearchOpen,
    scrollToSection,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'CHF'];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Emblem */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
            aria-label="VELTRON Home"
          >
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#121216] flex items-center justify-center p-1 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/aistudio/Design_luxury_watch_brand_logo_20261025103521_cf703313.jpg"
                alt="VELTRON Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-white transition-colors group-hover:text-[#e8c882]">
                VELTRON
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#c5a059] uppercase -mt-1 font-medium">
                Genève
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-zinc-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('catalogue')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Timepieces
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Craftsmanship
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Our Story
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('concierge')}
              className="hover:text-[#c5a059] transition-colors whitespace-nowrap py-1 relative group"
            >
              Concierge
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Zone 3: Actions & Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-medium tracking-wider text-zinc-300 hover:text-white px-2 py-1.5 rounded border border-white/10 hover:border-[#c5a059]/40 bg-white/5 transition-colors"
                aria-label="Select Currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#c5a059]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-[#121216] border border-[#c5a059]/30 rounded shadow-xl py-1 z-50">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors ${
                        currency === c ? 'text-[#c5a059] bg-white/5 font-semibold' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-300 hover:text-[#c5a059] hover:bg-white/5 rounded-full transition-colors"
              aria-label="Search watches"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-zinc-300 hover:text-[#c5a059] hover:bg-white/5 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c5a059] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-zinc-300 hover:text-[#c5a059] hover:bg-white/5 rounded-full transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c5a059] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-zinc-300 hover:text-[#c5a059] hover:bg-white/5 rounded-full transition-colors"
              aria-label="Account & Orders"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Open mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0d] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4 text-sm font-medium tracking-[0.2em] uppercase text-zinc-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 hover:text-[#c5a059] border-b border-white/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 hover:text-[#c5a059] border-b border-white/5"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('catalogue')}
              className="text-left py-2 hover:text-[#c5a059] border-b border-white/5"
            >
              Timepieces
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship')}
              className="text-left py-2 hover:text-[#c5a059] border-b border-white/5"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 hover:text-[#c5a059] border-b border-white/5"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('concierge')}
              className="text-left py-2 hover:text-[#c5a059]"
            >
              Concierge & Boutiques
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>Currency:</span>
            <div className="flex gap-2">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded text-xs ${currency === c ? 'bg-[#c5a059] text-black font-semibold' : 'bg-white/5 text-zinc-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
