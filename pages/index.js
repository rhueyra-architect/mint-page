// pages/index.js
import React from "react";
import { ThirdwebProvider, ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc1155";
import { baseSepolia } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID, // <- uses your Vercel env var
});

// Replace this with your contract address if different:
const CONTRACT_ADDRESS = "0x5c07a4D80201Dc565681ffA420962DE8De06f77F";
const TOKEN_ID = 0n; // token id to claim (bigint)

function ClaimButton() {
  const account = useActiveAccount();
  const [loading, setLoading] = React.useState(false);

  const handleClaim = async () => {
    if (!account) {
      alert("Please connect a wallet first.");
      return;
    }

    setLoading(true);
    try {
      const contract = getContract({
        client,
        chain: baseSepolia,
        address: CONTRACT_ADDRESS,
      });

      await claimTo({
        contract,
        to: account.address,
        tokenId: TOKEN_ID,
        quantity: 1n,
      });

      alert("Claim successful 🎉");
    } catch (err) {
      console.error(err);
      alert("Claim failed — check console. " + (err?.message ?? ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <ConnectButton client={client} />
      {account?.address && (
        <button
          onClick={handleClaim}
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#E6B65B",
            color: "#0b0b0b",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Claiming…" : "Claim NFT"}
        </button>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ThirdwebProvider>
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#0b0b0b", color: "#fff" }}>
        <div style={{ width: "100%", maxWidth: 900, textAlign: "center" }}>
          <h1 style={{ marginBottom: 6, fontSize: 28 }}>If the Flame recognizes you… step through.</h1>
          <p style={{ marginTop: 0, marginBottom: 20, color: "#cfcfcf" }}>
            Connect a wallet and claim your edition drop. Mobile wallets supported.
          </p>

          <div style={{ padding: 24, borderRadius: 12, background: "#0f0f0f", boxShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
            <ClaimButton />
            <div style={{ marginTop: 14, color: "#9b9b9b", fontSize: 13 }}>
              Contract: <code style={{ color: "#E6B65B" }}>{CONTRACT_ADDRESS}</code>
              <br />
              Token ID: <code style={{ color: "#E6B65B" }}>{String(TOKEN_ID)}</code>
            </div>
          </div>
        </div>
      </div>
    </ThirdwebProvider>
  );
}
