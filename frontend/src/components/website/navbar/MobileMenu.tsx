import { NavLink, Link } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  menus: MenuItem[];
}

export default function MobileMenu({
  open,
  onClose,
  menus,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85%] bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>

            <h2 className="text-xl font-bold text-green-700">
              Surya Nikunjam
            </h2>

            <p className="text-sm text-gray-500">
              Community Living
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-600 hover:text-green-600"
          >
            ×
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex flex-col p-6">

          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-lg font-medium transition mb-2 ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}

        </nav>

        {/* CTA */}

        <div className="px-6 mt-auto pb-8">

          <Link
            to="/site-visit"
            onClick={onClose}
            className="block w-full rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-700"
          >
            Book Site Visit
          </Link>

        </div>

      </aside>
    </>
  );
}