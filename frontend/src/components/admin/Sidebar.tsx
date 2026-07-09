import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { adminMenus } from "../../config/menu";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-700 px-6 py-6">

  <div className="flex justify-center">
    <img
      src="/logo.png"
      alt="Surya Nikunjam"
      className="h-16 w-auto"
    />
  </div>

  <h1 className="mt-4 text-center text-xl font-bold leading-6">
    Surya Nikunjam
  </h1>

  <p className="mt-1 text-center text-sm text-gray-400">
    Community Management
  </p>

  <div className="mt-4 rounded-lg bg-green-600/20 border border-green-500/30 py-2">
    <p className="text-center text-sm font-medium text-green-300">
      Admin Panel
    </p>
  </div>

</div>
      <nav className="flex-1 mt-5">

        {adminMenus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
             className={({ isActive }) =>
  `mx-3 my-1 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
    isActive
      ? "bg-green-600 text-white shadow-lg"
      : "text-gray-300 hover:bg-slate-800 hover:text-white"
  }`
}
            >
              <Icon size={18} />

              {menu.name}
            </NavLink>
          );
        })}

      </nav>

     <div className="border-t border-slate-700 pt-3 px-3">

  <button
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-red-600 hover:text-white"
  >
    <FaSignOutAlt size={18} />
    Logout
  </button>

</div>

    </aside>
  );
}