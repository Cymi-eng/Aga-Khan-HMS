import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const C = {
  card: "#FFFFFF",
  border: "#E7EAF0",
  grid: "#EEF1F6",
  text: "#0E1733",
  subtext: "#6B7280",
  blue: "#2E6FED",
  blueLight: "#5A8CF5",
  blueDark: "#1E54C4",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="rounded-lg px-3.5 py-2.5 shadow-lg"
      style={{
        background: C.text,
        border: "none",
      }}
    >
      <p
        className="text-xs font-medium mb-1"
        style={{ color: "#A9B4CC" }}
      >
        {label}
      </p>
      <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
        {payload[0].value.toLocaleString()}{" "}
        <span className="font-normal" style={{ color: "#A9B4CC" }}>
          appointments
        </span>
      </p>
    </div>
  );
}

export default function DepartmentBarChart({ data }) {
  return (
    <div
      className="rounded-xl p-6 shadow-sm"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="flex items-baseline justify-between mb-6">
        <h2
          className="text-base font-semibold"
          style={{ color: C.text }}
        >
          Appointments by Department
        </h2>
        <span className="text-xs" style={{ color: C.subtext }}>
          Last 30 days
        </span>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
            barCategoryGap="32%"
          >
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.blueLight} />
                <stop offset="100%" stopColor={C.blue} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke={C.grid}
              strokeDasharray="0"
            />

            <XAxis
              dataKey="department"
              tickLine={false}
              axisLine={{ stroke: C.border }}
              tick={{ fill: C.subtext, fontSize: 12 }}
              dy={8}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: C.subtext, fontSize: 12 }}
              width={36}
            />

            <Tooltip
              cursor={{ fill: "rgba(46, 111, 237, 0.06)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="appointments"
              fill="url(#barFill)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {data?.map((_, i) => (
                <Cell key={i} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}