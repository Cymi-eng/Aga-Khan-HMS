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
        department.name?.toLowerCase().includes(search.toLowerCase()) ||
        department.head?.toLowerCase().includes(search.toLowerCase()) ||
        department.location?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [departments, search]);

  const resetForm = () => {
    setForm({
      name: "",
      head: "",
      location: "",
      doctors: "",
    });

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
      console.log(err);
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
      await deleteDoc(doc(db, "departments", id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-lg">
        Loading departments...
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Departments
          </h1>

          <p className="text-gray-500 mt-2">
            Manage hospital departments
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="w-full md:w-auto bg-blue-700 text-white px-5 py-3 rounded-md hover:bg-blue-800"
        >
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-md px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

      {/* Departments */}
      <div className="space-y-4">
        {filteredDepartments.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-gray-500">
            No departments found.
          </div>
        ) : (
          filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="border rounded-lg p-5 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold break-words">
                    {department.name}
                  </h2>

                  <p className="text-gray-600">
                    <span className="font-medium">
                      Head:
                    </span>{" "}
                    {department.head}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-medium">
                      Location:
                    </span>{" "}
                    {department.location}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-medium">
                      Doctors:
                    </span>{" "}
                    {department.doctors}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => handleEdit(department)}
                    className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(department.id)}
                    className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="border-b px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                {editingId
                  ? "Edit Department"
                  : "Add Department"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Department Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Head of Department
                </label>

                <input
                  type="text"
                  value={form.head}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      head: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Number of Doctors
                </label>

                <input
                  type="number"
                  value={form.doctors}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      doctors: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto border px-5 py-3 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800"
                >
                  {editingId
                    ? "Update Department"
                    : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}