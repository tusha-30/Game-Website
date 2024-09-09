"use client";
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#051c3f]">
      <div className="flex flex-col sm:flex-col md:flex-row justify-center items-start mb-4 pt-4 ml-1">
        <span className="mx-2 text-white hover:text-gray-300 hover:scale-110 cursor-pointer">Privacy Notice</span>
        <span className="mx-2 text-white hover:text-gray-300 cursor-pointer hover:scale-110">Terms of Service</span>
        <span className="mx-2 text-white hover:text-gray-300 cursor-pointer hover:scale-110">Cookie Policy</span>
        <span className="mx-2 text-white hover:text-gray-300 cursor-pointer hover:scale-110">Company Information</span>
        <span className="mx-2 text-white hover:text-gray-300 cursor-pointer hover:scale-110">Cookie Preference</span>
      </div>
      <p className="text-center mb-4 text-white ">Copyright © Tusha. All rights reserved.</p>
      <div className="flex justify-center space-x-4 pb-2 text-white">
        <a href="https://github.com/tusha-30" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 hover:text-green-700">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/tusha3009" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 hover:text-blue-700">
          <FaLinkedin size={24} />
        </a>
        <a href="mailto:tushakumar@gmail.com" className="transition-transform transform hover:scale-110 hover:text-red-700">
          <FaEnvelope size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
