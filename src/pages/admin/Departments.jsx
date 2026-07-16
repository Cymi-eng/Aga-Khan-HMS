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
  Building2,
  UserCog,
  MapPin,
  Users,
  Pencil,
  Trash2,
  X,
  FolderX,
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

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    head: "",
    location: "",
    doctors: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "departments"), (snapshot) => {
      setDepartments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      return (
        department.name?.toLowerCase().includes(search.toLowerCase()) ||
        department.head?.toLowerCase().includes(search.toLowerCase()) ||
        department.location?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [departments, search]);

  const resetForm = () => {
    setForm({ name: "", head: "", location: "", doctors: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateDoc(doc(db, "departments", editingId), {
          ...form,
          doctors: Number(form.doctors),
        });
      } else {
        await addDoc(collection(db, "departments"), {
          ...form,
          doctors: Number(form.doctors),
        });
      }

      resetForm();
    } catch (err) {
      console.error(err);
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
    if (!window.confirm("Delete this department?")) return;

    try {
      await deleteDoc(doc(db, "departments", id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Departments</h1>
            <p className="text-sm mt-1" style={{ color: C.inkSoft }}>
              Manage hospital departments and staffing.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: C.blue }}
          >
            Add Department
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-3 flex-1"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <Search size={16} style={{ color: C.inkSoft }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search department, head or location..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* List */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <div
            className="flex items-center justify-between px-4 sm:px-5 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: C.inkSoft }}
            >
              <Building2 size={16} />
              {loading
                ? "Loading departments..."
                : `${filteredDepartments.length} department${
                    filteredDepartments.length !== 1 ? "s" : ""
                  }`}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm" style={{ color: C.inkSoft }}>
              Loading departments...
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="py-14 px-5 text-center">
              <FolderX size={32} className="mx-auto mb-3" style={{ color: C.inkSoft }} />
              <h3 className="font-semibold">No departments found</h3>
              <p className="text-sm mt-2" style={{ color: C.inkSoft }}>
                Try a different search, or add a new department.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredDepartments.map((department) => (
                <div key={department.id} className="p-4 sm:p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    {/* Department */}
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
                        {initials(department.name)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold break-words">{department.name}</h3>

                        {department.head && (
                          <div
                            className="flex items-center gap-2 text-sm mt-2"
                            style={{ color: C.inkSoft }}
                          >
                            <UserCog size={14} />
                            {department.head}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="lg:w-52">
                      <div className="flex items-center gap-2 font-semibold">
                        <MapPin size={15} style={{ color: C.inkSoft }} />
                        {department.location}
                      </div>
                    </div>

                    {/* Doctor count */}
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ color: C.green, background: C.greenTint }}
                      >
                        <Users size={13} />
                        {department.doctors} doctor{department.doctors !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleEdit(department)}
                        aria-label="Edit department"
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ border: `1px solid ${C.border}`, color: C.blue }}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(department.id)}
                        aria-label="Delete department"
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ border: `1px solid ${C.border}`, color: C.red }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div
            className="w-full max-w-xl rounded-xl overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Department" : "Add Department"}
              </h2>

              <button
                onClick={resetForm}
                aria-label="Close"
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ color: C.inkSoft }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Department Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Head of Department
                </label>
                <input
                  type="text"
                  value={form.head}
                  onChange={(e) => setForm({ ...form, head: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Number of Doctors
                </label>
                <input
                  type="number"
                  value={form.doctors}
                  onChange={(e) => setForm({ ...form, doctors: e.target.value })}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                  required
                />
              </div>

              <div
                className="flex justify-end gap-3 pt-4"
                style={{ borderTop: `1px solid ${C.border}` }}
              >
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ border: `1px solid ${C.border}`, color: C.ink }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: C.blue }}
                >
                  {editingId ? "Update Department" : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}