import type { Metadata } from "next";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";
import { PaymentProvider } from "@/components/PaymentContext";

export const metadata: Metadata = {
  title: "solana-dapp",
  description: "Solana wallet invoice maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppWalletProvider>
        <PaymentProvider>
          {children}
        </PaymentProvider>
      </AppWalletProvider>
      </body>
    </html>
  );
}
// const { timeLeft, tempAcc } = usePaymentContext();