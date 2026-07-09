import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import MobileMenu from "./MobileMenu";

const menus = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Villas", path: "/villas" },
  { name: "Amenities", path: "/amenities" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const moreMenus = [
  { name: "Why Choose", path: "/why-choose" },
  { name: "Location Advantages", path: "/location-advantages" },
  { name: "Lifestyle", path: "/lifestyles" },
  { name: "Events", path: "/events" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "FAQ", path: "/faq" },
];

export default function Navbar() {

const [mobileOpen, setMobileOpen] =
  useState(false);

//const [isScrolled, setIsScrolled] = useState(false);

const [dropdownOpen, setDropdownOpen] =
  useState(false);

const dropdownRef =
  useRef<HTMLDivElement>(null);

  /*useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 60);
  };

  handleScroll();

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );
}, []);*/

useEffect(() => {
  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
      )
    ) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);


  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

          {/* Logo */}

         <Link
  to="/"
  className="flex items-center"
>
  <img
    src="/logo.png"
    alt="Surya Nikunjam"
    className="h-18 w-auto"
  />
</Link>
          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-8">

  {menus.map((menu) => (
    <NavLink
      key={menu.path}
      to={menu.path}
      className={({ isActive }) =>
  `font-medium transition ${
    isActive
      ? "text-green-600"
      : "text-gray-700 hover:text-green-600"
  }`
}
    >
      {menu.name}
    </NavLink>
  ))}

  {/* More */}

  <div
  className="relative"
  ref={dropdownRef}
>

  <button
    onClick={() =>
      setDropdownOpen(!dropdownOpen)
    }
    className="flex items-center gap-1 font-medium text-gray-700 hover:text-green-600 transition"
  >
    More

    <ChevronDown
      size={16}
      className={`transition-transform duration-300 ${
        dropdownOpen
          ? "rotate-180"
          : ""
      }`}
    />
  </button>

  {dropdownOpen && (
    <div className="absolute left-0 mt-3 w-60 rounded-xl border bg-white shadow-xl overflow-hidden animate-fade-in">

      {moreMenus.map((menu) => (
        <NavLink
          key={menu.path}
          to={menu.path}
          onClick={() =>
            setDropdownOpen(false)
          }
          className={({ isActive }) =>
            `block px-5 py-3 transition ${
              isActive
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-green-50 hover:text-green-600"
            }`
          }
        >
          {menu.name}
        </NavLink>
      ))}

    </div>
  )}

</div>

</nav>

          {/* Right Side */}

          <Link
  to="/site-visit"
  className="hidden lg:inline-flex items-center whitespace-nowrap rounded-xl bg-green-600 px-7 py-3 text-white font-semibold shadow hover:bg-green-700 transition"
>
  Book Site Visit
</Link>

            {/* Mobile Toggle */}

         <button
  className="lg:hidden text-gray-700"
  onClick={() =>
    setMobileOpen(!mobileOpen)
  }
>
  {mobileOpen ? (
    <X size={28} />
  ) : (
    <Menu size={28} />
  )}
</button>

      

        </div>
      </header>

      {/* Mobile Menu */}

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menus={menus}
      />
    </>
  );
}