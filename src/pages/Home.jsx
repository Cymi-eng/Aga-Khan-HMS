import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  UserSearch,
  PhoneCall,
  MapPin,
  AlertTriangle,
  Siren,
  HeartPulse,
  Baby,
  FlaskConical,
  BadgeCheck,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#faf9fd] text-[#1a1c1e] w-full">
        <Navbar />

        {/*  HERO (split screen)  */}

        <section className="relative w-full min-h-[500px] md:min-h-[640px] flex items-stretch overflow-hidden bg-[#1a365d] pt-20">
          <div className="flex flex-col md:flex-row w-full px-6 md:px-10">
            {/* LEFT — stays left-aligned, not centered */}
            <div className="flex-1 flex flex-col justify-center py-12 md:pr-10 z-10 text-left">
              <span className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold w-fit">
                Your Health, Our Priority
              </span>

              <h1 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight">
                Expert Care for Your Family's Health.
              </h1>

              <p className="mt-6 text-white/80 text-lg leading-8 max-w-xl">
                Aga Khan Hospital is dedicated to providing compassionate,
                world-class healthcare with 700+ beds and 200+ top doctors
                across every field.
              </p>
                <button
                  onClick={() => navigate("/book-appointment")}
                  className="bg-white text-[#1a365d] px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <CalendarDays size={20} />
                  Book Appointment
                </button>

              <div className="flex items-center gap-5 mt-12">
                <div className="flex">
                  <img
                    src="45.jpg"
                    className="w-12 h-12 rounded-full border-2 border-white"
                    alt="Patient"
                  />
                  <img
                    src="40.jpg"
                    className="w-12 h-12 rounded-full border-2 border-white -ml-4"
                    alt="Patient"
                  />
                  <img
                    src="60.jpg"
                    className="w-12 h-12 rounded-full border-2 border-white -ml-4"
                    alt="Patient"
                  />
                </div>
                <div>
                  <p className="font-bold text-white">
                    Trusted by Thousands of Patients
                  </p>
                  <p className="text-sm text-white/70">
                    Delivering quality healthcare every day.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 relative min-h-[320px] md:min-h-full mt-10 md:mt-0">
              <div className="md:absolute md:inset-0 md:left-10">
                <img
                  src="hospital.jpg"
                  alt="Hospital Team"
                  className="w-full h-full object-cover rounded-2xl md:rounded-none"
                />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#1a365d] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/*  QUICK SERVICES GRID  */}

        <section className="w-full px-6 md:px-10 py-12 md:py-20">
          <h3 className="text-2xl font-bold text-[#1a365d] mb-8 text-left">
            Quick Services
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-[#f4f3f7] p-6 rounded-xl border border-[#c4c6cf] hover:border-[#1a365d] transition-all cursor-pointer">
              <div className="bg-[#ffdad6] text-[#ba1a1a] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Siren size={20} />
              </div>
              <p className="font-semibold text-[#1a1c1e] mb-2">
                Emergency Care
              </p>
              <p className="text-sm text-[#43474e]">
                Immediate 24/7 trauma assistance
              </p>
            </div>

            <div className="bg-[#f4f3f7] p-6 rounded-xl border border-[#c4c6cf] hover:border-[#1a365d] transition-all cursor-pointer">
              <div className="bg-[#d0e1fb] text-[#1a365d] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <HeartPulse size={20} />
              </div>
              <p className="font-semibold text-[#1a1c1e] mb-2">Cardiology</p>
              <p className="text-sm text-[#43474e]">
                Advanced heart &amp; vascular health
              </p>
            </div>

            <div className="bg-[#f4f3f7] p-6 rounded-xl border border-[#c4c6cf] hover:border-[#1a365d] transition-all cursor-pointer">
              <div className="bg-[#d0e1fb] text-[#1a365d] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Baby size={20} />
              </div>
              <p className="font-semibold text-[#1a1c1e] mb-2">Pediatrics</p>
              <p className="text-sm text-[#43474e]">
                Specialized care for children
              </p>
            </div>

            <div className="bg-[#f4f3f7] p-6 rounded-xl border border-[#c4c6cf] hover:border-[#1a365d] transition-all cursor-pointer">
              <div className="bg-[#d0e1fb] text-[#1a365d] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <FlaskConical size={20} />
              </div>
              <p className="font-semibold text-[#1a1c1e] mb-2">Diagnostics</p>
              <p className="text-sm text-[#43474e]">
                State-of-the-art lab services
              </p>
            </div>
          </div>
        </section>

        {/* IMMEDIATE CARE BANNER  */}

        <section className="w-full px-6 md:px-10 mb-20">
          <div className="bg-[#f4f3f7] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[#c4c6cf]">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-[#ba1a1a]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#ba1a1a]">
                  Urgent Assistance
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1c1e] mb-2">
                Immediate Care When You Need It Most
              </h3>

              <p className="text-[#43474e] max-w-2xl">
                Our emergency response team is available 24/7 for
                life-threatening situations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+254111911911"
                className="flex items-center justify-center gap-2 bg-[#ba1a1a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#ba1a1a]/90 transition-colors"
              >
                <PhoneCall size={18} />
                Call 24/7 Emergency
              </a>

              <Link
                to="/facilities"
                className="flex items-center justify-center gap-2 bg-white border border-[#c4c6cf] text-[#1a1c1e] px-8 py-3 rounded-lg font-semibold hover:bg-[#e9e7eb] transition-colors"
              >
                <MapPin size={18} />
                View Hospital Map
              </Link>
            </div>
          </div>
        </section>

        {/*  SPECIALISTS  */}

        <section className="w-full px-6 md:px-10 py-12 md:py-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#1a365d]">
              Top Specialists
            </h3>
            <Link
              to="/doctors"
              className="text-sm font-semibold text-[#1a365d] hover:underline flex items-center gap-1"
            >
              View All Specialists <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Sarah Kim",
                dept: "Cardiology Specialist",
                years: "12 Years Experience",
                image: "sarah.jpg",
              },
              {
                name: "Dr. James Carter",
                dept: "Head of Pediatrics",
                years: "15 Years Experience",
                image: "james.jpg",
              },
              {
                name: "Dr. Emily Johnson",
                dept: "Senior Neurologist",
                years: "8 Years Experience",
                image: "emily.jpg",
              },
              {
                name: "Dr. David Brown",
                dept: "Orthopedics Consultant",
                years: "10 Years Experience",
                image: "david.jpg",
              },
            ].map((doctor) => (
              <div
                key={doctor.name}
                className="bg-white rounded-xl border border-[#c4c6cf] overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#1a1c1e] mb-1">
                    {doctor.name}
                  </h4>
                  <p className="text-sm text-[#1a365d] mb-4">{doctor.dept}</p>
                  <div className="flex items-center gap-2 text-[#43474e]">
                    <BadgeCheck size={18} className="text-[#1a365d]" />
                    <span className="text-xs">{doctor.years}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*  WHY CHOOSE US & TESTIMONIAL  */}

        <section className="w-full bg-[#f4f3f7] border-y border-[#c4c6cf] py-20">
          <div className="w-full px-6 md:px-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/3 text-left">
              <h3 className="text-3xl font-bold text-[#1a365d] mb-4">
                Why Patients Choose Us
              </h3>

              <p className="text-[#43474e] mb-8">
                We combine clinical excellence at Aga Khan Hospital with a
                patient-first approach to ensure the best possible outcomes.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#1a365d]">200+</p>
                  <p className="text-xs text-[#43474e]">Doctors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a365d]">24/7</p>
                  <p className="text-xs text-[#43474e]">Active Care</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a365d]">99%</p>
                  <p className="text-xs text-[#43474e]">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl p-10 border border-[#c4c6cf] relative shadow-sm">
                <Quote
                  size={56}
                  className="absolute top-6 right-8 text-[#1a365d] opacity-20"
                />

                <p className="text-xl italic text-[#1a1c1e] mb-8 pr-12 leading-relaxed">
                  "The diagnostic department here is incredible. I received my
                  results within hours, and the specialists took the time to
                  explain everything clearly. It's rare to find this level of
                  efficiency and care combined."
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#d0e1fb] flex items-center justify-center font-bold text-lg text-[#1a365d]">
                    MJ
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1c1e]">Michael Jordan</p>
                    <p className="text-sm text-[#43474e]">Patient since 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="py-20 bg-[#1a365d]">
          <div className="w-full text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Your Health Is Our Greatest Priority
            </h2>

            <p className="text-white/80 text-lg mt-6 leading-8">
              Book an appointment today and receive exceptional healthcare from
              our experienced specialists in a modern and compassionate
              environment.
            </p>

            <div className="flex justify-center flex-wrap gap-6 mt-10">
              <button className="bg-white text-[#1a365d] px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition">
                Book Appointment
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
