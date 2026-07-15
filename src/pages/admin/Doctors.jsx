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

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
    status: "Available",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribeDoctors = onSnapshot(
      collection(db, "Doctors"),
      (snapshot) => {
        setDoctors(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      }
    );

    const unsubscribeDepartments = onSnapshot(
      collection(db, "departments"),
      (snapshot) => {
        setDepartments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
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
      return (
        doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.department?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [doctors, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateDoc(doc(db, "doctors", editingId), form);
      } else {
        await addDoc(collection(db, "doctors"), form);
      }

      setForm({
        name: "",
        department: "",
        email: "",
        phone: "",
        status: "Available",
      });

      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      department: doctor.department,
      email: doctor.email,
      phone: doctor.phone,
      status: doctor.status,
    });

    setEditingId(doctor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete doctor?")) return;

    await deleteDoc(doc(db, "doctors", id));
  };

  if (loading) {
    return <div className="p-8">Loading doctors...</div>;
  }

  return (
    <div className="w-full p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <p className="text-gray-500">
          Manage hospital doctors
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 gap-4 mb-8"
      >
        <input
          className="border rounded px-3 py-2"
          placeholder="Doctor Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <select
          className="border rounded px-3 py-2"
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

        <input
          className="border rounded px-3 py-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <button
          className="bg-blue-700 text-white rounded px-4"
        >
          {editingId
            ? "Update Doctor"
            : "Add Doctor"}
        </button>
      </form>

      <div className="mb-6">
        <input
          className="border rounded px-4 py-2 w-96"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Department
              </th>

              <th className="border p-3">
                Email
              </th>

              <th className="border p-3">
                Phone
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDoctors.map((doctor) => (

              <tr key={doctor.id}>

                <td className="border p-3">
                  {doctor.name}
                </td>

                <td className="border p-3">
                  {doctor.department}
                </td>

                <td className="border p-3">
                  {doctor.email}
                </td>

                <td className="border p-3">
                  {doctor.phone}
                </td>

                <td className="border p-3">
                  {doctor.status}
                </td>

                <td className="border p-3">

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(doctor)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(doctor.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}