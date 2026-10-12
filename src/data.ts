/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DoctorProfile, PatientPrescription, VlogItem, StoryItem, TestimonialItem } from './types';

export const DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. Rituparna Manna",
  headline_anchor: "Leading Dermatologist & Skin Specialist in Kalyani",
  clinical_entity: "Kalyani Skin & Laser Dermatology Centre",
  google_rating: "4.9",
  total_reviews: "48",
  contact_number: "+91 98765 43210",
  location: {
    address_string: "Demo Medical Hall, Near Central Park, Sector 4, Kalyani, Nadia, West Bengal - 741235",
    google_maps_id: "place_id://kalyani_skin_centre_place_id"
  },
  operating_hours: {
    monday: "09:00 AM - 08:00 PM",
    tuesday: "09:00 AM - 08:00 PM",
    wednesday: "09:00 AM - 08:00 PM",
    thursday: "09:00 AM - 08:00 PM",
    friday: "09:00 AM - 08:00 PM",
    saturday: "09:00 AM - 08:00 PM",
    sunday: "09:00 AM - 08:00 PM"
  },
  design_psychology: {
    palette_intent: "Alleviate dermatological self-image anxiety, restore skin barrier clarity, and deliver soothing evidence-based clinical confidence",
    visual_tones: ["Luminous Mint", "Warm Alabaster Cream", "Sky Clinical Blue"]
  }
};

