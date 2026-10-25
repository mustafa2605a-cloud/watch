import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Landmark, Truck, ArrowLeft, Printer, ExternalLink } from 'lucide-react';
import { useShop, PlacedOrder } from '../context/ShopContext.tsx';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    currency,
    saveOrder,
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  
  // Customer form state
  const [formData, setFormData] = useState({
    firstName: 'Lord Alexander',
    lastName: 'Vane',
    email: 'alexander.vane@veltron-private.com',
    phone: '+41 22 819 2000',
    address: '14 Rue du Rhône',
    city: 'Geneva',
    country: 'Switzerland',
    postalCode: '1204',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'armored'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'sandbox-card' | 'bank-wire'>('sandbox-card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = shippingMethod === 'armored' ? 350 : 0;
  const grandTotal = cartTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillTestCredentials = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('08/29');
    setCardCvc('777');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `VT-${Math.floor(10000 + Math.random() * 90000)}`;
      const order: PlacedOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: cart.map((item) => {
          const variant = item.product.variants.find((v) => v.id === item.variantId);
          return {
            productId: item.product.id,
            productName: item.product.name,
            variantName: variant?.name || 'Standard Edition',
            image: item.product.primaryImage,
            price: item.product.priceUSD + (variant?.priceModifier || 0),
            quantity: item.quantity,
          };
        }),
        customer: { ...formData },
        shippingMethod: shippingMethod === 'armored' ? 'Armored White-Glove Security Courier' : 'Swiss Priority Insured Courier',
        subtotal: cartTotal,
        shippingFee: shippingCost,
        discount: 0,
        total: grandTotal,
        currency,
        status: 'Atelier Testing',
      };

      saveOrder(order);
      setConfirmedOrder(order);
      clearCart();
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e0e12] border border-white/10 sm:rounded-2xl shadow-2xl overflow-hidden max-h-[96vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-lg tracking-[0.2em] font-bold text-white">VELTRON</span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#c5a059]">
              {step === 'confirmation' ? 'Order Confirmed' : 'Private Concierge Checkout'}
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-300 font-mono mb-1">
                    01. Patron & Destination Information
                  </h3>
                  <p className="text-xs text-zinc-400">
                    All shipments are registered and sealed under dual-custody in Geneva.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Phone Number (Courier Alert)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                {/* Shipping Method Selection */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-zinc-300 font-mono">
                    02. Secure Dispatch Tier
                  </h4>

                  <div className="grid grid-cols-1 gap-2">
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                        shippingMethod === 'standard'
                          ? 'border-[#c5a059] bg-[#c5a059]/10'
                          : 'border-white/10 bg-[#121216]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-[#c5a059]" />
                        <div>
                          <p className="font-medium text-white">Swiss Priority Insured Courier</p>
                          <p className="text-[10px] text-zinc-400">Air Express (3–5 Business Days) · Signature Required</p>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-400 font-semibold">Complimentary</span>
                    </label>

                    <label
                      onClick={() => setShippingMethod('armored')}
                      className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                        shippingMethod === 'armored'
                          ? 'border-[#c5a059] bg-[#c5a059]/10'
                          : 'border-white/10 bg-[#121216]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                        <div>
                          <p className="font-medium text-white">Armored White-Glove Security Transport</p>
                          <p className="text-[10px] text-zinc-400">Direct private delivery with on-site horological fitting</p>
                        </div>
                      </div>
                      <span className="font-mono text-zinc-300">+{formatPrice(350)}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] hover:brightness-110 active:scale-[0.98] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all shadow-lg shadow-[#c5a059]/20"
                >
                  Continue to Secure Payment
                </button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#121216] border border-white/10 rounded-xl p-5 space-y-4 h-fit">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono border-b border-white/10 pb-3">
                  Timepiece Order Summary
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => {
                    const variant = item.product.variants.find((v) => v.id === item.variantId);
                    const itemPrice = item.product.priceUSD + (variant?.priceModifier || 0);

                    return (
                      <div key={`${item.product.id}-${item.variantId}`} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-contain bg-[#08080a] p-1 rounded border border-white/5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-white truncate">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-400">{item.quantity} × {variant?.name || 'Standard'}</p>
                        </div>
                        <span className="font-mono text-zinc-300 tabular-nums">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white tabular-nums">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="font-mono text-zinc-300">{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-semibold text-white">
                    <span>Total</span>
                    <span className="font-mono text-sm text-[#e8c882] tabular-nums">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to shipping details</span>
              </button>

              {/* Sandbox Transparency Notice */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30 text-amber-200 text-xs space-y-1">
                <p className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  PREVIEW SANDBOX: Payment Integration Point
                </p>
                <p className="text-[11px] text-amber-300/80 leading-relaxed">
                  This checkout is fully wired for demonstration and integration readiness. No live payment provider is connected yet,
                  so no actual money or credit card will be charged.
                </p>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('sandbox-card')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs transition-colors ${
                    paymentMethod === 'sandbox-card'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                      : 'border-white/10 bg-[#121216] text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#c5a059]" />
                  <span className="font-medium">Credit / Debit Card (Sandbox)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank-wire')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs transition-colors ${
                    paymentMethod === 'bank-wire'
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                      : 'border-white/10 bg-[#121216] text-zinc-400 hover:text-white'
                  }`}
                >
                  <Landmark className="w-5 h-5 text-[#c5a059]" />
                  <span className="font-medium">Private Bank Wire / Pro-Forma</span>
                </button>
              </div>

              {/* Payment Details Container */}
              {paymentMethod === 'sandbox-card' ? (
                <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider uppercase text-zinc-300">
                      Cardholder Payment Information
                    </span>
                    <button
                      type="button"
                      onClick={fillTestCredentials}
                      className="text-[11px] text-[#c5a059] hover:underline font-mono"
                    >
                      Autofill Test Details
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2.5 text-xs text-white font-mono tracking-wider focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Security CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-[#121216] border border-white/10 space-y-3 text-xs text-zinc-300 leading-relaxed">
                  <h4 className="font-semibold text-white">Private Bank Wire Instructions</h4>
                  <p>
                    Upon order submission, a pro-forma invoice with our Geneva banking coordinates (IBAN & BIC/SWIFT)
                    will be transmitted to <strong>{formData.email}</strong>.
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    Your requested timepiece will be held in our vault for 5 business days pending remittance.
                  </p>
                </div>
              )}

              {/* Total Authorization Strip */}
              <div className="p-4 rounded-xl bg-[#08080a] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400">Total Authorization Amount:</span>
                  <p className="text-xl font-mono text-[#e8c882] font-semibold tabular-nums">
                    {formatPrice(grandTotal)}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Currency: {currency}</span>
              </div>

              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all shadow-lg shadow-[#c5a059]/20"
              >
                {isProcessing ? 'Validating Atelier Transmission...' : `Authorize & Reserve Timepiece (${formatPrice(grandTotal)})`}
              </button>
            </div>
          )}

          {step === 'confirmation' && confirmedOrder && (
            <div className="max-w-xl mx-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#c5a059] tracking-widest uppercase">
                  Order Successfully Registered
                </span>
                <h3 className="font-serif text-3xl text-white font-normal">
                  Thank You, {confirmedOrder.customer.firstName}
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your acquisition has been allocated to the Geneva Master Workshop.
                  Reference number <strong className="text-white font-mono">{confirmedOrder.id}</strong>.
                </p>
              </div>

              {/* Itemized Order Details Card */}
              <div className="bg-[#121216] border border-white/10 rounded-xl p-6 text-left space-y-4">
                <div className="flex justify-between text-xs border-b border-white/10 pb-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">Order Date</span>
                    <span className="text-white font-medium">{confirmedOrder.date}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">Current Status</span>
                    <span className="text-[#c5a059] font-medium">{confirmedOrder.status}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">Total Paid</span>
                    <span className="text-white font-mono font-medium">{formatPrice(confirmedOrder.total)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Reserved Timepieces:</span>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={it.image}
                        alt={it.productName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain rounded bg-[#08080a] p-1 border border-white/5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{it.productName}</p>
                        <p className="text-[10px] text-zinc-400">{it.variantName} (Qty: {it.quantity})</p>
                      </div>
                      <span className="font-mono text-zinc-300">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-zinc-400 space-y-1">
                  <p><strong>Insured Courier:</strong> {confirmedOrder.shippingMethod}</p>
                  <p><strong>Destination:</strong> {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.country}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="px-5 py-2.5 bg-[#141418] hover:bg-white/10 border border-white/10 text-white rounded text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
