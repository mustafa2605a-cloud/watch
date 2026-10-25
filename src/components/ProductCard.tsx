import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { WatchProduct } from '../data/products.ts';
import { useShop } from '../context/ShopContext.tsx';

interface ProductCardProps {
  product: WatchProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    openProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group cursor-pointer flex flex-col bg-[#111115] rounded-xl overflow-hidden border border-white/10 hover:border-[#c5a059]/40 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/40"
    >
      {/* 65%-75% Height Photographic Showcase */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-[#18181d] via-[#121216] to-[#0c0c0f] overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status / Edition Marker */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
          {product.isLimitedEdition && (
            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-black/60 border border-[#c5a059]/40 text-[#e8c882]">
              Limited {product.editionLimit ? `· ${product.editionLimit} Pcs` : ''}
            </span>
          )}
          {product.isNewArrival && !product.isLimitedEdition && (
            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-black/60 border border-white/20 text-zinc-300">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md border transition-colors ${
            isFavorited
              ? 'bg-[#c5a059] border-[#c5a059] text-black'
              : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white hover:border-[#c5a059]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Hover Quick Action Drawer */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded transition-colors"
            aria-label="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#111115]">
        <div>
          {/* Collection & Specs Tag */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-400 mb-1">
            <span className="uppercase text-[#c5a059]">{product.collection}</span>
            <span>{product.specs.caseDiameter}</span>
          </div>

          {/* Model Name */}
          <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#e8c882] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Price & Movement Info */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-base font-semibold font-mono text-white tabular-nums tracking-tight">
            {formatPrice(product.priceUSD)}
          </span>
          <span className="text-[11px] text-zinc-400 font-light truncate max-w-[120px]">
            {product.specs.movementType.replace(' Haute Horlogerie', '')}
          </span>
        </div>
      </div>
    </div>
  );
};
