import React, { useState } from 'react';
import { X, User, Package, Shield, Settings, CheckCircle2, Globe, Clock } from 'lucide-react';
import { useShop, Currency } from '../context/ShopContext.tsx';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    orders,
    formatPrice,
    currency,
    setCurrency,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'warranty' | 'settings'>('profile');
  const [email, setEmail] = useState('collector@veltron-client.ch');
  const [name, setName] = useState('Lord Alexander Vane');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isAccountOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#08080a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center">
              <User className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-white font-medium">VELTRON Patron Portal</h2>
              <p className="text-[11px] font-mono text-zinc-400">Atelier Private Registry</p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full transition-colors"
            aria-label="Close account view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-white/10 px-6 bg-[#0a0a0d] gap-6 overflow-x-auto text-xs tracking-wider uppercase font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 relative transition-colors ${
              activeTab === 'profile' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Patron Profile
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({orders.length})</span>
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />}
          </button>

          <button
            onClick={() => setActiveTab('warranty')}
            className={`py-3 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'warranty' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Certificate Vault</span>
            {activeTab === 'warranty' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'text-[#c5a059]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences</span>
            {activeTab === 'settings' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">Membership Tier</span>
                  <h3 className="text-sm font-semibold text-white">VELTRON Circle of Patrons</h3>
                  <p className="text-xs text-zinc-400">Geneva VIP Salon & Private Preview Access</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#c5a059]/20 text-[#e8c882] border border-[#c5a059]/40">
                  Active Member
                </span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Verified Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-colors"
                  >
                    Update Patron Records
                  </button>
                  {saveSuccess && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Changes saved.
                    </span>
                  )}
                </div>
              </form>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
                <strong>Session Architecture Note:</strong> Client profiles and orders are stored in your secure client environment.
                For multi-device synchronization, enterprise single-sign-on or OAuth can be provisioned at the backend integration layer.
              </div>
            </div>
          )}

          {/* Order History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                  <h3 className="font-serif text-base text-white">No Registered Acquisitions Yet</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    When you order a timepiece through our concierge checkout, its live atelier status and tracking ledger will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl bg-[#121216] border border-white/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-white font-semibold">{ord.id}</span>
                          <span className="text-zinc-500">·</span>
                          <span className="text-zinc-400">{ord.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e8c882] text-[10px] font-mono border border-[#c5a059]/30">
                            {ord.status}
                          </span>
                          <span className="font-mono text-white font-semibold tabular-nums">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img
                              src={it.image}
                              alt={it.productName}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-contain bg-[#08080a] p-1 rounded border border-white/5"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">{it.productName}</p>
                              <p className="text-[11px] text-zinc-400">{it.variantName} × {it.quantity}</p>
                            </div>
                            <span className="font-mono text-zinc-300">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-zinc-500 flex items-center justify-between">
                        <span>Courier: {ord.shippingMethod}</span>
                        <span className="text-[#c5a059] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Hand-assembly verification in progress
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Warranty & Certificates Tab */}
          {activeTab === 'warranty' && (
            <div className="space-y-4 max-w-xl text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#141418] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Shield className="w-4 h-4 text-[#c5a059]" />
                  <span>VELTRON 5-Year Global Guarantee</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  All calibers registered to your account include complete mechanical servicing, waterproof testing,
                  and complimentary replacement of sapphire seals at any authorized service center worldwide.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <h4 className="font-medium text-white">Physical Inscribed Warranty Card</h4>
                <p className="text-zinc-400 text-[11px]">
                  Your physical engraved RFID warranty plate is enclosed inside the lacquered wooden presentation box.
                </p>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl text-xs">
              <div>
                <label className="text-zinc-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                  Preferred Currency Display
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['USD', 'EUR', 'GBP', 'CHF'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`py-2 px-3 rounded border text-xs font-mono transition-colors ${
                        currency === c
                          ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#e8c882] font-semibold'
                          : 'border-white/10 bg-[#141418] text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
