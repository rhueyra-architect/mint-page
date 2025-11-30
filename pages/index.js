// File: pages/index.js
// Replace the entire pages/index.js with this exact code.

import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc1155";
import { baseSepolia } from "thirdweb/chains";
import { ethers } from "ethers";

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
  
// Replace your existing handleClaim with this exact block (inside ClaimNFT)
const handleClaim = async () => {
  if (!account) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("No browser wallet found — install MetaMask or similar.");
      return;
    }

    // request accounts / wallet popup
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    // Minimal ABI that includes the claimTo function used by Edition Drop
    const ABI = [
      "function claimTo(address _to, uint256 _tokenId, uint256 _quantity) external"
    ];

    // create contract instance connected to signer (will prompt tx)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // call contract - TOKEN_ID must be a number/BigInt convertible (we pass as Number)
    const tokenIdNum = Number(TOKEN_ID); // ensure numeric tokenId
    const tx = await contract.claimTo(account.address, tokenIdNum, 1);

    // optional: wait for confirmation
    await tx.wait();

    alert("Claim successful 🎉");
  } catch (err) {
    console.error("Claim error:", err);
    const msg = err && err.message ? err.message : String(err);
    alert("Claim failed: " + msg);
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
