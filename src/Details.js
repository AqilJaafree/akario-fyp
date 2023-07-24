import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { nftId, contractAddress } = useParams();
  const [nftDetails, setNftDetails] = useState(null);
  const [error, setError] = useState(null);

console.log("nftId:", nftId);
console.log("contractAddress:", contractAddress);
  useEffect(() => {
    async function fetchNftDetails() {
      const apiUrl = `https://api.opensea.io/v2/asset/${contractAddress}/${nftId}/`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "36bcfeb8b7b848dd9eec125683d47078",
        },
      };

    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error("Failed to fetch NFT details");
      }

      const data = await response.json();
      console.log("API Response:", data); 
      setNftDetails(data);
    } catch (err) {
      setError(err.message);
    }

    }

    fetchNftDetails();
  }, [nftId, contractAddress]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!nftDetails) {
    return <p>Loading NFT details...</p>;
  }

  return (
    <div>
      <h2>NFT Details</h2>
      <p>Name: {nftDetails.name}</p>
      <p>
        Ethereum Address:{" "}
        {nftDetails.asset_contract ? nftDetails.asset_contract.address : "N/A"}
      </p>
      <p>Token ID: {nftDetails.token_id}</p>
      {/* Add any additional details you want to display here */}
    </div>
  );
};

export default Details;
