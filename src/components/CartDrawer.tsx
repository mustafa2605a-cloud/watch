import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    formatPrice,
    setIsCheckoutOpen,
    scrollToSection,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VELTRONVIP') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'VIP Atelier 10% privilege applied successfully.', error: false });
    } else if (promoCode.trim().toUpperCase() === 'GENEVA') {
      setDiscountPercent(5);
      setPromoMessage({ text: 'Geneva Salon 5% courtesy applied.', error: false });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'Invalid invitation code. Try "VELTRONVIP".', error: true });
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#0d0d11] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08080a]">
          <div>
            <h2 className="font-serif text-xl text-white font-medium">Atelier Shopping Bag</h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {cart.length === 0 ? 'Empty' : `${cart.length} unique timepiece${cart.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                <ShieldCheck className="w-8 h-8 text-[#c5a059]" />
              </div>
              <h3 className="font-serif text-lg text-white font-normal">Your Bag is Empty</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Discover our curated series of luxury chronographs and high-complication masterworks.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  scrollToSection('catalogue');
                }}
                className="mt-4 px-6 py-3 bg-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#d4af37] transition-colors"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const variant = item.product.variants.find((v) => v.id === item.variantId);
                const unitPrice = item.product.priceUSD + (variant?.priceModifier || 0);

                return (
                  <div
                    key={`${item.product.id}-${item.variantId}`}
                    className="p-4 rounded-xl bg-[#131317] border border-white/10 flex gap-4 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-[#08080a] p-1 border border-white/5 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-serif text-white font-medium truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#c5a059] font-light truncate">
                        {variant?.name || 'Standard Edition'}
                      </p>
                      <p className="text-xs font-mono text-zinc-300 font-semibold tabular-nums mt-1">
                        {formatPrice(unitPrice)}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-white/10 rounded bg-[#08080a] px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
                            className="text-zinc-400 hover:text-white px-1.5 text-xs"
                          >
                            -
                          </button>
                          <span className="text-[11px] font-mono text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
                            className="text-zinc-400 hover:text-white px-1.5 text-xs"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Promotion / VIP Code */}
          {cart.length > 0 && (
            <div className="p-4 rounded-xl bg-[#121216] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
                  Privilege Invitation Code
                </span>
                <span className="text-[10px] text-zinc-500">Try: VELTRONVIP</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code..."
                  className="flex-1 bg-[#08080a] border border-white/10 rounded px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium tracking-wider uppercase transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#08080a] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Atelier Privilege ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Armored Courier & Insurance</span>
                <span className="text-[#c5a059] font-medium">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
                <span>Grand Total</span>
                <span className="font-mono text-base text-[#e8c882] tabular-nums">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] hover:brightness-110 active:scale-[0.98] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20"
            >
              <span>Proceed to Private Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Encrypted 256-Bit SSL Atelier Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
