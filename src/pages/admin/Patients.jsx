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
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPatients(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
        );

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const roles = useMemo(() => {
    const unique = new Set(
      patients.map((p) => p.role || "Patient").filter(Boolean)
    );
    return Array.from(unique);
  }, [patients]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name?.toLowerCase().includes(search.toLowerCase()) ||
        patient.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All" ||
        (patient.role || "Patient") === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [patients, search, roleFilter]);

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.error(error);
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
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}

        <div className="mb-6">
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Patients
          </h1>

          <p
            style={{
              fontSize: 14,
              color: C.inkSoft,
              marginTop: 2,
            }}
          >
            View and manage all registered patients.
          </p>
        </div>

        {/* Toolbar */}

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 flex-1"
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
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: 13.5,
              }}
            />
          </div>

          {roles.length > 1 && (
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg px-3 py-2.5"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                fontSize: 13.5,
                color: C.ink,
              }}
            >
              <option value="All">All roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Directory */}

        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{
                fontSize: 13,
                color: C.inkSoft,
                fontWeight: 600,
              }}
            >
              <UsersRound size={15} />

              {loading
                ? "Loading patients..."
                : `${filteredPatients.length} patient${
                    filteredPatients.length === 1 ? "" : "s"
                  }`}
            </div>
          </div>

          {loading ? (
            <div
              className="px-5 py-10 text-center"
              style={{
                color: C.inkSoft,
                fontSize: 13.5,
              }}
            >
              Loading patients...
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <UsersRound
                size={28}
                style={{
                  color: C.inkSoft,
                  margin: "0 auto 10px",
                }}
              />

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                No patients found
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: C.inkSoft,
                  marginTop: 4,
                }}
              >
                Try a different search or role filter.
              </p>
            </div>
          ) : (
            filteredPatients.map((patient) => {
              const badgeColor = hashColor(patient.name || patient.email);

              const registered = patient.createdAt?.seconds
                ? new Date(
                    patient.createdAt.seconds * 1000
                  ).toLocaleDateString()
                : "—";

              return (
                <div
                  key={patient.id}
                  className="flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4"
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      background: `${badgeColor}1A`,
                      color: badgeColor,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {initials(patient.name || patient.email || "?")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div
                        style={{
                          fontSize: 14.5,
                          fontWeight: 600,
                        }}
                      >
                        {patient.name || "—"}
                      </div>

                      <span
                        className="rounded-full px-2.5 py-1"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: C.blue,
                          background: C.blueTint,
                        }}
                      >
                        {patient.role || "Patient"}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4 flex-wrap mt-1"
                      style={{
                        fontSize: 12.5,
                        color: C.inkSoft,
                      }}
                    >
                      {patient.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail size={12.5} />
                          {patient.email}
                        </span>
                      )}

                      {patient.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={12.5} />
                          {patient.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1.5 lg:w-40"
                    style={{
                      fontSize: 12.5,
                      color: C.inkSoft,
                    }}
                  >
                    <CalendarDays size={13} />
                    Registered {registered}
                  </div>

                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      border: `1px solid ${C.border}`,
                      color: C.red,
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}