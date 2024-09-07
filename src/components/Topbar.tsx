"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { FaHome, FaGamepad, FaChartLine, FaBell, FaUserCircle, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';

const Topbar: React.FC = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const loggedInStatus = localStorage.getItem('loggedIn') === 'yes';
    setIsLoggedIn(loggedInStatus);
  });

  // Toggle notifications visibility
  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Close the notifications
  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  // Toggle account menu visibility
  const handleAccountClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  // Handle login
  const handleLoginClick = () => {
    setShowAccountMenu(false);
    router.push('/login'); // Navigate to login page
  };

  // Handle logout
  const handleLogoutClick = () => {
    localStorage.setItem('loggedIn', 'no'); // Update login status
    setIsLoggedIn(false); // Update state
    setShowAccountMenu(false); // Hide the account menu
    toast.success("Successfully Logout!")
    router.push('/'); // Redirect to homepage or any other page
  };

  return (
    <div className="sticky top-0 bg-[#051c3f] flex justify-between items-center p-4 shadow-md z-10">
      <div className="flex  lg:justify-center  text-white  gap-5 md:gap-20 lg:gap-30">
        <button
          className="flex items-center space-x-2"
          onClick={() => router.push("/")}
        >
          <FaHome />
          <span className="whitespace-nowrap">Home</span>
        </button>
        <button
          className="flex items-center space-x-2"
          onClick={() => router.push("/game-store")}
        >
          <FaGamepad />
          <span className="whitespace-nowrap">Store</span>
        </button>
        <button
          className="flex items-center space-x-2"
          onClick={() => router.push("/leaderboard")}
        >
          <FaChartLine />
          <span className="whitespace-nowrap">News</span>
        </button>
      </div>

      <div className="text-white flex items-center lg:gap-9 md:gap-5 sm:gap-3 gap-3 relative">
        <FaBell onClick={handleBellClick} className="cursor-pointer" />
        {showNotifications && (
          <div className="absolute top-12 right-0 bg-white text-black p-[12px] shadow-lg rounded-lg w-[280px] border border-gray-300 ">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-[#051c3f]">Notifications</h4>
              <FaTimes
                onClick={handleCloseNotifications}
                className="cursor-pointer text-gray-600 hover:text-black"
              />
            </div>
            <p className="mb-2 text-gray-700 font-medium">Sales start tomorrow at 8pm</p>
            <p className="text-gray-700 font-medium">Your wishlist is waiting</p>
          </div>
        )}
        <FaUserCircle onClick={handleAccountClick} className="cursor-pointer" />
        {showAccountMenu && (
          <div className="absolute top-[35px] right-0 bg-white text-black p-[5px] shadow-lg rounded-lg border border-gray-300">
            <div className="flex flex-col">

              <button    className="p-2 text-red-600 hover:text-red-800">
              <a href='/settings'>Settings</a>  
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="p-2 text-red-600 hover:text-red-800"
                  
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
