import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-[#1A365D]">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3">
          The page you are looking for doesn't exist or you don't have permission to access it.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-[#1A365D] hover:bg-[#163050] text-white px-6 py-3 rounded-lg transition"
        >
          <Home size={18} />
          Back to Home
        </Link>

      </div>
    </div>
  );
}