/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Award, ShieldCheck, Sparkles, Activity, Layers } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data';

export default function ClinicalBiography() {
  const credentials = [
    {
      icon: <GraduationCap className="w-5 h-5 text-mint-accent" />,
      title: "Academic Excellence",
      desc: "MBBS (Calcutta Medical College), MD in Dermatology, Venereology & Leprosy (DVD/MD). Advanced Fellowships in Dermato-Surgery & Aesthetic Laser Medicine."
    },
    {
      icon: <Layers className="w-5 h-5 text-sky-accent" />,
      title: "Philosophy of Care",
      desc: "Barrier-first therapeutic philosophy. Avoiding topical steroid misuse, targeting root causes with polarized dermoscopy, and formulating simplified AM/PM active routines."
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: "Clinical Trust Hub",
      desc: "Rated 4.9 stars across Kalyani and Nadia district. Trusted for persistent cystic acne, recalcitrant melasma, scalp trichology, and chronic eczema remission."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-transparent border-b border-mint-soft/40" id="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Image & Credential Banner Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl overflow-hidden group"
            >
              {/* Profile Image Wrap */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-mint-light/50">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800" 
                  alt={DOCTOR_PROFILE.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-clinical/60 via-transparent to-transparent" />
                
                {/* Embedded credential floating overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur-md rounded-xl p-4 border border-white/60 flex items-center gap-3 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-mint-accent/15 flex items-center justify-center text-mint-accent">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-charcoal-clinical">West Bengal Medical Council</h4>
                    <p className="text-[10px] text-charcoal-clinical/60">Registered Consultant Dermatologist (WBMC-55312)</p>
                  </div>
                </div>
              </div>

              {/* Soothing background accents inside card */}
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-sky-soft/40 blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-mint-soft/40 blur-xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Column 2: Narrative Biography Information */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <span className="text-mint-accent font-semibold tracking-wider text-xs uppercase block">Meet Your Dermatologist</span>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-display-primary font-bold text-charcoal-clinical leading-[1.15]"
                style={{ fontFamily: 'var(--font-display-primary)' }}
              >
                Clinical Dermatology with <br className="hidden sm:inline" />
                <span className="text-mint-accent">{DOCTOR_PROFILE.name}</span>
              </h2>
            </div>

            <div className="h-[2px] w-20 bg-mint-accent" />

            {/* Narrative text with Lora/Palatino typography */}
            <div 
              className="space-y-4 text-base sm:text-lg text-charcoal-clinical/85 font-display-secondary leading-relaxed"
              style={{ fontFamily: 'var(--font-display-secondary)' }}
            >
              <p>
                Dr. Rituparna Manna is a dedicated Consultant Dermatologist, Dermatosurgeon, and Trichologist practicing in Kalyani, West Bengal. As the clinical director of <span className="font-semibold text-charcoal-clinical">{DOCTOR_PROFILE.clinical_entity}</span>, his mission is to liberate patients from cosmetic misinformation and provide scientific, dermatologist-led skincare.
              </p>
              <p>
                From diagnosing complex inflammatory dermatoses using polarized dermoscopy to crafting targeted topical regimens for hormonal cystic acne and stubborn melasma, his clinical consultations focus on rebuilding the stratum corneum barrier and eliminating steroid-induced skin damage.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {credentials.map((cred, i) => (
                <div key={i} className="bg-white/45 backdrop-blur-md border border-white/60 hover:bg-white/60 hover:border-mint-accent/50 rounded-2xl p-4 transition-all duration-300 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-mint-light/80 flex items-center justify-center mb-3">
                    {cred.icon}
                  </div>
                  <h4 className="font-bold text-sm text-charcoal-clinical mb-1">{cred.title}</h4>
                  <p className="text-xs text-charcoal-clinical/75 line-clamp-3 leading-relaxed">{cred.desc}</p>
                </div>
              ))}
            </div>

            {/* Quote of clinical ethos */}
            <div className="bg-white/30 backdrop-blur-md border-l-4 border-mint-accent rounded-r-2xl p-4 mt-2 border border-white/40 shadow-xs">
              <p className="text-sm italic font-display-secondary text-mint-dark leading-relaxed">
                "Healthy skin is neither an overnight miracle nor a shelf filled with cosmetic trends. It is a biological organ that thrives on scientific precision, dedicated sun defense, and stratum corneum barrier integrity."
              </p>
              <span className="text-xs font-semibold text-mint-dark block mt-2">— {DOCTOR_PROFILE.name}, MD Dermatology</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
