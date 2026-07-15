import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  CalendarDays,
  Clock,
  Activity,
} from "lucide-react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";

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
  Pending: { color: C.orange, tint: C.orangeTint },
  Completed: { color: C.green, tint: C.greenTint },
};

const activityLog = [
  {
    activity: "New appointment booked",
    status: "Pending",
    date: "Today",
  },
  {
    activity: "Patient registered",
    status: "Completed",
    date: "Today",
  },
  {
    activity: "Doctor added",
    status: "Completed",
    date: "Yesterday",
  },
];

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
      color: C.blue,
      tint: C.blueTint,
    },
    {
      title: "Doctors",
      value: stats.doctors,
      icon: UserRound,
      color: C.green,
      tint: C.greenTint,
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: CalendarDays,
      color: C.orange,
      tint: C.orangeTint,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: C.red,
      tint: C.redTint,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 space-y-6">

        {/* Page Header */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: C.inkSoft, marginTop: 2 }}>
            Hospital management overview.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-xl px-5 py-4"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600 }}>
                      {card.title}
                    </p>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 40, height: 40, background: card.tint, color: card.color }}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <div
            className="flex items-center gap-2 px-5 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <Activity size={15} style={{ color: C.inkSoft }} />
            <h2 style={{ fontSize: 14.5, fontWeight: 700 }}>Recent Activity</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ fontSize: 13.5 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <th className="py-3 px-5" style={{ fontWeight: 600, color: C.inkSoft, fontSize: 12.5 }}>
                    Activity
                  </th>
                  <th className="py-3 px-5" style={{ fontWeight: 600, color: C.inkSoft, fontSize: 12.5 }}>
                    Status
                  </th>
                  <th className="py-3 px-5" style={{ fontWeight: 600, color: C.inkSoft, fontSize: 12.5 }}>
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {activityLog.map((entry, idx) => {
                  const statusStyle = STATUS_STYLES[entry.status] || STATUS_STYLES.Completed;
                  const isLast = idx === activityLog.length - 1;

                  return (
                    <tr
                      key={entry.activity}
                      style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}` }}
                    >
                      <td className="py-4 px-5" style={{ fontWeight: 500 }}>
                        {entry.activity}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className="rounded-full px-2.5 py-1 inline-block"
                          style={{ fontSize: 11, fontWeight: 600, color: statusStyle.color, background: statusStyle.tint }}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="py-4 px-5" style={{ color: C.inkSoft }}>
                        {entry.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}