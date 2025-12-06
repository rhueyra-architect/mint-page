import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ConnectEmbed } from "thirdweb/react";
import Providers from "./providers";   

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Minting template",
  description: "A minting template powered by thirdweb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster position="bottom-center" />

          <div className="fixed top-4 right-4 z-50">
            <ConnectEmbed  />
          </div>

          {children}
        </Providers>
      </body>
    </html>
  );
}
