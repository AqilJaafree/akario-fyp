import React, { useEffect, useState } from "react";
import axios from "axios";

function NFTDisplay() {
  const [nftData, setNftData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // Check if MetaMask is available
        if (window.ethereum) {
          // Request MetaMask to enable the current dApp to access accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Retrieve the selected wallet address from MetaMask
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          const walletAddress = accounts[0];

          // Fetch NFTs for the wallet address on OpenSea
          const response = await axios.get(
            `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20`
          );
          const { assets } = response.data;
          setNftData(assets);

          // If no NFTs found
          if (assets.length === 0) {
            setErrorMessage("No NFTs found in your MetaMask wallet.");
          }
        } else {
          setErrorMessage("MetaMask not detected");
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setErrorMessage("Error fetching NFTs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h2>My NFTs</h2>
      {isLoading ? (
        <p>Loading NFTs...</p>
      ) : nftData.length === 0 ? (
        <p>{errorMessage}</p>
      ) : (
        nftData.map((nft) => (
          <div key={nft.id}>
            <img src={nft.image_url} alt={nft.name} />
            <p>Name: {nft.name}</p>
            <p>Description: {nft.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default NFTDisplay;
