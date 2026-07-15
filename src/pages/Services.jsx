import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HeartPulse,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Eye,
  FlaskConical,
  Ambulance,
  Syringe,
  Users,
  ArrowRight,
} from "lucide-react";

const TOKENS = {
  paper: "#F7F3EA",
  card: "#FFFFFF",
  ink: "#211F1A",
  inkSoft: "#6B6459",
  teal: "#2E6659",
  tealDeep: "#1E463D",
  tealTint: "#E4EEE9",
  rust: "#9B4A2E",
  rustTint: "#F3E2D8",
  line: "#DDD5C3",
};

const services = [
  {
    title: "Cardiology",
    body: "Diagnosis and ongoing management of heart conditions, from routine screening to specialist consultations.",
    icon: HeartPulse,
    tag: "Specialist",
  },
  {
    title: "General Practice",
    body: "Everyday health concerns, checkups and referrals, with a doctor who gets to know your history over time.",
    icon: Stethoscope,
    tag: "Primary care",
  },
  {
    title: "Paediatrics",
    body: "Care for infants, children and adolescents, including growth monitoring and vaccination schedules.",
    icon: Baby,
    tag: "Specialist",
  },
  {
    title: "Neurology",
    body: "Assessment and treatment of conditions affecting the brain, spine and nervous system.",
    icon: Brain,
    tag: "Specialist",
  },
  {
    title: "Orthopaedics",
    body: "Care for bones, joints and muscles, from sports injuries to long-term mobility concerns.",
    icon: Bone,
    tag: "Specialist",
  },
  {
    title: "Ophthalmology",
    body: "Eye examinations, vision correction and treatment for conditions affecting eye health.",
    icon: Eye,
    tag: "Specialist",
  },
  {
    title: "Laboratory & Diagnostics",
    body: "Blood work, imaging and test results, with reports delivered straight to your patient portal.",
    icon: FlaskConical,
    tag: "Diagnostics",
  },
  {
    title: "Emergency Care",
    body: "Round-the-clock urgent care for accidents and acute conditions that can't wait for an appointment.",
    icon: Ambulance,
    tag: "24/7",
  },
  {
    title: "Vaccinations",
    body: "Routine and travel immunisations administered by our nursing team, logged to your health record.",
    icon: Syringe,
    tag: "Preventive",
  },
];

function ServiceCard({ title, body, icon: Icon, tag }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col h-full"
      style={{ background: TOKENS.card, border: `1px solid ${TOKENS.line}` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 46, height: 46, background: TOKENS.tealTint }}
        >
          <Icon size={20} style={{ color: TOKENS.tealDeep }} />
        </div>
        <span
          className="uppercase"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: TOKENS.rust,
            background: TOKENS.rustTint,
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          {tag}
        </span>
      </div>

      <h3
        className="mt-4"
        style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 600 }}
      >
        {title}
      </h3>
      <p
        className="mt-2 flex-1"
        style={{ fontSize: 13.5, color: TOKENS.inkSoft, lineHeight: 1.6 }}
      >
        {body}
      </p>

      <button
        className="mt-4 flex items-center gap-1.5 self-start"
        style={{ fontSize: 13, fontWeight: 600, color: TOKENS.teal }}
      >
        Book appointment
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
    <Navbar/>
    
    <div>
    
      <header className="max-w-5xl mx-auto px-5 md:px-8 pt-16 pb-10 text-center mt-6">
        
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 34,
            fontWeight: 700,
            color: TOKENS.tealDeep,
          }}
        >
          Our Services
        </h1>
        <p
          className="mt-4 max-w-2xl mx-auto"
          style={{ fontSize: 15, lineHeight: 1.7, color: TOKENS.inkSoft }}
        >
          From everyday checkups to specialist care and emergencies, our
          departments work together so you get the right care, booked in one
          place.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section
        className="max-w-5xl mx-auto px-5 md:px-8 mt-14 rounded-xl p-8 text-center mb-6"
        style={{ background: TOKENS.tealDeep, color: "#fff" }}
      >
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700 }}>
          Not sure which department you need?
        </h2>
        <p className="mt-3 max-w-xl mx-auto" style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>
          Book a general practice consultation first, and we'll refer you to
          the right specialist.
        </p>
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5"
          style={{ background: "#fff", color: TOKENS.tealDeep, fontSize: 13, fontWeight: 600 }}
        >
          Book Appointment
          <ArrowRight size={15} />
        </button>
      </section>
    </div>
    <Footer/>
    </>
  );
}