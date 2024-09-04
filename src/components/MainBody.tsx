"use client";  // Ensure this component is rendered on the client side

import React, { ReactNode, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

type MainBodyProps = {
  children: ReactNode;
};

const MainBody = ({ children }: MainBodyProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(80); // Default width

  // Function to handle sidebar width changes
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="flex-1 flex flex-col" style={{ marginLeft: `${sidebarWidth}px` }}>
      <Topbar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Sidebar onWidthChange={handleSidebarWidthChange} />
    </div>
  );
};

export default MainBody;
