import { FaEnvelope, FaLock, FaSuitcase } from "react-icons/fa6";
import Header from "../Header";
import Footer from "../Footer";

const Login = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen px-4 pb-12 pt-28 bg-blue-50">
        <div className="w-full max-w-md p-8 transition-all bg-white shadow-lg rounded-2xl hover:shadow-xl">
          <h2 className="flex items-center justify-center gap-2 mb-6 text-3xl font-extrabold text-blue-600">
            <FaSuitcase
              size={26}
              className="text-blue-600 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 drop-shadow-sm"
            />
            Log in to Tripvia
          </h2>
          <p className="mb-6 text-sm text-center text-gray-500">
          <span> Take the smart trip — via <span className="font-bold">Tripvia</span></span>
          </p>

          <form className="space-y-5">
            {/* Email Field */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center">
                <FaEnvelope className="absolute ml-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="you@example.com"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
