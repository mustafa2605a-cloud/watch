import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { WATCH_PRODUCTS, WATCH_COLLECTIONS, WatchProduct } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { useShop } from '../context/ShopContext.tsx';

export const ProductCatalogue: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCollectionFilter,
    setSelectedCollectionFilter,
    sortOption,
    setSortOption,
  } = useShop();

  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(35000);

  const materials = ['All', 'Stainless Steel', '18K Rose Gold', 'Grade 5 Titanium'];

  const filteredProducts = useMemo(() => {
    return WATCH_PRODUCTS.filter((item) => {
      // Collection filter
      if (selectedCollectionFilter !== 'All' && item.collection !== selectedCollectionFilter) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'All') {
        if (!item.specs.caseMaterial.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }
      // Price filter
      if (item.priceUSD > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCollection = item.collection.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesCaliber = item.specs.caliber.toLowerCase().includes(query);
        if (!matchesName && !matchesCollection && !matchesTagline && !matchesCaliber) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortOption === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCollectionFilter, selectedMaterial, maxPrice, searchQuery, sortOption]);

  const handleResetFilters = () => {
    setSelectedCollectionFilter('All');
    setSelectedMaterial('All');
    setMaxPrice(35000);
    setSearchQuery('');
    setSortOption('featured');
  };

  return (
    <section id="catalogue" className="py-24 sm:py-32 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
            The Atelier Registry
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Masterpiece Catalogue
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Every VELTRON caliber is manufactured in strictly regulated small series.
            Explore our contemporary lineup spanning aerospace titanium, ceramic chronographs, and 18K aurum alloys.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#121216] border border-white/10 rounded-xl p-4 sm:p-6 mb-12 space-y-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search caliber, collection, or material..."
                className="w-full bg-[#08080a] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting & Material Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Material Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 hidden sm:inline">Material:</span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="bg-[#08080a] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a059]"
                >
                  {materials.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-[#08080a] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Model Name (A–Z)</option>
                </select>
              </div>

              {/* Reset button */}
              {(selectedCollectionFilter !== 'All' || selectedMaterial !== 'All' || searchQuery !== '' || sortOption !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="p-2 text-zinc-400 hover:text-[#c5a059] hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1 text-xs"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Collection Filter Tabs */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 mr-2 flex items-center gap-1.5 font-mono">
              <SlidersHorizontal className="w-3 h-3 text-[#c5a059]" />
              Series:
            </span>
            <button
              onClick={() => setSelectedCollectionFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-colors ${
                selectedCollectionFilter === 'All'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-[#08080a] text-zinc-300 hover:text-white hover:border-[#c5a059]/40 border border-white/10'
              }`}
            >
              All Series ({WATCH_PRODUCTS.length})
            </button>
            {WATCH_COLLECTIONS.map((c) => {
              const count = WATCH_PRODUCTS.filter((w) => w.collection === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCollectionFilter(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-colors ${
                    selectedCollectionFilter === c.id
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'bg-[#08080a] text-zinc-300 hover:text-white hover:border-[#c5a059]/40 border border-white/10'
                  }`}
                >
                  {c.id} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 text-xs text-zinc-400">
          <span>
            Displaying <strong className="text-white font-mono">{filteredProducts.length}</strong> of{' '}
            <span className="font-mono">{WATCH_PRODUCTS.length}</span> timepieces
          </span>
          {selectedCollectionFilter !== 'All' && (
            <span className="text-[#c5a059] font-mono">Filter: Series {selectedCollectionFilter}</span>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-24 bg-[#121216] rounded-xl border border-white/10 p-8">
            <p className="font-serif text-xl text-white mb-2">No Matching Calibers Found</p>
            <p className="text-zinc-400 text-xs max-w-md mx-auto mb-6">
              We could not find any timepieces matching your current filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#c5a059] text-black text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#d4af37] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
