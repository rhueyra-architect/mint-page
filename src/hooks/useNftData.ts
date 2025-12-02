"use client";

import { useState, useEffect } from "react";
import { ThirdwebContract } from "thirdweb";
import { isERC1155 } from "thirdweb/extensions/erc1155";
import { isERC721 } from "thirdweb/extensions/erc721";
import { getERC20Info } from "@/lib/erc20";
import { getERC721Info } from "@/lib/erc721";
import { getERC1155Info } from "@/lib/erc1155";
import { contract } from "@/lib/constants";

type NftData = {
  displayName: string;
  description: string;
  pricePerToken: number | null;
  contractImage: string;
  currencySymbol: string;
  isERC1155: boolean;
  isERC721: boolean;
  ercType: "ERC20" | "ERC721" | "ERC1155";
};

type UseNftDataReturn = {
  data: NftData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Small typed shape for information returned by the helper functions.
 * All fields are optional because different ERC helpers may return slightly
 * different structures. We then use fallbacks when building the NftData.
 */
type ContractInfo = {
  displayName?: string;
  description?: string;
  pricePerToken?: number | null;
  contractImage?: string;
  currencySymbol?: string;
};

export function useNftData(): UseNftDataReturn {
  const [data, setData] = useState<NftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine ERC type
      const [isErc721, isErc1155] = await Promise.all([
        isERC721({ contract }).catch(() => false),
        isERC1155({ contract }).catch(() => false),
      ]);

      const ercType: "ERC20" | "ERC721" | "ERC1155" = isErc1155
        ? "ERC1155"
        : isErc721
        ? "ERC721"
        : "ERC20";

      // Fetch contract information based on ERC type
      let info: ContractInfo | null = null;
      switch (ercType) {
        case "ERC20":
          info = (await getERC20Info(contract)) as ContractInfo;
          break;
        case "ERC721":
          info = (await getERC721Info(contract)) as ContractInfo;
          break;
        case "ERC1155":
          info = (await getERC1155Info(contract)) as ContractInfo;
          break;
        default:
          throw new Error("Unknown ERC type.");
      }

      if (!info) {
        throw new Error("Failed to fetch NFT details.");
      }

      setData({
        displayName: info.displayName || "",
        description: info.description || "",
        pricePerToken:
          typeof info.pricePerToken === "number" ? info.pricePerToken : 0,
        contractImage: info.contractImage || "",
        currencySymbol: info.currencySymbol || "",
        isERC1155: ercType === "ERC1155",
        isERC721: ercType === "ERC721",
        ercType,
      });
    } catch (err) {
      console.error("Error fetching NFT data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch NFT data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
