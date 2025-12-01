"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaHashtag, FaArrowRight, FaGoogle, FaShieldAlt, FaBuilding, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdHome } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    wardNumber: "",
    loginType: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLoginType = (type) => {
    setCredentials({
      username: "",
      password: "",
      wardNumber: "",
      loginType: type,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (credentials.loginType === "admin") {
        response = await fetch("http://localhost:5000/api/auth/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
      } else if (credentials.loginType === "wardAdmin") {
        response = await fetch("http://localhost:5000/api/auth/wardadmin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            wardNumber: String(credentials.wardNumber),
          }),
        });
      } else {
        response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name || "User"}!`);

      if (data.user.role === "admin") navigate("/dashboard");
      else if (data.user.role === "wardAdmin") navigate("/ward-dashboard");
      else navigate("/home");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/google/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Google login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Welcome, ${data.user.name || "User"}!`);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
    toast.error("Google authentication failed");
  };

  const getLoginHeading = () => {
    if (credentials.loginType === "admin") return "Administrator Portal";
    if (credentials.loginType === "wardAdmin") return "Ward Management";
    return "Welcome to NagarSaathi";
  };

  const getLoginSubtitle = () => {
    if (credentials.loginType === "admin") return "System Administrator Access";
    if (credentials.loginType === "wardAdmin") return "Manage Your Ward Complaints";
    return "Login to access civic services";
  };

  const getLoginIcon = () => {
    if (credentials.loginType === "admin") return <MdAdminPanelSettings className="text-4xl" />;
    if (credentials.loginType === "wardAdmin") return <FaBuilding className="text-4xl" />;
    return <FaUsers className="text-4xl" />;
  };

  const loginColor =
    credentials.loginType === "admin"
      ? "from-red-500 to-red-600"
      : credentials.loginType === "wardAdmin"
      ? "from-emerald-500 to-green-600"
      : "from-indigo-500 to-blue-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* Left Side - Illustration/Branding */}
        <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl">
                <MdHome className="text-3xl" />
              </div>
              <h1 className="text-3xl font-bold">NagarSaathi</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">Your Civic Companion</h2>
            <p className="text-blue-100 text-lg mb-8">
              Seamless civic issue resolution platform connecting citizens, ward administrators, and city officials.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>

          {/* Features */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              <FaShieldAlt className="text-xl mb-2" />
              <h4 className="font-semibold">Secure Access</h4>
              <p className="text-sm text-blue-100">End-to-end encrypted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              <FaBuilding className="text-xl mb-2" />
              <h4 className="font-semibold">Ward Management</h4>
              <p className="text-sm text-blue-100">Local administration</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-3/5 p-10">
          {/* Login Type Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {["user", "wardAdmin", "admin"].map((type) => (
              <button
                key={type}
                onClick={() => toggleLoginType(type)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                  credentials.loginType === type
                    ? type === "admin"
                      ? "bg-red-50 border-2 border-red-200 shadow-lg"
                      : type === "wardAdmin"
                      ? "bg-green-50 border-2 border-green-200 shadow-lg"
                      : "bg-blue-50 border-2 border-blue-200 shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`p-3 rounded-full mb-2 ${
                    credentials.loginType === type
                      ? type === "admin"
                        ? "bg-red-100 text-red-600"
                        : type === "wardAdmin"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {type === "admin" ? (
                    <MdAdminPanelSettings className="text-xl" />
                  ) : type === "wardAdmin" ? (
                    <FaBuilding className="text-xl" />
                  ) : (
                    <FaUsers className="text-xl" />
                  )}
                </div>
                <span
                  className={`font-medium ${
                    credentials.loginType === type
                      ? type === "admin"
                        ? "text-red-700"
                        : type === "wardAdmin"
                        ? "text-green-700"
                        : "text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {type === "admin" ? "Admin" : type === "wardAdmin" ? "Ward Admin" : "Citizen"}
                </span>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${loginColor} mb-4`}>
                {getLoginIcon()}
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{getLoginHeading()}</h1>
              <p className="text-gray-600 mt-2">{getLoginSubtitle()}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {credentials.loginType === "user" ? "Email Address" : "Username"}
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-1 focus:border-transparent transition-all duration-200 focus:outline-none"
                      placeholder={
                        credentials.loginType === "user" ? "you@example.com" : "Enter your username"
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-1 focus:border-transparent transition-all duration-200 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {credentials.loginType === "wardAdmin" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward Number</label>
                    <div className="relative">
                      <FaHashtag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="wardNumber"
                        value={credentials.wardNumber}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:border-transparent transition-all duration-200 focus:outline-none"
                        placeholder="Enter ward number"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : credentials.loginType === "admin"
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500"
                    : credentials.loginType === "wardAdmin"
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:ring-green-500"
                    : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:ring-blue-500"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Login to Continue</span>
                    <FaArrowRight className="ml-3" />
                  </div>
                )}
              </button>
            </form>

            {credentials.loginType === "user" && (
              <>
                <div className="my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID"}>
                      <div className="flex justify-center">
                        <div className="w-full max-w-xs">
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            shape="rectangular"
                            width="100%"
                            text="continue_with"
                            size="large"
                            theme="outline"
                            logo_alignment="left"
                          />
                        </div>
                      </div>
                    </GoogleOAuthProvider>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </>
            )}

            {/* Quick Switch Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600 space-y-2">
                <p className="font-medium mb-2">Switch to another role:</p>
                {credentials.loginType !== "user" && (
                  <button
                    onClick={() => toggleLoginType("user")}
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium mx-auto"
                  >
                    <FaUsers /> Citizen Login
                  </button>
                )}
                {credentials.loginType !== "wardAdmin" && (
                  <button
                    onClick={() => toggleLoginType("wardAdmin")}
                    className="flex items-center justify-center gap-2 text-green-600 hover:text-green-800 font-medium mx-auto"
                  >
                    <FaBuilding /> Ward Admin Login
                  </button>
                )}
                {credentials.loginType !== "admin" && (
                  <button
                    onClick={() => toggleLoginType("admin")}
                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-800 font-medium mx-auto"
                  >
                    <MdAdminPanelSettings /> System Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;