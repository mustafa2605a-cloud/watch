import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  timepiece: string;
  quote: string;
  rating: number;
  date: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Henri de Montmirail',
    location: 'Geneva, Switzerland',
    timepiece: 'Aurum Chronomaster Royale (18K Rose Gold)',
    quote: 'The weight distribution on the wrist is impeccable. Having collected independent haute horlogerie for three decades, the hand-chamfered bevels and tactile column-wheel engagement rival the most revered ateliers in the Vallée de Joux.',
    rating: 5,
    date: 'Sample Collector Perspective',
  },
  {
    id: 'rev-2',
    author: 'Jonathan Sterling',
    location: 'London, United Kingdom',
    timepiece: 'Apex Monolith Diver (Grade 5 Titanium)',
    quote: 'The bead-blasted titanium against the mineral grey dial creates an architectural presence unlike anything else in my collection. Understated, featherlight, yet virtually indestructible.',
    rating: 5,
    date: 'Sample Collector Perspective',
  },
  {
    id: 'rev-3',
    author: 'Maximilian Vance',
    location: 'New York, United States',
    timepiece: 'Obsidian Chrono Grand Prix',
    quote: 'The depth of the black PVD combined with warm champagne Super-LumiNova markers produces breathtaking contrast under ambient candlelight. White-glove delivery in the lacquered vault was an extraordinary ritual.',
    rating: 5,
    date: 'Sample Collector Perspective',
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#09090c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
            Patron Impressions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Reflections on Ownership
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            * Sample perspectives for presentation review until initial collector testimonials are published.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_REVIEWS.map((r) => (
            <div
              key={r.id}
              className="p-8 rounded-2xl bg-[#121216] border border-white/10 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>

                <blockquote className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed italic">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-white font-medium">{r.author}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{r.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#c5a059] font-light">
                  <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                  <span>{r.timepiece}</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono pt-1">{r.date}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
