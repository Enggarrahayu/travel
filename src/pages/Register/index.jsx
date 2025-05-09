import { FaSuitcase } from "react-icons/fa6";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../utils/Api";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (password !== passwordRepeat) {
      setMessage("Password does not match password repeat.");
      setLoading(false);
      return;
    }
  
    try {
      await Api.post("/register", {
        name,
        email,
        password,
        passwordRepeat: passwordRepeat,
        role,
      });
  
      const loginResponse = await Api.post("/login", {
        email,
        password,
      });
  
      console.log("login response ", loginResponse);
      
      const token = loginResponse.data?.access_token || loginResponse.data?.token;
      const user = loginResponse.data?.data;
  
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        login(token, user);
  
        setMessage("Successfully registered and logged in! Redirecting...");
  
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Token or user data not found");
      }
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        const messages = errors.map(err => err.message).join('\n');
        setMessage(`Registration Failed!\n${messages}`);
      } else {
        setMessage("Registration Failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen pb-12 bg-white pt-28">
        <div className="flex flex-col-reverse w-full max-w-5xl gap-4 overflow-hidden bg-white border border-blue-50 md:flex-row">
          
          {/* Form Section */}
          <div className="w-full p-6 md:w-1/2">
            <h2 className="flex items-center justify-center gap-2 mb-6 text-3xl font-extrabold text-blue-600">
              <FaSuitcase size={26} className="text-blue-600 drop-shadow-sm" />
              Join Tripvia
            </h2>
            <p className="mb-6 text-sm text-center text-gray-500">
              Take the smart trip — via <span className="font-bold">Tripvia</span>
            </p>

            {message && (
              <p className="p-2 mb-4 text-xs text-center text-gray-600 border border-blue-500 rounded-md" style={{ whiteSpace: 'pre-line' }}>
                {message}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="relative group">
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <div className="flex items-center">
                  <FaUser className="absolute ml-3 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-10 py-2 transition-transform duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    className="w-full px-10 py-2 transition-transform duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    className="w-full px-10 py-2 transition-transform duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Repeat Password Field */}
              <div className="relative group">
                <label className="block mb-1 text-sm font-medium text-gray-700">Repeat Password</label>
                <div className="flex items-center">
                  <FaLock className="absolute ml-3 text-gray-400" />
                  <input
                    type="password"
                    className="w-full px-10 py-2 transition-transform duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="relative group">
                <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                <div className="flex items-center">
                  <FaUserTag className="absolute ml-3 text-gray-400" />
                  <select
                    className="w-full px-10 py-2 transition-transform duration-300 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105"
              >
                {loading ? "Registering.." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:underline">Log in</a>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden w-full md:w-1/2 md:block">
            <img
              src="/assets/tripvia-register.png"
              alt="Register visual"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>
      </div>


      <Footer/>
    </>
  );
};

export default Register;