export const MOCK_PRESCRIPTIONS: Record<string, PatientPrescription> = {
  "DERMA-2026": {
    patientId: "DERMA-2026",
    patientName: "Ananya Chatterjee",
    patientAge: "24 Years",
    gender: "Female",
    skinType: "Combination (Acne-Prone)",
    date: "July 08, 2026",
    diagnosis: "Moderate Papulopustular Acne Vulgaris with Post-Inflammatory Erythema (PIE)",
    dermoscopyFindings: "Follicular plugging with localized microcomedones and active erythematous papules over malar cheeks. Epidermal stratum corneum shows compromised lipid cement.",
    medications: [
      {
        name: "Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel (Epiduo)",
        dosage: "Pea-sized amount",
        frequency: "Alternate nights",
        duration: "8 weeks",
        instructions: "Apply to dry skin post-cleansing, buffer with ceramide moisturizer",
        timing: "Night (PM)"
      },
      {
        name: "Clindamycin Phosphate 1% Topical Solution",
        dosage: "1 thin layer",
        frequency: "Once daily",
        duration: "4 weeks",
        instructions: "Spot application over active inflammatory pustules only",
        timing: "Morning (AM)"
      },
      {
        name: "Elemental Zinc Gluconate (50mg) Tablets",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Post-lunch with a full glass of water to reduce inflammation",
        timing: "Morning (AM)"
      }
    ],
    skincareRegimen: {
      morningRoutine: [
        "Gentle pH 5.5 Foaming Cleanser (Sodium Cocoyl Isethionate base)",
        "Niacinamide 4% + Zinc PCA 1% soothing hydration serum",
        "Lightweight non-comedogenic ceramide moisturiser",
        "Broad Spectrum Matte Sunscreen SPF 50+ PA++++ (apply 2 finger lengths)"
      ],
      eveningRoutine: [
        "Micellar water gentle cleanse (no rubbing)",
        "Hydrating Oat & Centella Asiatica calming gel",
        "Buffered Adapalene + BPO topical gel on alternate evenings"
      ]
    },
    advice: [
      "Strictly avoid picking, squeezing, or popping active papules to prevent scarring.",
      "Reapply sunscreen every 3 hours if outdoors in bright sunlight or near reflective surfaces.",
      "Wash pillowcases twice weekly with fragrance-free detergent.",
      "Maintain low glycemic index diet; limit whey protein and excessive refined dairy."
    ],
    skinRecoveryHistory: [
      { visitMonth: 0, barrierScore: 42, lesionCount: 38, clinicalImprovement: 0 },
      { visitMonth: 1, barrierScore: 56, lesionCount: 26, clinicalImprovement: 32 },
      { visitMonth: 2, barrierScore: 68, lesionCount: 17, clinicalImprovement: 55 },
      { visitMonth: 3, barrierScore: 78, lesionCount: 11, clinicalImprovement: 71 },
      { visitMonth: 4, barrierScore: 84, lesionCount: 6, clinicalImprovement: 84 },
      { visitMonth: 6, barrierScore: 92, lesionCount: 2, clinicalImprovement: 95 }
    ],
    nextFollowUp: "August 12, 2026 (For Chemical Peel & Barrier Check)"
  },
  "CLEAR-789": {
    patientId: "CLEAR-789",
    patientName: "Sourav Mukherjee",
    patientAge: "33 Years",
    gender: "Male",
    skinType: "Dry & Reactive",
    date: "June 29, 2026",
    diagnosis: "Atopic Dermatitis Flare & Transepidermal Water Loss (TEWL)",
    dermoscopyFindings: "Diffuse xerosis, micro-fissuring of the stratum corneum with prominent follicular hyperkeratosis along flexural folds.",
    medications: [
      {
        name: "Desonide 0.05% Topical Cream",
        dosage: "Thin fingertip unit",
        frequency: "Twice daily",
        duration: "7 days only (Taper)",
        instructions: "Apply specifically on active itchy lichenified patches",
        timing: "Twice Daily"
      },
      {
        name: "Physiological Lipid Barrier Repair Balm (Ceramides 3:1:1 + Cholesterol)",
        dosage: "Liberal application",
        frequency: "3-4 times daily",
        duration: "Continuous",
        instructions: "Apply immediately within 3 minutes after showering on damp skin",
        timing: "Morning (AM)"
      },
      {
        name: "Bilastine 20mg Tablets",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "10 days",
        instructions: "Take 1 hour before dinner on empty stomach for anti-pruritic relief",
        timing: "Night (PM)"
      }
    ],
    skincareRegimen: {
      morningRoutine: [
        "Soap-free Syndet cleansing bar or non-foaming cleansing cream",
        "Colloidal Oatmeal & Hyaluronic Acid mist",
        "High-lipid Ceramide barrier repair cream"
      ],
      eveningRoutine: [
        "Lukewarm water wash (maximum 5 minutes)",
        "Topical Desonide (sparingly on flare spots for 7 days)",
        "Overnight occlusive squalane or barrier repair balm layer"
      ]
    },
    advice: [
      "Avoid hot water showers; use lukewarm water only and limit shower duration to under 5 minutes.",
      "Wear 100% breathable organic cotton clothes; eliminate wool and polyester friction.",
      "Keep bedroom humidity balanced with a cold-mist humidifier during dry weather.",
      "Patch test any new grooming product behind ear for 48 hours prior to facial application."
    ],
    skinRecoveryHistory: [
      { visitMonth: 0, barrierScore: 30, lesionCount: 45, clinicalImprovement: 0 },
      { visitMonth: 1, barrierScore: 52, lesionCount: 28, clinicalImprovement: 38 },
      { visitMonth: 2, barrierScore: 71, lesionCount: 14, clinicalImprovement: 69 },
      { visitMonth: 3, barrierScore: 86, lesionCount: 5, clinicalImprovement: 89 },
      { visitMonth: 4, barrierScore: 94, lesionCount: 2, clinicalImprovement: 96 }
    ],
    nextFollowUp: "July 29, 2026 (Maintenance Barrier Assessment)"
  },
  "GLOW-456": {
    patientId: "GLOW-456",
    patientName: "Priyanka Biswas",
    patientAge: "30 Years",
    gender: "Female",
    skinType: "Normal to Oily",
    date: "June 16, 2026",
    diagnosis: "Centrofacial Epidermal Melasma & Chronic Photodamage",
    dermoscopyFindings: "Reticular brownish-grey pigmentation along bilateral zygomatic arches with absence of vascular telangiectasia.",
    medications: [
      {
        name: "Azelaic Acid 20% Micronized Cream",
        dosage: "Pea size",
        frequency: "Every morning",
        duration: "12 weeks",
        instructions: "Smooth across forehead and cheeks, potent tyrosinase inhibitor",
        timing: "Morning (AM)"
      },
      {
        name: "Liposomal Tranexamic Acid 3% + Alpha Arbutin 2% Serum",
        dosage: "4 drops",
        frequency: "Every evening",
        duration: "8 weeks",
        instructions: "Apply to pigmented zones prior to bedtime moisturizer",
        timing: "Night (PM)"
      },
      {
        name: "Tinted Mineral Sunscreen SPF 50+ (Zinc Oxide 20% + Iron Oxides)",
        dosage: "2 finger lengths",
        frequency: "Every 3 hours",
        duration: "Continuous",
        instructions: "Essential protection against UV and visible blue light",
        timing: "Morning (AM)"
      }
    ],
    skincareRegimen: {
      morningRoutine: [
        "Gentle amino acid foaming cleanser",
        "Azelaic acid 20% cream layer",
        "Lightweight hydrating gel",
        "Iron oxide tinted sunscreen SPF 50+ PA++++"
      ],
      eveningRoutine: [
        "Double cleansing with squalane cleanser followed by gel wash",
        "Tranexamic acid 3% brightening serum",
        "Peptide & ceramide skin rebuilding cream"
      ]
    },
    advice: [
      "Iron oxides in tinted sunscreen are mandatory to block visible high-energy blue light (HEV).",
      "Wear wide-brimmed UV protection hats and sunglasses when stepping outside between 10 AM - 4 PM.",
      "Avoid harsh face scrubs or micro-abrasion sponges which exacerbate melanocyte activation.",
      "Stay hydrated and incorporate polyphenol-rich green tea and citrus fruits."
    ],
    skinRecoveryHistory: [
      { visitMonth: 0, barrierScore: 50, lesionCount: 32, clinicalImprovement: 0 },
      { visitMonth: 1, barrierScore: 62, lesionCount: 22, clinicalImprovement: 31 },
      { visitMonth: 2, barrierScore: 74, lesionCount: 15, clinicalImprovement: 53 },
      { visitMonth: 3, barrierScore: 82, lesionCount: 9, clinicalImprovement: 72 },
      { visitMonth: 5, barrierScore: 91, lesionCount: 4, clinicalImprovement: 88 }
    ],
    nextFollowUp: "September 16, 2026 (Follow-up Wood's Lamp Examination)"
  }
};

