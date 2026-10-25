import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { WATCH_PRODUCTS } from '../data/products.ts';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openProductModal,
    formatPrice,
    scrollToSection,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = WATCH_PRODUCTS.filter((w) => wishlist.includes(w.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#0d0d11] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08080a]">
          <div>
            <h2 className="font-serif text-xl text-white font-medium">Curated Wishlist</h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {wishlist.length} saved masterpiece{wishlist.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                <Heart className="w-6 h-6 text-[#c5a059]" />
              </div>
              <h3 className="font-serif text-lg text-white font-normal">Your Wishlist is Empty</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Save timepieces as you explore our collections for future private consultation.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  scrollToSection('catalogue');
                }}
                className="mt-4 px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#d4af37] transition-colors"
              >
                Browse Timepieces
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-[#131317] border border-white/10 flex gap-4 items-center"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(product);
                    }}
                    className="w-16 h-16 rounded-lg bg-[#08080a] p-1 border border-white/5 shrink-0 flex items-center justify-center cursor-pointer hover:border-[#c5a059]/40 transition-colors"
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductModal(product);
                      }}
                      className="text-xs font-serif text-white font-medium truncate cursor-pointer hover:text-[#c5a059] transition-colors"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#c5a059] font-light">
                      Series {product.collection}
                    </p>
                    <p className="text-xs font-mono text-zinc-300 font-semibold tabular-nums mt-1">
                      {formatPrice(product.priceUSD)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="py-1 px-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded text-[11px] font-medium tracking-wider uppercase flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#08080a]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium tracking-wider uppercase transition-colors"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
