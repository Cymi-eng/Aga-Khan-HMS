import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Search,
  Mail,
  Phone,
  CalendarDays,
  Trash2,
  UsersRound,
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

const BADGE_PALETTE = [C.blue, C.green, C.orange, C.red, "#7C5CFC", "#0EA5A0"];

function hashColor(text = "") {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return BADGE_PALETTE[Math.abs(hash) % BADGE_PALETTE.length];
}

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPatients(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );

        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      return (
        patient.name?.toLowerCase().includes(search.toLowerCase()) ||
        patient.email?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [patients, search]);

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Patients</h1>

          <p
            className="text-sm mt-1"
            style={{
              color: C.inkSoft,
            }}
          >
            Manage registered patients.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-3"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
            }}
          >
            <Search
              size={16}
              style={{
                color: C.inkSoft,
              }}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Patients */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            className="flex items-center justify-between px-4 sm:px-5 py-4"
            style={{
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{
                color: C.inkSoft,
              }}
            >
              <UsersRound size={16} />

              {loading
                ? "Loading patients..."
                : `${filteredPatients.length} patient${
                    filteredPatients.length === 1 ? "" : "s"
                  }`}
            </div>
          </div>

          {loading ? (
            <div
              className="py-12 text-center text-sm"
              style={{
                color: C.inkSoft,
              }}
            >
              Loading patients...
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="py-14 px-5 text-center">
              <UsersRound
                size={34}
                className="mx-auto mb-3"
                style={{
                  color: C.inkSoft,
                }}
              />

              <h3 className="font-semibold">No patients found</h3>

              <p
                className="text-sm mt-2"
                style={{
                  color: C.inkSoft,
                }}
              >
                Try a different search.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredPatients.map((patient) => {
                const badgeColor = hashColor(patient.name || patient.email);

                const registered = patient.createdAt?.seconds
                  ? new Date(
                      patient.createdAt.seconds * 1000,
                    ).toLocaleDateString()
                  : "-";

                return (
                  <div key={patient.id} className="p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      {/* Patient */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className="flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{
                            width: 46,
                            height: 46,
                            background: `${badgeColor}1A`,
                            color: badgeColor,
                          }}
                        >
                          {initials(patient.name || patient.email || "?")}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold break-words">
                              {patient.name || "-"}
                            </h3>

                            <span
                              className="rounded-full px-2 py-1 text-xs font-semibold"
                              style={{
                                background: C.blueTint,
                                color: C.blue,
                              }}
                            >
                              {patient.role || "Patient"}
                            </span>
                          </div>

                          {patient.email && (
                            <div
                              className="flex items-center gap-2 text-sm mt-2 break-all"
                              style={{
                                color: C.inkSoft,
                              }}
                            >
                              <Mail size={14} />
                              {patient.email}
                            </div>
                          )}

                          {patient.phone && (
                            <div
                              className="flex items-center gap-2 text-sm mt-1"
                              style={{
                                color: C.inkSoft,
                              }}
                            >
                              <Phone size={14} />
                              {patient.phone}
                            </div>
                          )}

                          <div
                            className="flex items-center gap-2 text-sm mt-1"
                            style={{
                              color: C.inkSoft,
                            }}
                          >
                            <CalendarDays size={14} />
                            Registered: {registered}
                          </div>
                        </div>
                      </div>

                      {/* Delete */}
                      <div className="flex">
                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            border: `1px solid ${C.border}`,
                            color: C.red,
                          }}
                        >
                          <Trash2 size={17} />
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
