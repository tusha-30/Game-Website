"use client";
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation'; 
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import styles from './MainBody.module.css'; 
import Footer from './Footer';

type MainBodyProps = {
  children: ReactNode;
};

const MainBody = ({ children }: MainBodyProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(64); 
  const pathname = usePathname(); 

  const isGameStorePage = pathname === '/game-store';


  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ marginLeft: isGameStorePage ? '0px' : `${sidebarWidth}px` }}>
      <Topbar />
      <main className={`flex-1 ${styles.mainContent}`}>
        {children}
      </main>
      <Footer />
      {!isGameStorePage && <Sidebar onWidthChange={handleSidebarWidthChange} />}
    </div>
  );
};

export default MainBody;
