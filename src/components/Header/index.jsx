import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { FaSuitcase, FaSuitcaseRolling, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-blue-600 shadow-md">
      <div className="container relative flex items-center justify-between px-4 py-4 mx-auto">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="flex items-center space-x-2">
            <FaSuitcase className="text-white" size={22} />
            <span className="text-xl font-extrabold text-white">Tripvia</span>
          </NavLink>
        </div>

        {/* Center Navigation */}
        <nav className="absolute hidden space-x-8 text-sm font-medium text-white -translate-x-1/2 md:flex left-1/2">
          {['Home', 'Escapes', 'Deals', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="relative transition-colors group hover:text-yellow-200"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Auth Buttons & Hamburger */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
           <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 transition bg-white rounded-full shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-600 rounded-full">
                {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden font-medium md:block">{currentUser?.name || currentUser?.email}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>



              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 w-56 mt-2 bg-white shadow-lg rounded-xl animate-fade-down">
                  <div className="px-4 py-3 text-sm font-semibold text-blue-700 bg-blue-100 rounded-t-xl">
                    {currentUser?.name || currentUser?.email}
                  </div>
                  <div className="flex flex-col py-2">
                    <NavLink to="/my-trips" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaSuitcaseRolling className="text-blue-600" /> My Trips
                    </NavLink>
                    <NavLink to="/edit-profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaUserEdit className="text-blue-600" /> Edit Profile
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center w-full gap-2 px-4 py-2 text-red-600 hover:bg-red-100">
                      <FaSignOutAlt className="text-red-500" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="hidden font-medium text-white md:inline-block hover:underline">
                Login
              </NavLink>
              <NavLink to="/register" className="hidden px-5 py-2 text-blue-600 bg-white md:inline-block rounded-xl hover:bg-gray-100">
                Sign Up
              </NavLink>
              {/* Mobile Login Button */}
              <NavLink to="/login" className="px-3 py-2 text-sm text-white bg-blue-600 rounded-full md:hidden">
                Login
              </NavLink>
            </>
          )}

          {/* Hamburger */}
          <button onClick={toggleMenu} className="text-white md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="px-4 py-4 space-y-3 bg-white shadow-md animate-fade-down">
          {['Home', 'Escapes', 'Deals', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="block font-medium text-gray-700 hover:text-blue-600"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t">
            {isAuthenticated ? (
              <>
                <NavLink to="/my-trips" className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100">
                  🧳 My Trips
                </NavLink>
                <NavLink to="/edit-profile" className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100">
                  ✏️ Edit Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-red-600 rounded hover:bg-red-100"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="block px-4 py-2 font-medium text-blue-600 hover:underline">
                  Login
                </NavLink>
                <NavLink to="/register" className="block px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
