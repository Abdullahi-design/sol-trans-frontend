"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerLoader from "./SpinnerLoader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { publicKey } = useWallet();
  const router = useRouter();

  // check if user publick key is logged in
  useEffect(() => {

    if(!publicKey){
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [publicKey, router]);

  if (loading) return <SpinnerLoader />;

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f5f7fa] w-full'>
      Hello SOL
    </div>
  )
}

export default Dashboard