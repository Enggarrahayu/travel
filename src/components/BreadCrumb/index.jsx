import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ menu }) => {
  return (
    <nav className="px-8 text-sm text-gray-600 mt-28 bg-gray-50" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <NavLink to="/" className="inline-flex items-center hover:text-blue-600">
            <FaHome className='w-3 h-3 mx-2 text-gray-400'/>
            Home
          </NavLink>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mx-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 6 10"
            >
              <path d="M1 1L5 5L1 9" />
            </svg>
              <span className="text-gray-500">{ menu }</span>
          </div>
        </li>
      </ol>
    </nav>  
  );
};

export default Breadcrumb;
