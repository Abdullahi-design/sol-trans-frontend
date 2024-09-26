"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const AuthButton = () => {
    const { publicKey, connected, wallet, signTransaction, signMessage } = useWallet();
    const [balance, setBalance] = useState<number | null>(0);

    // connection context object that is injected into the browser by the wallet
    const { connection } = useConnection();

    // Log wallet details whenever the wallet is connected or the publicKey changes
    useEffect(() => {
        const getInfo = async () => {
            if (connected && publicKey) {
                console.log("Wallet Public Key:", publicKey.toBase58());
                console.log("Wallet Name:", wallet?.adapter?.name);

                const info = await connection.getAccountInfo(publicKey);
                setBalance(info!.lamports / LAMPORTS_PER_SOL);
            } else {
                console.log("Wallet is not connected");
            }
        }
        getInfo();
    }, [connected, publicKey, wallet]);

    return (
        <div>
            <WalletMultiButton style={{ backgroundColor: "#ea580c" }} />

            {/* <WalletDisconnectButton /> */}
        </div>
    )
}

export default AuthButton