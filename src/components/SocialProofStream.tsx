/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShieldCheck, ThumbsUp, Sparkles } from 'lucide-react';
import { TESTIMONIALS, DOCTOR_PROFILE } from '../data';

export default function SocialProofStream() {
  // Split reviews into two arrays for counter-scrolling rows
  const firstHalf = TESTIMONIALS.slice(0, 3);
  const secondHalf = TESTIMONIALS.slice(3, 6);

  // Duplicate items for seamless infinite marquee scrolling
  const marqueeRow1 = [...firstHalf, ...firstHalf, ...firstHalf];
  const marqueeRow2 = [...secondHalf, ...secondHalf, ...secondHalf];

  return (
    <section className="py-16 lg:py-24 bg-transparent overflow-hidden border-b border-mint-soft/40" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main stats intro */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-mint-accent font-semibold tracking-wider text-xs uppercase block">Patient Endorsements</span>
            <h2 
              className="text-3xl sm:text-4xl font-display-primary font-bold text-charcoal-clinical leading-tight"
              style={{ fontFamily: 'var(--font-display-primary)' }}
            >
              Stories of Clear Skin, Restored Barriers & Renewed Confidence
            </h2>
            <p className="text-sm text-charcoal-clinical/75 font-display-secondary leading-relaxed">
              Dr. Rituparna Manna is recognized by patients across Kalyani, Nadia, and surrounding regions for ethical clinical dermatology without commercial pressure.
            </p>
          </div>

          {/* Social Proof badges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white/40 backdrop-blur-xl p-5 rounded-2xl border border-white/60 flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="font-bold text-lg font-numerical-data text-charcoal-clinical">{DOCTOR_PROFILE.google_rating}</span>
                <span className="text-xs text-charcoal-clinical/50 font-normal">/ 5</span>
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-charcoal-clinical">Google Rating</h4>
                <p className="text-[10px] text-charcoal-clinical/50">Verified patient reviews</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl p-5 rounded-2xl border border-white/60 flex flex-col justify-between shadow-xl">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl font-numerical-data text-mint-dark">{DOCTOR_PROFILE.total_reviews}</span>
                <span className="text-xs font-semibold text-mint-accent">Verified</span>
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-charcoal-clinical">Total Reviews</h4>
                <p className="text-[10px] text-charcoal-clinical/50">Local Kalyani & Nadia patients</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl p-5 rounded-2xl border border-white/60 flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 text-sky-accent">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wide">100%</span>
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-charcoal-clinical">Clinical Safety</h4>
                <p className="text-[10px] text-charcoal-clinical/50">Evidence-based prescriptions</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* INFINITE SCROLLING TICKERS */}
      <div className="space-y-6 select-none relative">
        {/* Transparent edge gradient masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f7faf8] to-transparent z-10 pointer-events-none opacity-80" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f7faf8] to-transparent z-10 pointer-events-none opacity-80" />

        {/* ROW 1: Forward scrolling */}
        <div className="w-full overflow-hidden py-1">
          <div className="animate-marquee flex gap-6">
            {marqueeRow1.map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                className="w-[280px] sm:w-[360px] bg-white/45 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col justify-between space-y-4 hover:border-mint-accent/40 hover:bg-white/60 transition-all duration-300 flex-shrink-0"
              >
                {/* Review text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-charcoal-clinical/40 font-numerical-data">{rev.date}</span>
                  </div>
                  <p 
                    className="text-xs sm:text-sm text-charcoal-clinical/85 font-display-secondary leading-relaxed line-clamp-4 italic"
                    style={{ fontFamily: 'var(--font-display-secondary)' }}
                  >
                    "{rev.reviewText}"
                  </p>
                </div>

                {/* Patient Profiler */}
                <div className="border-t border-white/40 pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-charcoal-clinical font-display-secondary" style={{ fontFamily: 'var(--font-display-secondary)' }}>
                      {rev.patientName}
                    </h4>
                    <p className="text-[10px] text-charcoal-clinical/50">{rev.location} • {rev.skinCondition}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-mint-light/80 text-[9px] font-bold text-mint-dark uppercase tracking-wider px-2 py-0.5 rounded-full border border-mint-accent/15">
                    <ThumbsUp className="w-2.5 h-2.5 text-mint-accent fill-mint-accent" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Reverse scrolling */}
        <div className="w-full overflow-hidden py-1">
          <div className="animate-marquee-reverse flex gap-6">
            {marqueeRow2.map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                className="w-[280px] sm:w-[360px] bg-white/45 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col justify-between space-y-4 hover:border-mint-accent/40 hover:bg-white/60 transition-all duration-300 flex-shrink-0"
              >
                {/* Review text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-charcoal-clinical/40 font-numerical-data">{rev.date}</span>
                  </div>
                  <p 
                    className="text-xs sm:text-sm text-charcoal-clinical/85 font-display-secondary leading-relaxed line-clamp-4 italic"
                    style={{ fontFamily: 'var(--font-display-secondary)' }}
                  >
                    "{rev.reviewText}"
                  </p>
                </div>

                {/* Patient Profiler */}
                <div className="border-t border-white/40 pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-charcoal-clinical font-display-secondary" style={{ fontFamily: 'var(--font-display-secondary)' }}>
                      {rev.patientName}
                    </h4>
                    <p className="text-[10px] text-charcoal-clinical/50">{rev.location} • {rev.skinCondition}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-mint-light/80 text-[9px] font-bold text-mint-dark uppercase tracking-wider px-2 py-0.5 rounded-full border border-mint-accent/15">
                    <ThumbsUp className="w-2.5 h-2.5 text-mint-accent fill-mint-accent" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall social consensus message */}
        <div className="max-w-xl mx-auto text-center px-6 pt-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-mint-accent animate-pulse" />
          <p className="text-xs text-charcoal-clinical/60 font-medium">
            Continuously updated from our verified dermatology practice registries on Google Maps.
          </p>
        </div>

      </div>
    </section>
  );
}
