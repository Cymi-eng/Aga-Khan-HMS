import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Search,
  Mail,
  Phone,
  Stethoscope,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Trash2,
  CalendarX,
} from "lucide-react";

const C = {
  bg: "#F3F5F9",
  card: "#FFFFFF",
  border: "#E7EAF0",
  ink: "#171E2E",
  inkSoft: "#6B7280",
  blue: "#2E6FED",
  blueTint: "#E4ECFE",
  green: "#16A34A",
  greenTint: "#E1F6E9",
  red: "#E5484D",
  redTint: "#FBE4E4",
  orange: "#F5A524",
  orangeTint: "#FDF1DC",
};

const STATUS_STYLES = {
  Pending: { color: C.orange, tint: C.orangeTint },
  Approved: { color: C.green, tint: C.greenTint },
  Rejected: { color: C.red, tint: C.redTint },
};

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        appointment.doctor?.toLowerCase().includes(search.toLowerCase()) ||
        appointment.department?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await deleteDoc(doc(db, "appointments", id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm mt-1" style={{ color: C.inkSoft }}>
            Review, approve and manage all patient appointments.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-3 flex-1"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
            }}
          >
            <Search size={16} style={{ color: C.inkSoft }} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, doctor or department..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-56 rounded-lg px-3 py-3 text-sm"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              color: C.ink,
            }}
          >
            <option value="All">All Statuses</option>

            {Object.keys(STATUS_STYLES).map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* List */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            className="flex items-center justify-between px-4 sm:px-5 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: C.inkSoft }}
            >
              <CalendarClock size={16} />

              {loading
                ? "Loading appointments..."
                : `${filteredAppointments.length} appointment${
                    filteredAppointments.length !== 1 ? "s" : ""
                  }`}
            </div>
          </div>

          {loading ? (
            <div
              className="py-12 text-center text-sm"
              style={{ color: C.inkSoft }}
            >
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-14 px-5 text-center">
              <CalendarX
                size={32}
                className="mx-auto mb-3"
                style={{ color: C.inkSoft }}
              />

              <h3 className="font-semibold">No appointments found</h3>

              <p
                className="text-sm mt-2"
                style={{ color: C.inkSoft }}
              >
                Try a different search or filter.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredAppointments.map((appointment) => {
                const statusStyle =
                  STATUS_STYLES[appointment.status] ||
                  STATUS_STYLES.Pending;

                return (
                  <div
                    key={appointment.id}
                    className="p-4 sm:p-5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      {/* Patient */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm"
                          style={{
                            width: 46,
                            height: 46,
                            background: C.blueTint,
                            color: C.blue,
                          }}
                        >
                          {initials(appointment.patientName)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold break-words">
                            {appointment.patientName}
                          </h3>

                          {appointment.email && (
                            <div
                              className="flex items-center gap-2 text-sm mt-2 break-all"
                              style={{ color: C.inkSoft }}
                            >
                              <Mail size={14} />
                              {appointment.email}
                            </div>
                          )}

                          {appointment.phone && (
                            <div
                              className="flex items-center gap-2 text-sm mt-1"
                              style={{ color: C.inkSoft }}
                            >
                              <Phone size={14} />
                              {appointment.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="lg:w-52">
                        <div className="flex items-center gap-2 font-semibold">
                          <Stethoscope
                            size={15}
                            style={{ color: C.inkSoft }}
                          />
                          {appointment.doctor}
                        </div>

                        <p
                          className="text-sm mt-1"
                          style={{ color: C.inkSoft }}
                        >
                          {appointment.department}
                        </p>
                      </div>

                      {/* Date */}
                      <div
                        className="lg:w-40 text-sm"
                        style={{
                          color: C.inkSoft,
                          fontFamily: "monospace",
                        }}
                      >
                        <div>{appointment.date}</div>
                        <div>{appointment.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <span
                          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            color: statusStyle.color,
                            background: statusStyle.tint,
                          }}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            updateStatus(appointment.id, "Approved")
                          }
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            border: `1px solid ${C.border}`,
                            color: C.green,
                          }}
                        >
                          <CheckCircle2 size={18} />
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(appointment.id, "Rejected")
                          }
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            border: `1px solid ${C.border}`,
                            color: C.orange,
                          }}
                        >
                          <XCircle size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteAppointment(appointment.id)
                          }
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            border: `1px solid ${C.border}`,
                            color: C.red,
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}