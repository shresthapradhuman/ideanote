import React from "react";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col w-full md:max-w-2xl lg:max-w-5xl mx-auto min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
