import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaSuitcase } from 'react-icons/fa6';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 z-50 w-full transition-all bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaSuitcase className="text-blue-600" size={22} />
          <span className="text-xl font-extrabold tracking-wide text-blue-600">
            Tripvia
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 text-sm font-medium text-gray-700 md:flex">
          {['Home', 'Escapes', 'Deals', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="relative transition-colors group hover:text-blue-600"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden space-x-4 md:flex">
          <button className="font-medium text-blue-600 transition-all hover:underline">Login</button>
          <button className="px-5 py-2 font-medium text-white transition-all bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-gray-700 md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-3 bg-white border-t shadow-md">
          {['Home', 'Hotels', 'Flights', 'Deals', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="block font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 space-y-2 border-t">
            <button className="block w-full font-medium text-left text-blue-600 hover:underline">
              Login
            </button>
            <button className="block w-full px-4 py-2 text-left text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
