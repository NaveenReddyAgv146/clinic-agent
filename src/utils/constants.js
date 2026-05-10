export const servicesFallback = [
  {
    _id: 'svc-1',
    title: 'Hydrafacial Ritual',
    description: 'Deep cleansing, exfoliation, peptide infusion, and calming LED therapy.',
    price: 6500,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'svc-2',
    title: 'Laser Rejuvenation',
    description: 'Precision treatment for pigmentation, pores, texture, and tone.',
    price: 12000,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'svc-3',
    title: 'Clinical Peel Program',
    description: 'Doctor-designed resurfacing for acne marks, dullness, and glow.',
    price: 8500,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'svc-4',
    title: 'Acne Clarity Program',
    description: 'A structured acne management plan for active breakouts, congestion, and post-acne inflammation.',
    price: 9500,
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80',
  },
]

export const doctorsFallback = [
  {
    _id: 'doc-1',
    name: 'Dr. Anika Rao',
    specialization: 'Consultant Dermatologist',
    experience: 12,
    availableSlots: ['09:00', '10:30', '12:00', '14:30', '16:00'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'doc-2',
    name: 'Dr. Mira Kapoor',
    specialization: 'Aesthetic Medicine',
    experience: 9,
    availableSlots: ['09:30', '11:00', '13:30', '15:00', '17:00'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
  },
]

export const testimonials = [
  ['The consultation felt calm, precise, and deeply personal. My skin plan finally made sense.', 'Nisha M.'],
  ['A luxury experience with clinical discipline. The team is thoughtful from booking to follow-up.', 'Rhea S.'],
  ['My pigmentation protocol was measured and honest. Results arrived without overpromising.', 'Kavya P.'],
]

export const gallery = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=80',
]

export const serviceDetails = {
  'Hydrafacial Ritual': {
    overview:
      'A premium skin reset focused on cleansing, exfoliation, extraction, infusion, and recovery support in one guided visit.',
    treatmentFlow: [
      'Doctor-led skin assessment and hydration mapping',
      'Gentle resurfacing and pore decongestion',
      'Targeted serum infusion for glow, hydration, and barrier support',
      'Finishing LED or calming mask for recovery',
    ],
    visits: 'Usually 1 visit every 4 to 6 weeks, with a 3-session glow plan recommended for event or bridal skin.',
    products: ['Medical-grade AHA/BHA cleanser', 'Peptide infusion serum', 'Hyaluronic repair concentrate', 'Barrier-restoring SPF'],
    machinery: ['Hydradermabrasion platform', 'Vacuum extraction handpiece', 'LED recovery panel'],
    aftercare:
      'Minimal downtime. Patients are advised to keep the routine gentle, stay hydrated, and use broad-spectrum sunscreen daily.',
  },
  'Laser Rejuvenation': {
    overview:
      'A doctor-controlled laser program designed to improve pigmentation, uneven texture, enlarged pores, and early signs of aging.',
    treatmentFlow: [
      'Detailed pigmentation and sensitivity evaluation',
      'Skin preparation and protective cooling',
      'Layered laser passes based on target concerns',
      'Post-procedure calming and recovery guidance',
    ],
    visits: 'Typically 3 to 5 sittings scheduled 4 weeks apart depending on pigmentation depth and skin response.',
    products: ['Pigment control serum', 'Ceramide recovery cream', 'Post-laser calming mist', 'High-protection mineral sunscreen'],
    machinery: ['Fractional resurfacing laser', 'Advanced cooling device', 'Dermatoscope imaging support'],
    aftercare:
      'Expect temporary warmth and mild redness. Strict sun protection and guided recovery skincare are essential between visits.',
  },
  'Clinical Peel Program': {
    overview:
      'A customized peel protocol created for acne marks, dullness, oil imbalance, and uneven tone using controlled exfoliation.',
    treatmentFlow: [
      'Skin prep and treatment suitability check',
      'Application of a customized peel blend',
      'Timed neutralization and barrier calming',
      'Post-peel protection planning with homecare',
    ],
    visits: 'Usually a course of 4 to 6 sessions every 2 to 3 weeks depending on acne marks and texture goals.',
    products: ['Pre-peel prep serum', 'Controlled exfoliation formula', 'Recovery moisturizer', 'Pigment-safe SPF'],
    machinery: ['Skin analysis lamp', 'Precision peel applicator tools', 'Cooling recovery support'],
    aftercare:
      'Mild peeling can occur for a few days. Patients should avoid active scrubs, heat exposure, and sun without protection.',
  },
  'Acne Clarity Program': {
    overview:
      'A deeper acne treatment pathway combining medical assessment, active breakout control, scar prevention, and routine correction.',
    treatmentFlow: [
      'Acne severity grading and trigger review',
      'Clinical extraction or clarifying treatment where suitable',
      'Oil control, inflammation reduction, and mark prevention strategy',
      'Long-term maintenance plan with follow-up monitoring',
    ],
    visits: 'Often 4 to 8 guided visits over 2 to 4 months, adjusted to breakout severity and skin tolerance.',
    products: ['Salicylic balancing cleanser', 'Prescription-strength acne actives where advised', 'Non-comedogenic hydrator', 'Oil-free sunscreen'],
    machinery: ['Blue light acne therapy', 'High-frequency antibacterial support', 'Sebum and texture analysis tools'],
    aftercare:
      'Consistency matters most. Patients receive a routine plan, breakout precautions, and progress reviews to reduce recurrence.',
  },
}
