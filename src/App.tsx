/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Calendar, 
  UserCheck,
  Microscope,
  Droplets,
  Layers
} from 'lucide-react';

import EditorialHero from './components/EditorialHero';
import ClinicalBiography from './components/ClinicalBiography';
import PatientPortal from './components/PatientPortal';
import ScheduleGeoMatrix from './components/ScheduleGeoMatrix';
import EducationalMediaHub from './components/EducationalMediaHub';
import SocialProofStream from './components/SocialProofStream';
import { DOCTOR_PROFILE } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic clinical status
  const [clinicStatus, setClinicStatus] = useState({
    text: 'Skin Chambers Open Today • 09:00 AM - 08:00 PM',
    indicatorColor: 'bg-emerald-400',
    ping: true
  });

  useEffect(() => {
    const updateClinicStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const currentTotalMin = currentHour * 60 + currentMin;

      const openTotalMin = 9 * 60;   // 09:00 AM
      const closeTotalMin = 20 * 60; // 08:00 PM

      if (currentTotalMin >= openTotalMin && currentTotalMin < closeTotalMin) {
        setClinicStatus({
          text: 'Skin Chambers Open Now • Closes Today at 08:00 PM',
          indicatorColor: 'bg-emerald-400',
          ping: true
        });
      } else if (currentTotalMin >= closeTotalMin) {
        setClinicStatus({
          text: 'Chambers Closed Now • Opens Tomorrow at 09:00 AM',
          indicatorColor: 'bg-amber-400',
          ping: false
        });
      } else {
        setClinicStatus({
          text: 'Chambers Closed Now • Opens Today at 09:00 AM',
          indicatorColor: 'bg-amber-400',
          ping: false
        });
      }
    };

    updateClinicStatus();
    const intervalId = setInterval(updateClinicStatus, 20000);
    return () => clearInterval(intervalId);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Dr. Manna', id: 'about-section' },
    { label: 'Patient Portal', id: 'portal-section' },
    { label: 'Chambers & Map', id: 'schedule-section' },
    { label: 'Skincare Science', id: 'educational-section' },
    { label: 'Patient Reviews', id: 'testimonials-section' },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between selection:bg-mint-soft selection:text-mint-dark">
      
      {/* SOOTHING TOP BANNER: Real-time clinical status & direct quick actions */}
      <div className="bg-mint-dark/85 backdrop-blur-md text-white text-[11px] font-semibold py-2 px-6 flex justify-between items-center z-40 relative border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${clinicStatus.indicatorColor} ${clinicStatus.ping ? 'animate-ping' : ''}`} />
          <span>{clinicStatus.text}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/90">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> Clinic Helpline: {DOCTOR_PROFILE.contact_number}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Demo Medical Hall, Kalyani
          </span>
        </div>
      </div>

      {/* PREMIUM HEADER NAVIGATION */}
      <header className="sticky top-0 bg-white/30 backdrop-blur-xl border-b border-white/30 z-30 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Title brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-mint-accent flex items-center justify-center text-white shadow-md shadow-mint-accent/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5.5 h-5.5 fill-white" />
            </div>
            <div>
              <span 
                className="font-display-primary font-bold text-base text-charcoal-clinical tracking-tight block"
                style={{ fontFamily: 'var(--font-display-primary)' }}
              >
                {DOCTOR_PROFILE.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-clinical/60 block">
                {DOCTOR_PROFILE.clinical_entity}
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/75 hover:text-mint-accent cursor-pointer transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Call for Book Slot */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('portal-section')}
              className="px-5 py-2.5 bg-mint-accent hover:bg-mint-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal-clinical hover:text-mint-accent transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/40 px-6 py-6 space-y-4 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-xs font-bold uppercase tracking-wider text-charcoal-clinical/85 hover:text-mint-accent py-1 cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
                
                <div className="border-t border-cream-warm pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => scrollToSection('portal-section')}
                    className="w-full py-3 bg-mint-accent hover:bg-mint-dark text-white text-xs font-bold uppercase tracking-wider text-center rounded-xl cursor-pointer"
                  >
                    Book Consultation
                  </button>
                  <a
                    href={`tel:${DOCTOR_PROFILE.contact_number.replace(/\s+/g, '')}`}
                    className="w-full py-3 bg-cream-warm hover:bg-mint-light text-mint-dark text-xs font-bold uppercase tracking-wider text-center rounded-xl border border-mint-soft/60 block"
                  >
                    Call Chambers: {DOCTOR_PROFILE.contact_number}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN LAYOUT SECTIONS */}
      <main className="flex-grow">
        
        {/* Component 1: Editorial Hero with slide-ups */}
        <EditorialHero 
          onBookClick={() => scrollToSection('portal-section')}
          onPortalClick={() => {
            scrollToSection('portal-section');
          }}
        />

        {/* Component 2: Clinical Biography with qualifications */}
        <ClinicalBiography />

        {/* Component 3: Secure Dermatology Patient Portal & Regimens */}
        <PatientPortal />

        {/* Component 4: Schedule and Geo Matrix (Live Map iframe & hours) */}
        <ScheduleGeoMatrix />

        {/* Component 5: Educational Media Hub (Skincare science & vlogs) */}
        <EducationalMediaHub />

        {/* Component 6: Social Proof Stream (Verified patient reviews) */}
        <SocialProofStream />

      </main>

      {/* PREMIUM CLINICAL FOOTER */}
      <footer className="bg-charcoal-clinical/90 backdrop-blur-xl text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-mint-accent flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-display-primary font-bold text-sm tracking-tight block" style={{ fontFamily: 'var(--font-display-primary)' }}>
                  {DOCTOR_PROFILE.name}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/60 block">
                  {DOCTOR_PROFILE.clinical_entity}
                </span>
              </div>
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed font-display-secondary italic">
              Delivering consultant dermatology excellence, evidence-based trichology, and stratum corneum barrier restoration protocols across Kalyani and Nadia. Precision diagnostics without commercial product pressure.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-mint-accent">Navigation Quicklinks</h4>
            <ul className="space-y-2 text-xs text-white/80">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)} 
                    className="hover:text-mint-accent cursor-pointer text-left transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact quick facts */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-mint-accent">Chamber Details</h4>
            <p className="text-xs text-white/80 leading-relaxed font-display-secondary">
              Demo Medical Hall, Near Central Park, Sector 4, Kalyani, Nadia, West Bengal - 741235
            </p>
            <div className="text-xs text-white/90 font-numerical-data pt-1 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-mint-accent" /> Phone: {DOCTOR_PROFILE.contact_number}
              </p>
              <p className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-mint-accent" /> Reg: WBMC-55312 (Consultant Dermatologist)
              </p>
            </div>
          </div>

        </div>

        {/* Licensing and copyright info */}
        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Kalyani Skin & Laser Dermatology Centre. All rights reserved. Dr. Rituparna Manna.</p>
          <div className="flex gap-4">
            <a href="#hero-section" className="hover:text-white transition-colors">Clinical Ethics</a>
            <a href="#hero-section" className="hover:text-white transition-colors">Patient Privacy</a>
            <a href="#hero-section" className="hover:text-white transition-colors">Dermatology Guidelines</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
