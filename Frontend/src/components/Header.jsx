import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0b1c3d] text-white">
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* First Line for Mobile View */}
        <div className="lg:hidden flex items-center justify-between pb-2 border-b border-gray-700">
          {/* Left: Logo and NBC Heading */}
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/NBC_logo.svg"
              alt="NBC Logo"
              className="w-8 lg:w-12"
            />
            <h1 className="text-lg lg:text-2xl font-bold">NBC NEWS</h1>
          </div>

          {/* Right: Watch Live Button and Toggle Button */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-semibold text-red-500 hover:underline">
              ● WATCH LIVE
            </button>
            <Link to="/menu" className="text-white"> {/* Use Link instead of <a> */}
              <FaBars size={24} />
            </Link>
          </div>
        </div>

        {/* Second Line: Scrollable Header Topics */}
        <div className="lg:hidden overflow-x-auto py-2 scrollbar-hidden">
          <div className="flex space-x-6 min-w-[600px]">
            <a href="#" className="text-sm font-semibold whitespace-nowrap">U.S. News</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Decision 2024</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Politics</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">World</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Business</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Sports</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Investigations</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Culture & Trends</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Health</a>
            <a href="#" className="text-sm font-semibold whitespace-nowrap">Science</a>
          </div>
        </div>

        {/* Desktop View: Full Header Topics */}
        <div className="hidden lg:flex items-center justify-between mt-4">
          {/* Left: Logo and NBC Heading */}
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/NBC_logo.svg"
              alt="NBC Logo"
              className="w-12"
            />
            <h1 className="text-2xl font-bold">NBC NEWS</h1>
          </div>

          {/* Center: Header Topics */}
          <nav className="flex space-x-8">
            <a href="#" className="text-sm font-semibold">U.S. News</a>
            <a href="#" className="text-sm font-semibold">Decision 2024</a>
            <a href="#" className="text-sm font-semibold">Politics</a>
            <a href="#" className="text-sm font-semibold">World</a>
            <a href="#" className="text-sm font-semibold">Business</a>
            <a href="#" className="text-sm font-semibold">Sports</a>
            <a href="#" className="text-sm font-semibold">Investigations</a>
            <a href="#" className="text-sm font-semibold">Culture & Trends</a>
            <a href="#" className="text-sm font-semibold">Health</a>
            <a href="#" className="text-sm font-semibold">Science</a>
          </nav>

          {/* Right: Watch Live Button and Toggle Button */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-semibold text-red-500 hover:underline">
              ● WATCH LIVE
            </button>
            <Link to="/menu" className="text-white"> {/* Use Link instead of <a> */}
              <FaBars size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
