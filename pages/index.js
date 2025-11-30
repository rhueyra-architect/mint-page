// File: pages/index.js
// Replace the entire pages/index.js with this exact code.

import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc1155";
import { baseSepolia } from "thirdweb/chains";

/**
 * Client created from the clientId saved in env.
 * Make sure NEXT_PUBLIC_THIRDWEB_CLIENT_ID is set in Vercel (or locally).
 */
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

/**
 * Replace these via environment variables in Vercel:
 *  - NEXT_PUBLIC_CONTRACT_ADDRESS (required)
 *  - NEXT_PUBLIC_TOKEN_ID (optional; default 0)
 */
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x5c07a4D80201Dc565681ffA420962DE8De06f77F";
const TOKEN_ID = BigInt(
  process.env.NEXT_PUBLIC_TOKEN_ID ? Number(process.env.NEXT_PUBLIC_TOKEN_ID) : 0
);

/**
 * The claim UI component
 */
export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>CLAIM THE FLAME</h1>
        <ClaimNFT />
      </div>
    </main>
  );
}

function ClaimNFT() {
  const account = useActiveAccount();

  // get a contract handle (uses same client that _app.js provided)
  const contract = getContract({
    client,
    chain: baseSepolia,
    address: CONTRACT_ADDRESS,
  });
  
const handleClaim = async () => {
  try {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    // ensure client is available
    if (!client) {
      alert("Client not initialized.");
      return;
    }

    // get contract using the standalone helper (not client.getContract)
    const liveContract = await getContract({
      client,
      chain: baseSepolia,
      address: CONTRACT_ADDRESS,
    });

    if (!liveContract) {
      alert("Unable to load contract. Check CONTRACT_ADDRESS env.");
      return;
    }

    const tokenIdToClaim = typeof TOKEN_ID === "bigint" ? TOKEN_ID : BigInt(TOKEN_ID);

    // trigger on-chain claim (wallet popup -> tx)
    const tx = await claimTo({
      contract: liveContract,
      to: account.address,
      tokenId: tokenIdToClaim,
      quantity: 1n,
    });

    console.log("claim tx:", tx);
    alert("🔥 THE FIRST FLAME HAS BEEN CLAIMED 🔥");
  } catch (err) {
    console.error("Claim error:", err);
    alert("Claim failed: " + (err?.message || String(err)));
  }
};


  return (
    <div style={styles.claimBox}>
      <div style={{ marginBottom: 18 }}>
        <ConnectButton client={client} />
      </div>

      {account && (
        <>
          <div style={styles.address}>{shorten(account.address)}</div>
          <button style={styles.claimButton} onClick={handleClaim}>
            Claim NFT
          </button>
        </>
      )}

      {!account && (
        <div style={{ color: "#aaa", marginTop: 8 }}>Connect a wallet to claim</div>
      )}
    </div>
  );
}

/* Small helper to shorten addresses for the UI */
function shorten(addr = "") {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

/* Minimal inline styles */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#090808",
    color: "#e9e6e2",
    padding: 24,
  },
  container: {
    width: "100%",
    maxWidth: 960,
    padding: 24,
  },
  title: {
    fontFamily: "serif",
    fontSize: 36,
    marginBottom: 24,
    letterSpacing: 1.2,
  },
  claimBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  claimButton: {
    marginTop: 6,
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    background: "#e9d6b8",
    color: "#111",
    cursor: "pointer",
    fontWeight: 600,
  },
  address: {
    color: "#cfcfcf",
    fontSize: 13,
  },
};
