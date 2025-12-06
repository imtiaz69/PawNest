import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Please login.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
            type="button"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistrationPage;
