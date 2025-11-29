// pages/_app.js
import React from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import "../styles/globals.css"; // harmless; we'll add this file later (or remove if you prefer)

const client = createThirdwebClient({
  // frontend-safe client id (set in Vercel as NEXT_PUBLIC_THIRDWEB_CLIENT_ID)
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider client={client} activeChain={baseSepolia}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