export const EDUCATIONAL_VLOGS: VlogItem[] = [
  {
    id: "vlog-1",
    title: "Retinoids 101: How to Purge Without Damaging Skin Barrier",
    description: "Dr. Rituparna Manna explains the 'sandwich method', ideal retinoid concentrations, managing retinization irritation, and why consistency beats potency.",
    duration: "7:15",
    category: "Barrier Repair",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailSeed: "barrier_repair"
  },
  {
    id: "vlog-2",
    title: "The Ultimate Sunscreen Science: Mineral vs Chemical & PA Ratings",
    description: "Understand UV index, UVB burn protection (SPF), UVA aging shield (PA++++), and why tinted iron oxides are indispensable for melasma in Bengal summers.",
    duration: "8:40",
    category: "Sun Protection",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailSeed: "sun_protection"
  },
  {
    id: "vlog-3",
    title: "Tackling Adult Hormonal & Cystic Acne: Root Causes & Actives",
    description: "Break the cycle of recurring jawline breakouts. Dr. Manna breaks down pore clogs, sebum oxidation, spironolactone, and clinical chemical peels.",
    duration: "10:05",
    category: "Acne & Scars",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailSeed: "acne_care"
  },
  {
    id: "vlog-4",
    title: "Hair Fall vs Hair Shedding: Telogen Effluvium & Scalp Health",
    description: "Learn how to differentiate post-viral hair shedding from androgenetic alopecia, dermoscopic trichology exams, and evidence-based scalp serums.",
    duration: "9:25",
    category: "Hair & Scalp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailSeed: "hair_scalp"
  }
];

