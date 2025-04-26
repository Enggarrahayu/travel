import { FaSuitcase } from "react-icons/fa6";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Register = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen px-4 pb-12 pt-28 bg-blue-50">
        <div className="w-full max-w-md p-8 transition-all bg-white shadow-lg rounded-2xl hover:shadow-xl">
          <h2 className="flex items-center justify-center gap-2 mb-6 text-3xl font-extrabold text-blue-600">
            <FaSuitcase
                size={26}
                className="mr-3 text-blue-600 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 drop-shadow-sm"
              />
            Join Tripvia  
          </h2>
          <p className="mb-6 text-sm text-center text-gray-500">Take the smart trip — via <span className="font-bold">Tripvia</span></p>

          <form className="space-y-5">
            {/* Name Field */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <div className="flex items-center">
                <FaUser className="absolute ml-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center">
                <FaEnvelope className="absolute ml-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center">
                <FaLock className="absolute ml-3 text-gray-400" />
                <input
                  type="password"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Repeat Password */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Repeat Password</label>
              <div className="flex items-center">
                <FaLock className="absolute ml-3 text-gray-400" />
                <input
                  type="password"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
              <div className="flex items-center">
                <FaUserTag className="absolute ml-3 text-gray-400" />
                <select className="w-full px-10 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Register;
