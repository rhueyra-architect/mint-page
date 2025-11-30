// pages/index.js
import React, { useState } from "react";
import {
  ConnectButton,
  useContract,
  useAddress,
  useNetwork,
} from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";

export default function Home() {
  // Contract + current connected wallet address
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
  const tokenIdEnv = process.env.NEXT_PUBLIC_TOKEN_ID ?? "0";

  // thirdweb hooks (these read the client from ThirdwebProvider in _app.js)
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const network = useNetwork();

  // simple UI state
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // convert tokenId to BigInt for claimTo
  const tokenId = BigInt(Number(tokenIdEnv || 0));

  async function handleClaim() {
    try {
      if (!contract) {
        setMsg("Contract not loaded yet. Wait a moment and try again.");
        return;
      }
      if (!address) {
        setMsg("Please connect your wallet first.");
        return;
      }

      setLoading(true);
      setMsg("");

      // call claimTo (erc1155 extension) — sends NFT to connected address
      await claimTo({
        contract,                 // contract object provided by useContract
        to: address,              // recipient address
        tokenId,                  // token id (BigInt)
        quantity: 1n,             // number of tokens to claim
      });

      setMsg("Claim successful 🎉");
    } catch (err) {
      console.error("Claim error:", err);
      // show a friendly message
      setMsg(
        err?.message
          ? `Claim failed: ${err.message}`
          : "Claim failed — check console for details."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 64,
      background: "#080808",
      color: "#eee",
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    }}>
      <h1 style={{ margin: 0, marginBottom: 24, letterSpacing: 1 }}>CLAIM THE FLAME</h1>

      <div style={{ width: 360, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <ConnectButton />
      </div>

      <div style={{ marginTop: 36, width: 420, textAlign: "left" }}>
        <div style={{ color: "#bbb", marginBottom: 12 }}>
          {address ? (
            <div>
              <div style={{ fontSize: 13 }}>{address}</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>
                {network?.chain?.name ? `Network: ${network.chain.name}` : ""}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13 }}>Connect your wallet to see claim</div>
          )}
        </div>

        <button
          onClick={handleClaim}
          disabled={loading || !address || !contract}
          style={{
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
            padding: "12px 18px",
            borderRadius: 8,
            cursor: loading || !address ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: 16,
          }}
        >
          {loading ? "Claiming..." : "Claim NFT"}
        </button>

        {msg && (
          <div style={{ marginTop: 14, color: msg.startsWith("Claim successful") ? "#7efc8d" : "#ff9b9b" }}>
            {msg}
          </div>
        )}
      </div>

      <div style={{ marginTop: 48, opacity: 0.6, fontSize: 12 }}>
        Contract: {contractAddress || "(not configured)"} • Token ID: {String(tokenId)}
      </div>
    </div>
  );
}
