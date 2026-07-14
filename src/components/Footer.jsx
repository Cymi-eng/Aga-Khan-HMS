import { Link } from "react-router-dom";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  // Facebook,
  // Instagram,
  // Twitter,
  // Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a365d] text-white/70">

      <div className="w-full px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">

        {/* ABOUT / LOGO */}

        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-black text-white">
            Aga Khan <span className="text-[#adc7f7]">Hospital</span>
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/60 max-w-xs">
            Exceptional healthcare through experienced specialists, advanced
            technology, and patient-centered care.
          </p>

          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {/* <Facebook size={15} /> */}
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {/* <Instagram size={15} /> */}
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {/* <Twitter size={15} /> */}
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {/* <Youtube size={15} /> */}
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/doctors" className="hover:text-white transition">Find a Doctor</Link></li>
            <li><Link to="/facilities" className="hover:text-white transition">Our Facilities</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Patient Portal</Link></li>
          </ul>
        </div>

        {/* SERVICES */}

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Our Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services/cardiology" className="hover:text-white transition">Cardiology</Link></li>
            <li><Link to="/services/neurology" className="hover:text-white transition">Neurology</Link></li>
            <li><Link to="/services/pediatrics" className="hover:text-white transition">Pediatrics</Link></li>
            <li><Link to="/services/orthopedics" className="hover:text-white transition">Orthopedics</Link></li>
            <li><Link to="/services/laboratory" className="hover:text-white transition">Laboratory</Link></li>
            <li><Link to="/services/pharmacy" className="hover:text-white transition">Pharmacy</Link></li>
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Get In Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#adc7f7]" />
              <span>3rd Parklands Avenue, Nairobi, Kenya</span>
            </li>

            <li className="flex items-start gap-2.5">
              <PhoneCall size={16} className="mt-0.5 shrink-0 text-[#adc7f7]" />
              <a href="tel:+254111911911" className="hover:text-white transition">+254 111 911 911</a>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-[#adc7f7]" />
              <a href="mailto:info@agakhanhospital.org" className="hover:text-white transition break-all">info@agakhanhospital.org</a>
            </li>

            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#adc7f7]" />
              <span>Emergency: Open 24/7</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}

      <div className="border-t border-white/10">
        <div className="w-full px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">

          <p>© {new Date().getFullYear()} Aga Khan Hospital. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Use</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}