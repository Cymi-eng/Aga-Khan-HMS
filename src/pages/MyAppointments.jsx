import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import {
  Search,
  CalendarDays,
  Clock,
  Stethoscope,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  RotateCcw,
  Trash2,
  CalendarX,
} from "lucide-react";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*
  Assumed Firestore "appointments" document shape:
  {
    userId: string,          // matches auth uid, used to filter to current user
    doctorName: string,
    department: string,
    date: string,            // e.g. "2026-07-20"
    time: string,            // e.g. "10:30 AM"
    status: "pending" | "approved" | "rejected" | "cancelled",
    reason: string,          // optional visit reason
    createdAt: Timestamp,
  }
*/

export default function AppointmentsPage() {
  const { currentUser } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // ---------------- Firestore real-time listener, filtered to current user ----------------

  useEffect(() => {
    if (!currentUser) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    const appointmentsRef = collection(db, "appointments");
    const q = query(
      appointmentsRef,
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setAppointments(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // ---------------- Search filtering ----------------

  const filteredAppointments = appointments.filter((appt) => {
    const term = searchTerm.toLowerCase();
    return (
      appt.doctorName?.toLowerCase().includes(term) ||
      appt.department?.toLowerCase().includes(term) ||
      appt.status?.toLowerCase().includes(term)
    );
  });

  // ---------------- Cancel / delete a pending appointment ----------------

  const handleCancel = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment? This cannot be undone."
    );
    if (!confirmed) return;

    setCancellingId(appointmentId);
    try {
      await deleteDoc(doc(db, "appointments", appointmentId));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Something went wrong cancelling this appointment. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  // ---------------- Status badge ----------------

  const StatusBadge = ({ status }) => {
    const config = {
      pending: {
        label: "Pending Review",
        icon: Hourglass,
        classes: "bg-[#fff3cd] text-[#8a6d1a] border border-[#f0dca0]",
      },
      approved: {
        label: "Approved",
        icon: CheckCircle2,
        classes: "bg-[#d4f5df] text-[#146c3a] border border-[#a6e6bd]",
      },
      rejected: {
        label: "Rejected",
        icon: AlertCircle,
        classes: "bg-[#ffdad6] text-[#ba1a1a] border border-[#f3b8b2]",
      },
      cancelled: {
        label: "Cancelled",
        icon: XCircle,
        classes: "bg-[#e9e7eb] text-[#43474e] border border-[#c4c6cf]",
      },
    };

    const { label, icon: Icon, classes } = config[status] || config.pending;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${classes}`}
      >
        <Icon size={14} />
        {label}
      </span>
    );
  };

  // ---------------- Approved / rejected inline message ----------------

  const StatusMessage = ({ status }) => {
    if (status === "approved") {
      return (
        <div className="flex items-start gap-2 bg-[#d4f5df] border border-[#a6e6bd] text-[#146c3a] text-sm rounded-lg px-4 py-3 mt-4">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>
            Your appointment has been confirmed. Please arrive 15 minutes
            early with a valid ID.
          </span>
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className="flex items-start gap-2 bg-[#ffdad6] border border-[#f3b8b2] text-[#ba1a1a] text-sm rounded-lg px-4 py-3 mt-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>
            This appointment request could not be accommodated. Please book a
            new slot or contact us for assistance.
          </span>
        </div>
      );
    }

    return null;
  };

  // ================= RENDER =================

  return (
    <>
      <div className="bg-[#faf9fd] text-[#1a1c1e] w-full min-h-screen">
        <Navbar />

        <div className="w-full px-6 md:px-10 pt-32 pb-20 max-w-5xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#1a365d]">
                My Appointments
              </h1>
              <p className="text-[#43474e] mt-2">
                Track, manage, and review your upcoming and past visits.
              </p>
            </div>

            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 bg-[#1a365d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a365d]/90 transition-colors w-fit"
            >
              <CalendarDays size={18} />
              Book New Appointment
            </Link>
          </div>

          {/* SEARCH */}

          <div className="relative mb-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#43474e]"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by doctor, department, or status..."
              className="w-full bg-white border border-[#c4c6cf] rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/30 focus:border-[#1a365d] transition-all"
            />
          </div>

          {/* LOADING STATE */}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-[#43474e]">
              <Hourglass className="animate-pulse mb-3" size={32} />
              <p>Loading your appointments...</p>
            </div>
          )}

          {/* EMPTY STATE */}

          {!loading && filteredAppointments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-[#f4f3f7] rounded-2xl border border-[#c4c6cf]">
              <CalendarX size={48} className="text-[#43474e] mb-4" />
              <h3 className="text-lg font-bold text-[#1a1c1e] mb-1">
                {appointments.length === 0
                  ? "No appointments yet"
                  : "No matching appointments"}
              </h3>
              <p className="text-sm text-[#43474e] max-w-sm mb-6">
                {appointments.length === 0
                  ? "You haven't booked any appointments. Find a doctor and schedule your first visit."
                  : "Try adjusting your search terms."}
              </p>
              {appointments.length === 0 && (
                <Link
                  to="/doctors"
                  className="bg-[#1a365d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a365d]/90 transition-colors"
                >
                  Find a Doctor
                </Link>
              )}
            </div>
          )}

          {/* APPOINTMENT LIST */}

          {!loading && filteredAppointments.length > 0 && (
            <div className="flex flex-col gap-5">
              {filteredAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-xl border border-[#c4c6cf] p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="text-lg font-bold text-[#1a1c1e]">
                          {appt.doctorName || "Unassigned Doctor"}
                        </h3>
                        <StatusBadge status={appt.status} />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#43474e] mb-1.5">
                        <Stethoscope size={16} className="text-[#1a365d]" />
                        <span>{appt.department || "General Consultation"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#43474e] mb-1.5">
                        <CalendarDays size={16} className="text-[#1a365d]" />
                        <span>{appt.date || "Date not set"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#43474e]">
                        <Clock size={16} className="text-[#1a365d]" />
                        <span>{appt.time || "Time not set"}</span>
                      </div>

                      <StatusMessage status={appt.status} />
                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-row md:flex-col gap-3 shrink-0">
                      {appt.status === "pending" && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          disabled={cancellingId === appt.id}
                          className="inline-flex items-center justify-center gap-2 bg-white border border-[#ba1a1a] text-[#ba1a1a] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#ffdad6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} />
                          {cancellingId === appt.id ? "Cancelling..." : "Cancel"}
                        </button>
                      )}

                      {(appt.status === "rejected" || appt.status === "cancelled") && (
                        <Link
                          to="/doctors"
                          className="inline-flex items-center justify-center gap-2 bg-[#1a365d] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1a365d]/90 transition-colors"
                        >
                          <RotateCcw size={16} />
                          Book Again
                        </Link>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}