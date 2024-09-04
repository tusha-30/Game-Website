// pages/login/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      toast.error("Fill all fields");
      return;
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername) {
      if (password === storedPassword) {
        // Successful login
        router.push('/game-store');
      } else {
        toast.error("Wrong password!");
      }
    } else {
      toast.error("No account found!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm text-base text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 block w-full border-gray-300 p-1 shadow-sm   sm:text-sm"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm text-base text-gray-700">Password</label>
         
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full border-gray-300 p-1 shadow-sm  sm:text-sm"
            placeholder="Enter your password"
          />
          
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 p-1 top-7"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Create an account <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
