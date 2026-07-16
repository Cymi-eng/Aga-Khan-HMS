import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = [
  "#3b82f6", // Pending
  "#22c55e", // Approved
  "#ef4444", // Rejected
  "#f59e0b", // Cancelled
];

export default function StatusPieChart({ data }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Appointments by Status</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}