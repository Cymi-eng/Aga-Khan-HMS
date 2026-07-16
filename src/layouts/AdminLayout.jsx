import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments",
      path: "/admin/appointments",
      icon: CalendarDays,
    },
    {
      title: "Patients",
      path: "/admin/patients",
      icon: Users,
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
      icon: UserRound,
    },
    {
      title: "Departments",
      path: "/admin/departments",
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1a365d] text-white flex flex-col">

        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            Aga Khan HMS
          </h1>

          <p className="text-sm text-blue-200 mt-1">
            Admin Portal
          </p>
        </div>

        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-4 transition ${
                    isActive
                      ? "bg-white text-[#1a365d] font-semibold"
                      : "hover:bg-white/10"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left hover:text-red-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="bg-white shadow-sm h-20 px-8 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-[#1a365d]">
              Admin Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome back,
              {" "}
              {currentUser?.displayName || "Administrator"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold">
              {currentUser?.displayName?.charAt(0) || "A"}
            </div>
          </div>

        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}