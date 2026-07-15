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

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPatients(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      return (
        patient.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [patients, search]);

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-lg">
        Loading patients...
      </div>
    );
  }

  return (
    <div className="w-full p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Patients
        </h1>

        <p className="text-gray-500 mt-2">
          Manage registered patients
        </p>
      </div>

      <div className="flex justify-between mb-6">

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-md px-4 py-2 w-96"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Email
              </th>

              <th className="border p-3">
                Phone
              </th>

              <th className="border p-3">
                Role
              </th>

              <th className="border p-3">
                Registered
              </th>

              <th className="border p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="text-center p-8"
                >
                  No patients found.
                </td>
              </tr>

            ) : (

              filteredPatients.map((patient) => (

                <tr
                  key={patient.id}
                  className="hover:bg-gray-50"
                >

                  <td className="border p-3">
                    {patient.name || "-"}
                  </td>

                  <td className="border p-3">
                    {patient.email}
                  </td>

                  <td className="border p-3">
                    {patient.phone || "-"}
                  </td>

                  <td className="border p-3">
                    {patient.role || "Patient"}
                  </td>

                  <td className="border p-3">
                    {patient.createdAt?.seconds
                      ? new Date(
                          patient.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() =>
                        deletePatient(patient.id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

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