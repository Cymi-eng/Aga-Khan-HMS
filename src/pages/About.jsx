import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  HeartPulse,
  Stethoscope,
  Users,
  ShieldCheck,
  Clock,
  Building2,
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

const stats = [
  { label: "Years serving the community", value: "60+", icon: Clock },
  { label: "Specialist departments", value: "18", icon: Stethoscope },
  { label: "Patients cared for annually", value: "120K+", icon: Users },
  { label: "Accredited care standards", value: "ISO", icon: ShieldCheck },
];

const values = [
  {
    title: "Patient-first care",
    body: "Every appointment, referral and follow-up is designed around the patient's time and wellbeing, not administrative convenience.",
    icon: HeartPulse,
  },
  {
    title: "Clinical excellence",
    body: "Our specialists work across cardiology, general practice, paediatrics and diagnostics, holding every case to the same rigorous standard.",
    icon: Stethoscope,
  },
  {
    title: "Community trust",
    body: "As a not-for-profit health network, we reinvest in facilities, training and outreach so quality care stays within reach.",
    icon: Building2,
  },
];

export default function AboutPage() {
    
  return (
   <>
    <Navbar/>
    <div
      className="min-h-screen pb-16"
      style={{ background: TOKENS.paper, color: TOKENS.ink }}
    >
      

      <header className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-10 text-center mt-6">
        
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 34,
            fontWeight: 700,
            color: TOKENS.tealDeep,
          }}
        >
          About Aga Khan Hospital
        </h1>
        <p
          className="mt-4 max-w-2xl mx-auto"
          style={{ fontSize: 15, lineHeight: 1.7, color: TOKENS.inkSoft }}
        >
          We are a community-rooted hospital network committed to accessible,
          modern healthcare — pairing experienced specialists with a digital
          patient experience that makes booking, tracking and managing care
          simple.
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{ background: TOKENS.card, border: `1px solid ${TOKENS.line}` }}
            >
              <Icon size={18} style={{ color: TOKENS.teal, margin: "0 auto 8px" }} />
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 22,
                  fontWeight: 700,
                  color: TOKENS.tealDeep,
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 12, color: TOKENS.inkSoft, marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 mt-14">
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 24,
            fontWeight: 700,
            color: TOKENS.ink,
          }}
        >
          What guides our care
        </h2>
        <div className="mt-6 space-y-4">
          {values.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl p-5"
              style={{ background: TOKENS.card, border: `1px solid ${TOKENS.line}` }}
            >
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 44, height: 44, background: TOKENS.tealTint }}
              >
                <Icon size={20} style={{ color: TOKENS.tealDeep }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 600 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: TOKENS.inkSoft, marginTop: 4, lineHeight: 1.6 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="max-w-4xl mx-auto px-5 md:px-8 mt-14 rounded-xl p-8 text-center"
        style={{ background: TOKENS.tealDeep, color: "#fff" }}
      >
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700 }}>
          A hospital portal built around you
        </h2>
        <p className="mt-3 max-w-xl mx-auto" style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>
          This platform lets patients book appointments, track medical records
          and stay in touch with their care team, while our staff manage
          scheduling and departments in one place.
        </p>
      </section>
     </div>  
      <Footer/>
      </>
   
  );
}