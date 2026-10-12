/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  FileText, 
  User, 
  Phone, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Search, 
  Lock, 
  Activity, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  AlertCircle, 
  Copy, 
  Check, 
  Printer,
  Sparkles,
  ShieldCheck,
  Microscope,
  Droplets,
  Sun,
  Moon
} from 'lucide-react';
import { MOCK_PRESCRIPTIONS } from '../data';
import { AppointmentIntent, PatientPrescription } from '../types';

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState<'booking' | 'prescription'>('booking');

  // Booking Wizard State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [bookingForm, setBookingForm] = useState<AppointmentIntent>({
    patientName: '',
    patientAge: '',
    gender: 'female',
    skinConcernCategory: 'acne-breakouts',
    skinType: 'combination',
    urgency: 'routine',
    contactPhone: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('');

  // Prescription Retrieval State
  const [patientIdInput, setPatientIdInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [retrievedPrescription, setRetrievedPrescription] = useState<PatientPrescription | null>(null);
  const [hoveredRecoveryIndex, setHoveredRecoveryIndex] = useState<number | null>(null);

  // Copy / Download Feedback
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [copiedPrescription, setCopiedPrescription] = useState(false);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.error("Print blocked by sandbox:", err);
      alert("Printing is blocked by the browser sandbox inside this preview iframe. Please click the 'Open in New Tab' button in the top-right corner of the preview to print, or use our 'Copy Consultation Details' button below!");
    }
  };

  const handleCopyReceipt = () => {
    const text = `==================================================
       KALYANI SKIN & LASER DERMATOLOGY CENTRE
==================================================
Booking ID:      ${createdBookingId}
Patient Name:    ${bookingForm.patientName} (${bookingForm.patientAge || 'Adult'})
Gender / Type:   ${bookingForm.gender} / ${bookingForm.skinType} skin
Concern:         ${bookingForm.skinConcernCategory.replace(/-/g, ' ').toUpperCase()}
Urgency:         ${bookingForm.urgency.toUpperCase()}
Contact Phone:   ${bookingForm.contactPhone}
--------------------------------------------------
APPOINTMENT SCHEDULE:
Date:            ${bookingForm.preferredDate}
Time Slot:       ${bookingForm.preferredTime}
--------------------------------------------------
Clinic Address:  Demo Medical Hall, Near Central Park,
                 Sector 4, Kalyani, Nadia 741235
Contact:         +91 98765 43210
==================================================
Please present this digital confirmation upon arrival.`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handleDownloadReceipt = () => {
    const text = `==================================================
       KALYANI SKIN & LASER DERMATOLOGY CENTRE
==================================================
Booking ID:      ${createdBookingId}
Patient Name:    ${bookingForm.patientName} (${bookingForm.patientAge || 'Adult'})
Gender / Type:   ${bookingForm.gender} / ${bookingForm.skinType} skin
Concern:         ${bookingForm.skinConcernCategory.replace(/-/g, ' ').toUpperCase()}
Urgency:         ${bookingForm.urgency.toUpperCase()}
Contact Phone:   ${bookingForm.contactPhone}
--------------------------------------------------
APPOINTMENT SCHEDULE:
Date:            ${bookingForm.preferredDate}
Time Slot:       ${bookingForm.preferredTime}
--------------------------------------------------
Clinic Address:  Demo Medical Hall, Near Central Park,
                 Sector 4, Kalyani, Nadia 741235
Contact:         +91 98765 43210
==================================================
Please present this digital confirmation upon arrival.`;
    
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `skin-consultation-${createdBookingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyPrescription = () => {
    if (!retrievedPrescription) return;
    const text = `==================================================
       KALYANI SKIN & LASER DERMATOLOGY CENTRE
       Dr. Rituparna Manna, MBBS (Cal), MD Dermatology
==================================================
Patient File ID:   ${retrievedPrescription.patientId}
Patient Name:      ${retrievedPrescription.patientName} (${retrievedPrescription.patientAge}, ${retrievedPrescription.gender})
Skin Type:         ${retrievedPrescription.skinType}
Consultation Date: ${retrievedPrescription.date}
--------------------------------------------------
DIAGNOSIS:
${retrievedPrescription.diagnosis}

DERMOSCOPY FINDINGS:
${retrievedPrescription.dermoscopyFindings}
--------------------------------------------------
PRESCRIPTION (Rx):
${retrievedPrescription.medications.map(med => `- [${med.timing}] ${med.name} (${med.dosage}): ${med.frequency} for ${med.duration} | Instructions: ${med.instructions}`).join('\n')}

DAILY SKINCARE REGIMEN:
MORNING (AM):
${retrievedPrescription.skincareRegimen.morningRoutine.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n')}

EVENING (PM):
${retrievedPrescription.skincareRegimen.eveningRoutine.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n')}

CLINICAL ADVICE & SUN DEFENSE:
${retrievedPrescription.advice.map(adv => `- ${adv}`).join('\n')}

NEXT FOLLOW-UP: ${retrievedPrescription.nextFollowUp}
==================================================`;
    navigator.clipboard.writeText(text);
    setCopiedPrescription(true);
    setTimeout(() => setCopiedPrescription(false), 2000);
  };

  const handleDownloadPrescription = () => {
    if (!retrievedPrescription) return;
    const text = `==================================================
       KALYANI SKIN & LASER DERMATOLOGY CENTRE
       Dr. Rituparna Manna, MBBS (Cal), MD Dermatology
==================================================
Patient File ID:   ${retrievedPrescription.patientId}
Patient Name:      ${retrievedPrescription.patientName} (${retrievedPrescription.patientAge}, ${retrievedPrescription.gender})
Skin Type:         ${retrievedPrescription.skinType}
Consultation Date: ${retrievedPrescription.date}
--------------------------------------------------
DIAGNOSIS:
${retrievedPrescription.diagnosis}

DERMOSCOPY FINDINGS:
${retrievedPrescription.dermoscopyFindings}
--------------------------------------------------
PRESCRIPTION (Rx):
${retrievedPrescription.medications.map(med => `- [${med.timing}] ${med.name} (${med.dosage}): ${med.frequency} for ${med.duration} | Instructions: ${med.instructions}`).join('\n')}

DAILY SKINCARE REGIMEN:
MORNING (AM):
${retrievedPrescription.skincareRegimen.morningRoutine.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n')}

EVENING (PM):
${retrievedPrescription.skincareRegimen.eveningRoutine.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n')}

CLINICAL ADVICE & SUN DEFENSE:
${retrievedPrescription.advice.map(adv => `- ${adv}`).join('\n')}

NEXT FOLLOW-UP: ${retrievedPrescription.nextFollowUp}
==================================================`;
    
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `dermatology-prescription-${retrievedPrescription.patientId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Time Slots Seed
  const availableSlots = [
    "09:30 AM", "10:45 AM", "12:00 PM", "04:30 PM", "05:45 PM", "07:15 PM"
  ];

  // Handle Booking changes
  const handleBookingChange = (field: keyof AppointmentIntent, value: any) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      if (!bookingForm.patientName.trim()) {
        alert("Please provide the patient's full name to proceed.");
        return;
      }
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!bookingForm.contactPhone.trim() || !bookingForm.preferredDate || !bookingForm.preferredTime) {
        alert("Please select phone number, appointment date and preferred time slot.");
        return;
      }
      const todayStr = getTodayDateString();
      if (bookingForm.preferredDate < todayStr) {
        alert("You cannot select a date in the past. Please choose today's date or a future date.");
        return;
      }
      setBookingStep(3);
    }
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep((bookingStep - 1) as 1 | 2);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockId = `SKIN-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedBookingId(mockId);
    setBookingSuccess(true);
  };

  const resetBookingForm = () => {
    setBookingForm({
      patientName: '',
      patientAge: '',
      gender: 'female',
      skinConcernCategory: 'acne-breakouts',
      skinType: 'combination',
      urgency: 'routine',
      contactPhone: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
    setBookingStep(1);
    setBookingSuccess(false);
    setCreatedBookingId('');
  };

  // Prescription Search
  const handlePrescriptionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const id = patientIdInput.trim().toUpperCase();
    if (!id) {
      setSearchError('Please enter a valid Patient File ID.');
      return;
    }
    const record = MOCK_PRESCRIPTIONS[id];
    if (record) {
      setRetrievedPrescription(record);
    } else {
      setSearchError(`No clinical record found for "${id}". Try sandbox demo IDs: DERMA-2026, CLEAR-789, or GLOW-456.`);
      setRetrievedPrescription(null);
    }
  };

  const selectQuickId = (id: string) => {
    setPatientIdInput(id);
    setSearchError('');
    const record = MOCK_PRESCRIPTIONS[id];
    if (record) {
      setRetrievedPrescription(record);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-transparent border-b border-mint-soft/40" id="portal-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-mint-accent font-semibold tracking-wider text-xs uppercase block">Digital Dermatology Workspace</span>
          <h2 
            className="text-3xl sm:text-4xl font-display-primary font-bold text-charcoal-clinical"
            style={{ fontFamily: 'var(--font-display-primary)' }}
          >
            Patient Care & Skin Recovery Portal
          </h2>
          <p className="text-charcoal-clinical/75 text-sm sm:text-base font-display-secondary font-medium">
            Schedule a personalized clinical skin assessment or retrieve your verified prescriptions, customized AM/PM skincare regimens, and skin barrier recovery tracker.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 flex gap-2 shadow-xs">
            <button
              onClick={() => { setActiveTab('booking'); setSearchError(''); }}
              className={`px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'booking' 
                  ? 'bg-mint-accent text-white shadow-md' 
                  : 'text-charcoal-clinical/70 hover:text-charcoal-clinical hover:bg-white/50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Skin Consultation Booking</span>
            </button>
            <button
              onClick={() => { setActiveTab('prescription'); }}
              className={`px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'prescription' 
                  ? 'bg-mint-accent text-white shadow-md' 
                  : 'text-charcoal-clinical/70 hover:text-charcoal-clinical hover:bg-white/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Prescription & Barrier Tracker</span>
            </button>
          </div>
        </div>

        {/* Dynamic Frame container */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl overflow-hidden min-h-[540px]">
          <AnimatePresence mode="wait">
            
            {/* TAB A: BOOKING ENGINE */}
            {activeTab === 'booking' && (
              <motion.div
                key="booking-tab"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 lg:p-12"
              >
                {!bookingSuccess ? (
                  <div>
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                            bookingStep === step 
                              ? 'bg-mint-accent text-white ring-4 ring-mint-soft/80' 
                              : bookingStep > step 
                                ? 'bg-mint-soft text-mint-dark' 
                                : 'bg-white/50 text-charcoal-clinical/40 border border-white/60'
                          }`}>
                            {bookingStep > step ? <CheckCircle className="w-4 h-4 text-mint-accent" /> : step}
                          </div>
                          {step < 3 && (
                            <div className={`w-20 sm:w-28 h-1 mx-2 rounded ${
                              bookingStep > step ? 'bg-mint-accent' : 'bg-white/40 border-b border-white/60'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleBookingSubmit} className="max-w-2xl mx-auto">
                      
                      {/* STEP 1: Patient Demographics & Skin Concerns */}
                      {bookingStep === 1 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="border-b border-white/40 pb-4 mb-4">
                            <h3 className="font-display-primary font-bold text-lg text-charcoal-clinical">Patient Profile & Primary Concern</h3>
                            <p className="text-xs text-charcoal-clinical/60">Help Dr. Manna prepare the diagnostic equipment and clinical environment for your consultation.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-mint-accent" />
                                Patient Full Name *
                              </label>
                              <input 
                                type="text"
                                placeholder="e.g. Debolina Mukherjee"
                                value={bookingForm.patientName}
                                onChange={(e) => handleBookingChange('patientName', e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical shadow-xs"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70">
                                  Age
                                </label>
                                <input 
                                  type="text"
                                  placeholder="e.g. 26 Years"
                                  value={bookingForm.patientAge}
                                  onChange={(e) => handleBookingChange('patientAge', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical shadow-xs"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70">
                                  Gender
                                </label>
                                <select
                                  value={bookingForm.gender}
                                  onChange={(e) => handleBookingChange('gender', e.target.value)}
                                  className="w-full px-3 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical shadow-xs"
                                >
                                  <option value="female">Female</option>
                                  <option value="male">Male</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                                <Microscope className="w-3.5 h-3.5 text-mint-accent" />
                                Primary Skin Concern
                              </label>
                              <select
                                value={bookingForm.skinConcernCategory}
                                onChange={(e) => handleBookingChange('skinConcernCategory', e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical shadow-xs"
                              >
                                <option value="acne-breakouts">Acne Vulgaris & Pores / Scars</option>
                                <option value="pigmentation-melasma">Melasma & Dark Spots / Sun Damage</option>
                                <option value="eczema-psoriasis">Eczema, Psoriasis & Rash / Itch</option>
                                <option value="hair-loss-scalp">Hair Fall, Dandruff & Scalp Trichology</option>
                                <option value="anti-aging-wrinkles">Fine Lines, Texture & Anti-Aging</option>
                                <option value="allergy-infection">Fungal / Bacterial Skin Infection</option>
                                <option value="mole-lesion-check">Mole, Skin Tag or Dermoscopy Check</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                                <Droplets className="w-3.5 h-3.5 text-sky-accent" />
                                Skin Type (Estimated)
                              </label>
                              <select
                                value={bookingForm.skinType}
                                onChange={(e) => handleBookingChange('skinType', e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical shadow-xs"
                              >
                                <option value="combination">Combination (Oily T-Zone)</option>
                                <option value="oily">Oily & Prone to Shine</option>
                                <option value="dry">Dry & Tight / Flaky</option>
                                <option value="sensitive">Sensitive & Easily Reddened</option>
                                <option value="normal">Normal / Balanced</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                              Urgency / Consultation Type
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {([
                                { key: 'routine', label: 'Routine Check' },
                                { key: 'followup', label: 'Follow-Up' },
                                { key: 'urgent', label: 'Acute Flare' },
                                { key: 'aesthetic', label: 'Aesthetic / Peel' }
                              ] as const).map((urg) => (
                                <button
                                  key={urg.key}
                                  type="button"
                                  onClick={() => handleBookingChange('urgency', urg.key)}
                                  className={`py-3 px-2 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer text-center ${
                                    bookingForm.urgency === urg.key
                                      ? urg.key === 'urgent' 
                                        ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold shadow-sm'
                                        : 'bg-mint-soft border-mint-accent text-mint-dark font-bold shadow-sm'
                                      : 'border-white/60 hover:border-mint-accent text-charcoal-clinical/60 hover:text-charcoal-clinical bg-white/40'
                                  }`}
                                >
                                  {urg.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end pt-4">
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="px-6 py-3 bg-mint-accent hover:bg-mint-dark text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm tracking-wide cursor-pointer shadow-md"
                            >
                              <span>Select Date & Slot</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Scheduler & Timing */}
                      {bookingStep === 2 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="border-b border-white/40 pb-4 mb-4">
                            <h3 className="font-display-primary font-bold text-lg text-charcoal-clinical">Calendar Alignment</h3>
                            <p className="text-xs text-charcoal-clinical/60">Choose your preferred consultation day. Chambers at Demo Medical Hall, Kalyani run daily from 9:00 AM to 8:00 PM.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-mint-accent" />
                                Preferred Date *
                              </label>
                              <input 
                                type="date"
                                min={getTodayDateString()}
                                value={bookingForm.preferredDate}
                                onChange={(e) => handleBookingChange('preferredDate', e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical font-numerical-data shadow-xs"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-mint-accent" />
                                Mobile Number for Confirmation *
                              </label>
                              <input 
                                type="tel"
                                placeholder="e.g. +91 98765 43210"
                                value={bookingForm.contactPhone}
                                onChange={(e) => handleBookingChange('contactPhone', e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical font-numerical-data shadow-xs"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-mint-accent" />
                              Available Chamber Time Slot *
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {availableSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => handleBookingChange('preferredTime', slot)}
                                  className={`py-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 cursor-pointer ${
                                    bookingForm.preferredTime === slot
                                      ? 'bg-mint-accent text-white border-mint-accent font-bold shadow-sm font-numerical-data'
                                      : 'border-white/60 hover:border-mint-accent text-charcoal-clinical/80 hover:text-charcoal-clinical bg-white/40 font-numerical-data'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-5 py-3 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 flex items-center gap-2 text-sm tracking-wide cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="px-6 py-3 bg-mint-accent hover:bg-mint-dark text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm tracking-wide cursor-pointer shadow-md"
                            >
                              <span>Review & Skincare History</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: Symptoms Summary & Active Products */}
                      {bookingStep === 3 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="border-b border-white/40 pb-4 mb-4">
                            <h3 className="font-display-primary font-bold text-lg text-charcoal-clinical">Clinical History & Active Products</h3>
                            <p className="text-xs text-charcoal-clinical/60">Mention any current products in your routine (e.g. retinol, benzoyl peroxide, steroid creams) or known drug allergies.</p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-clinical/70">
                              Symptoms duration & current skincare products (Optional)
                            </label>
                            <textarea 
                              rows={4}
                              placeholder="e.g. Breakouts started 4 months ago on cheeks and jawline. Currently using a foaming salicylic wash and an OTC cream. Stinging sensation when applying moisturizer."
                              value={bookingForm.notes}
                              onChange={(e) => handleBookingChange('notes', e.target.value)}
                              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm text-charcoal-clinical resize-none shadow-xs"
                            />
                          </div>

                          {/* Preview Booking details summary */}
                          <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-xs flex flex-col sm:flex-row justify-between gap-4">
                            <div className="space-y-1">
                              <h5 className="font-bold text-xs text-mint-dark uppercase tracking-wider">Patient Summary</h5>
                              <p className="text-sm font-semibold text-charcoal-clinical">{bookingForm.patientName} ({bookingForm.skinType} skin)</p>
                              <p className="text-xs text-charcoal-clinical/75">Concern: {bookingForm.skinConcernCategory.replace(/-/g, ' ')} | Ph: {bookingForm.contactPhone}</p>
                            </div>
                            <div className="space-y-1 sm:text-right flex flex-col sm:items-end justify-center">
                              <h5 className="font-bold text-xs text-sky-accent uppercase tracking-wider">Schedule</h5>
                              <p className="text-sm font-semibold text-charcoal-clinical font-numerical-data">{bookingForm.preferredDate}</p>
                              <p className="text-xs text-charcoal-clinical/75 font-numerical-data">{bookingForm.preferredTime}</p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-5 py-3 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 flex items-center gap-2 text-sm tracking-wide cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>

                            <button
                              type="submit"
                              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm tracking-wide cursor-pointer shadow-md"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Confirm Consultation Slot</span>
                            </button>
                          </div>
                        </motion.div>
                      )}

                    </form>
                  </div>
                ) : (
                  /* SUCCESS VIEW */
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md mx-auto text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-100">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display-primary font-bold text-2xl text-charcoal-clinical">Consultation Slot Reserved</h3>
                      <p className="text-sm text-charcoal-clinical/70 leading-relaxed font-display-secondary">
                        Your dermatology consultation with Dr. Rituparna Manna at Demo Medical Hall, Kalyani has been registered. A digital confirmation receipt has been generated.
                      </p>
                    </div>

                    {/* Booking metadata card */}
                    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/60 text-left space-y-3 shadow-md">
                      <div className="flex justify-between border-b border-white/40 pb-2">
                        <span className="text-xs font-bold text-charcoal-clinical/60">Booking Reference</span>
                        <span className="text-xs font-bold text-mint-dark font-numerical-data">{createdBookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-charcoal-clinical/70">Patient Name</span>
                        <span className="text-xs font-bold text-charcoal-clinical">{bookingForm.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-charcoal-clinical/70">Concern Category</span>
                        <span className="text-xs font-medium text-charcoal-clinical capitalize">{bookingForm.skinConcernCategory.replace(/-/g, ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-charcoal-clinical/70">Date</span>
                        <span className="text-xs font-bold text-charcoal-clinical font-numerical-data">{bookingForm.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-charcoal-clinical/70">Time Slot</span>
                        <span className="text-xs font-bold text-charcoal-clinical font-numerical-data">{bookingForm.preferredTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-charcoal-clinical/70">Chamber Location</span>
                        <span className="text-xs font-medium text-charcoal-clinical/85 max-w-[190px] text-right">Demo Medical Hall, Kalyani</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        onClick={resetBookingForm}
                        className="flex-1 px-4 py-3 bg-mint-accent hover:bg-mint-dark text-white font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer shadow-md"
                      >
                        Book Another Session
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex-1 px-4 py-3 bg-white/60 hover:bg-white text-mint-dark font-bold rounded-xl border border-white/80 transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Receipt</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 no-print">
                      <button
                        onClick={handleCopyReceipt}
                        className="px-3 py-2.5 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 text-[10px] tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1"
                      >
                        {copiedReceipt ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleDownloadReceipt}
                        className="px-3 py-2.5 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 text-[10px] tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download TXT</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB B: PRESCRIPTION & SKIN RECOVERY TRACKER */}
            {activeTab === 'prescription' && (
              <motion.div
                key="prescription-tab"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 lg:p-12"
              >
                {!retrievedPrescription ? (
                  <div className="max-w-md mx-auto py-8 text-center space-y-6">
                    <div className="w-12 h-12 bg-mint-light/80 rounded-full flex items-center justify-center text-mint-accent mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display-primary font-bold text-lg text-charcoal-clinical">Access Dermatology Medical File</h3>
                      <p className="text-xs text-charcoal-clinical/60 leading-relaxed font-display-secondary">
                        Enter your unique patient file code printed on your prescription card to view your clinical diagnosis, AM/PM topical regimen, and barrier recovery analytics.
                      </p>
                    </div>

                    {/* Search form */}
                    <form onSubmit={handlePrescriptionSearch} className="relative">
                      <input 
                        type="text"
                        placeholder="Enter Patient ID (e.g. DERMA-2026)"
                        value={patientIdInput}
                        onChange={(e) => setPatientIdInput(e.target.value)}
                        className="w-full pl-4 pr-12 py-3.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 focus:border-mint-accent focus:bg-white/80 outline-none transition-all duration-300 text-sm font-bold tracking-wider placeholder-font-normal text-charcoal-clinical uppercase font-numerical-data shadow-xs"
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 px-3 bg-mint-accent hover:bg-mint-dark text-white rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </form>

                    {/* Error message */}
                    {searchError && (
                      <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-start gap-2 text-left">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{searchError}</span>
                      </div>
                    )}

                    {/* Quick Demo IDs for clinical evaluation */}
                    <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 space-y-2 text-left">
                      <span className="text-[10px] font-bold text-charcoal-clinical/50 uppercase tracking-wider block">Clinical Evaluation Sandbox Access IDs:</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'DERMA-2026', label: 'Cystic Acne & Barrier (Ananya)' },
                          { id: 'CLEAR-789', label: 'Eczema Flare & TEWL (Sourav)' },
                          { id: 'GLOW-456', label: 'Melasma & Sun Damage (Priyanka)' }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => selectQuickId(item.id)}
                            className="bg-white/70 hover:bg-white border border-white/80 hover:border-mint-accent px-3 py-1.5 rounded-lg text-xs font-bold text-mint-dark cursor-pointer transition-all duration-200 font-numerical-data shadow-xs"
                          >
                            <span className="block font-bold">{item.id}</span>
                            <span className="text-[9px] text-charcoal-clinical/60 font-normal">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PRESCRIPTION RETRIEVED COMPILED VIEW */
                  <div className="space-y-8">
                    
                    {/* Back Button to search */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/40">
                      <button
                        onClick={() => { setRetrievedPrescription(null); setPatientIdInput(''); }}
                        className="px-4 py-2 bg-white/50 hover:bg-white text-mint-dark font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/60 shadow-xs"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Search</span>
                      </button>

                      <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-100">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Verified Clinical Dermatology File</span>
                      </span>
                    </div>

                    {/* Prescription Sheet Layout */}
                    <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border-2 border-white/70 shadow-lg relative">
                      
                      {/* Clinical Letterhead */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-mint-accent pb-6 mb-6 gap-4">
                        <div>
                          <h4 className="font-display-primary font-bold text-xl text-charcoal-clinical tracking-tight">Kalyani Skin & Laser Dermatology Centre</h4>
                          <p className="text-xs font-medium text-mint-dark">Clinical Dermatology, Dermato-Surgery, Trichology & Barrier Therapy</p>
                          <p className="text-[10px] text-charcoal-clinical/60">Demo Medical Hall, Sector 4, Kalyani, Nadia, West Bengal 741235</p>
                        </div>
                        <div className="md:text-right">
                          <h5 className="font-bold text-sm text-charcoal-clinical">Dr. Rituparna Manna</h5>
                          <p className="text-xs text-charcoal-clinical/75">MBBS (Cal), MD Dermatology, Venereology & Leprosy</p>
                          <p className="text-[10px] text-charcoal-clinical/60 font-numerical-data">Reg No: WBMC-55312 (Consultant Dermatologist)</p>
                        </div>
                      </div>

                      {/* Patient Metadata Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/80 mb-6 text-xs shadow-xs">
                        <div>
                          <span className="text-charcoal-clinical/50 uppercase text-[9px] font-bold block">Patient Name</span>
                          <strong className="text-charcoal-clinical text-sm">{retrievedPrescription.patientName}</strong>
                          <p className="text-charcoal-clinical/70">{retrievedPrescription.gender}, {retrievedPrescription.patientAge}</p>
                        </div>
                        <div>
                          <span className="text-charcoal-clinical/50 uppercase text-[9px] font-bold block">Skin Profile</span>
                          <strong className="text-charcoal-clinical">{retrievedPrescription.skinType}</strong>
                          <p className="text-charcoal-clinical/70">Dermoscopy Verified</p>
                        </div>
                        <div>
                          <span className="text-charcoal-clinical/50 uppercase text-[9px] font-bold block">Consultation Date</span>
                          <strong className="text-charcoal-clinical font-numerical-data">{retrievedPrescription.date}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal-clinical/50 uppercase text-[9px] font-bold block">Patient File ID</span>
                          <strong className="text-mint-dark font-numerical-data">{retrievedPrescription.patientId}</strong>
                        </div>
                      </div>

                      {/* Main Clinical Details Block */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Clinical diagnosis and Rx */}
                        <div className="lg:col-span-7 space-y-6">
                          <div>
                            <span className="text-[10px] font-bold text-mint-dark uppercase tracking-wider block mb-1">Clinical Diagnosis</span>
                            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/80 text-sm font-semibold text-charcoal-clinical shadow-xs">
                              {retrievedPrescription.diagnosis}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-mint-dark uppercase tracking-wider block mb-1">Polarized Dermoscopy Findings</span>
                            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/80 text-xs font-medium text-charcoal-clinical/85 shadow-xs leading-relaxed">
                              {retrievedPrescription.dermoscopyFindings}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-mint-dark uppercase tracking-wider block mb-2">Prescribed Active Therapeutics (Rx)</span>
                            <div className="space-y-3">
                              {retrievedPrescription.medications.map((med, i) => (
                                <div key={i} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/80 space-y-2 shadow-xs">
                                  <div className="flex justify-between items-center">
                                    <strong className="text-sm text-mint-dark">{med.name}</strong>
                                    <span className="text-xs font-bold text-sky-accent font-numerical-data bg-sky-light/80 px-2.5 py-0.5 rounded-full border border-sky-soft">{med.dosage}</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 text-xs text-charcoal-clinical/70">
                                    <div>
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Timing</span>
                                      <span className="font-semibold text-charcoal-clinical">{med.timing}</span>
                                    </div>
                                    <div>
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Frequency</span>
                                      <span className="font-semibold text-charcoal-clinical">{med.frequency}</span>
                                    </div>
                                    <div>
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Duration</span>
                                      <span className="font-semibold text-charcoal-clinical">{med.duration}</span>
                                    </div>
                                  </div>
                                  <div className="text-[11px] text-charcoal-clinical/80 bg-white/50 p-2 rounded-lg border border-white/60">
                                    <span className="font-semibold text-mint-dark">Application Method: </span>
                                    {med.instructions}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Daily AM & PM Skincare Regimen */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-mint-dark uppercase tracking-wider block">Customized Daily Skincare Regimen</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Morning Routine */}
                              <div className="bg-amber-50/50 backdrop-blur-sm p-4 rounded-xl border border-amber-200/60 space-y-2">
                                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                                  <Sun className="w-4 h-4 text-amber-500" />
                                  <span>Morning (AM) Routine</span>
                                </div>
                                <ol className="space-y-1.5 list-decimal list-inside text-xs text-charcoal-clinical/85 leading-relaxed font-display-secondary">
                                  {retrievedPrescription.skincareRegimen.morningRoutine.map((step, idx) => (
                                    <li key={idx} className="marker:font-bold marker:text-amber-600">{step}</li>
                                  ))}
                                </ol>
                              </div>

                              {/* Evening Routine */}
                              <div className="bg-indigo-50/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-200/60 space-y-2">
                                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                                  <Moon className="w-4 h-4 text-indigo-500" />
                                  <span>Evening (PM) Routine</span>
                                </div>
                                <ol className="space-y-1.5 list-decimal list-inside text-xs text-charcoal-clinical/85 leading-relaxed font-display-secondary">
                                  {retrievedPrescription.skincareRegimen.eveningRoutine.map((step, idx) => (
                                    <li key={idx} className="marker:font-bold marker:text-indigo-600">{step}</li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-mint-dark uppercase tracking-wider block mb-2">Clinical Advice & Sun Protection Protocol</span>
                            <ul className="space-y-2 list-disc list-inside text-xs text-charcoal-clinical/80 font-display-secondary leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/80 shadow-xs">
                              {retrievedPrescription.advice.map((adv, idx) => (
                                <li key={idx} className="marker:text-mint-accent">{adv}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-sky-soft/60 backdrop-blur-sm border border-sky-soft flex items-center gap-3 shadow-xs">
                            <Clock className="w-5 h-5 text-sky-accent flex-shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold text-charcoal-clinical block">Next Scheduled Clinic Review:</span>
                              <span className="font-semibold text-sky-accent font-numerical-data">{retrievedPrescription.nextFollowUp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Skin Recovery Progress Path (Custom SVG Curve) */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-white/80 space-y-4 shadow-xs">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-mint-accent" />
                                <span className="font-bold text-sm text-charcoal-clinical">Skin Barrier Recovery Path</span>
                              </div>
                              <span className="text-[10px] font-semibold text-mint-dark font-numerical-data bg-mint-light px-2 py-0.5 rounded-md border border-mint-soft">
                                Improvement: {retrievedPrescription.skinRecoveryHistory[retrievedPrescription.skinRecoveryHistory.length - 1].clinicalImprovement}%
                              </span>
                            </div>

                            {/* Custom Responsive SVG line plot for Dermatology Barrier & Lesion Count */}
                            <div className="relative">
                              <svg viewBox="0 0 400 220" className="w-full h-auto overflow-visible">
                                {/* Grid Lines */}
                                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="40" y1="140" x2="380" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="40" y1="180" x2="380" y2="180" stroke="#f1f5f9" strokeWidth="1" />

                                {/* Ideal Barrier Target Reference Line (90%+) */}
                                <line x1="40" y1="36" x2="380" y2="36" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                                <text x="310" y="32" fill="#64748b" className="text-[8px] font-bold">Optimal Barrier (90%)</text>

                                {/* Actual Barrier Score Curve (Green line rising) */}
                                {(() => {
                                  // Max month is 6, barrier score 0 to 100
                                  const points = retrievedPrescription.skinRecoveryHistory.map(pt => {
                                    const x = 40 + (pt.visitMonth / 6) * 340;
                                    const y = 180 - (pt.barrierScore / 100) * 160;
                                    return { x, y, pt };
                                  });

                                  const pathD = points.reduce((acc, p, idx) => {
                                    return idx === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`;
                                  }, '');

                                  return (
                                    <>
                                      {/* Path Line */}
                                      <path 
                                        d={pathD} 
                                        fill="none" 
                                        stroke="var(--color-mint-accent)" 
                                        strokeWidth="3.5" 
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      {/* Point Coordinates */}
                                      {points.map((p, idx) => (
                                        <g key={idx} className="cursor-pointer">
                                          <circle 
                                            cx={p.x} 
                                            cy={p.y} 
                                            r={hoveredRecoveryIndex === idx ? 7 : 4.5} 
                                            fill="var(--color-mint-accent)" 
                                            stroke="#fff" 
                                            strokeWidth="2"
                                            className="transition-all duration-150"
                                            onMouseEnter={() => setHoveredRecoveryIndex(idx)}
                                            onMouseLeave={() => setHoveredRecoveryIndex(null)}
                                          />
                                        </g>
                                      ))}
                                    </>
                                  );
                                })()}

                                {/* Axes and labels */}
                                <line x1="40" y1="180" x2="380" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
                                <line x1="40" y1="20" x2="40" y2="180" stroke="#94a3b8" strokeWidth="1.5" />

                                {/* Y-Axis Labels (Barrier Index %) */}
                                <text x="12" y="24" fill="#64748b" className="text-[9px] font-bold font-numerical-data">100%</text>
                                <text x="16" y="104" fill="#64748b" className="text-[9px] font-bold font-numerical-data">50%</text>
                                <text x="22" y="184" fill="#64748b" className="text-[9px] font-bold font-numerical-data">0%</text>

                                {/* X-Axis Labels (Timeline) */}
                                <text x="36" y="196" fill="#64748b" className="text-[9px] font-bold font-numerical-data">Start</text>
                                <text x="145" y="196" fill="#64748b" className="text-[9px] font-bold font-numerical-data">Mo 2</text>
                                <text x="255" y="196" fill="#64748b" className="text-[9px] font-bold font-numerical-data">Mo 4</text>
                                <text x="360" y="196" fill="#64748b" className="text-[9px] font-bold font-numerical-data">Mo 6</text>
                              </svg>

                              {/* Interactive dot details box */}
                              <div className="bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-white/60 flex justify-between items-center text-xs mt-2 shadow-xs">
                                {hoveredRecoveryIndex !== null ? (
                                  <>
                                    <div>
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Timeline</span>
                                      <strong className="text-charcoal-clinical">Month {retrievedPrescription.skinRecoveryHistory[hoveredRecoveryIndex].visitMonth}</strong>
                                    </div>
                                    <div className="text-center">
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Barrier Score</span>
                                      <strong className="text-mint-dark font-numerical-data">{retrievedPrescription.skinRecoveryHistory[hoveredRecoveryIndex].barrierScore}%</strong>
                                    </div>
                                    <div className="text-center">
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Active Lesions</span>
                                      <strong className="text-rose-600 font-numerical-data">{retrievedPrescription.skinRecoveryHistory[hoveredRecoveryIndex].lesionCount}</strong>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[9px] font-bold text-charcoal-clinical/40 uppercase block">Recovery</span>
                                      <strong className="text-sky-accent font-numerical-data">+{retrievedPrescription.skinRecoveryHistory[hoveredRecoveryIndex].clinicalImprovement}%</strong>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-[10px] text-charcoal-clinical/60 italic w-full text-center py-1">
                                    Hover over the green points on the recovery curve to inspect barrier integrity scores and lesion reduction over time.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Verification metadata card */}
                          <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/60 space-y-3 text-xs text-charcoal-clinical/85 shadow-xs">
                            <h4 className="font-bold text-sky-accent uppercase tracking-wider text-[10px]">Verification & Medical Registry</h4>
                            <p>This dermatology clinical record contains legal pharmacotherapeutic prescriptions registered at Demo Medical Hall, Kalyani. Validated under West Bengal Medical Council guidelines.</p>
                            <div className="border-t border-white/40 pt-3 flex justify-between text-[10px] text-charcoal-clinical/50">
                              <span>Practitioner: DR-RITUPARNA-DERMA</span>
                              <span>Compilation: VERIFIED DIGITAL Rx</span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Print & Export utility */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pb-4 no-print">
                      <button
                        onClick={handleCopyPrescription}
                        className="px-5 py-3 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        {copiedPrescription ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Regimen & Rx</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleDownloadPrescription}
                        className="px-5 py-3 bg-white/40 hover:bg-white/70 text-charcoal-clinical/80 font-bold rounded-xl border border-white/60 transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download TXT</span>
                      </button>
                      <button
                        onClick={handlePrint}
                        className="px-6 py-3 bg-mint-accent hover:bg-mint-dark text-white font-bold rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Medical Sheet</span>
                      </button>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Hidden Portal for Clean Printing */}
      {createPortal(
        <div id="print-section" className="font-sans bg-white text-black p-8">
          {activeTab === 'booking' && bookingSuccess && (
            <div className="space-y-6 max-w-2xl mx-auto border-2 border-black p-8 rounded-lg">
              <div className="border-b-2 border-black pb-4 text-center">
                <h1 className="text-2xl font-bold uppercase tracking-wide">Kalyani Skin & Laser Dermatology Centre</h1>
                <p className="text-xs font-semibold">Dr. Rituparna Manna, MD Dermatology - Consultation Receipt</p>
                <p className="text-[10px] text-gray-600">Demo Medical Hall, Sector 4, Kalyani, Nadia 741235 | Ph: +91 98765 43210</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold text-center underline">Booking Confirmation Details</h2>
                
                <table className="w-full text-sm border-collapse border border-gray-400">
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100 w-1/3">Booking ID</td>
                      <td className="border border-gray-400 p-2 font-mono">{createdBookingId}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Patient Name</td>
                      <td className="border border-gray-400 p-2 font-semibold">{bookingForm.patientName} ({bookingForm.patientAge || 'Adult'})</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Skin Concern</td>
                      <td className="border border-gray-400 p-2 capitalize">{bookingForm.skinConcernCategory.replace(/-/g, ' ')} ({bookingForm.skinType} skin)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Contact Phone</td>
                      <td className="border border-gray-400 p-2">{bookingForm.contactPhone}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Appointment Date</td>
                      <td className="border border-gray-400 p-2 font-semibold">{bookingForm.preferredDate}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Selected Time Slot</td>
                      <td className="border border-gray-400 p-2">{bookingForm.preferredTime}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">Clinical History / Notes</td>
                      <td className="border border-gray-400 p-2 italic">{bookingForm.notes || "None provided"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-12 text-center text-xs text-gray-500 border-t border-dashed border-gray-400">
                <p>Please arrive 10 minutes prior to your slot. Avoid applying heavy foundation or colored makeup on the day of skin examination.</p>
                <p className="mt-4 font-mono text-[9px]">Generated on {new Date().toLocaleString()} • Kalyani Skin & Dermatology Centre</p>
              </div>
            </div>
          )}

          {activeTab === 'prescription' && retrievedPrescription && (
            <div className="space-y-6 max-w-3xl mx-auto border-2 border-black p-8 rounded-lg">
              {/* Prescription Letterhead */}
              <div className="flex justify-between items-start border-b-4 border-black pb-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Kalyani Skin & Laser Dermatology Centre</h1>
                  <p className="text-xs font-semibold">Clinical Dermatology, Dermatosurgery, Trichology & Laser Medicine</p>
                  <p className="text-[10px] text-gray-600">Demo Medical Hall, Sector 4, Kalyani, Nadia 741235</p>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold">Dr. Rituparna Manna</h2>
                  <p className="text-xs font-semibold">MBBS (Cal), MD Dermatology, DVD</p>
                  <p className="text-[10px] text-gray-600">Reg No: WBMC-55312 • Phone: +91 98765 43210</p>
                </div>
              </div>

              {/* Patient Info Grid */}
              <div className="grid grid-cols-4 gap-4 p-3 border border-gray-400 bg-gray-50 text-xs">
                <div>
                  <span className="text-gray-500 uppercase font-bold text-[8px] block">Patient Name</span>
                  <strong className="text-sm">{retrievedPrescription.patientName}</strong>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold text-[8px] block">Age / Gender</span>
                  <span>{retrievedPrescription.patientAge} / {retrievedPrescription.gender}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold text-[8px] block">Skin Type</span>
                  <span>{retrievedPrescription.skinType}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold text-[8px] block">File ID / Date</span>
                  <strong className="block">{retrievedPrescription.patientId}</strong>
                  <span>{retrievedPrescription.date}</span>
                </div>
              </div>

              {/* Rx details */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Diagnosis</span>
                  <div className="p-2 border border-gray-400 rounded text-sm font-semibold">
                    {retrievedPrescription.diagnosis}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Dermoscopic Analysis</span>
                  <div className="p-2 border border-gray-400 rounded text-xs text-gray-800">
                    {retrievedPrescription.dermoscopyFindings}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Prescribed Active Therapeutics (Rx)</span>
                  <table className="w-full text-xs border-collapse border border-gray-400">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-400 p-2">Medication</th>
                        <th className="border border-gray-400 p-2">Dosage</th>
                        <th className="border border-gray-400 p-2">Timing</th>
                        <th className="border border-gray-400 p-2">Frequency</th>
                        <th className="border border-gray-400 p-2">Duration</th>
                        <th className="border border-gray-400 p-2">Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retrievedPrescription.medications.map((med, i) => (
                        <tr key={i}>
                          <td className="border border-gray-400 p-2 font-bold">{med.name}</td>
                          <td className="border border-gray-400 p-2">{med.dosage}</td>
                          <td className="border border-gray-400 p-2">{med.timing}</td>
                          <td className="border border-gray-400 p-2">{med.frequency}</td>
                          <td className="border border-gray-400 p-2">{med.duration}</td>
                          <td className="border border-gray-400 p-2 italic">{med.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Routine steps */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-400 p-2 rounded">
                    <span className="text-[10px] font-bold uppercase text-gray-700 block mb-1">Morning (AM) Regimen:</span>
                    <ol className="list-decimal list-inside text-xs space-y-1">
                      {retrievedPrescription.skincareRegimen.morningRoutine.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="border border-gray-400 p-2 rounded">
                    <span className="text-[10px] font-bold uppercase text-gray-700 block mb-1">Evening (PM) Regimen:</span>
                    <ol className="list-decimal list-inside text-xs space-y-1">
                      {retrievedPrescription.skincareRegimen.eveningRoutine.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Clinical Advice & Sun Defense</span>
                  <ul className="list-disc list-inside text-xs text-gray-800 space-y-1 p-2 border border-gray-400 rounded">
                    {retrievedPrescription.advice.map((adv, idx) => (
                      <li key={idx}>{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end pt-8">
                  <div>
                    <span className="text-[10px] font-bold text-gray-600 uppercase block">Next Consultation / Follow-up</span>
                    <strong className="text-xs text-emerald-800">{retrievedPrescription.nextFollowUp}</strong>
                  </div>
                  <div className="text-right border-t border-gray-400 pt-2 w-48 ml-auto text-xs text-gray-600">
                    Dr. Rituparna Manna (Signature)
                  </div>
                </div>
              </div>

              <div className="pt-8 text-center text-[9px] text-gray-500 border-t border-dashed border-gray-400">
                <p>This is a digitally verified medical file record. Consultation details are logged under West Bengal Medical Council standards.</p>
                <p className="mt-1">Kalyani Skin & Laser Dermatology Centre • Kalyani, Nadia</p>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
