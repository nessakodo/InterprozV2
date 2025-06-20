// Commission rates by service type
export const COMMISSION_RATES = {
  phone_interpretation: 0.20,       // 20%
  video_interpretation: 0.20,       // 20%
  in_person_standard: 0.20,         // 20%
  in_person_legal: 0.25,           // 25% (premium)
  in_person_medical: 0.25,         // 25% (premium)
  ai_avatar: 0.15,                 // 15% (lower due to automation)
  document_translation: 0.30,      // 30% (highest due to complexity)
  rush_services: 0.35,             // 35% (rush premium + base)
  emergency_services: 0.40         // 40% (emergency premium + base)
} as const;

// Complete Service Pricing Structure
export const SERVICE_PRICING = {
  // Core Services
  phone_interpretation: {
    rate: 2.50,     // $/minute
    minimum: 10,    // minutes
    currency: 'USD'
  },
  video_interpretation: {
    rate: 3.00,     // $/minute
    minimum: 15,    // minutes
    currency: 'USD'
  },
  in_person_general: {
    rate: 75.00,    // $/hour
    minimum: 2,     // hours
    currency: 'USD'
  },
  in_person_legal: {
    rate: 95.00,    // $/hour (premium)
    minimum: 2,     // hours
    currency: 'USD'
  },
  in_person_medical: {
    rate: 90.00,    // $/hour (premium)
    minimum: 2,     // hours
    currency: 'USD'
  },
  ai_avatar: {
    rate: 1.50,     // $/minute
    minimum: 1,     // minute
    currency: 'USD'
  },
  document_translation: {
    rate: 0.12,     // $/word
    minimum: 50,    // words
    currency: 'USD'
  },

  // Premium Multipliers
  rush_multiplier: 1.5,    // +50% for <24hr requests
  after_hours: 1.25,       // +25% after 6pm/weekends
  holiday: 2.0,            // +100% major holidays
  travel_fee: 0.65         // $/mile beyond 25 miles
} as const;

// Languages Offered (Priority System)
export const LANGUAGES = {
  // Tier 1: Primary Languages (Always Available)
  primary: [
    {
      code: 'es-mx',
      name: 'Spanish (Mexican)',
      priority: 1,
      interpreters_available: 15,
      specialties: ['legal', 'medical', 'business', 'general']
    },
    {
      code: 'es-us',
      name: 'Spanish (US Regional)',
      priority: 1,
      interpreters_available: 12,
      specialties: ['legal', 'medical', 'business', 'general']
    }
  ],

  // Tier 2: Regional Spanish (High Demand)
  secondary: [
    {
      code: 'es-gt',
      name: 'Spanish (Guatemalan)',
      priority: 2,
      interpreters_available: 8,
      specialties: ['general', 'medical', 'human_services']
    },
    {
      code: 'es-sv',
      name: 'Spanish (Salvadoran)',
      priority: 2,
      interpreters_available: 6,
      specialties: ['general', 'legal', 'human_services']
    },
    {
      code: 'es-co',
      name: 'Spanish (Colombian)',
      priority: 2,
      interpreters_available: 5,
      specialties: ['general', 'business']
    }
  ],

  // Tier 3: Future Expansion (Phase 2)
  expansion: [
    {
      code: 'pt-br',
      name: 'Portuguese (Brazilian)',
      priority: 3,
      status: 'planned',
      target_launch: 'Q3_2024'
    },
    {
      code: 'fr',
      name: 'French',
      priority: 3,
      status: 'planned',
      target_launch: 'Q4_2024'
    }
  ]
} as const;

