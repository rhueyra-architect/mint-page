// pages/index.js
import React from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { createThirdwebClient, getContract } from 'thirdweb';
import { claimTo } from 'thirdweb/extensions/erc1155';
import { baseSepolia } from 'thirdweb/chains';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ''
});

// <--- REPLACE this: either hardcode or use NEXT_PUBLIC_CONTRACT_ADDRESS env var
// example placeholder below:
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x5c07a4D80201Dc565681ffA420962DE8De06f77F';
const TOKEN_ID = 0n;

export default function Claim() {
  const account = useActiveAccount();

  const handleClaim = async () => {
    if (!account?.address) {
      alert('Please connect a wallet first');
      return;
    }

    const contract = getContract({
      client,
      chain: baseSepolia,
      address: CONTRACT_ADDRESS
    });

    try {
      await claimTo({
        contract,
        to: account.address,
        tokenId: TOKEN_ID,
        quantity: 1n
      });
      alert('Claim successful 🎉');
    } catch (err) {
      console.error(err);
      alert('Claim failed — check console for details');
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Inter, system-ui, sans-serif', color: '#eee' }}>
      <h1 style={{ margin: 0 }}>CLAIM THE FLAME</h1>

      <div style={{ marginTop: 20 }}>
        <ConnectButton client={client} />
      </div>

      {account && (
        <div style={{ marginTop: 24 }}>
          <button
            onClick={handleClaim}
            style={{
              marginTop: 8,
              padding: '12px 20px',
              background: '#111',
              color: '#fff',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Claim NFT
          </button>
        </div>
      )}
    </div>
  );
}
