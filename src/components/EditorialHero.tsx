/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, ShieldAlert, Award, Calendar, CheckCircle, ArrowRight, Sparkles, Microscope, Droplets } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data';

interface HeroProps {
  onBookClick: () => void;
  onPortalClick: () => void;
}

export default function EditorialHero({ onBookClick, onPortalClick }: HeroProps) {
  // Motion container and item configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-12 lg:py-20 border-b border-mint-soft/40" id="hero-section">
      {/* Decorative ambient soft blobs */}
      <div className="absolute top-10 left-[-5%] w-72 h-72 rounded-full bg-mint-accent/15 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-[-5%] w-96 h-96 rounded-full bg-sky-accent/15 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Typography Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-mint-dark tracking-wide uppercase border border-white/60 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-mint-accent" />
              <span>{DOCTOR_PROFILE.headline_anchor}</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display-primary font-bold text-charcoal-clinical tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-display-primary)' }}
            >
              Evidence-Based <span className="text-mint-accent">Skin Health</span> & Clinical Dermatology
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-charcoal-clinical/80 font-display-secondary font-medium italic leading-relaxed"
              style={{ fontFamily: 'var(--font-display-secondary)' }}
            >
              At the {DOCTOR_PROFILE.clinical_entity}, {DOCTOR_PROFILE.name} combines precision diagnostic dermoscopy with scientifically validated medical and aesthetic treatments to restore healthy skin barriers, address chronic dermatoses, and renew patient confidence.
            </motion.p>

            {/* Quick stats grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 w-full sm:w-auto pt-2"
            >
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm flex items-start gap-3">
                <Microscope className="w-5 h-5 text-mint-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-charcoal-clinical text-sm">Polarized Dermoscopy</h4>
                  <p className="text-xs text-charcoal-clinical/60">Non-invasive mole & lesion analysis</p>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm flex items-start gap-3">
                <Droplets className="w-5 h-5 text-sky-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-charcoal-clinical text-sm">Barrier Restoration</h4>
                  <p className="text-xs text-charcoal-clinical/60">Targeted acne, eczema & melasma care</p>
                </div>
              </div>
            </motion.div>

            {/* CTA action group */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 bg-mint-accent hover:bg-mint-dark text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-mint-accent/20 hover:shadow-xl hover:shadow-mint-dark/10 flex items-center justify-center gap-2 group cursor-pointer text-sm tracking-wide"
                style={{ fontFamily: 'var(--font-interface-body)' }}
              >
                <span>Book Skin Consultation</span>
                <Calendar className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onPortalClick}
                className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-md hover:bg-white/70 text-mint-dark font-semibold rounded-2xl border border-white/70 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wide shadow-xs"
                style={{ fontFamily: 'var(--font-interface-body)' }}
              >
                <span>Access Digital File & Regimen</span>
                <ArrowRight className="w-4 h-4 text-mint-accent" />
              </button>
            </motion.div>
          </div>

          {/* Visual Asymmetrical Illustration Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-md aspect-square rounded-[2.5rem] bg-white/30 backdrop-blur-xl p-5 border-2 border-white/60 shadow-2xl"
            >
              {/* Dermatology radiant skin portrait */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                  alt="Clinical Dermatology Consultation" 
                  className="w-full h-full object-cover brightness-[1.02] contrast-[0.98] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Floating soft color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mint-dark/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating review badge */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/70 flex flex-col items-center justify-center text-center max-w-[130px]"
              >
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-xs text-charcoal-clinical font-numerical-data">{DOCTOR_PROFILE.google_rating}</span>
                </div>
                <div className="text-[10px] text-charcoal-clinical/60 font-semibold mt-1">Google Score</div>
                <div className="border-t border-cream-warm w-full my-1.5" />
                <span className="text-[9px] text-mint-dark font-bold uppercase tracking-wider">{DOCTOR_PROFILE.total_reviews} Reviews</span>
              </motion.div>

              {/* Clinical Trust Callout */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/85 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/70 flex items-center gap-3 max-w-[250px]">
                <div className="w-10 h-10 rounded-xl bg-sky-soft/80 flex items-center justify-center text-sky-accent font-semibold text-lg font-numerical-data">
                  14+
                </div>
                <div>
                  <h4 className="font-bold text-xs text-charcoal-clinical">Years Clinical Care</h4>
                  <p className="text-[10px] text-charcoal-clinical/60">Consultant Dermatologist & Trichologist</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
