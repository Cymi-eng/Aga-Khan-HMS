import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  CalendarDays,
  Clock,
} from "lucide-react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const patientSnap = await getDocs(
          query(
            collection(db, "users"),
            where("role", "==", "patient")
          )
        );

        const doctorSnap = await getDocs(
          collection(db, "doctors")
        );

        const appointmentSnap = await getDocs(
          collection(db, "appointments")
        );

        const pendingSnap = await getDocs(
          query(
            collection(db, "appointments"),
            where("status", "==", "Pending")
          )
        );

        setStats({
          patients: patientSnap.size,
          doctors: doctorSnap.size,
          appointments: appointmentSnap.size,
          pending: pendingSnap.size,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Patients",
      value: stats.patients,
      icon: Users,
      color: "text-blue-700",
    },
    {
      title: "Doctors",
      value: stats.doctors,
      icon: UserRound,
      color: "text-green-700",
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: CalendarDays,
      color: "text-orange-700",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-red-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Hospital Management Overview
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white border rounded-lg px-5 py-4"
            >
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-semibold mt-2">
                    {card.value}
                  </h2>
                </div>

                <Icon
                  size={24}
                  className={card.color}
                />

              </div>
            </div>
          );
        })}

      </div>

      {/* Recent Activity */}

      <div className="bg-white border rounded-lg">

        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>
        </div>

        <div className="p-6">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b">

                <th className="py-3 font-semibold">Activity</th>
                <th className="py-3 font-semibold">Status</th>
                <th className="py-3 font-semibold">Date</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">
                  New appointment booked
                </td>

                <td className="text-orange-600">
                  Pending
                </td>

                <td>Today</td>

              </tr>

              <tr className="border-b">

                <td className="py-4">
                  Patient registered
                </td>

                <td className="text-green-600">
                  Completed
                </td>

                <td>Today</td>

              </tr>

              <tr>

                <td className="py-4">
                  Doctor added
                </td>

                <td className="text-blue-600">
                  Completed
                </td>

                <td>Yesterday</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}