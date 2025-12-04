"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastProvider } from "@/components/ui/toast";
import { client } from "@/lib/thirdwebClient";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
      <ThirdwebProvider client={client}>{children}</ThirdwebProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
