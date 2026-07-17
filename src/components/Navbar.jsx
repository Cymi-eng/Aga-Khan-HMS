import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PhoneCall, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Our Services", to: "/services" },
    { label: "About", to: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 grid grid-cols-[auto_1fr_auto] items-center px-6 md:px-10 h-20 bg-white transition-shadow duration-300 ${
        scrolled
          ? "shadow-md border-b border-transparent"
          : "border-b border-[#c4c6cf]"
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="col-start-1 flex items-center gap-3">
        <img
          src="/khan.logo.jpg"
          alt="Aga Khan Hospital Logo"
          className="w-11 h-11 rounded-xl object-cover"
        />
        <div className="leading-tight">
          <h1 className="text-lg font-bold text-[#1a365d]">
            Aga Khan Hospital
          </h1>
          <p className="text-xs text-[#43474e]">Excellence In Healthcare</p>
        </div>
      </Link>

      {/* DESKTOP NAV — centered */}
      <nav className="col-start-2 hidden lg:flex items-center justify-center gap-10">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`relative text-sm font-medium transition-colors py-1 ${
                active
                  ? "text-[#1a365d]"
                  : "text-[#1a1c1e] hover:text-[#1a365d]"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-[#1a365d] transition-all duration-300 ${
                  active ? "w-full" : "w-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* DESKTOP RIGHT SIDE */}
      <div className="col-start-3 hidden lg:flex items-center justify-end gap-4">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1a365d]">
                {currentUser.displayName || currentUser.email}
              </p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>

            <button
              onClick={logout}
              className="border border-[#c4c6cf] px-4 py-2 rounded-full text-sm hover:bg-[#f4f3f7]"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="border border-[#c4c6cf] px-6 py-2.5 rounded-full text-sm font-semibold text-[#1a1c1e] hover:bg-[#f4f3f7] transition-colors"
          >
            Login
          </Link>
        )}
        <Link
            to="/my-appointments"
            className="px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            My Appointments
        </Link>
        <a
          href="tel:+254111911911"
          className="flex items-center gap-2 bg-[#ba1a1a] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#ba1a1a]/90 active:scale-95 transition-all"
        >
          <PhoneCall size={16} />
          Emergency
        </a>

      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="col-start-3 justify-self-end lg:hidden text-[#1a1c1e]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* MOBILE MENU PANEL */}
      <div
        className={`col-span-3 lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#c4c6cf] shadow-lg overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-[#1a1c1e] hover:text-[#1a365d] hover:bg-[#f4f3f7] rounded-lg px-3 py-3 transition-colors"
            >
              {link.label}
              <ChevronRight size={16} className="text-[#c4c6cf]" />
            </Link>
          ))}

          {currentUser ? (
            <>
              <div className="mt-3 rounded-lg bg-gray-100 p-3">
                <p className="font-semibold text-[#1a365d]">
                  {currentUser.displayName || currentUser.email}
                </p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="border border-[#c4c6cf] text-center px-6 py-3 rounded-full text-sm font-semibold mt-3 hover:bg-[#f4f3f7]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="border border-[#c4c6cf] text-center px-6 py-3 rounded-full text-sm font-semibold mt-3 hover:bg-[#f4f3f7] transition-colors"
            >
              Login
            </Link>
          )}

          <a
            href="tel:+254111911911"
            className="flex items-center justify-center gap-2 bg-[#ba1a1a] text-white px-5 py-3 rounded-full text-sm font-semibold mt-2"
          >
            <PhoneCall size={16} />
            Emergency
          </a>
        </div>
      </div>
    </header>
  );
}
