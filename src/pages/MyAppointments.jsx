import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Stethoscope,
  MapPin,
  CalendarPlus,
  Pencil,
  ChevronRight,
  Plus,
  X,
  FlaskConical,
  Pill,
  Bell,
  User,
  LayoutGrid,
  MessageCircle,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const TOKENS = {
  paper: "#F7F3EA",
  card: "#FFFFFF",
  ink: "#211F1A",
  inkSoft: "#6B6459",
  teal: "#2E6659",
  tealDeep: "#1E463D",
  tealTint: "#E4EEE9",
  rust: "#9B4A2E",
  rustTint: "#F3E2D8",
  line: "#DDD5C3",
};

function Stub({ appt }) {
  return (
    <div
      className="flex md:flex-col items-center md:items-stretch justify-between md:justify-start md:w-[132px] md:pl-6 relative pt-4 md:pt-0 mt-4 md:mt-0 border-t md:border-t-0 md:border-l"
      style={{
        borderColor: TOKENS.line,
        borderStyle: "dashed",
      }}
    >
      <span
        className="hidden md:block absolute rounded-full"
        style={{
          width: 16,
          height: 16,
          background: TOKENS.paper,
          left: -8,
          top: -8,
        }}
      />

      <span
        className="hidden md:block absolute rounded-full"
        style={{
          width: 16,
          height: 16,
          background: TOKENS.paper,
          left: -8,
          bottom: -8,
        }}
      />

      <div>
        <div
          className="uppercase tracking-widest"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 22,
            fontWeight: 600,
            color:
              appt.status === "Approved"
                ? TOKENS.teal
                : TOKENS.rust,
          }}
        >
          {appt.date}
        </div>

        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: TOKENS.inkSoft,
          }}
        >
          {appt.time}
        </div>
      </div>

      <div
        className="hidden md:flex items-center justify-center mt-6 self-start"
        style={{
          width: 84,
          height: 84,
          borderRadius: "9999px",
          border: `2px dashed ${
            appt.status === "Approved"
              ? TOKENS.teal
              : TOKENS.rust
          }`,
          color:
            appt.status === "Approved"
              ? TOKENS.teal
              : TOKENS.rust,
          transform: "rotate(-9deg)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {appt.status.toUpperCase()}
      </div>
    </div>
  );
}

function AppointmentCard({ appt, onAction }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: TOKENS.card,
        border: `1px solid ${TOKENS.line}`,
      }}
    >
      <div className="p-6 flex flex-col md:flex-row gap-6">

        <div className="flex-1">

          <div className="flex items-start gap-4">

            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 52,
                height: 52,
                background: TOKENS.tealTint,
                color: TOKENS.tealDeep,
                fontWeight: 700,
              }}
            >
              {appt.doctor
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>

            <div>

              <span
                className="inline-block mb-2 text-xs font-semibold uppercase"
                style={{
                  color:
                    appt.status === "Approved"
                      ? TOKENS.teal
                      : TOKENS.rust,
                }}
              >
                {appt.status}
              </span>

              <h4
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {appt.doctor}
              </h4>

              <p
                className="flex items-center gap-2 mt-1"
                style={{
                  color: TOKENS.inkSoft,
                }}
              >
                <Stethoscope size={15} />
                {appt.department}
              </p>

            </div>

          </div>

          <div
            className="mt-5 pt-4 grid md:grid-cols-2 gap-3"
            style={{
              borderTop: `1px solid ${TOKENS.line}`,
            }}
          >
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              Aga Khan Hospital
            </div>

            <div className="flex items-center gap-2">
              <HeartPulse size={15} />
              {appt.reason}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">

            <button
              onClick={() =>
                onAction("Appointment added to calendar.")
              }
              className="px-4 py-2 rounded-lg text-white"
              style={{
                background: TOKENS.teal,
              }}
            >
              <CalendarPlus size={15} className="inline mr-2" />
              Add to calendar
            </button>

            <button
              onClick={() =>
                onAction(appt.reason)
              }
              className="px-4 py-2 rounded-lg border"
              style={{
                borderColor: TOKENS.teal,
                color: TOKENS.teal,
              }}
            >
              View Details
            </button>

            <button
              onClick={() =>
                onAction("Reschedule feature coming soon.")
              }
              className="px-4 py-2 rounded-lg"
            >
              <Pencil size={15} className="inline mr-2" />
              Reschedule
            </button>

          </div>

        </div>

        <Stub appt={appt} />

      </div>
    </div>
  );
}
export default function MyAppointments() {
  const { currentUser } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showBanner, setShowBanner] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "appointments"),
      where("patientId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const fireToast = (message) => {
    setToast(message);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: TOKENS.paper,
        }}
      >
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 22,
            color: TOKENS.tealDeep,
          }}
        >
          Loading appointments...
        </h2>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-24 md:pb-12"
      style={{
        background: TOKENS.paper,
        color: TOKENS.ink,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600;700&display=swap');
      `}</style>

      <main className="max-w-5xl mx-auto px-5 md:px-8 py-10 space-y-8">

        {showBanner && (
          <div
            className="rounded-xl flex items-center gap-4 p-4"
            style={{
              background: TOKENS.rustTint,
              border: `1px dashed ${TOKENS.rust}`,
            }}
          >
            <div className="flex-1">
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                My Appointments
              </h2>

              <p
                style={{
                  color: TOKENS.inkSoft,
                  fontSize: 13,
                }}
              >
                Here are all your booked appointments.
              </p>
            </div>

            <button
              onClick={() => setShowBanner(false)}
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">

          <h2
            style={{
              fontFamily: "'Lora', serif",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Upcoming Appointments
          </h2>

          <Link
            to="/book-appointment"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white"
            style={{
              background: TOKENS.teal,
            }}
          >
            <Plus size={16} />
            Book Another
          </Link>

        </div>

        {appointments.length === 0 ? (
          <div
            className="rounded-xl p-10 text-center"
            style={{
              background: TOKENS.card,
              border: `1px solid ${TOKENS.line}`,
            }}
          >
            <h3
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 22,
              }}
            >
              No appointments yet
            </h3>

            <p
              className="mt-2"
              style={{
                color: TOKENS.inkSoft,
              }}
            >
              You haven't booked any appointments.
            </p>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg text-white"
              style={{
                background: TOKENS.teal,
              }}
            >
              <Plus size={18} />
              Book Appointment
            </Link>

          </div>
        ) : (
          <div className="space-y-5">

            {appointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appt={appt}
                onAction={fireToast}
              />
            ))}

          </div>
        )}
      </main>

      <nav
        className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 z-40"
        style={{
          background: TOKENS.card,
          borderTop: `1px solid ${TOKENS.line}`,
        }}
      >
        {[
          { icon: LayoutGrid, label: "Home" },
          { icon: HeartPulse, label: "Appointments" },
          { icon: MessageCircle, label: "Messages" },
          { icon: User, label: "Profile" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1"
            style={{
              color:
                label === "Appointments"
                  ? TOKENS.teal
                  : TOKENS.inkSoft,
            }}
          >
            <Icon size={20} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </nav>

      {toast && (
        <div
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-3 flex items-center gap-2 shadow-lg"
          style={{
            background: TOKENS.ink,
            color: "#fff",
          }}
        >
          <Bell size={16} />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
}