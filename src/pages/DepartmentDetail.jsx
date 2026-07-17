import { useParams, Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDepartmentBySlug } from "@/data/departments";

import { ArrowRight, ArrowLeft, CheckCircle2, Stethoscope } from "lucide-react";

export default function DepartmentDetail() {
  const { slug } = useParams();
  const department = getDepartmentBySlug(slug);

  if (!department) {
    return (
      <>
        <Navbar />
        <div className="bg-[#faf9fd] text-[#1a1c1e] min-h-[60vh] flex items-center">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 text-center w-full">
            <h1 className="text-3xl font-bold">Department not found</h1>
            <p className="text-gray-600 mt-4">
              We couldn't find that department. It may have been renamed or
              removed.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 mt-8 text-[#002045] font-medium"
            >
              <ArrowLeft size={16} />
              Back to all services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const Icon = department.icon;

  return (
    <>
      <Navbar />

      <div className="bg-[#faf9fd] text-[#1a1c1e]">

        {/* Hero */}
        <section className="bg-[#002045] text-white">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-20 pb-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-[#adc7f7] hover:text-white transition mb-8"
            >
              <ArrowLeft size={15} />
              All services
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={28} className="text-[#adc7f7]" />
              </div>
              <p className="uppercase tracking-widest text-sm text-[#adc7f7] font-medium">
                {department.tag}
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
              {department.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-8">
              {department.description}
            </p>
          </div>
        </section>

        {/* Overview + Conditions */}
        <section className="py-20">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 grid lg:grid-cols-3 gap-14">

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-5">Overview</h2>
              <p className="text-gray-600 leading-7">{department.overview}</p>

              <h2 className="text-2xl font-bold mt-12 mb-5">What we treat</h2>
              <ul className="space-y-3">
                {department.conditions.map((condition) => (
                  <li key={condition} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#002045] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-gray-200 p-7 sticky top-24">
                <h3 className="font-semibold text-lg mb-5">Department highlights</h3>
                <ul className="space-y-4">
                  {department.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-[#5b7fb8] mt-0.5 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/book-appointment?department=${department.slug}`}
                  className="mt-7 w-full bg-[#002045] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#002045]/90 transition"
                >
                  Book Appointment
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#002045] py-20 text-white">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 text-center">
            <Stethoscope size={44} className="mx-auto mb-6 text-[#adc7f7]" />

            <h2 className="text-3xl md:text-4xl font-bold">
              Need to see a {department.title.toLowerCase()} specialist?
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-gray-300 leading-8">
              Book an appointment and our team will match you with the right
              specialist for your condition.
            </p>

            <Link
              to={`/book-appointment?department=${department.slug}`}
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