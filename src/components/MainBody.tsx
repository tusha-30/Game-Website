"use client";
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation'; // Updated import for App Directory routing
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import styles from './MainBody.module.css'; // Import your CSS module if using
import Footer from './Footer';

type MainBodyProps = {
  children: ReactNode;
};

const MainBody = ({ children }: MainBodyProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(64); // Default width
  const pathname = usePathname(); 
console.log(pathname)

  const isGameStorePage = pathname === '/game-store';

  // Function to handle sidebar width changes
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="flex-1 flex flex-col">
      <main
        className={`flex-1 overflow-y-auto ${styles.mainContent}`}
        style={{ marginLeft: isGameStorePage ? '0px' : `${sidebarWidth}px` }}
      >
        <Topbar />
        {children}
        <Footer />
      </main>
      {!isGameStorePage && <Sidebar onWidthChange={handleSidebarWidthChange} />}
    </div>
  );
};

export default MainBody;
