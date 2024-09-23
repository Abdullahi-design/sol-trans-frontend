"use client";

import Invoice from "@/components/Invoice";
import Sidebar from "@/components/SideBar";
import SinglePayment from "@/components/SinglePayment";
import { useState } from "react";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<string>("Welcome");

  const renderContent = () => {
    switch (activeContent) {
    case "invoice":
        return <Invoice />;
    case "singlePayment":
        return <SinglePayment />;
    default:
        return <Invoice />;
    }
  };

  return (
    <div className="relative flex h-screen">
      <Sidebar setActiveContent={setActiveContent} />

      <div className={`transition-all duration-300 p-6 bg-[#f5f7fa] ${isSidebarOpen ? "ml-20 md:ml-64" : "ml-20 md:ml-0"} flex-grow`} >
        {renderContent()}
      </div>
    </div>
  );
}
