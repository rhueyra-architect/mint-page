// pages/_app.js
import '../styles/globals.css';
import React from 'react';
import { ThirdwebProvider } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { baseSepolia } from 'thirdweb/chains';

// create the client using the clientId saved in env
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ''
});

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider client={client} activeChain={baseSepolia}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
