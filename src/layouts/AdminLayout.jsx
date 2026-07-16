import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  Building2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72 bg-[#1a365d] text-white flex flex-col
          transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 lg:block">
          <div>
            <h1 className="text-2xl font-bold">Aga Khan HMS</h1>
            <p className="text-sm text-blue-200 mt-1">Admin Portal</p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
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
      <div className="flex-1 flex flex-col w-full">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={28} className="text-[#1a365d]" />
            </button>

            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1a365d]">
                Admin Dashboard
              </h2>

              <p className="text-gray-500 text-xs sm:text-sm">
                Welcome back,{" "}
                {currentUser?.displayName || "Administrator"}
              </p>
            </div>
          </div>

          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold">
            {currentUser?.displayName?.charAt(0) || "A"}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}