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

const BADGE_PALETTE = [C.blue, C.green, C.orange, C.red, "#7C5CFC", "#0EA5A0"];

function hashColor(text = "") {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
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
    const unsubscribeDoctors = onSnapshot(collection(db, "doctors"), (snapshot) => {
      setDoctors(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    const unsubscribeDepartments = onSnapshot(collection(db, "departments"), (snapshot) => {
      setDepartments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubscribeDoctors();
      unsubscribeDepartments();
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.department?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(search.toLowerCase());
      const matchesDept = departmentFilter === "All" || doctor.department === departmentFilter;
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
    if (!window.confirm("Remove this doctor from the directory?")) return;
    await deleteDoc(doc(db, "doctors", id));
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700 }}>Doctors</h1>
            <p style={{ fontSize: 14, color: C.inkSoft, marginTop: 2 }}>
              Manage the hospital's medical staff directory.
            </p>
          </div>
          <button
            onClick={openAddPanel}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 self-start md:self-auto"
            style={{ background: C.blue, color: "#fff", fontSize: 13.5, fontWeight: 600 }}
          >
            <Plus size={16} />
            Add Doctor
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 flex-1"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <Search size={16} style={{ color: C.inkSoft }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, department or email..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 13.5 }}
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="rounded-lg px-3 py-2.5"
            style={{ background: C.card, border: `1px solid ${C.border}`, fontSize: 13.5, color: C.ink }}
          >
            <option value="All">All departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Directory */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-2" style={{ fontSize: 13, color: C.inkSoft, fontWeight: 600 }}>
              <Users size={15} />
              {loading ? "Loading directory..." : `${filteredDoctors.length} doctor${filteredDoctors.length === 1 ? "" : "s"}`}
            </div>
          </div>

          {loading ? (
            <div className="px-5 py-10 text-center" style={{ color: C.inkSoft, fontSize: 13.5 }}>
              Loading doctors...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Stethoscope size={28} style={{ color: C.inkSoft, margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>No doctors found</div>
              <p style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>
                Try a different search, or add a new doctor to the directory.
              </p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => {
              const statusStyle = STATUS_STYLES[doctor.status] || STATUS_STYLES.Available;
              const badgeColor = hashColor(doctor.department);
              return (
                <div
                  key={doctor.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4"
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 42, height: 42, background: `${badgeColor}1A`, color: badgeColor, fontWeight: 700, fontSize: 13 }}
                  >
                    {initials(doctor.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{doctor.name}</span>
                      <span
                        className="rounded-full px-2 py-0.5"
                        style={{ fontSize: 11, fontWeight: 600, color: badgeColor, background: `${badgeColor}1A` }}
                      >
                        {doctor.department}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap mt-1" style={{ fontSize: 12.5, color: C.inkSoft }}>
                      {doctor.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail size={12.5} />
                          {doctor.email}
                        </span>
                      )}
                      {doctor.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={12.5} />
                          {doctor.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-1"
                      style={{ fontSize: 11, fontWeight: 600, color: statusStyle.color, background: statusStyle.tint }}
                    >
                      {doctor.status}
                    </span>
                    <button
                      onClick={() => openEditPanel(doctor)}
                      aria-label="Edit doctor"
                      className="flex items-center justify-center rounded-lg"
                      style={{ width: 32, height: 32, border: `1px solid ${C.border}`, color: C.inkSoft }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      aria-label="Remove doctor"
                      className="flex items-center justify-center rounded-lg"
                      style={{ width: 32, height: 32, border: `1px solid ${C.border}`, color: C.red }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Slide-over form panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(23,30,46,0.4)" }}
            onClick={closePanel}
          />
          <div
            className="relative w-full max-w-md h-full flex flex-col"
            style={{ background: C.card }}
          >
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <h2 style={{ fontSize: 17, fontWeight: 700 }}>
                {editingId ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button onClick={closePanel} style={{ color: C.inkSoft }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Full name</label>
                <input
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  placeholder="Dr. Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Department</label>
                <select
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5, color: C.ink }}
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Email</label>
                <input
                  type="email"
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  placeholder="doctor@hospital.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Phone</label>
                <input
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  placeholder="+254 7XX XXX XXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Status</label>
                <select
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5, color: C.ink }}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {Object.keys(STATUS_STYLES).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div className="px-6 py-4 flex gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
              <button
                onClick={closePanel}
                type="button"
                className="flex-1 rounded-lg py-2.5"
                style={{ border: `1px solid ${C.border}`, fontSize: 13.5, fontWeight: 600, color: C.inkSoft }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 rounded-lg py-2.5"
                style={{ background: C.blue, color: "#fff", fontSize: 13.5, fontWeight: 600, opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving..." : editingId ? "Update Doctor" : "Add Doctor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}