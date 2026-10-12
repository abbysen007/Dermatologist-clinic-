/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LocationInfo {
  address_string: string;
  google_maps_id: string;
}

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface DesignPsychology {
  palette_intent: string;
  visual_tones: string[];
}

export interface DoctorProfile {
  name: string;
  headline_anchor: string;
  clinical_entity: string;
  google_rating: string;
  total_reviews: string;
  contact_number: string;
  location: LocationInfo;
  operating_hours: OperatingHours;
  design_psychology: DesignPsychology;
}

export interface AppointmentIntent {
  patientName: string;
  patientAge: string;
  gender: 'female' | 'male' | 'other' | 'prefer-not-to-say';
  skinConcernCategory: 'acne-breakouts' | 'eczema-psoriasis' | 'pigmentation-melasma' | 'hair-loss-scalp' | 'anti-aging-wrinkles' | 'allergy-infection' | 'mole-lesion-check';
  skinType: 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';
  urgency: 'routine' | 'urgent' | 'followup' | 'aesthetic';
  contactPhone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface SkinRecoveryPoint {
  visitMonth: number;
  barrierScore: number; // 0 - 100%
  lesionCount: number;  // active inflammatory lesions or redness points
  clinicalImprovement: number; // % improvement compared to baseline
}

export interface MedicationItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  timing: 'Morning (AM)' | 'Night (PM)' | 'Twice Daily' | 'SOS / As Needed';
}

export interface PatientPrescription {
  patientId: string;
  patientName: string;
  patientAge: string;
  gender: string;
  skinType: string;
  date: string;
  diagnosis: string;
  dermoscopyFindings: string;
  medications: MedicationItem[];
  skincareRegimen: {
    morningRoutine: string[];
    eveningRoutine: string[];
  };
  advice: string[];
  skinRecoveryHistory: SkinRecoveryPoint[];
  nextFollowUp: string;
}

export interface VlogItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'Acne & Scars' | 'Hair & Scalp' | 'Sun Protection' | 'Barrier Repair' | 'Anti-Aging';
  videoUrl: string;
  thumbnailSeed: string;
}

export interface StoryItem {
  id: string;
  title: string;
  snippet: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Acne Care' | 'Sunscreen Science' | 'Barrier Repair' | 'Hair Health';
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  location: string;
  skinCondition: string;
  rating: number;
  reviewText: string;
  date: string;
  verified: boolean;
}
