import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How are VELTRON timepieces securely delivered?',
    answer: 'Every acquisition is packaged in our temperature-controlled Geneva workshop and dispatched with dedicated armored transport or fully insured Swiss Priority Air Express. All deliveries require an adult signature and digital identity confirmation upon handover.',
  },
  {
    question: 'What is covered under the VELTRON 5-Year Global Guarantee?',
    answer: 'The guarantee covers all internal micromechanical manufacturing defects, water resistance seals, and accuracy calibration. In the unlikely event servicing is required, our private courier will collect the piece from your residence and return it to Geneva with full insurance.',
  },
  {
    question: 'Can I arrange a private viewing at a VELTRON Salon?',
    answer: 'Yes. Private consultations and personalized wrist fittings are hosted by appointment only at our salons in Geneva, London, New York, Tokyo, and Dubai. Select "Private Salon Appointment" in the inquiry form.',
  },
  {
    question: 'Are bespoke straps and personalized engravings available?',
    answer: 'Custom alligator leather cuts, specialized stitching hues, and laser or hand-engraved caseback monograms can be commissioned directly through our master horologists upon request.',
  },
  {
    question: 'What is the return policy for atelier acquisitions?',
    answer: 'We provide a 30-day complimentary return period for unworn timepieces in original condition with intact factory seals, certificate cards, and the lacquered presentation vault.',
  },
];

export const ConciergeContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Salon Appointment',
    timepieceInterest: 'Obsidian Chrono Grand Prix',
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('submitted');
    }, 800);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="concierge" className="py-24 sm:py-32 bg-[#08080a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
            Private Client Relations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            The VELTRON Concierge
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Our horological advisors are at your service for private acquisitions, boutique salon viewings,
            bespoke strap commissions, and worldwide technical assistance.
          </p>
        </div>

        {/* Contact Form & Salon Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#121216] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2">
              Private Inquiry & Appointment Request
            </h3>
            <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
              Please enter your details below. A dedicated private client advisor will respond within 12 business hours.
            </p>

            {formStatus === 'submitted' ? (
              <div className="p-8 rounded-xl bg-black/50 border border-[#c5a059]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-white">Inquiry Staged for Concierge</h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your request regarding &ldquo;{formData.inquiryType}&rdquo; has been prepared.
                </p>
                <div className="p-3 bg-white/5 rounded border border-white/10 text-[11px] text-zinc-400 font-mono text-left max-w-sm mx-auto space-y-1">
                  <p><strong>Integration Readiness:</strong> Active</p>
                  <p><strong>Target Endpoint:</strong> concierge@veltron-watches.com</p>
                  <p><strong>Patron Email:</strong> {formData.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Private Salon Appointment',
                      timepieceInterest: 'Obsidian Chrono Grand Prix',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-[#c5a059] text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#d4af37] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Lord Alexander Vane"
                      className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alexander@example.com"
                      className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 22 000 0000"
                      className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Inquiry Purpose</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="Private Salon Appointment">Private Salon Appointment</option>
                      <option value="Bespoke Strap or Engraving">Bespoke Strap or Engraving</option>
                      <option value="Technical Caliber Question">Technical Caliber Question</option>
                      <option value="Acquisition Assistance">Acquisition Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Timepiece of Interest</label>
                  <select
                    name="timepieceInterest"
                    value={formData.timepieceInterest}
                    onChange={handleInputChange}
                    className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Obsidian Chrono Grand Prix">Obsidian Chrono Grand Prix</option>
                    <option value="Aurum Chronomaster Royale">Aurum Chronomaster Royale (18K Rose Gold)</option>
                    <option value="Apex Monolith Diver">Apex Monolith Diver (Grade 5 Titanium)</option>
                    <option value="Chronos Classique 1853">Chronos Classique 1853 (Enamel White)</option>
                    <option value="Chronos Fieldmaster Tactical">Chronos Fieldmaster Tactical</option>
                    <option value="Obsidian Nocturne Heritage">Obsidian Nocturne Heritage</option>
                    <option value="General Atelier Inquiry">General Atelier Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Personal Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your request, desired salon date, or technical questions..."
                    className="w-full bg-[#08080a] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a7823e] hover:brightness-110 active:scale-[0.98] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{formStatus === 'submitting' ? 'Transmitting to Geneva...' : 'Dispatch Private Request'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Salons & Direct Contacts (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Direct Line Cards */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-white font-medium">Direct Concierge Communication</h3>
              
              <div className="p-4 rounded-xl bg-[#121216] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Atelier Direct Dispatch</p>
                  <p className="text-xs font-mono text-white font-medium">concierge@veltron-watches.com</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121216] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Geneva Private Line</p>
                  <p className="text-xs font-mono text-white font-medium">+41 22 819 2000 (Mon–Fri 09:00–18:00 CET)</p>
                </div>
              </div>
            </div>

            {/* Worldwide Salons Directory */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">Private Salons & Ateliers</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#141418] border border-white/5 space-y-0.5">
                  <strong className="text-white block font-serif">Geneva Flagship</strong>
                  <span className="text-zinc-400 text-[11px]">14 Rue du Rhône, 1204</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141418] border border-white/5 space-y-0.5">
                  <strong className="text-white block font-serif">London Mayfair</strong>
                  <span className="text-zinc-400 text-[11px]">178 New Bond Street, W1S</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141418] border border-white/5 space-y-0.5">
                  <strong className="text-white block font-serif">New York Salon</strong>
                  <span className="text-zinc-400 text-[11px]">645 Madison Avenue, 10022</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141418] border border-white/5 space-y-0.5">
                  <strong className="text-white block font-serif">Tokyo Ginza</strong>
                  <span className="text-zinc-400 text-[11px]">6-10-1 Ginza, Chuo-ku</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="pt-12 border-t border-white/10 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#c5a059]">Atelier Clarifications</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#121216] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:text-[#c5a059] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c5a059] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 font-light leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
