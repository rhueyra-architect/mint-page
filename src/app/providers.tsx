"use client";

import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastProvider } from "@/components/ui/toast";


const queryClientRef = useRef<QueryClient>();
if (!queryClientRef.current) queryClientRef.current = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ToastProvider>
        <ThirdwebProvider activeChain="base-sepolia">{children}</ThirdwebProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
