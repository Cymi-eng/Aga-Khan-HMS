import {
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Microscope,
  Pill,
  Ambulance,
  Stethoscope,
} from "lucide-react";

// Single source of truth for department data.
// Used by the Services listing grid and the /services/:slug detail page.
const departments = [
  {
    slug: "cardiology",
    title: "Cardiology",
    tag: "Heart & Vascular",
    icon: HeartPulse,
    description:
      "Diagnosis and treatment of heart and cardiovascular conditions, from routine screening to advanced interventional care.",
    overview:
      "Our cardiology team diagnoses and manages conditions affecting the heart and blood vessels, combining clinical expertise with modern cardiac diagnostic equipment. We support patients through every stage, from first screening to long-term follow-up care.",
    conditions: [
      "Hypertension and blood pressure management",
      "Coronary artery disease",
      "Arrhythmias and irregular heartbeat",
      "Heart failure management",
      "Pre-surgical cardiac clearance",
    ],
    highlights: [
      "ECG and echocardiography on site",
      "Same-week specialist consultations",
      "Coordinated care with our emergency department",
    ],
  },
  {
    slug: "neurology",
    title: "Neurology",
    tag: "Brain & Nervous System",
    icon: Brain,
    description:
      "Specialist care for conditions affecting the brain, spine, and nervous system, backed by advanced imaging.",
    overview:
      "Our neurology department evaluates and treats disorders of the brain, spinal cord, and nervous system. We work closely with our laboratory and imaging teams to reach accurate diagnoses and build treatment plans suited to each patient.",
    conditions: [
      "Chronic headaches and migraines",
      "Epilepsy and seizure disorders",
      "Stroke care and recovery",
      "Nerve pain and neuropathy",
      "Movement disorders",
    ],
    highlights: [
      "Access to CT and MRI imaging",
      "Coordinated stroke response with emergency care",
      "Long-term management plans for chronic conditions",
    ],
  },
  {
    slug: "pediatrics",
    title: "Pediatrics",
    tag: "Infants & Children",
    icon: Baby,
    description:
      "Compassionate, age-appropriate healthcare for infants, children, and adolescents, from wellness visits to acute care.",
    overview:
      "Our pediatric team provides healthcare for infants, children, and adolescents in a setting built around younger patients. From routine wellness checks to treating acute illness, care is delivered with attention to each child's comfort and development.",
    conditions: [
      "Newborn and infant checkups",
      "Childhood vaccinations",
      "Growth and development monitoring",
      "Common childhood illnesses",
      "Adolescent health concerns",
    ],
    highlights: [
      "Dedicated pediatric waiting area",
      "Vaccination scheduling and tracking",
      "Direct line to pediatric specialists when referrals are needed",
    ],
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    tag: "Bone, Joint & Muscle",
    icon: Bone,
    description:
      "Treatment for fractures, joint conditions, and sports injuries, including surgical and rehabilitative pathways.",
    overview:
      "Our orthopedic team treats conditions of the bones, joints, and muscles, from acute fractures to chronic joint pain. Care spans diagnosis, treatment, and rehabilitation, with surgical options available when needed.",
    conditions: [
      "Fractures and sports injuries",
      "Joint pain and arthritis",
      "Back and spine conditions",
      "Post-surgical rehabilitation",
      "Mobility and physiotherapy support",
    ],
    highlights: [
      "On-site X-ray for fast diagnosis",
      "Rehabilitation guidance included in treatment plans",
      "Coordinated care for sports and workplace injuries",
    ],
  },
  {
    slug: "laboratory",
    title: "Laboratory",
    tag: "Diagnostics",
    icon: Microscope,
    description:
      "Accurate, fast diagnostic testing run by qualified lab specialists using modern analytical equipment.",
    overview:
      "Our laboratory delivers diagnostic testing across a wide panel of routine and specialized tests. Results are reviewed by qualified lab specialists and shared directly with your treating physician to keep your care moving quickly.",
    conditions: [
      "Blood chemistry and hematology panels",
      "Infectious disease testing",
      "Hormone and metabolic testing",
      "Pre-employment and insurance screening",
      "Specialist-referred diagnostic panels",
    ],
    highlights: [
      "Most results available within 24 hours",
      "Walk-in sample collection",
      "Results shared directly with your doctor",
    ],
  },
  {
    slug: "pharmacy",
    title: "Pharmacy",
    tag: "Medication & Dispensing",
    icon: Pill,
    description:
      "On-site pharmacy staffed by licensed pharmacists, with prescriptions filled and reviewed the same day.",
    overview:
      "Our on-site pharmacy fills prescriptions from our own doctors as well as valid prescriptions from outside providers. Licensed pharmacists review every order and are available to answer questions about dosage, interactions, and side effects.",
    conditions: [
      "Prescription dispensing",
      "Medication reviews and interaction checks",
      "Chronic medication refills",
      "Over-the-counter guidance",
      "Dosage counseling",
    ],
    highlights: [
      "Same-day dispensing for most prescriptions",
      "Licensed pharmacists on site during opening hours",
      "Refill reminders for ongoing medication",
    ],
  },
  {
    slug: "emergency-care",
    title: "Emergency Care",
    tag: "24/7 Urgent Response",
    icon: Ambulance,
    description:
      "Round-the-clock emergency medicine for urgent and life-threatening conditions, staffed at all hours.",
    overview:
      "Our emergency department is staffed and equipped around the clock to treat urgent and life-threatening conditions. Patients are assessed on arrival and prioritized by the severity of their condition.",
    conditions: [
      "Severe injuries and trauma",
      "Chest pain and breathing difficulty",
      "Severe allergic reactions",
      "Acute abdominal pain",
      "Loss of consciousness or severe illness",
    ],
    highlights: [
      "Open 24 hours a day, every day",
      "Direct coordination with cardiology and neurology",
      "On-site laboratory and imaging for fast diagnosis",
    ],
  },
  {
    slug: "general-medicine",
    title: "General Medicine",
    tag: "Primary Care",
    icon: Stethoscope,
    description:
      "Everyday healthcare and preventive checkups with physicians who get to know you over repeat visits.",
    overview:
      "Our general medicine team handles everyday healthcare needs and preventive checkups, and serves as the first point of contact for most patients. When specialist care is needed, we coordinate referrals within the hospital.",
    conditions: [
      "Routine checkups and physicals",
      "Common illnesses and infections",
      "Chronic condition management",
      "Preventive screening",
      "Referrals to specialist departments",
    ],
    highlights: [
      "Continuity of care with a consistent physician",
      "Same-week appointment availability",
      "Direct referral pathway to specialist departments",
    ],
  },
];

export default departments;

export function getDepartmentBySlug(slug) {
  return departments.find((d) => d.slug === slug);
}