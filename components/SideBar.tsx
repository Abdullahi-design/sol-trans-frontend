"use client";

import { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard, MdPendingActions } from "react-icons/md";

interface SidebarProps {
    setActiveContent: (content: string) => void; // Function to update the active content
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveContent }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Set default state based on screen size (collapsed on mobile, expanded on web)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false); // Collapse on mobile
      } else {
        setIsExpanded(true); // Expand on desktop
      }
    };

    // Call the resize handler initially and on every resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-[#063a4f] text-white p-4 transition-all duration-300 z-30 absolute lg:relative top-0 left-0 ${
        isExpanded ? "lg:w-64 w-full" : "lg:w-20 w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className={`flex justify-between items-center p-2 rounded-lg ${isExpanded && "bg-[#14bdc6]"} bg-opacity-60 mb-6`}>
        <p className={`text-lg font-bold ${!isExpanded && "hidden"}`}>
          Solana Dapp
        </p>
        <button
          className="block"
          onClick={() => setIsExpanded(!isExpanded)} // Toggle expand/collapse
        >
          {isExpanded ? <FiArrowLeft className="w-8 h-8 p-2 rounded-md hover:bg-[#14bdc6] transition duration-300" /> : <FiArrowRight className="w-8 h-8 p-2 rounded-md bg-[#14bdc6] transition duration-300" />}
        </button>
      </div>

        <div className="border border-b-0 my-4"></div>

      {/* Menu Items */}
        <ul className="flex-grow space-y-2">
            <li>
                <button onClick={() => setActiveContent("dashboard")} className={`block p-2 rounded-md hover:bg-[#14bdc6] hover:bg-opacity-40 transition duration-300 ${isExpanded ? 'w-full': 'w-fit'}`}>
                    {isExpanded ? (<span className="transition-opacity flex"><MdDashboard  className="mt-1 mx-2 w-5 h-5"/>Dashboard</span>): <MdDashboard className="w-5 h-5"/>}
                </button>
            </li>
            <li>
                <button onClick={() => setActiveContent("invoice")} className={`block p-2 rounded-md hover:bg-[#14bdc6] hover:bg-opacity-40 transition duration-300 ${isExpanded ? 'w-full': 'w-fit'}`}>
                    {isExpanded ? (<span className="transition-opacity flex"><FaFileInvoice  className="mt-1 mx-2 w-5 h-5"/>Create Invoice</span>): <FaFileInvoice className="w-5 h-5"/>}
                </button>
            </li>
            <li>
                <button onClick={() => setActiveContent("transactions")} className={`block p-2 rounded-md hover:bg-[#14bdc6] hover:bg-opacity-40 transition duration-300 ${isExpanded ? 'w-full': 'w-fit'}`}>
                    {isExpanded ? (<span className="transition-opacity flex"><GrTransaction  className="mt-1 mx-2 w-5 h-5"/>Recent Transactions</span>): <GrTransaction className="w-5 h-5"/>}
                </button>
            </li>
            <li>
                <button onClick={() => setActiveContent("pending-transactions")} className={`block p-2 rounded-md hover:bg-[#14bdc6] hover:bg-opacity-40 transition duration-300 ${isExpanded ? 'w-full': 'w-fit'}`}>
                    {isExpanded ? (<span className="transition-opacity flex"><MdPendingActions  className="mt-1 mx-2 w-5 h-5"/>Pending Transactions</span>): <MdPendingActions className="w-5 h-5"/>}
                </button>
            </li>
        </ul>
        </div>
    );
};

export default Sidebar;
