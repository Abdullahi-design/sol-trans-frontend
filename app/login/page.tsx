"use client";

import AuthButton from "@/components/AuthButton";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
    const { publicKey, connected, wallet } = useWallet();
    const [balance, setBalance] = useState<number | null>(0);
    const [loading, setLoading] = useState(true);
  
    // connection context object that is injected into the browser by the wallet
    const { connection } = useConnection();

    const router = useRouter();

    // Log wallet details whenever the wallet is connected or the publicKey changes
    useEffect(() => {

        if(publicKey){
            router.push('/');
        } else {
            setLoading(false);
        }
        const getInfo = async () => {
            if (connected && publicKey) {
                console.log("Wallet Public Key:", publicKey.toBase58());
                console.log("Wallet Name:", wallet?.adapter?.name);

                const info = await connection.getAccountInfo(publicKey);
                const balance = await connection.getBalance(new PublicKey(publicKey));
                const balanceConv = balance / LAMPORTS_PER_SOL;
                setBalance(balanceConv);
            } else {
                console.log("Wallet is not connected");
            }
        }
        getInfo();
    }, [connected, publicKey, wallet]);

    if (loading) return <SpinnerLoader />;

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#f5f7fa] w-full'>
            <main className='text-white'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4'>
                    <div className='col-span-1 lg:col-start-2 lg:col-end-4 rounded-lg bg-[#063a4f] h-60 p-4'>
                        <div className='flex justify-between items-center'>
                            <h2 className='md:text-3xl text-lg font-semibold'>
                                account info ✨
                            </h2>
                            {/* button component for connecting to solana wallet */}
                            {/* {!publicKey && ( */}
                                <AuthButton />
                            {/* )} */}
                        </div>

                        <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                            <ul className='p-2'>
                                <li className='flex justify-between'>
                                    <p className='tracking-wider'>Wallet is connected...</p>
                                    <p className='text-orange-600 italic font-semibold'>
                                        {publicKey ? 'yes' : 'no'}
                                    </p>
                                </li>
                                
                                <li className='text-sm mt-4 flex justify-between'>
                                    <p className='tracking-wider'>Balance...</p>
                                    <p className='text-orange-600 italic font-semibold'>
                                        {balance}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page