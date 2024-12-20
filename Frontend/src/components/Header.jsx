
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { signOut } from "../redux/user/userSlice";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
        await fetch("/api/user/signout");
        dispatch(signOut());
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

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
            {currentUser ? (
                        <div className="relative flex-shrink-0 mt-4 md:mt-0">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    src={currentUser.profilePicture}
                                    alt="user"
                                    className="h-10 w-10 rounded-full"
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                    <div className="px-4 py-2">
                                        <span className="block text-sm font-medium text-gray-900">{currentUser.username}</span>
                                        <span className="block text-sm text-gray-500">{currentUser.email}</span>
                                    </div>
                                    <Link
                                        to="/dashboard?tab=profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)} // Close dropdown when clicking the link
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setDropdownOpen(false); // Close dropdown when signing out
                                        }}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (<Link to="/menu" className="text-white"> {/* Use Link instead of <a> */}
                      <FaBars size={24} />
                    </Link>
                        
                    )}
          </div>
        </div>

        {/* Second Line: Scrollable Header Topics */}
        <div className="lg:hidden overflow-x-auto py-2 scrollbar-hidden">
          <div className="flex space-x-6 min-w-[600px]">
            <a href="/" className="text-sm font-semibold whitespace-nowrap">U.S. News</a>
            <a href="/" className="text-sm font-semibold whitespace-nowrap">Decision 2024</a>
            <a href="/politics" className="text-sm font-semibold whitespace-nowrap">Politics</a>
            <a href="/world" className="text-sm font-semibold whitespace-nowrap">World</a>
            <a href="/business" className="text-sm font-semibold whitespace-nowrap">Business</a>
            <a href="/sports" className="text-sm font-semibold whitespace-nowrap">Sports</a>
            <a href="/investigations" className="text-sm font-semibold whitespace-nowrap">Investigations</a>
            <a href="/culture" className="text-sm font-semibold whitespace-nowrap">Culture & Trends</a>
            <a href="/health" className="text-sm font-semibold whitespace-nowrap">Health</a>
            <a href="/science" className="text-sm font-semibold whitespace-nowrap">Science</a>
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
          <a href="/" className="text-sm font-semibold whitespace-nowrap">U.S. News</a>
            <a href="/" className="text-sm font-semibold whitespace-nowrap">Decision 2024</a>
            <a href="/politics" className="text-sm font-semibold whitespace-nowrap">Politics</a>
            <a href="/world" className="text-sm font-semibold whitespace-nowrap">World</a>
            <a href="/business" className="text-sm font-semibold whitespace-nowrap">Business</a>
            <a href="/sports" className="text-sm font-semibold whitespace-nowrap">Sports</a>
            <a href="/investigations" className="text-sm font-semibold whitespace-nowrap">Investigations</a>
            <a href="/culture" className="text-sm font-semibold whitespace-nowrap">Culture & Trends</a>
            <a href="/health" className="text-sm font-semibold whitespace-nowrap">Health</a>
            <a href="/science" className="text-sm font-semibold whitespace-nowrap">Science</a>
          </nav>

          {/* Right: Watch Live Button and Toggle Button */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-semibold text-red-500 hover:underline">
              ● WATCH LIVE
            </button>
            {currentUser ? (
                        <div className="relative flex-shrink-0 mt-4 md:mt-0">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    src={currentUser.profilePicture}
                                    alt="user"
                                    className="h-10 w-10 rounded-full"
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                    <div className="px-4 py-2">
                                        <span className="block text-sm font-medium text-gray-900">{currentUser.username}</span>
                                        <span className="block text-sm text-gray-500">{currentUser.email}</span>
                                    </div>
                                    <Link
                                        to="/dashboard?tab=profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)} // Close dropdown when clicking the link
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setDropdownOpen(false); // Close dropdown when signing out
                                        }}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (<Link to="/menu" className="text-white"> {/* Use Link instead of <a> */}
                      <FaBars size={24} />
                    </Link>
                        
                    )}
          </div>
        </div>
      </div>
    </header>
  );
}
