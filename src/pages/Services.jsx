import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Microscope,
  Ambulance,
  Stethoscope,
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Cardiology",
      icon: HeartPulse,
      description:
        "Comprehensive diagnosis and treatment of heart and cardiovascular diseases using modern technology.",
    },
    {
      title: "Neurology",
      icon: Brain,
      description:
        "Expert care for disorders affecting the brain, spine, and nervous system.",
    },
    {
      title: "Pediatrics",
      icon: Baby,
      description:
        "Compassionate healthcare services for infants, children, and adolescents.",
    },
    {
      title: "Orthopedics",
      icon: Bone,
      description:
        "Advanced treatment for bone, muscle, and joint conditions including rehabilitation.",
    },
    {
      title: "Laboratory",
      icon: Microscope,
      description:
        "Accurate diagnostic testing with modern laboratory equipment and qualified specialists.",
    },
    {
      title: "Emergency Care",
      icon: Ambulance,
      description:
        "24/7 emergency medical services for urgent and life-threatening conditions.",
    },
  ];

  const whyChoose = [
    "Experienced Specialist Doctors",
    "Modern Medical Equipment",
    "24/7 Emergency Services",
    "Secure Digital Patient Records",
    "Affordable & Quality Healthcare",
    "Patient-Centered Care",
  ];

  return (
    <>
    <Navbar/>
    
    <div className="bg-[#faf9fd] text-[#1a1c1e]">

      {/* Hero */}
      <section className="bg-[#002045] text-white py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <p className="uppercase tracking-widest text-blue-200 mb-4">
            Our Services
          </p>

          <h1 className="text-5xl md:text-6xl font-bold max-w-3xl">
            Healthcare Services Designed Around You
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-gray-300 leading-8">
            We provide comprehensive healthcare services supported by modern
            technology, experienced specialists, and compassionate care to help
            every patient achieve better health outcomes.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Medical Services
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our multidisciplinary team provides specialized care across a
              wide range of medical fields.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition"
              >
                <service.icon
                  size={46}
                  className="text-[#002045]"
                />

                <h3 className="text-2xl font-semibold mt-6">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {service.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-[#f4f3f7] py-24">

        <div className="px-6 md:px-12 lg:px-20 xl:px-28 grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <Activity
              size={60}
              className="text-[#002045]"
            />

            <h2 className="text-4xl font-bold mt-6 mb-6">
              Why Patients Choose Us
            </h2>

            <p className="text-gray-600 leading-8">
              We combine medical excellence, advanced healthcare technology,
              and compassionate professionals to ensure every patient receives
              safe, effective, and personalized treatment.
            </p>
          </div>

          <div className="space-y-6">

            {whyChoose.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border"
              >
                <CheckCircle2
                  className="text-green-600"
                />

                <span className="text-lg">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#002045] py-24 text-white">

        <div className="px-6 md:px-12 lg:px-20 xl:px-28 text-center">

          <Stethoscope
            size={55}
            className="mx-auto mb-6"
          />

          <h2 className="text-4xl font-bold">
            Need Medical Assistance?
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-300 leading-8">
            Book an appointment with one of our experienced specialists and
            receive quality healthcare tailored to your needs.
          </p>

          <button className="mt-10 bg-white text-[#002045] px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:bg-gray-100 transition">
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