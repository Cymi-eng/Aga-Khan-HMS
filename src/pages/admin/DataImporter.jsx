import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

import { loadHospitalData } from "@/scripts/importHospitalData";

export default function DataImporter() {
  const importPatients = async () => {
    try {
      const { patients } = loadHospitalData();

      let count = 0;

      for (const patient of patients) {
        await addDoc(collection(db, "users"), {
          name: `${patient.FIRST} ${patient.LAST}`,
          email: patient.EMAIL || "",
          phone: patient.TELECOM || "",
          gender: patient.GENDER || "",
          birthDate: patient.BIRTHDATE || "",
          role: "Patient",
          createdAt: new Date(),
        });

        count++;
      }

      alert(`${count} patients imported successfully.`);
    } catch (error) {
      console.error(error);
      alert("Import failed.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Hospital Data Importer
      </h1>

      <button
        onClick={importPatients}
        className="bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Import Patients
      </button>
    </div>
  );
}