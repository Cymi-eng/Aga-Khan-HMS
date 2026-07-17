import {
  Users,
  UserRound,
  CalendarDays,
  Building2,
} from "lucide-react";

const C = {
  card: "#FFFFFF",
  border: "#E7EAF0",
  inkSoft: "#6B7280",

  blue: "#2E6FED",
  blueTint: "#E4ECFE",

  green: "#16A34A",
  greenTint: "#E1F6E9",

  orange: "#F5A524",
  orangeTint: "#FDF1DC",

  purple: "#7C3AED",
  purpleTint: "#F3E8FF",
};

export default function DashboardCards({ stats }) {
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: C.inkSoft }}
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
  );
}