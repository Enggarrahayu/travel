import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSuitcase } from "react-icons/fa6";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { setToken, setCurrentUser } from '../../utils/Auth';
import { useAuth } from "../../context/AuthContext";
import Api from "../../utils/Api";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(""); 

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setMessageType("");
    
      try {
        const response = await Api.post("/login", { email, password }, {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
          }
        });
    
        console.log("Login response:", response);
    
        const token = response.data?.access_token || response.data?.token;
        const user = response.data?.data;
    
        if (token && user) {
          login(token, user);
          setToken(token);
          setCurrentUser(user);
          setMessage("Login successful! Redirecting...");
          setMessageType("success");
    
          setTimeout(() => navigate("/"), 1500);
        } else {
          throw new Error("Token or user data not found in response");
        }
      } catch (error) {
        console.error("Login failed:", error);
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.";
        setMessage(errorMessage);
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };
  
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
            {/* Error message */}
                {message && (
                    <p className={`mb-4 text-lg text-center ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                      {message}
                    </p>
                  )}
            {/* Email Field */}
            <div className="relative group">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center">
                <FaEnvelope className="absolute ml-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform duration-300"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChangeEmail}
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
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105"
            >
              {loading ? "Logging in..." : "Login"}
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
