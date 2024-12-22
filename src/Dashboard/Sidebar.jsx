import React from "react";
import Logo from "../assets/margdarshakendra-logo.webp";
import { Menu, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`${
          isMobile ? "fixed" : "relative"
        } inset-y-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ease-in-out shadow-lg z-30
        ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-4 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none z-50 transition-transform duration-300"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo Section */}
        <div className="p-4 flex flex-col items-center justify-center border-b border-gray-700">
          <img
            src={Logo}
            alt="Logo"
            className={`transition-transform duration-300 ${isOpen ? "w-24" : "w-12"} rounded-full`}
          />
          {isOpen && (
            <h1 className="text-xl font-bold text-gray-100 tracking-wide mt-4">
              Dashboard
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2">
          {[
            { title: "All Leads", icon: "👥" },
            { title: "All Users", icon: "👤" },
            { title: "Schedule Task", icon: "🗓️" },
            { title: "Track-Employee", icon: "📍" },
            { title: "Add-Geofence", icon: "🗺️" },
            { title: "Validate Email", icon: "📧" },
            { title: "Settings", icon: "⚙️" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300 ${
                !isOpen ? "justify-center" : "justify-start"
              }`}
              title={item.title}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="ml-4">{item.title}</span>}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
