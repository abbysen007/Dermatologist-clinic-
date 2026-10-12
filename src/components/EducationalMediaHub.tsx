/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Clock, X, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { EDUCATIONAL_VLOGS, EDUCATIONAL_STORIES } from '../data';
import { VlogItem, StoryItem } from '../types';

const THUMBNAIL_MAP: Record<string, string> = {
  "barrier_repair": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400&h=225",
  "sun_protection": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400&h=225",
  "acne_care": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400&h=225",
  "hair_scalp": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400&h=225"
};

export default function EducationalMediaHub() {
  const [selectedVlog, setSelectedVlog] = useState<VlogItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(EDUCATIONAL_STORIES[0]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Acne & Scars' | 'Hair & Scalp' | 'Sun Protection' | 'Barrier Repair'>('All');

  // Filter vlogs
  const filteredVlogs = activeCategory === 'All' 
    ? EDUCATIONAL_VLOGS 
    : EDUCATIONAL_VLOGS.filter(v => v.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-transparent border-b border-mint-soft/40" id="educational-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-mint-accent font-semibold tracking-wider text-xs uppercase block">Dermatology Resource Hub</span>
          <h2 
            className="text-3xl sm:text-4xl font-display-primary font-bold text-charcoal-clinical"
            style={{ fontFamily: 'var(--font-display-primary)' }}
          >
            Educational Media & Skincare Science
          </h2>
          <p className="text-charcoal-clinical/75 text-sm sm:text-base font-display-secondary font-medium">
            Explore dermatologist-curated video masterclasses and evidence-based clinical articles authored directly by Dr. Rituparna Manna to cut through cosmetic marketing myths.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['All', 'Acne & Scars', 'Hair & Scalp', 'Sun Protection', 'Barrier Repair'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-mint-accent text-white shadow-sm' 
                  : 'bg-white/40 backdrop-blur-md hover:bg-white/60 text-charcoal-clinical/70 border border-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two-Stream Balanced Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* STREAM 1: Video Advisories Thumbnail Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/40">
              <Play className="w-5 h-5 text-mint-accent" />
              <h3 className="font-bold text-base text-charcoal-clinical">Dermatology Video Advisories</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredVlogs.map((vlog) => (
                <motion.div
                  key={vlog.id}
                  whileHover={{ scale: 1.015 }}
                  className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-mint-accent/40 transition-all duration-300"
                  onClick={() => setSelectedVlog(vlog)}
                >
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-video bg-mint-light/60 overflow-hidden">
                    <img 
                      src={THUMBNAIL_MAP[vlog.thumbnailSeed] || `https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400&h=225`} 
                      alt={vlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover mask effect */}
                    <div className="absolute inset-0 bg-charcoal-clinical/20 group-hover:bg-charcoal-clinical/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-mint-accent flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-5 h-5 fill-mint-accent translate-x-0.5" />
                      </div>
                    </div>

                    {/* Metadata chips */}
                    <span className="absolute bottom-2 left-2 bg-charcoal-clinical/85 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      {vlog.category}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-charcoal-clinical/85 text-white text-[9px] font-bold px-2 py-0.5 rounded font-numerical-data">
                      {vlog.duration}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-1.5 flex-grow">
                    <h4 
                      className="font-display-primary font-bold text-sm text-charcoal-clinical group-hover:text-mint-accent line-clamp-2 transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-display-primary)' }}
                    >
                      {vlog.title}
                    </h4>
                    <p className="text-xs text-charcoal-clinical/70 line-clamp-2 leading-relaxed">
                      {vlog.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* STREAM 2: Dermatology Case Stories & Guides Reader Column */}
          <div className="lg:col-span-6 space-y-6 bg-white/40 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/60 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-white/40">
              <BookOpen className="w-5 h-5 text-mint-accent" />
              <h3 className="font-bold text-base text-charcoal-clinical font-display-primary">Clinical Skin Science & Guides</h3>
            </div>

            {/* List and Active Detail Reader layout */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* Selectors list */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/40">
                {EDUCATIONAL_STORIES.map(story => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      selectedStory?.id === story.id
                        ? 'bg-mint-accent text-white shadow-xs'
                        : 'text-charcoal-clinical/60 hover:text-charcoal-clinical hover:bg-white/40'
                    }`}
                  >
                    {story.title.substring(0, 18)}...
                  </button>
                ))}
              </div>

              {/* Story Content Reader Card */}
              <AnimatePresence mode="wait">
                {selectedStory && (
                  <motion.div
                    key={selectedStory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-mint-accent uppercase tracking-wider">
                        <span>{selectedStory.category} Protocol</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-mint-accent" />
                        <span className="font-numerical-data">{selectedStory.readTime}</span>
                      </div>

                      <h4 
                        className="text-lg sm:text-xl font-display-primary font-bold text-charcoal-clinical"
                        style={{ fontFamily: 'var(--font-display-primary)' }}
                      >
                        {selectedStory.title}
                      </h4>
                    </div>

                    <p className="text-xs text-charcoal-clinical/50">
                      Authored by <strong className="text-charcoal-clinical/80">{selectedStory.author}</strong> on <span className="font-numerical-data">{selectedStory.date}</span>
                    </p>

                    <div 
                      className="text-xs sm:text-sm text-charcoal-clinical/85 font-display-secondary leading-relaxed space-y-3 border-t border-white/40 pt-4"
                      style={{ fontFamily: 'var(--font-display-secondary)' }}
                    >
                      {selectedStory.content.split('\n\n').map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Dermatology take-home tip card */}
                    <div className="bg-sky-light/50 backdrop-blur-sm border-l-4 border-sky-accent rounded-r-xl p-3.5 flex items-start gap-3 mt-4 border border-white/40">
                      <Sparkles className="w-4 h-4 text-sky-accent flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <strong className="text-charcoal-clinical block">Dermatologist's Golden Rule</strong>
                        <p className="text-charcoal-clinical/75">Never combine multiple strong exfoliants simultaneously. Allow 4-6 weeks for skin turnover cycle (stratum corneum renewal) before judging product efficacy.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* VIDEO PLAYER OVERLAY (MODAL) */}
        <AnimatePresence>
          {selectedVlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal-clinical/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white/90 backdrop-blur-2xl rounded-3xl overflow-hidden max-w-2xl w-full border border-white/60 shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVlog(null)}
                  className="absolute right-4 top-4 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Player Frame */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${selectedVlog.videoUrl}?autoplay=1`}
                    title={selectedVlog.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Video Info Panel */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-mint-accent uppercase tracking-wider">
                    <span>{selectedVlog.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-accent" />
                    <span>Duration: {selectedVlog.duration}</span>
                  </div>

                  <h4 
                    className="text-lg font-display-primary font-bold text-charcoal-clinical"
                    style={{ fontFamily: 'var(--font-display-primary)' }}
                  >
                    {selectedVlog.title}
                  </h4>

                  <p className="text-xs text-charcoal-clinical/75 leading-relaxed font-display-secondary">
                    {selectedVlog.description}
                  </p>

                  <div className="border-t border-cream-warm pt-3 flex justify-between items-center text-[10px] text-charcoal-clinical/50">
                    <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-mint-accent" /> Verified Dermatology Advisory</span>
                    <span>Provider: Kalyani Skin Centre</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
