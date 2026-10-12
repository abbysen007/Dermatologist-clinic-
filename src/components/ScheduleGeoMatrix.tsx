/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, MapPin, Phone, Compass, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { DOCTOR_PROFILE } from '../data';

export default function ScheduleGeoMatrix() {
  const days = [
    { name: "Monday", hours: DOCTOR_PROFILE.operating_hours.monday },
    { name: "Tuesday", hours: DOCTOR_PROFILE.operating_hours.tuesday },
    { name: "Wednesday", hours: DOCTOR_PROFILE.operating_hours.wednesday },
    { name: "Thursday", hours: DOCTOR_PROFILE.operating_hours.thursday },
    { name: "Friday", hours: DOCTOR_PROFILE.operating_hours.friday },
    { name: "Saturday", hours: DOCTOR_PROFILE.operating_hours.saturday },
    { name: "Sunday", hours: DOCTOR_PROFILE.operating_hours.sunday },
  ];

  const landmarks = [
    { text: "Located inside Demo Medical Hall (Dermatology pharmacy & genuine therapeutic formulations on-site)", icon: "🧴" },
    { text: "Opposite Block B, 2 minutes walking distance from Central Park, Kalyani", icon: "🌳" },
    { text: "Right next to Sector 4 Community Hub with ample dedicated car & two-wheeler parking", icon: "🚗" },
    { text: "Modern, hygienic clinic suite with private dermoscopy & skin procedure rooms", icon: "✨" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-transparent border-b border-mint-soft/40" id="schedule-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-mint-accent font-semibold tracking-wider text-xs uppercase block">Clinical Availability</span>
          <h2 
            className="text-3xl sm:text-4xl font-display-primary font-bold text-charcoal-clinical"
            style={{ fontFamily: 'var(--font-display-primary)' }}
          >
            Chambers & Geo-Navigation Matrix
          </h2>
          <p className="text-charcoal-clinical/75 text-sm sm:text-base font-display-secondary font-medium">
            Daily clinical hours at Demo Medical Hall, Kalyani. Consult our interactive geographic locator below to navigate with ease.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Daily Hours & Landmarks Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Hours Block */}
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-white/40">
                <div className="w-10 h-10 rounded-xl bg-mint-light/80 flex items-center justify-center text-mint-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-charcoal-clinical">Operating Hours</h3>
                  <p className="text-[10px] text-charcoal-clinical/50 uppercase font-semibold">Consistently open 7 days a week</p>
                </div>
              </div>

              {/* Days list */}
              <div className="space-y-3">
                {days.map((day, idx) => {
                  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                  const isToday = currentDayName === day.name;

                  return (
                    <div 
                      key={idx} 
                      className={`flex justify-between items-center py-1.5 px-3 rounded-xl transition-all ${
                        isToday 
                          ? 'bg-mint-soft/80 text-mint-dark font-semibold border border-mint-accent/20 shadow-xs' 
                          : 'text-charcoal-clinical/80 hover:bg-white/30'
                      }`}
                    >
                      <span className="text-xs font-semibold">{day.name}</span>
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-mint-accent animate-ping" />
                        )}
                        <span className="text-xs font-numerical-data">{day.hours}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Landmarks & Location helper */}
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/40">
                <div className="w-10 h-10 rounded-xl bg-sky-soft/80 flex items-center justify-center text-sky-accent">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-charcoal-clinical">Easy Landmarks & Parking</h3>
                  <p className="text-[10px] text-charcoal-clinical/50 uppercase font-semibold">Convenient Kalyani access</p>
                </div>
              </div>

              <div className="space-y-3">
                {landmarks.map((lmark, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">{lmark.icon}</span>
                    <p className="text-xs text-charcoal-clinical/85 leading-relaxed">{lmark.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Call-to-Action */}
            <div className="bg-gradient-to-r from-mint-dark/85 to-mint-accent/85 backdrop-blur-md p-6 rounded-3xl text-white shadow-xl flex items-center justify-between gap-4 border border-white/20">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest block">Direct Clinic Reception</span>
                <strong className="text-lg font-numerical-data block">{DOCTOR_PROFILE.contact_number}</strong>
                <span className="text-[10px] text-white/80 block">Tap to dial from your phone</span>
              </div>
              <a 
                href={`tel:${DOCTOR_PROFILE.contact_number.replace(/\s+/g, '')}`}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center text-white transition-all cursor-pointer shadow-sm"
              >
                <Phone className="w-5 h-5 fill-white" />
              </a>
            </div>

          </div>

          {/* Column 2: Live Embedded Interactive Geographical Map canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white/40 backdrop-blur-xl p-4 rounded-3xl border border-white/60 shadow-xl flex-grow flex flex-col justify-between space-y-3 min-h-[420px] lg:min-h-0">
              
              {/* Maps header */}
              <div className="flex justify-between items-center border-b border-white/40 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-mint-accent" />
                  <span className="font-bold text-sm text-charcoal-clinical">Live Geographical Canvas</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=Demo+Medical+Hall,+near+Central+Park,+Sector+4,+Kalyani"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-white/50 hover:bg-white/80 text-mint-dark px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border border-white/60"
                >
                  <MapPin className="w-3 h-3 text-mint-accent" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Real Interactive Iframe Google Map */}
              <div className="relative flex-grow rounded-2xl overflow-hidden border border-white/50 min-h-[300px]">
                <iframe 
                  title="Dr. Rituparna Manna Dermatology Clinic Location Kalyani"
                  src="https://maps.google.com/maps?q=Demo%20Medical%20Hall,%20near%20Central%20Park,%20Sector%204,%20Kalyani&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '300px' }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Interactive map Footer showing exact address string */}
              <div className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-mint-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-charcoal-clinical">Chamber Address:</span>
                  <p className="text-charcoal-clinical/75 mt-0.5 font-display-secondary italic leading-relaxed">
                    {DOCTOR_PROFILE.location.address_string}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
