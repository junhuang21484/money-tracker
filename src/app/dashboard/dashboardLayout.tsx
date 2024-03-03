import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;



