import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const C = {
  card: "#FFFFFF",
  border: "#E7EAF0",
  blue: "#2E6FED",
};

export default function DepartmentBarChart({ data }) {
  return (
    <div
      className="rounded-xl p-6 shadow-sm"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
      }}
    >
      <h2 className="text-lg font-semibold mb-5">
        Appointments by Department
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="appointments"
              fill={C.blue}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}