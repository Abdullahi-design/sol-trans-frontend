import type { Metadata } from "next";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";

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
      <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
