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
  MapPin,
  UserRound,
  Pencil,
  Trash2,
  Building2,
  Stethoscope,
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
  head: "",
  location: "",
  doctors: "",
};

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "departments"),
      (snapshot) => {
        setDepartments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      return (
        department.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        department.head
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        department.location
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [departments, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openAddPanel = () => {
    resetForm();
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateDoc(
          doc(db, "departments", editingId),
          {
            ...form,
            doctors: Number(form.doctors),
          }
        );
      } else {
        await addDoc(
          collection(db, "departments"),
          {
            ...form,
            doctors: Number(form.doctors),
          }
        );
      }

      resetForm();

    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (department) => {
    setEditingId(department.id);

    setForm({
      name: department.name,
      head: department.head,
      location: department.location,
      doctors: department.doctors,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, "departments", id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700 }}>Departments</h1>
            <p style={{ fontSize: 14, color: C.inkSoft, marginTop: 2 }}>
              Manage hospital departments.
            </p>
          </div>
          <button
            onClick={openAddPanel}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 self-start md:self-auto"
            style={{ background: C.blue, color: "#fff", fontSize: 13.5, fontWeight: 600 }}
          >
            <Plus size={16} />
            Add Department
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
              placeholder="Search by name, head or location..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 13.5 }}
            />
          </div>
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
              <Building2 size={15} />
              {loading
                ? "Loading departments..."
                : `${filteredDepartments.length} department${filteredDepartments.length === 1 ? "" : "s"}`}
            </div>
          </div>

          {loading ? (
            <div className="px-5 py-10 text-center" style={{ color: C.inkSoft, fontSize: 13.5 }}>
              Loading departments...
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Building2 size={28} style={{ color: C.inkSoft, margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>No departments found</div>
              <p style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>
                Try a different search, or add a new department.
              </p>
            </div>
          ) : (
            filteredDepartments.map((department) => {
              const badgeColor = hashColor(department.name);
              return (
                <div
                  key={department.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4"
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 42, height: 42, background: `${badgeColor}1A`, color: badgeColor, fontWeight: 700, fontSize: 13 }}
                  >
                    {initials(department.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{department.name}</span>
                      <span
                        className="rounded-full px-2 py-0.5 flex items-center gap-1"
                        style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueTint }}
                      >
                        <Stethoscope size={11} />
                        {department.doctors} doctor{Number(department.doctors) === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap mt-1" style={{ fontSize: 12.5, color: C.inkSoft }}>
                      {department.head && (
                        <span className="flex items-center gap-1.5">
                          <UserRound size={12.5} />
                          {department.head}
                        </span>
                      )}
                      {department.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12.5} />
                          {department.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(department)}
                      aria-label="Edit department"
                      className="flex items-center justify-center rounded-lg"
                      style={{ width: 32, height: 32, border: `1px solid ${C.border}`, color: C.inkSoft }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
                      aria-label="Remove department"
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(23,30,46,0.4)" }}
            onClick={resetForm}
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
                {editingId ? "Edit Department" : "Add Department"}
              </h2>
              <button onClick={resetForm} style={{ color: C.inkSoft }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Department name</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
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
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Head of department</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  value={form.head}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      head: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Location</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>Number of doctors</label>
                <input
                  type="number"
                  className="w-full mt-1 rounded-lg px-3 py-2.5"
                  style={{ border: `1px solid ${C.border}`, fontSize: 13.5 }}
                  value={form.doctors}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      doctors: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </form>

            <div className="px-6 py-4 flex gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
              <button
                onClick={resetForm}
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
                {saving ? "Saving..." : editingId ? "Update Department" : "Add Department"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}