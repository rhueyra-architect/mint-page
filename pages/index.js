// pages/index.js

import { ThirdwebProvider, ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc1155";
import { baseSepolia } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

const contractAddress = "0x5c07a4D80201Dc565681ffA420962DE8De06f77F";
const tokenId = 0n;

function ClaimNFT() {
  const account = useActiveAccount();
  const contract = getContract({
    client,
    chain: baseSepolia,
    address: contractAddress,
  });

  const handleClaim = async () => {
    if (!account) return;
    await claimTo({
      contract,
      to: account.address,
      tokenId,
      quantity: 1n,
    });
    alert("Claimed!");
  };

  return (
    <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>
      <h1>Claim The Signal</h1>

      <ConnectButton client={client} />

      {account && (
        <button
          onClick={handleClaim}
          style={{
            marginTop: 20,
            padding: "12px 20px",
            background: "#111",
            color: "#fff",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Claim NFT
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider>
      <ClaimNFT />
    </ThirdwebProvider>
  );
}
