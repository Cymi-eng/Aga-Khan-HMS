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

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.doctor
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.department
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await deleteDoc(doc(db, "appointments", id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-lg">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="w-full p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all patient appointments
        </p>
      </div>

      <div className="flex justify-between gap-5 mb-6">

        <input
          type="text"
          placeholder="Search patient, doctor or department..."
          className="border rounded-md px-4 py-2 w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-4 py-2"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
  <thead className="bg-gray-100">
    <tr className="text-left">
      <th className="p-3 border">Patient</th>
      <th className="p-3 border">Email</th>
      <th className="p-3 border">Phone</th>
      <th className="p-3 border">Department</th>
      <th className="p-3 border">Doctor</th>
      <th className="p-3 border">Date</th>
      <th className="p-3 border">Time</th>
      <th className="p-3 border">Status</th>
      <th className="p-3 border">Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredAppointments.length === 0 ? (
      <tr>
        <td
          colSpan="9"
          className="text-center p-8 text-gray-500"
        >
          No appointments found.
        </td>
      </tr>
    ) : (
      filteredAppointments.map((appointment) => (
        <tr
          key={appointment.id}
          className="hover:bg-gray-50"
        >
          <td className="border p-3">
            {appointment.patientName}
          </td>

          <td className="border p-3">
            {appointment.email}
          </td>

          <td className="border p-3">
            {appointment.phone}
          </td>

          <td className="border p-3">
            {appointment.department}
          </td>

          <td className="border p-3">
            {appointment.doctor}
          </td>

          <td className="border p-3">
            {appointment.date}
          </td>

          <td className="border p-3">
            {appointment.time}
          </td>

          <td className="border p-3">
            <span
              className={`px-3 py-1 rounded text-white text-sm ${
                appointment.status === "Approved"
                  ? "bg-green-600"
                  : appointment.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-orange-500"
              }`}
            >
              {appointment.status}
            </span>
          </td>

          <td className="border p-3">
            <div className="flex gap-2">

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "Approved"
                  )
                }
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "Rejected"
                  )
                }
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  deleteAppointment(appointment.id)
                }
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
      </div>
    </div>
  );
}