import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import {
  Search,
  Plus,
  X,
  Mail,
  Phone,
  Pencil,
  Trash2,
  Stethoscope,
  Users,
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
  Available: { color: C.green, tint: C.greenTint },
  "On Leave": { color: C.orange, tint: C.orangeTint },
  "In Surgery": { color: C.red, tint: C.redTint },
  "Off Duty": { color: C.inkSoft, tint: "#EEF0F3" },
};

const BADGE_PALETTE = [
  C.blue,
  C.green,
  C.orange,
  C.red,
  "#7C5CFC",
  "#0EA5A0",
];

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

const emptyForm = {
  name: "",
  department: "",
  email: "",
  phone: "",
  status: "Available",
};

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribeDoctors = onSnapshot(
      collection(db, "doctors"),
      (snapshot) => {
        setDoctors(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );

        setLoading(false);
      }
    );

    const unsubscribeDepartments = onSnapshot(
      collection(db, "departments"),
      (snapshot) => {
        setDepartments(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      }
    );

    return () => {
      unsubscribeDoctors();
      unsubscribeDepartments();
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.department
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        departmentFilter === "All" ||
        doctor.department === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [doctors, search, departmentFilter]);

  const openAddPanel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPanelOpen(true);
  };

  const openEditPanel = (doctor) => {
    setForm({
      name: doctor.name || "",
      department: doctor.department || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      status: doctor.status || "Available",
    });

    setEditingId(doctor.id);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, "doctors", editingId), form);
      } else {
        await addDoc(collection(db, "doctors"), form);
      }

      closePanel();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this doctor from the directory?"))
      return;

    await deleteDoc(doc(db, "doctors", id));
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: C.bg, color: C.ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Doctors
            </h1>

            <p
              className="text-sm mt-1"
              style={{ color: C.inkSoft }}
            >
              Manage the hospital's medical staff directory.
            </p>
          </div>

          <button
            onClick={openAddPanel}
            className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg px-5 py-3"
            style={{
              background: C.blue,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            <Plus size={18} />
            Add Doctor
          </button>
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
            <Search
              size={16}
              style={{ color: C.inkSoft }}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="w-full md:w-64 rounded-lg px-3 py-3 text-sm"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              color: C.ink,
            }}
          >
            <option value="All">
              All Departments
            </option>

            {departments.map((dept) => (
              <option
                key={dept.id}
                value={dept.name}
              >
                {dept.name}
              </option>
            ))}
          </select>
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
            className="flex items-center justify-between px-4 sm:px-5 py-4"
            style={{
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: C.inkSoft }}
            >
              <Users size={16} />

              {loading
                ? "Loading directory..."
                : `${filteredDoctors.length} doctor${
                    filteredDoctors.length === 1 ? "" : "s"
                  }`}
            </div>
          </div>

          {loading ? (
            <div
              className="py-12 text-center text-sm"
              style={{ color: C.inkSoft }}
            >
              Loading doctors...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="py-14 px-5 text-center">
              <Stethoscope
                size={34}
                className="mx-auto mb-3"
                style={{ color: C.inkSoft }}
              />

              <h3 className="font-semibold">
                No doctors found
              </h3>

              <p
                className="text-sm mt-2"
                style={{ color: C.inkSoft }}
              >
                Try another search or add a doctor.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredDoctors.map((doctor) => {
                const statusStyle =
                  STATUS_STYLES[doctor.status] ||
                  STATUS_STYLES.Available;

                const badgeColor = hashColor(
                  doctor.department
                );

                return (
                  <div
                    key={doctor.id}
                    className="p-4 sm:p-5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      {/* Doctor */}
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
                          {initials(doctor.name)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold break-words">
                              {doctor.name}
                            </h3>

                            <span
                              className="rounded-full px-2 py-1 text-xs font-semibold"
                              style={{
                                background: `${badgeColor}1A`,
                                color: badgeColor,
                              }}
                            >
                              {doctor.department}
                            </span>
                          </div>

                          {doctor.email && (
                            <div
                              className="flex items-center gap-2 text-sm mt-2 break-all"
                              style={{
                                color: C.inkSoft,
                              }}
                            >
                              <Mail size={14} />
                              {doctor.email}
                            </div>
                          )}

                          {doctor.phone && (
                            <div
                              className="flex items-center gap-2 text-sm mt-1"
                              style={{
                                color: C.inkSoft,
                              }}
                            >
                              <Phone size={14} />
                              {doctor.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <span
                          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            color: statusStyle.color,
                            background:
                              statusStyle.tint,
                          }}
                        >
                          {doctor.status}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            openEditPanel(doctor)
                          }
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            border: `1px solid ${C.border}`,
                            color: C.inkSoft,
                          }}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(doctor.id)
                          }
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

      {/* Responsive Slide Panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closePanel}
          />

          <div
            className="relative w-full sm:max-w-md h-full bg-white flex flex-col"
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
            >
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Doctor"
                  : "Add Doctor"}
              </h2>

              <button onClick={closePanel}>
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-5 space-y-5"
            >
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>

                <input
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Dr. Jane Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Department
                </label>

                <select
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.department}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      department: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map((dept) => (
                    <option
                      key={dept.id}
                      value={dept.name}
                    >
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Phone
                </label>

                <input
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Status
                </label>

                <select
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                >
                  {Object.keys(
                    STATUS_STYLES
                  ).map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div className="border-t p-5 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={closePanel}
                className="w-full border rounded-lg py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full rounded-lg py-3 bg-blue-600 text-white font-semibold"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Doctor"
                  : "Add Doctor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}