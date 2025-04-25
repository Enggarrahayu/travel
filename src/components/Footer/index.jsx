import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaSuitcase } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="pt-10 pb-6 text-gray-800 bg-gray-100 border-t border-gray-200">
      <div className="grid grid-cols-1 gap-8 px-6 mx-auto max-w-7xl md:grid-cols-3">
        {/* Logo and description */}
        <div>
          <span className="flex items-center space-x-1 text-xl font-extrabold tracking-wide text-blue-600">
            <FaSuitcase 
              size={24} 
              className="text-blue-600 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 drop-shadow-sm"
            />
            <span>Tripvia</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Take the smart trip — via <span className="font-bold">Tripvia</span>. Great deals, handpicked destinations, and 24/7 support.
          </p>
        </div>

        {/* Navigation links */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="/" className="transition-colors hover:text-blue-600">Home</a></li>
            <li><a href="/escapes" className="transition-colors hover:text-blue-600">Escapes</a></li>
            <li><a href="/deals" className="transition-colors hover:text-blue-600">Deals</a></li>            
            <li><a href="/contact-us" className="transition-colors hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Social media and newsletter */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-gray-900">Stay Connected</h4>
          <div className="flex mb-4 space-x-4 text-lg text-blue-600">
            <a href="#" aria-label="Facebook" className="hover:text-blue-700"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-700"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-700"><FaTwitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-blue-700"><FaYoutube /></a>
          </div>
          <p className="mb-2 text-sm text-gray-600">Subscribe for travel deals & updates:</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-l focus:outline-none"
            />
            <button className="px-4 py-2 text-sm text-white transition-all bg-blue-600 rounded-r hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="pt-6 mt-10 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Tripvia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
