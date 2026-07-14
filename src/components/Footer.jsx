import { Link } from "react-router-dom";
// import {
//   PhoneCall,
//   Mail,
//   MapPin,
//   Clock,
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
// } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003b63] text-blue-100">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ABOUT / LOGO */}

        <div>
          <h3 className="text-2xl font-black text-white">
            Aga Khan <span className="text-sky-400">Hospital</span>
          </h3>

          <p className="mt-5 text-sm leading-7 text-blue-200">
            Delivering exceptional healthcare through experienced specialists,
            advanced medical technology, and compassionate, patient-centered
            care.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Facebook"/>
            
            <a href="#" aria-label="Instagram"/>
           
            <a href="#" aria-label="Twitter" />
           
            <a href="#" aria-label="YouTube"  />
          </div>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
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
          <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
          <ul className="space-y-4 text-sm">
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
          <h4 className="text-white font-bold text-lg mb-6">Get In Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              
              <span>3rd Parklands Avenue, Nairobi, Kenya</span>
            </li>
            <li className="flex items-start gap-3">
             
              <a href="tel:+254111911911" className="hover:text-white transition">+254 111 911 911</a>
            </li>
            <li className="flex items-start gap-3">
            
              <a href="mailto:info@agakhanhospital.org" className="hover:text-white transition">info@agakhanhospital.org</a>
            </li>
            <li className="flex items-start gap-3">
              <span>Emergency: Open 24/7</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">

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