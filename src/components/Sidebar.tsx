"use client";  // Ensure this component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { FaHome, FaGamepad, FaTachometerAlt, FaCog, FaEnvelope, FaCreditCard } from 'react-icons/fa';
import Link from 'next/link';

type SidebarProps = {
  onWidthChange: (width: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onWidthChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      const width = isOpen ? 256 : 80; // Adjust these values as needed
      onWidthChange(width);
    };

    updateWidth(); // Initialize
    // Re-calculate on open/close
    const handleResize = () => updateWidth();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onWidthChange]);

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'} group`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
      <div className="mt-10">
      <Link href="/" legacyBehavior>
        <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
          <FaHome className="text-2xl" />
          <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Home</span>
        </div>
        </Link>
        <Link href="/game-store" legacyBehavior>
          <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
            <FaGamepad className="text-2xl" />
            <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Game Store</span>
          </div>
        </Link>
        <Link href="/leaderboard" legacyBehavior>
          <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
            <FaTachometerAlt className="text-2xl" />
            <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Leaderboard</span>
          </div>
        </Link>
        <Link href="/settings" legacyBehavior>
          <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
            <FaCog className="text-2xl" />
            <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Settings</span>
          </div>
        </Link>
        <Link href="/contact-us" legacyBehavior>
          <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
            <FaEnvelope className="text-2xl" />
            <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Contact Us</span>
          </div>
        </Link>
        <Link href="/payment" legacyBehavior>
          <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=>setIsOpen(false)}>
            <FaCreditCard className="text-2xl" />
            <span className={`ml-4 text-sm ${isOpen ? 'block' : 'hidden'}`}>Payment</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
