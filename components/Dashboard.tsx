"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerLoader from "./SpinnerLoader";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

interface DashboardProps {
  setActiveContent: (content: string) => void; // Function to update the active content
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveContent }) => {
  const [loading, setLoading] = useState(true);
  const { publicKey, connected, wallet } = useWallet();
  const [balance, setBalance] = useState<number | null>(0);

  const router = useRouter();
  const { connection } = useConnection();

  useEffect(() => {
    if (!publicKey) {
      router.push("/login");
    } else {
      setLoading(false);
    }

    const getInfo = async () => {
      if (connected && publicKey) {
        console.log("Wallet Public Key:", publicKey.toBase58());
        console.log("Wallet Name:", wallet?.adapter?.name);

        // const info = await connection.getAccountInfo(publicKey);
        // console.log("info:", info);
        // setBalance(info!.lamports / LAMPORTS_PER_SOL);

        const balance = await connection.getBalance(new PublicKey(publicKey));
        const balanceConv = balance / LAMPORTS_PER_SOL;
        setBalance(balanceConv);

        console.log("balanceConv: ", balanceConv);
        
        
      } else {
        console.log("Wallet is not connected");
      }
    };
    getInfo();
  }, [publicKey, router]);

  if (loading) return <SpinnerLoader />;

  return (
    <div className="min-h-full bg-[#f5f7fa] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Balance Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <h2 className="md:text-xl text-md font-semibold mb-4">Account Balance</h2>
          <p className="md:text-2xl text-xl font-bold text-green-600">
            {balance !== null ? `${balance} SOL` : "Loading..."}
          </p>
        </div>

        {/* Create Invoice Button Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:bg-orange-100 hover:bg-opacity-60 transition-all duration-200">
          <h2 className="md:text-lg text-sm font-semibold mb-4">Create Invoice</h2>
          <button onClick={() => setActiveContent("invoice")} className="bg-orange-600 text-white py-2 md:text-lg text-sm px-4 rounded-lg hover:bg-orange-700 transition-all duration-200">
            Create Invoice
          </button>
        </div>

        {/* Recent Confirmed Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:bg-teal-100 hover:bg-opacity-60 transition-all duration-200">
          <h2 className="md:text-lg text-sm font-semibold mb-4">Get Confirmed Transactions</h2>
          <button onClick={() => setActiveContent("transactions")} className="bg-teal-600 text-white py-2 md:text-lg text-sm px-4 rounded-lg hover:bg-teal-700 transition-all duration-200">
            View Transactions
          </button>
        </div>

        {/* Get Pending Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:bg-yellow-100 hover:bg-opacity-60 transition-all duration-200">
          <h2 className="md:text-lg text-sm font-semibold mb-4">Get Pending Transactions</h2>
          <button onClick={() => setActiveContent("pending-transactions")} className="bg-yellow-500 text-white py-2 md:text-lg text-sm px-4 rounded-lg hover:bg-yellow-600 transition-all duration-200">
            Pending Transactions
          </button>
        </div>

        {/* Recurring Transactions Card */}
        {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:bg-teal-100 hover:bg-opacity-60 transition-all duration-200">
          <h2 className="md:text-lg text-sm font-semibold mb-4">Recurring Transactions</h2>
          <button className="bg-teal-600 text-white py-2 md:text-lg text-sm px-4 rounded-lg hover:bg-teal-700 transition-all duration-200">
            Manage Recurring Payments
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
