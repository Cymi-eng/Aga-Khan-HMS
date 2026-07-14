import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#005B96] flex items-center justify-center text-white font-bold text-xl">
            +
          </div>

          <div>
            <h1 className="font-bold text-xl text-[#005B96]">
              Aga Khan Hospital
            </h1>

            <p className="text-xs text-gray-500">
              Excellence In Healthcare
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-[#005B96]"
          >
            Home
          </Link>

          <a
            href="#about"
            className="font-medium text-gray-700 hover:text-[#005B96]"
          >
            About
          </a>

          <a
            href="#services"
            className="font-medium text-gray-700 hover:text-[#005B96]"
          >
            Services
          </a>

          <a
            href="#doctors"
            className="font-medium text-gray-700 hover:text-[#005B96]"
          >
            Doctors
          </a>

          <a
            href="#contact"
            className="font-medium text-gray-700 hover:text-[#005B96]"
          >
            Contact
          </a>

        </nav>

        {/* Right Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <button className="px-6 py-3 rounded-full bg-[#005B96] text-white font-semibold hover:bg-blue-800 transition">
            Book Appointment
          </button>

          <Link
            to="/login"
            className="px-6 py-3 rounded-full border-2 border-[#005B96] text-[#005B96] hover:bg-[#005B96] hover:text-white transition font-semibold"
          >
            Staff Login
          </Link>

        </div>

        {/* Mobile */}

        <button className="lg:hidden">
          <Menu size={30} />
        </button>

      </div>
    </header>
  );
}