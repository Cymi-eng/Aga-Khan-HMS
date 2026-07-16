import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
  Target,
  Eye,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function About() {
    
    
  const values = [
    {
      icon: HeartHandshake,
      title: "Compassion",
      description:
        "We treat every patient with dignity, empathy, and respect while delivering exceptional healthcare.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      description:
        "We uphold honesty, transparency, and accountability in every medical decision.",
    },
    {
      icon: Users,
      title: "Teamwork",
      description:
        "Our multidisciplinary teams work together to provide coordinated patient-centered care.",
    },
  ];

  const departments = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Emergency Medicine",
    "Radiology",
    "Laboratory Services",
  ];

  return (
    <>
    <Navbar/>
    <div className="bg-[#faf9fd] text-[#1a1c1e]">

      {/* HERO */}
      <section className="bg-[#002045] text-white py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <p className="uppercase tracking-widest text-blue-200 mb-4">
            About Us
          </p>

          <h1 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
            Excellence in Healthcare,
            <br />
            Compassion in Every Visit.
          </h1>

          <p className="mt-8 text-lg text-gray-200 max-w-2xl leading-8">
            We are committed to delivering world-class healthcare through
            innovation, highly qualified specialists, and patient-centered
            services that place your wellbeing first.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src="stesthoscope.jpg"
              alt="Hospital"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Delivering Trusted Healthcare Since Excellence Began
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Our hospital is dedicated to providing exceptional medical care
              through advanced technology, experienced healthcare professionals,
              and a patient-first philosophy.
            </p>

            <p className="text-gray-600 leading-8">
              From preventive care and specialist consultations to emergency
              treatment and surgical services, we strive to improve lives every
              day through quality, compassion, and continuous innovation.
            </p>

          </div>

        </div>
      </section>

      {/* MISSION VISION */}
      <section className="bg-white py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 grid md:grid-cols-2 gap-10">

          <div className="border rounded-3xl p-10">
            <Target className="text-[#002045]" size={42} />
            <h3 className="text-2xl font-bold mt-6 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-8">
              To provide accessible, compassionate, and high-quality healthcare
              services while improving the health and wellbeing of our
              communities.
            </p>
          </div>

          <div className="border rounded-3xl p-10">
            <Eye className="text-[#002045]" size={42} />

            <h3 className="text-2xl font-bold mt-6 mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-8">
              To be a leading healthcare institution recognized for clinical
              excellence, innovation, and outstanding patient experiences.
            </p>
          </div>

        </div>
      </section>

      {/* VALUES */}

      <section className="py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">

          <h2 className="text-4xl font-bold text-center mb-14">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border rounded-3xl p-8 hover:shadow-lg transition"
              >
                <value.icon
                  size={42}
                  className="text-[#002045]"
                />

                <h3 className="font-bold text-xl mt-6 mb-3">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {value.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* DEPARTMENTS */}

      <section className="bg-[#f4f3f7] py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">

          <h2 className="text-4xl font-bold text-center mb-16">
            Clinical Departments
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {departments.map((dept) => (
              <div
                key={dept}
                className="bg-white rounded-2xl border p-6 flex items-center gap-4"
              >
                <Stethoscope className="text-[#002045]" />

                <span className="font-medium">
                  {dept}
                </span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="bg-[#002045] text-white py-24">

        <div className="px-6 md:px-12 lg:px-20 xl:px-28 text-center">

          <HeartPulse
            className="mx-auto mb-6"
            size={50}
          />

          <h2 className="text-4xl font-bold mb-6">
            Your Health Is Our Priority
          </h2>

          <p className="max-w-2xl mx-auto text-gray-300 leading-8 mb-10">
            Experience trusted healthcare delivered by experienced specialists
            using modern technology and compassionate care.
          </p>

          <button className="bg-white text-[#002045] px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:bg-gray-100 transition">
            Book Appointment
            <ArrowRight size={18} />
          </button>

        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
}