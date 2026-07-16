import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  CalendarDays,
  Building2,
} from "lucide-react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

import StatusPieChart from "@/components/admin/StatusPieChart";
import DepartmentBarChart from "@/components/admin/DepartmentBarChart";

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

  orange: "#F5A524",
  orangeTint: "#FDF1DC",

  purple: "#7C3AED",
  purpleTint: "#F3E8FF",

  red: "#E5484D",
  redTint: "#FBE4E4",
};

const STATUS_STYLES = {
  Pending: {
    color: C.orange,
    tint: C.orangeTint,
  },

  Approved: {
    color: C.green,
    tint: C.greenTint,
  },

  Rejected: {
    color: C.red,
    tint: C.redTint,
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    departments: 0,
  });

  const [statusData, setStatusData] = useState([]);

  const [departmentData, setDepartmentData] = useState([]);

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

        const appointments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        appointments.forEach((appointment) => {
          if (counts[appointment.status] !== undefined) {
            counts[appointment.status]++;
          }
        });

        setStats((prev) => ({
          ...prev,
          appointments: appointments.length,
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

        const departmentCounts = {};

        appointments.forEach((appointment) => {
          const dept =
            appointment.department || "Unknown";

          departmentCounts[dept] =
            (departmentCounts[dept] || 0) + 1;
        });

        setDepartmentData(
          Object.entries(departmentCounts).map(
            ([department, appointments]) => ({
              department,
              appointments,
            })
          )
        );

        const sortedAppointments = [...appointments].sort((a, b) => {
          if (!a.createdAt || !b.createdAt)
            return 0;

          return (
            b.createdAt.seconds -
            a.createdAt.seconds
          );
        });

        setRecentAppointments(
          sortedAppointments.slice(0, 5)
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
      title: "Departments",
      value: stats.departments,
      icon: Building2,
      color: C.purple,
      tint: C.purpleTint,
    },
  ];
  return (
  <div
    className="min-h-screen"
    style={{
      background: C.bg,
      color: C.ink,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p
          className="mt-1"
          style={{
            color: C.inkSoft,
          }}
        >
          Hospital Management Overview
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
              }}
            >
              <div className="flex justify-between items-center">

                <div>

                  <p
                    className="text-sm font-medium"
                    style={{
                      color: C.inkSoft,
                    }}
                  >
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                </div>

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: card.tint,
                    color: card.color,
                  }}
                >
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <StatusPieChart
          data={statusData}
        />

        <DepartmentBarChart
          data={departmentData}
        />

      </div>

      {/* Recent Appointments */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
        }}
      >

        <div
          className="px-6 py-4"
          style={{
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <h2 className="text-lg font-semibold">
            Recent Appointments
          </h2>

          <p
            className="text-sm mt-1"
            style={{
              color: C.inkSoft,
            }}
          >
            Latest patient bookings
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                style={{
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left">
                  Department
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Time
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>
              {recentAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center"
                    style={{ color: C.inkSoft }}
                  >
                    No appointments found.
                  </td>
                </tr>
              ) : (
                recentAppointments.map((appointment) => {
                  const statusStyle =
                    STATUS_STYLES[appointment.status] || {
                      color: C.inkSoft,
                      tint: "#F3F4F6",
                    };

                  return (
                    <tr
                      key={appointment.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <td className="px-6 py-4 font-medium">
                        {appointment.patientName}
                      </td>

                      <td className="px-6 py-4">
                        {appointment.doctor}
                      </td>

                      <td className="px-6 py-4">
                        {appointment.department}
                      </td>

                      <td className="px-6 py-4">
                        {appointment.date}
                      </td>

                      <td className="px-6 py-4">
                        {appointment.time}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            color: statusStyle.color,
                            background: statusStyle.tint,
                          }}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
);
}