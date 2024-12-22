import React from "react";

const Navbar = () => {
  return (
    <div className="relative flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
      {/* Invisible placeholder for alignment */}
      <div className="flex-1"></div>
      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
        Dashboard
      </h1>
      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600">
          Profile
        </button>
        <button className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
