import { Link } from "react-router-dom";

export default function AppointmentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-8">

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Appointment Submitted
        </h1>

        <p className="text-gray-600 mb-6">
          Your appointment request has been received successfully.
        </p>

        <div className="border rounded-lg p-4 mb-6">
          <p className="mb-2">
            <strong>Status:</strong>
          </p>

          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
            Pending Approval
          </span>

          <p className="text-gray-500 mt-4">
            The hospital will review your request. Once approved or rejected,
            you'll be able to see the updated status under <strong>My Appointments</strong>.
          </p>
        </div>

        <div className="flex gap-4">

          <Link
            to="/my-appointments"
            className="bg-blue-700 text-white px-5 py-2 rounded"
          >
            My Appointments
          </Link>

          <Link
            to="/"
            className="border px-5 py-2 rounded"
          >
            Back Home
          </Link>

        </div>

      </div>
    </div>
  );
}