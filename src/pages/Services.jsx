import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import departments from "@/data/departments";

import {
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Users,
  Clock3,
  BadgeCheck,
} from "lucide-react";

export default function Services() {
  const stats = [
    { label: "Specialist doctors", value: "60+", icon: Users },
    { label: "Departments", value: "8", icon: ShieldCheck },
    { label: "Emergency coverage", value: "24/7", icon: Clock3 },
    { label: "Years serving Nairobi", value: "30+", icon: BadgeCheck },
  ];

  const whyChoose = [
    {
      title: "Experienced specialists",
      description:
        "Every department is led by consultants with years of focused clinical experience.",
    },
    {
      title: "Modern equipment",
      description:
        "Diagnostic and treatment technology maintained to current clinical standards.",
    },
    {
      title: "24/7 emergency services",
      description:
        "Emergency medicine staffed and ready at any hour, every day of the year.",
    },
    {
      title: "Digital patient records",
      description:
        "Your history, results, and prescriptions kept secure and accessible across visits.",
    },
    {
      title: "Transparent pricing",
      description:
        "Clear costs before treatment, with no surprise charges after your visit.",
    },
    {
      title: "Patient-centered care",
      description:
        "Treatment plans built around your circumstances, not a one-size-fits-all protocol.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-[#faf9fd] text-[#1a1c1e]">

        {/* Hero */}
        <section className="bg-[#002045] text-white">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-24 pb-16">
            <p className="uppercase tracking-widest text-sm text-[#adc7f7] mb-4 font-medium">
              Our Services
            </p>

            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
              Healthcare services designed around you
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-8">
              Comprehensive care across eight departments, delivered by
              experienced specialists and supported by modern diagnostic
              technology.
            </p>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10">
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-3">
                  <stat.icon size={22} className="text-[#adc7f7] mt-1 shrink-0" />
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-300 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28">

            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold">
                Medical departments
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                Our multidisciplinary team provides specialized care across a
                wide range of medical fields, from preventive checkups to
                emergency response.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((department) => (
                <Link
                  key={department.slug}
                  to={`/services/${department.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-7 hover:border-[#002045]/20 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#002045]/5 flex items-center justify-center group-hover:bg-[#002045] transition-colors">
                    <department.icon
                      size={24}
                      className="text-[#002045] group-hover:text-white transition-colors"
                    />
                  </div>

                  <p className="text-xs uppercase tracking-wide text-[#5b7fb8] font-semibold mt-5">
                    {department.tag}
                  </p>

                  <h3 className="text-xl font-semibold mt-1.5">
                    {department.title}
                  </h3>

                  <p className="text-gray-600 mt-3 leading-6 text-sm flex-1">
                    {department.description}
                  </p>

                  <span className="mt-5 text-sm font-medium text-[#002045] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    View department
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="bg-[#f4f3f7] py-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28">

            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why patients choose us
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                We combine medical excellence, healthcare technology, and
                compassionate professionals to ensure every patient receives
                safe, effective, personalized treatment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-gray-200"
                >
                  <BadgeCheck className="text-[#002045]" size={22} />
                  <h3 className="font-semibold mt-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#002045] py-24 text-white">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 text-center">

            <Stethoscope size={48} className="mx-auto mb-6 text-[#adc7f7]" />

            <h2 className="text-3xl md:text-4xl font-bold">
              Need medical assistance?
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-gray-300 leading-8">
              Book an appointment with one of our experienced specialists and
              receive quality healthcare tailored to your needs.
            </p>

            <Link
              to="/book-appointment"
              className="mt-10 bg-white text-[#002045] px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:bg-gray-100 transition w-fit"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}