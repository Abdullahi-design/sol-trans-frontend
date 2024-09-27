"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PaymentContextProps {
    timeLeft: number;
    tempAcc: string;
    setTempAcc: (acc: string) => void;
    setSolAmount: (amount: number | any) => void;
    solAmount: number;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePaymentContext must be used within a PaymentProvider');
    }
    return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
    const [tempAcc, setTempAcc] = useState<string>('');
    const [solAmount, setSolAmount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <PaymentContext.Provider value={{ timeLeft, tempAcc, setTempAcc, solAmount, setSolAmount }}>
            {children}
        </PaymentContext.Provider>
    );
};
