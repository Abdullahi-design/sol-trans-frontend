"use client";

import { recentTransactionsWebSocket } from '@/utils/action';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiClock, FiCopy } from 'react-icons/fi'; // Import icons

// Define a custom transaction type to avoid conflicts with other types
interface CustomTransaction {
  signature: string;
  time: string;
  status: string;
  instructions: {
    instructionNumber: number;
    programId: string;
  }[];
}

const Transactions = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<CustomTransaction[]>([]); // Define state with the correct type
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [mountPublicKey, setMountPublicKey] = useState<any>(null);

  useEffect(() => {
    // Only set mountPublicKey if publicKey is available
    if (publicKey && publicKey.toBase58() !== mountPublicKey?.toBase58()) {
      setMountPublicKey(publicKey);
    }

    const fetchTransactions = async () => {
      if (mountPublicKey) {
        try {
          const response = await recentTransactionsWebSocket(mountPublicKey.toBase58());
          
          // Set the transactions in the state
          if (response.transactions) {
            setTransactions(response.transactions as CustomTransaction[]);
          }
        } catch (error) {
          console.error('Error fetching recent transactions:', error);
        }
      }
    };

    // Only call fetchTransactions if mountPublicKey is valid
    if (mountPublicKey) {
      fetchTransactions();
    }
  }, [publicKey, mountPublicKey]); // Trigger whenever mountPublicKey changes

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Clear the copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="h-fit bg-[#f5f7fa] mt-20 flex flex-col items-center justify-center p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Recent Transactions</h1> */}
      
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl h-[80vh] overflow-y-scroll">
          {transactions.map((transaction, index) => (
            <li key={index} className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-teal-500">
              <div className="flex items-center justify-center w-full mb-2">
                <div className="flex items-center space-x-2">
                  {transaction.status === 'finalized' ? (
                    <FiCheckCircle className="text-green-500" size={24} />
                  ) : (
                    <FiClock className="text-yellow-500" size={24} />
                  )}
                  <h2 className="text-xl font-semibold">Transaction {index + 1}</h2>
                </div>
              </div>
                <span className="text-gray-500 text-sm">{transaction.time}</span>
              <div className="flex items-center justify-between">
                <p className="mt-2 text-gray-700 truncate">
                  <strong>Signature:</strong> {transaction.signature.substring(0, 10)}... {/* Clamp text */}
                </p>
                <button
                  onClick={() => copyToClipboard(transaction.signature)}
                  className="text-gray-500 hover:text-teal-500 ml-2"
                >
                  <FiCopy size={20} />
                </button>
              </div>
              {copiedText === transaction.signature && (
                <p className="text-green-500 text-sm mt-1">Signature copied!</p>
              )}
              <p className={`mt-1 text-sm ${transaction.status === 'finalized' ? 'text-green-500' : 'text-yellow-500'}`}>
                <strong>Status:</strong> {transaction.status}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="list-disc pl-4">
                  {transaction.instructions.map((instruction) => (
                    <li key={instruction.instructionNumber} className="truncate">
                      <span className="text-gray-600">Instruction {instruction.instructionNumber}: </span>
                      <span className="text-gray-800">{instruction.programId.substring(0, 10)}...</span> {/* Clamp text */}
                      <button
                        onClick={() => copyToClipboard(instruction.programId)}
                        className="text-gray-500 hover:text-teal-500 ml-2"
                      >
                        <FiCopy size={20} />
                      </button>
                      {copiedText === instruction.programId && (
                        <p className="text-green-500 text-sm">Instruction copied!</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
