import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("peddy-user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("peddy-user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="p-2">
        <nav className="max-w-[1270px] mx-auto">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex="0"
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Shop</a>
                  </li>
                  <li>
                    <a>Contact</a>
                  </li>
                </ul>
              </div>
              <div className="flex gap-[10px] items-center">
                <img src="/images/logo.webp" alt="Peddy Logo" />
                <p className="font-extrabold text-black text-[32px]">Peddy</p>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a
                    className="text-gray-500 text-[16px]"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 text-[16px]"
                    onClick={() => navigate("/shop")}
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 text-[16px]">Contact</a>
                </li>
              </ul>
            </div>
            <div className="navbar-end relative" ref={dropdownRef}>
              <button
                className="btn bg-inherit border-blue-100 rounded-full"
                onClick={isLoggedIn ? toggleDropdown : onLoginClick}
              >
                <i className="fa-regular fa-user"></i>
              </button>
              {isLoggedIn && dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50">
                  <li
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/create-post");
                    }}
                  >
                    Create Post
                  </li>
                  <li
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
      {/* Toast container must be present to show notifications */}
      <ToastContainer />
    </>
  );
};

export default Header;
