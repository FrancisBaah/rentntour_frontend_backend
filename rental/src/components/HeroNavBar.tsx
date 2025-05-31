import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeroNavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/category/popular" },
    { label: "Packages", path: "/category/tour-packages" },
    { label: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 ${
        isScrolled
          ? "bg-white dark:bg-black text-gray-700 dark:text-gray-200 shadow-md"
          : "text-gray-400 dark:text-gray-600"
      } transition-all duration-300 py-4`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Mobile Hamburger */}
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

          {/* Logo */}
          <img
            onClick={() => navigate("/")}
            src={isScrolled ? "/RentnTour.png" : "/transparent.png"}
            alt="Logo"
            className="h-8 cursor-pointer"
          />

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {menuItems.map((item, i) => (
              <li key={i} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className="hover:text-blue-600 transition"
                >
                  {t(item.label)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search and Auth Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-blue-600" />
          <div className="hidden md:flex gap-4 items-center text-xs">
            <span
              onClick={() => navigate("/login")}
              className="hover:text-blue-600 cursor-pointer"
            >
              {t("Login")}
            </span>
            <span
              onClick={() => navigate("/register")}
              className="hover:text-blue-600 cursor-pointer"
            >
              {t("Register")}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black shadow-lg">
          <ul className="flex flex-col px-6 pb-4 gap-4 text-gray-700 dark:text-gray-200">
            {menuItems.map((item, index) => (
              <li key={index} className="border-b py-2">
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className="text-left w-full text-sm font-medium hover:text-blue-600"
                >
                  {t(item.label)}
                </button>
              </li>
            ))}

            {/* Mobile Login/Register */}
            <li className="border-b py-2 text-sm">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full text-left hover:text-blue-600"
              >
                {t("Login")}
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
                {t("Register")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HeroNavBar;
