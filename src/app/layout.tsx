import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "sonner";
import { ToastProvider } from "@/components/ui/toast";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NFT Minting template",
	description: "A minting template powered by thirdweb",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryClientProvider client={queryClient}>
				<ToastProvider>
					<Toaster position="bottom-center" />

					{/* GLOBAL connect bubble - top-right, clickable and always visible */}
					<div className="fixed top-4 right-4 z-50">
					  <ConnectButton client={client} />
					</div>
					
					<ThirdwebProvider>{children}</ThirdwebProvider>
				</ToastProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