export const EDUCATIONAL_STORIES: StoryItem[] = [
  {
    id: "story-1",
    title: "The Sandwich Method: How to Introduce Strong Actives Without Redness",
    snippet: "Retinoids and exfoliating acids can compromise the stratum corneum if used incorrectly. Learn the dermatologist-approved buffering protocol.",
    content: "When starting prescription topical actives like tretinoin or adapalene, over 60% of patients experience transepidermal water loss (TEWL), flaking, and stinging. Dr. Rituparna Manna recommends the 'Moisture Sandwich Method'. First, apply a lightweight ceramide moisturizer on freshly washed, slightly damp skin. Wait 10 minutes for full absorption. Second, apply a pea-sized amount of your active treatment. Third, seal with a soothing lipid barrier cream. This slows down active penetration velocity without diminishing overall cellular renewal efficacy, virtually eliminating retinoid dermatitis.",
    author: "Dr. Rituparna Manna",
    date: "July 04, 2026",
    readTime: "4 min read",
    category: "Barrier Repair"
  },
  {
    id: "story-2",
    title: "Demystifying Hyperpigmentation & Melasma in Indian Skin Tones",
    snippet: "Fitzpatrick skin types III to V have hyper-reactive melanocytes. Understand why mechanical exfoliation triggers dark spots and how tyrosinase inhibitors work.",
    content: "Melasma is a chronic pigmentary disorder characterized by symmetrical brownish macules over sun-exposed facial areas. Dr. Manna emphasizes that melanin in South Asian skin is uniquely responsive to visible blue light emitted by screens and the sun, not just UV rays. Traditional physical scrubs create micro-tears that trigger inflammatory prostaglandins, leading to stubborn post-inflammatory hyperpigmentation. A successful regimen combines tyrosinase inhibitors (Azelaic acid, Tranexamic acid, Kojic dipalmitate) with tinted zinc oxide sunscreens that contain iron oxides to reflect visible light spectrums.",
    author: "Dr. Rituparna Manna",
    date: "June 20, 2026",
    readTime: "5 min read",
    category: "Sunscreen Science"
  },
  {
    id: "story-3",
    title: "Understanding Scalp Microbiome & Chronic Dandruff vs Seborrhea",
    snippet: "Flaking scalp isn't just dryness—it's frequently Malassezia yeast overgrowth. Why applying heavy hair oils often worsens the condition.",
    content: "Many patients in Bengal traditionally apply coconut or mustard oil to a flaky scalp under the impression that it is dry skin. Dr. Manna cautions that in cases of seborrheic dermatitis, the lipophilic yeast Malassezia furfur feeds directly on fatty acids in plant oils, multiplying rapidly and releasing irritating oleic acids that trigger severe itch and hair thinning. Clinical management requires cycling therapeutic shampoos with Ketoconazole 2%, Zinc Pyrithione (ZPTO), or Ciclopirox Olamine, leaving lather on the scalp for 5 full minutes before rinsing.",
    author: "Dr. Rituparna Manna",
    date: "May 31, 2026",
    readTime: "4 min read",
    category: "Hair Health"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev-1",
    patientName: "Debolina Mukherjee",
    location: "Kalyani B-Block",
    skinCondition: "Severe Cystic Acne & Scars",
    rating: 5,
    reviewText: "Dr. Rituparna Manna is the finest dermatologist in Kalyani. I had struggled with painful hormonal acne for 3 years that left deep red marks. Within 4 months of his customized topical regimen and barrier repair guide, my active acne completely stopped. He never pushes unnecessary expensive procedures.",
    date: "2 weeks ago",
    verified: true
  },
  {
    id: "rev-2",
    patientName: "Arpan Ganguly",
    location: "Kalyani Central Park",
    skinCondition: "Chronic Scalp Flaking & Hair Fall",
    rating: 5,
    reviewText: "His dermoscopy examination for my severe dandruff and receding hairline was so meticulous. He clearly explained the science of scalp yeast and prescribed a 6-week medical wash routine. My scalp itch is gone and shedding dropped significantly. The Demo Medical Hall clinic is very convenient.",
    date: "1 month ago",
    verified: true
  },
  {
    id: "rev-3",
    patientName: "Moumita Sarkar",
    location: "Kalyani Sector 4",
    skinCondition: "Facial Eczema & Sensitive Skin",
    rating: 5,
    reviewText: "Every winter my skin would burn, crack, and peel. Dr. Manna guided me on barrier repair creams and mild syndet cleansers. He listens with empathy and respects your concerns. Truly an exceptional skin specialist doctor in Kalyani.",
    date: "3 weeks ago",
    verified: true
  },
  {
    id: "rev-4",
    patientName: "Subhashish Roy",
    location: "Kanchrapara / Kalyani Link",
    skinCondition: "Fungal Allergy & Tinea Infection",
    rating: 5,
    reviewText: "I had recurrent fungal ringworm for months because of OTC steroid abuse. Dr. Manna identified the steroid-modified rash immediately and healed it with proper antifungal treatment and hygiene instructions. Highly grateful to him!",
    date: "2 months ago",
    verified: true
  },
  {
    id: "rev-5",
    patientName: "Ritwika Sengupta",
    location: "Kalyani A-Block",
    skinCondition: "Melasma & Sun Damage",
    rating: 5,
    reviewText: "Outstanding knowledge of pigmentary dermatology. His recommendation of iron oxide tinted sunscreen and azelaic acid lightened my dark cheek patches by more than 75% in 12 weeks. Best dermatologist consultation in Nadia district.",
    date: "1 month ago",
    verified: true
  },
  {
    id: "rev-6",
    patientName: "Tanmoy Bhattacharya",
    location: "Kalyani Station Road",
    skinCondition: "Plaque Psoriasis Management",
    rating: 5,
    reviewText: "Dr. Manna's compassionate approach to chronic skin conditions gave me immense mental peace. His systematic maintenance therapy keeps my elbow and knee plaques in complete remission. 5-star doctor with genuine clinical ethics.",
    date: "6 days ago",
    verified: true
  }
];