// Booking Workflow Steps
export const BOOKING_WORKFLOW = {
  // Client-Initiated Booking
  client_flow: [
    {
      step: 1,
      name: 'service_selection',
      description: 'Choose service type and specialty',
      required_fields: ['service_type', 'language_pair', 'specialty'],
      estimated_time: '2 minutes'
    },
    {
      step: 2,
      name: 'scheduling',
      description: 'Select date, time, and duration',
      required_fields: ['preferred_date', 'preferred_time', 'duration'],
      auto_suggestions: true
    },
    {
      step: 3,
      name: 'details',
      description: 'Provide context and special requirements',
      required_fields: ['context', 'location_or_method'],
      optional_fields: ['special_requirements', 'materials']
    },
    {
      step: 4,
      name: 'interpreter_assignment',
      description: 'System matches and assigns interpreter',
      automated: true,
      fallback: 'manual_assignment',
      max_wait_time: '15 minutes'
    },
    {
      step: 5,
      name: 'confirmation',
      description: 'Final confirmation and payment processing',
      required_fields: ['payment_method'],
      notifications: ['email', 'sms']
    }
  ],

  // Emergency/Rush Booking
  rush_flow: [
    {
      step: 1,
      name: 'immediate_request',
      description: 'Express booking for <2 hour needs',
      required_fields: ['service_type', 'urgency_level'],
      rush_fee: 'automatic'
    },
    {
      step: 2,
      name: 'instant_matching',
      description: 'Immediate interpreter search',
      max_wait_time: '5 minutes',
      fallback: 'ai_avatar_offer'
    },
    {
      step: 3,
      name: 'express_confirmation',
      description: 'Rapid confirmation process',
      payment: 'auto_charge',
      notifications: 'immediate'
    }
  ]
} as const;

// Interpreter Onboarding Requirements
export const INTERPRETER_ONBOARDING = {
  // Phase 1: Application
  application: {
    required_documents: [
      'resume_cv',
      'certification_copies',
      'references_list',
      'background_check_authorization',
      'language_proficiency_proof'
    ],
    required_certifications: [
      'state_certification', // Colorado preferred
      'court_interpretation_cert', // for legal work
      'medical_interpretation_cert', // for healthcare
      'continuing_education_credits'
    ],
    experience_requirements: {
      minimum_years: 2,
      preferred_years: 5,
      specialty_experience: 'preferred'
    }
  },

  // Phase 2: Skills Assessment
  assessment: {
    language_test: {
      type: 'oral_and_written',
      duration: '90 minutes',
      passing_score: 85,
      includes: ['sight_translation', 'consecutive', 'simultaneous']
    },
    specialty_tests: {
      legal: 'terminology_and_procedure',
      medical: 'anatomy_and_terminology',
      business: 'financial_and_corporate_terms'
    }
  },

  // Phase 3: Platform Training
  training: {
    modules: [
      'platform_navigation',
      'booking_system_usage',
      'client_communication_protocols',
      'technical_setup_video_calls',
      'ai_avatar_collaboration',
      'confidentiality_requirements'
    ],
    duration: '8 hours',
    completion_required: true
  },

  // Phase 4: Voice Recording (for AI Avatar)
  voice_recording: {
    required_samples: [
      'common_phrases_150',
      'legal_terminology_100',
      'medical_terminology_100',
      'business_phrases_75',
      'conversational_samples_200'
    ],
    quality_requirements: {
      format: 'WAV 44.1kHz 16-bit',
      environment: 'quiet_studio_quality',
      duration_per_sample: '2-10 seconds'
    }
  },

  // Phase 5: Approval & Activation
  activation: {
    background_check: 'required',
    reference_verification: 'required',
    trial_assignments: 3,
    probation_period: '30 days',
    full_activation: 'after_successful_probation'
  }
} as const;

// Calculate service cost based on type and parameters
export function calculateServiceCost(
  serviceType: keyof typeof SERVICE_PRICING,
  duration: number,
  isRush: boolean = false,
  isAfterHours: boolean = false,
  isHoliday: boolean = false,
  travelMiles: number = 0
): { subtotal: number; commission: number; interpreterEarnings: number; total: number } {
  const pricing = SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING];
  if (!pricing || typeof pricing === 'number') {
    throw new Error(`Invalid service type: ${serviceType}`);
  }

  let subtotal = pricing.rate * Math.max(duration, pricing.minimum);
  
  // Apply multipliers
  if (isRush) subtotal *= SERVICE_PRICING.rush_multiplier;
  if (isAfterHours) subtotal *= SERVICE_PRICING.after_hours;
  if (isHoliday) subtotal *= SERVICE_PRICING.holiday;
  
  // Add travel fee
  if (travelMiles > 25) {
    subtotal += (travelMiles - 25) * SERVICE_PRICING.travel_fee;
  }

  // Calculate commission
  const commissionRate = COMMISSION_RATES[serviceType as keyof typeof COMMISSION_RATES] || 0.20;
  const commission = subtotal * commissionRate;
  const interpreterEarnings = subtotal - commission;

  return {
    subtotal,
    commission,
    interpreterEarnings,
    total: subtotal
  };
}