import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  PhoneCall,
  UserSearch,
  MapPin,
  Clock,
  Award,
  Users,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
    
   
    <div className="bg-white">
         <Navbar/>

      {/* ================= HERO ================= */}

      <section className="relative min-h-screen bg-gradient-to-r from-sky-50 via-white to-blue-50 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center min-h-screen pt-16">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
              Your Health, Our Priority
            </span>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-gray-900">
              Excellence In
              <span className="text-[#005B96]"> Healthcare </span>
              Starts Here.
            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">
              Aga Khan Hospital is committed to delivering exceptional healthcare
              through experienced specialists, advanced medical technology,
              compassionate care, and world-class facilities.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-[#005B96] hover:bg-blue-800 text-white px-8 py-4 rounded-full flex items-center gap-3 font-semibold transition">
                <CalendarDays size={20} />
                Book Appointment
              </button>

            </div>

            <div className="flex items-center gap-5 mt-14">

              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="Patient"
              />

              <img
                src="https://randomuser.me/api/portraits/men/40.jpg"
                className="w-12 h-12 rounded-full border-2 border-white -ml-4"
                alt="Patient"
              />

              <img
                src="https://randomuser.me/api/portraits/women/60.jpg"
                className="w-12 h-12 rounded-full border-2 border-white -ml-4"
                alt="Patient"
              />

              <div>
                <p className="font-bold text-gray-900">
                  Trusted by Thousands of Patients
                </p>

                <p className="text-sm text-gray-500">
                  Delivering quality healthcare every day.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <img
              src="hospital.jpg"
              alt="Hospital Team"
              className="rounded-[40px] shadow-2xl object-cover w-full h-[700px]"
            />

          </div>

        </div>

      </section>

      {/* ================= QUICK ACCESS STRIP ================= */}

      <section className="bg-[#003b63] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">

          <Link to="/doctors" className="flex items-center gap-3 hover:opacity-80 transition">
            <UserSearch size={22} />
            <span className="font-medium">Find a Doctor</span>
          </Link>

          <a href="tel:+254111911911" className="flex items-center gap-3 hover:opacity-80 transition">
            <PhoneCall size={22} />
            <span className="font-medium">Emergency: 111 911 911</span>
          </a>

          <Link to="/facilities" className="flex items-center gap-3 hover:opacity-80 transition">
            <MapPin size={22} />
            <span className="font-medium">Our Locations</span>
          </Link>

        </div>
      </section>

      {/* ================= STATS / ACCREDITATION ================= */}

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div>
            <p className="text-4xl font-black text-[#005B96]">700+</p>
            <p className="text-gray-600 mt-2">Hospital Beds</p>
          </div>

          <div>
            <p className="text-4xl font-black text-[#005B96]">200+</p>
            <p className="text-gray-600 mt-2">Specialist Doctors</p>
          </div>

          <div>
            <p className="text-4xl font-black text-[#005B96]">40+</p>
            <p className="text-gray-600 mt-2">Years of Service</p>
          </div>

          <div>
            <p className="text-4xl font-black text-[#005B96]">JCI</p>
            <p className="text-gray-600 mt-2">Accredited Hospital</p>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section className="py-28">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <img
              src="/doctor.jpg"
              alt="Hospital"
              className="rounded-[35px] shadow-xl"
            />
          </div>

          <div>

            <span className="uppercase tracking-[5px] text-[#005B96] font-semibold">
              About Aga Khan Hospital
            </span>

            <h2 className="text-5xl font-bold mt-6 text-gray-900 leading-tight">
              Caring For Your Health With
              Excellence & Compassion
            </h2>

            <p className="mt-8 text-gray-600 text-lg leading-8">
              We are committed to providing quality healthcare through
              innovation, professionalism, and patient-centered services.
              Our experienced specialists, modern facilities, and dedicated
              staff ensure every patient receives the highest standard of care.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Award size={20} className="text-[#005B96]" />
                <span className="text-gray-700">JCI-accredited quality and safety standards</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={20} className="text-[#005B96]" />
                <span className="text-gray-700">Multidisciplinary teams across every specialty</span>
              </div>
            </div>

            <button className="mt-10 bg-[#005B96] text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-blue-800 transition">
              Learn More
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-[#005B96] font-semibold">
              Our Services
            </span>

            <h2 className="text-5xl font-bold mt-5 text-gray-900">
              Comprehensive Medical Care
            </h2>

            <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
              We provide high-quality healthcare services across multiple
              specialties using advanced technology and experienced healthcare
              professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

            {[
              { title: "Cardiology", desc: "Advanced diagnosis and treatment for heart conditions." },
              { title: "Neurology", desc: "Comprehensive care for neurological disorders." },
              { title: "Pediatrics", desc: "Dedicated healthcare services for children." },
              { title: "Orthopedics", desc: "Specialized treatment for bones and joints." },
              { title: "Laboratory", desc: "Accurate diagnostic tests with modern equipment." },
              { title: "Pharmacy",desc: "Quality medicines and pharmaceutical care." },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-3xl p-8 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-gray-600 mt-4 leading-7">{service.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-28">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-[#005B96] font-semibold">
              Why Choose Us
            </span>
            <h2 className="text-5xl font-bold mt-5">
              Exceptional Healthcare Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
              { title: "Expert Doctors", text: "Highly qualified specialists with years of experience." },
              { title: "Modern Equipment", text: "State-of-the-art technology for accurate diagnosis." },
              { title: "24/7 Emergency", text: "Emergency medical services available all day." },
              { title: "Patient First", text: "Compassionate and personalized healthcare." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-2xl transition"
              >
                <div className="text-6xl mb-6">{item.emoji}</div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 text-gray-600">{item.text}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= SPECIALISTS ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-[#005B96] font-semibold">
              Meet Our Specialists
            </span>
            <h2 className="text-5xl font-bold mt-5">
              Experienced Medical Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
             { name: "Dr. Sarah Kim", dept: "Cardiology", image: "/sarah.jpg" },
              { name: "Dr. James Carter", dept: "Neurology", image: "/james.jpg" },
              { name: "Dr. Emily Johnson", dept: "Pediatrics", image: "/emily.jpg" },
              { name: "Dr. David Brown", dept: "Orthopedics", image: "/david.jpg" },
            ].map((doctor) => (
              <div
                key={doctor.name}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img src={doctor.image} alt={doctor.name} className="w-full h-72 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold">{doctor.name}</h3>
                  <p className="text-[#005B96] mt-2">{doctor.dept}</p>
                </div>
              </div>
            ))}

          </div>

          <div className="text-center mt-14">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-3 border-2 border-[#005B96] text-[#005B96] hover:bg-[#005B96] hover:text-white px-8 py-4 rounded-full font-semibold transition"
            >
              View All Doctors
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-[#005B96] font-semibold">
              Patient Stories
            </span>
            <h2 className="text-5xl font-bold mt-5">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                name: "Amina R.",
                text: "From my first visit to delivery, the care I received was attentive and reassuring the whole way through.",
              },
              {
                name: "Peter M.",
                text: "The emergency team acted fast and kept my family informed at every step. I'm grateful for how well they handled things.",
              },
              {
                name: "Grace W.",
                text: "My follow-up appointments have been thorough and the doctors always take time to explain everything clearly.",
              },
            ].map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-3xl p-8 shadow-sm">
                <Quote size={28} className="text-[#005B96] mb-4" />
                <p className="text-gray-600 leading-7">{t.text}</p>
                <p className="font-bold mt-6 text-gray-900">{t.name}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-24 bg-[#005B96]">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold text-white">
            Your Health Is Our Greatest Priority
          </h2>

          <p className="text-blue-100 text-xl mt-6 leading-8">
            Book an appointment today and receive exceptional healthcare from
            our experienced specialists in a modern and compassionate
            environment.
          </p>

          <div className="flex justify-center flex-wrap gap-6 mt-10">

            <button className="bg-white text-[#005B96] px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition">
              Book Appointment
            </button>

          </div>

        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
}