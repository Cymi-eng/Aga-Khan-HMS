const C = {
  card: "#FFFFFF",
  border: "#E7EAF0",
  inkSoft: "#6B7280",

  pending: "#F59E0B",
  pendingBg: "#FEF3C7",

  approved: "#16A34A",
  approvedBg: "#DCFCE7",

  rejected: "#DC2626",
  rejectedBg: "#FEE2E2",
};

export default function RecentAppointments({ appointments }) {
  const getStatusStyle = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          color: C.approved,
          background: C.approvedBg,
        };

      case "rejected":
        return {
          color: C.rejected,
          background: C.rejectedBg,
        };

      default:
        return {
          color: C.pending,
          background: C.pendingBg,
        };
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-sm"
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
          style={{ color: C.inkSoft }}
        >
          Latest appointment requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr
              className="text-left"
              style={{
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <th className="px-6 py-4 text-sm">Patient</th>
              <th className="px-6 py-4 text-sm">Doctor</th>
              <th className="px-6 py-4 text-sm">Department</th>
              <th className="px-6 py-4 text-sm">Date</th>
              <th className="px-6 py-4 text-sm">Time</th>
              <th className="px-6 py-4 text-sm">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => {
                const statusStyle = getStatusStyle(
                  appointment.status
                );

                return (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition"
                    style={{
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <td className="px-6 py-4 font-medium">
                      {appointment.patientName}
                    </td>

                    <td className="px-6 py-4">
                      {appointment.doctorName}
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
                        style={statusStyle}
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
  );
}