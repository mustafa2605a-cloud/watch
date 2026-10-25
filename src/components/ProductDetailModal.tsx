import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, ZoomIn, Check, ChevronRight } from 'lucide-react';
import { WatchProduct, WATCH_PRODUCTS } from '../data/products.ts';
import { useShop } from '../context/ShopContext.tsx';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductModal,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'craft' | 'inclusions' | 'shipping'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedVariantId(selectedProduct.variants[0]?.id || '');
      setQuantity(1);
      setActiveTab('specs');
      setIsZoomed(false);
      setAddedNotice(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const currentVariant = selectedProduct.variants.find((v) => v.id === selectedVariantId) || selectedProduct.variants[0];
  const calculatedPrice = selectedProduct.priceUSD + (currentVariant?.priceModifier || 0);
  const isFavorited = isInWishlist(selectedProduct.id);

  const images = selectedProduct.secondaryImages && selectedProduct.secondaryImages.length > 0
    ? selectedProduct.secondaryImages
    : [selectedProduct.primaryImage];

  const currentImage = images[activeImageIndex] || selectedProduct.primaryImage;

  const relatedProducts = WATCH_PRODUCTS
    .filter((w) => w.id !== selectedProduct.id && w.collection === selectedProduct.collection)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentVariant?.id, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0d0d11] border border-white/10 sm:rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[100vh] sm:max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080a]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a059] uppercase">
            <span>VELTRON Genève</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">{selectedProduct.collection} Series</span>
          </div>

          <button
            onClick={closeProductModal}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-12">
          
          {/* Main PDP Grid (Gallery Left, Purchase Module Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Gallery Column (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Image Viewport */}
              <div className="relative aspect-[4/3] sm:aspect-square bg-gradient-to-b from-[#18181d] to-[#0c0c0f] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-8 group">
                <img
                  src={currentImage}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Zoom Affordance */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-4 right-4 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  title={isZoomed ? 'Reset view' : 'Magnify image'}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Status Badge */}
                {selectedProduct.isLimitedEdition && (
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded bg-black/70 border border-[#c5a059]/40 text-[#e8c882]">
                    Limited Edition · {selectedProduct.editionLimit} Pieces Worldwide
                  </div>
                )}
              </div>

              {/* Thumbnails Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border p-2 bg-[#141418] shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${selectedProduct.name} angle ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Atelier Trust Highlights Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059] mx-auto" />
                  <p className="text-[11px] font-medium text-white">5-Year Global Warranty</p>
                  <p className="text-[10px] text-zinc-500">Fully serviced in Geneva</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <Truck className="w-4 h-4 text-[#c5a059] mx-auto" />
                  <p className="text-[11px] font-medium text-white">White-Glove Courier</p>
                  <p className="text-[10px] text-zinc-500">100% Insured Delivery</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <RefreshCw className="w-4 h-4 text-[#c5a059] mx-auto" />
                  <p className="text-[11px] font-medium text-white">30-Day Complimentary</p>
                  <p className="text-[10px] text-zinc-500">Atelier return guarantee</p>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Column (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Product Header */}
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                  Series {selectedProduct.collection}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                  {selectedProduct.name}
                </h1>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>
              </div>

              {/* Dynamic Price Display */}
              <div className="py-3 border-y border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block mb-0.5">Atelier Price (Excl. Duties)</span>
                  <div className="text-2xl sm:text-3xl font-semibold font-mono text-white tracking-tight tabular-nums">
                    {formatPrice(calculatedPrice)}
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded bg-emerald-950/40 border border-emerald-800/40">
                  In Stock · Ready for Delivery
                </span>
              </div>

              {/* Strap / Bracelet Variant Selector */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">Strap / Bracelet Choice:</span>
                    <span className="text-zinc-400 font-mono">{currentVariant?.strapMaterial}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          selectedVariantId === v.id
                            ? 'border-[#c5a059] bg-[#c5a059]/10 text-white shadow-sm'
                            : 'border-white/10 bg-[#121216] text-zinc-300 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-3 h-3 rounded-full border ${
                              selectedVariantId === v.id ? 'bg-[#c5a059] border-[#c5a059]' : 'border-zinc-500'
                            }`}
                          />
                          <span className="font-medium">{v.name}</span>
                        </div>
                        <span className="font-mono text-zinc-400">
                          {v.priceModifier === 0
                            ? 'Standard'
                            : v.priceModifier > 0
                            ? `+${formatPrice(v.priceModifier)}`
                            : `-${formatPrice(Math.abs(v.priceModifier))}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-white/20 rounded-lg bg-[#121216] px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-zinc-400 hover:text-white px-2 py-0.5 text-base font-medium"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-semibold text-white px-3 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-zinc-400 hover:text-white px-2 py-0.5 text-base font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] hover:brightness-110 active:scale-[0.98] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedNotice ? 'Added to Bag' : 'Acquire Timepiece'}</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3.5 rounded-lg border transition-colors ${
                      isFavorited
                        ? 'bg-[#c5a059] border-[#c5a059] text-black'
                        : 'bg-[#121216] border-white/10 text-zinc-400 hover:text-white hover:border-[#c5a059]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Feedback Banner */}
                {addedNotice && (
                  <div className="p-3 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e8c882] text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#c5a059]" />
                    <span>Added to your Atelier Shopping Bag. View your bag to proceed.</span>
                  </div>
                )}
              </div>

              {/* Horology Narrative Excerpt */}
              <div className="pt-2 text-xs text-zinc-400 font-light leading-relaxed border-t border-white/10">
                <p>{selectedProduct.overviewStory}</p>
              </div>

            </div>
          </div>

          {/* Deep Technical Specifications & Craftsmanship Tabs */}
          <div className="pt-8 border-t border-white/10">
            {/* Tabs Header */}
            <div className="flex border-b border-white/10 gap-6 overflow-x-auto text-xs tracking-[0.15em] uppercase font-medium">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'specs' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Technical Specifications
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('craft')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'craft' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Metrology & Finishing
                {activeTab === 'craft' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'inclusions' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Presentation Vault
                {activeTab === 'inclusions' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'shipping' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Delivery & Concierge
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />
                )}
              </button>
            </div>

            {/* Tab 1: Technical Specifications Table */}
            {activeTab === 'specs' && (
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
                <div className="space-y-3">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Caliber Reference</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.caliber}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Movement Mechanism</span>
                    <span className="text-white font-medium">{selectedProduct.specs.movementType}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Power Reserve</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.powerReserve}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Oscillating Frequency</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.frequency}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Bearing Jewels</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.jewels} Synthetic Rubies</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Case Dimensions</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.caseDiameter} × {selectedProduct.specs.caseThickness}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Chassis Material</span>
                    <span className="text-white font-medium">{selectedProduct.specs.caseMaterial}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Water Ingress Rating</span>
                    <span className="font-mono text-white font-medium">{selectedProduct.specs.waterResistance}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Crystal Glass</span>
                    <span className="text-white font-medium">{selectedProduct.specs.crystal}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">Caseback Exhibition</span>
                    <span className="text-white font-medium">{selectedProduct.specs.caseback}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Metrology & Finishing */}
            {activeTab === 'craft' && (
              <div className="py-6 space-y-4 text-xs text-zinc-300 font-light leading-relaxed max-w-3xl">
                <p>{selectedProduct.craftsmanshipNotes}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-lg bg-[#141418] border border-white/5 space-y-1">
                    <h4 className="font-medium text-white">Manual Anglage & Perlage</h4>
                    <p className="text-zinc-400 text-[11px]">Bridges chamfered by hand with gentian wood pegs to achieve mirror luster.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#141418] border border-white/5 space-y-1">
                    <h4 className="font-medium text-white">Oscillating Rotor</h4>
                    <p className="text-zinc-400 text-[11px]">Heavy metal or 22K gold rotor for bidirectional winding efficiency.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Presentation Vault */}
            {activeTab === 'inclusions' && (
              <div className="py-6 space-y-3">
                <p className="text-xs text-zinc-400 mb-2">Every VELTRON timepiece is accompanied by:</p>
                <ul className="space-y-2">
                  {selectedProduct.boxIncludes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 4: Delivery & Concierge */}
            {activeTab === 'shipping' && (
              <div className="py-6 space-y-4 text-xs text-zinc-300 font-light leading-relaxed max-w-3xl">
                <p>
                  All orders are dispatched via temperature-controlled, armored private courier from our Geneva facility.
                  Deliveries are fully insured from departure until client signature confirmation.
                </p>
                <div className="p-4 rounded-lg bg-[#141418] border border-white/5 space-y-2">
                  <h4 className="font-medium text-white">Private Concierge Appointments</h4>
                  <p className="text-zinc-400 text-[11px]">
                    Clients may request hand-delivery at any VELTRON Boutique in Geneva, London, New York, Tokyo, or Dubai.
                    Our watchmakers will perform custom sizing on-site.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Watches Row */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="font-serif text-lg text-white font-medium">
                Related {selectedProduct.collection} Timepieces
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openProductModal(rel)}
                    className="p-3 rounded-lg bg-[#141418] border border-white/10 hover:border-[#c5a059]/40 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={rel.primaryImage}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-contain rounded bg-[#0d0d10] p-1"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-medium text-white truncate">{rel.name}</h4>
                      <p className="text-[11px] font-mono text-[#c5a059]">{formatPrice(rel.priceUSD)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
