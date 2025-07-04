import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/category/popular" },
    { label: "Packages", path: "/category/tour-packages" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-black text-gray-700 dark:text-gray-200 shadow-md transition-all duration-300 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Hamburger for mobile */}
          <div className="md:hidden">
            {isOpen ? (
              <FiX
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <FiMenu
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
          <img
            onClick={() => navigate("/")}
            src="/RentnTour.png"
            alt="Logo"
            className="h-8 cursor-pointer"
          />

          {/* Menu for Desktop */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {menuItems.map((item, i) => (
              <li key={i} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className="hover:text-blue-600 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons and Auth Buttons */}
        <div className="flex items-center gap-4 md:gap-6">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-blue-600" />
          <div className="hidden md:flex gap-4 items-center text-xs">
            <span
              onClick={() => navigate("/login")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Login
            </span>
            <span
              onClick={() => navigate("/register")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Register
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col px-6 pb-4 gap-4 text-gray-700">
            {menuItems.map((item, index) => (
              <li key={index} className="border-b py-2">
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false); // close menu after navigating
                  }}
                  className="text-left w-full text-sm font-medium hover:text-blue-600"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="border-b py-2 text-sm">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full text-left hover:text-blue-600"
              >
                Login
              </button>
            </li>
            <li className="py-2 text-sm">
              <button
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
                className="w-full text-left hover:text-blue-600"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
