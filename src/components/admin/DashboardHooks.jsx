import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

export function useDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    departments: 0,
  });

  const [statusData, setStatusData] = useState([]);

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    // USERS
    const unsubUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const patients = snapshot.docs.filter(
          (doc) => doc.data().role === "patient"
        ).length;

        setStats((prev) => ({
          ...prev,
          patients,
        }));
      }
    );

    // DOCTORS
    const unsubDoctors = onSnapshot(
      collection(db, "doctors"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          doctors: snapshot.size,
        }));
      }
    );

    // DEPARTMENTS
    const unsubDepartments = onSnapshot(
      collection(db, "departments"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          departments: snapshot.size,
        }));
      }
    );

    // APPOINTMENTS
    const unsubAppointments = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const counts = {
          Pending: 0,
          Approved: 0,
          Rejected: 0,
        };

        const appointments = [];

        snapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          appointments.push(data);

          if (counts[data.status] !== undefined) {
            counts[data.status]++;
          }
        });

        setStats((prev) => ({
          ...prev,
          appointments: snapshot.size,
        }));

        setStatusData([
          {
            name: "Pending",
            value: counts.Pending,
          },
          {
            name: "Approved",
            value: counts.Approved,
          },
          {
            name: "Rejected",
            value: counts.Rejected,
          },
        ]);

        appointments.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;

          return (
            b.createdAt.seconds -
            a.createdAt.seconds
          );
        });

        setRecentAppointments(
          appointments.slice(0, 5)
        );
      }
    );

    return () => {
      unsubUsers();
      unsubDoctors();
      unsubDepartments();
      unsubAppointments();
    };
  }, []);

  return {
    stats,
    statusData,
    recentAppointments,
  };
}