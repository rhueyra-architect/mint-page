"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/toast";
import { client } from "@/lib/thirdwebClient";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <ThirdwebProvider client={client}>{children}</ThirdwebProvider>
    </QueryClientProvider>
  );
}
