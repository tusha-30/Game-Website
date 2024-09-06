"use client";
import React, { ReactNode, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import styles from './MainBody.module.css'; // Import your CSS module if using
import Footer from './Footer';

type MainBodyProps = {
  children: ReactNode;
};

const MainBody = ({ children }: MainBodyProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(64); // Default width

  // Function to handle sidebar width changes
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="flex-1 flex flex-col">
     
      <main className={`flex-1 overflow-y-auto ${styles.mainContent}`} style={{ marginLeft: `${sidebarWidth}px` }}>
      <Topbar />
        {children}
        <Footer/>
      </main>
      <Sidebar onWidthChange={handleSidebarWidthChange} />
     
    </div>
  );
};

export default MainBody;
