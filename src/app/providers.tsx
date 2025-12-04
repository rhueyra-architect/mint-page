"use client";

import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import ToastProvider from "@/components/ui/toast";
import { client } from "@/lib/thirdwebClient";

/**
 * Providers wraps:
 *  - react-query QueryClientProvider
 *  - ToastProvider (your app toast context)
 *  - ThirdwebProvider (thirdweb client)
 *
 * Keep this file inside src/app so layout can import it.
 */

export default function Providers({ children }: { children: React.ReactNode }) {
  // keep QueryClient stable across renders
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) queryClientRef.current = new QueryClient();

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ToastProvider>
        <ThirdwebProvider client={client}>{children}</ThirdwebProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
