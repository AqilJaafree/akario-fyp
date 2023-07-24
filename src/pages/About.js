import React, { useState, useEffect } from "react";

function About() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nftData, setNftData] = useState({
    openSeaData: null,
    magicEdenData: null,
  });

  useEffect(() => {
    const fetchNftListings = async () => {
      setLoading(true);
      setError("");

      try {
        // OpenSea API
        const openSeaHeaders = new Headers();
        openSeaHeaders.append("X-API-KEY", "36bcfeb8b7b848dd9eec125683d47078");

        const openSeaRequestOptions = {
          method: "GET",
          headers: openSeaHeaders,
          redirect: "follow",
        };

        const openSeaResponse = await fetch(
          `https://api.opensea.io/v2/orders/ethereum/seaport/listings?order_by=created_date&order_direction=desc`,
          openSeaRequestOptions
        );

        const openSeaData = await openSeaResponse.json();
        console.log("OpenSea Data:", openSeaData);

        // Magic Eden API
        const magicEdenUrl =
          "https://api-mainnet.magiceden.dev/v2/collections/symbol/listings";
        const magicEdenOptions = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const magicEdenResponse = await fetch(magicEdenUrl, magicEdenOptions);
        const magicEdenData = await magicEdenResponse.json();
        console.log("Magic Eden Data:", magicEdenData);

        // Store the fetched NFT data from both APIs in the state
        setNftData({ openSeaData, magicEdenData });
      } catch (error) {
        setError("An error occurred while fetching NFT data");
      }

      setLoading(false);
    };

    fetchNftListings(); // Fetch NFT listings on page refresh
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="App">
      <header className="App-header">
        {/* Display NFT Data */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <h2>Recent NFT Listings</h2>
            {/* Display OpenSea NFTs */}
            {nftData.openSeaData && nftData.openSeaData.orders.length > 0 ? (
              <div>
                <h3>OpenSea Listings</h3>
                {nftData.openSeaData.orders.map((order) => (
                  <div key={order.order_hash}>
                    <h4>NFT Name: {order.maker_asset_bundle.assets[0].name}</h4>
                    <p>
                      Minted Date:{" "}
                      {order.maker_asset_bundle.assets[0].created_date}
                    </p>
                    {/* Display other order details as needed */}
                    {order.maker && (
                      <div>
                        <h5>Maker Details</h5>
                        <p>Ethereum Address: {order.maker.address}</p>
                        {/* Display other maker details as needed */}
                      </div>
                    )}
                    {order.maker_asset_bundle &&
                      order.maker_asset_bundle.assets.length > 0 && (
                        <div>
                          <h5>Assets</h5>
                          {order.maker_asset_bundle.assets.map((asset) => (
                            <div key={asset.token}>
                              <p>Token: {asset.token}</p>
                              <img src={asset.image_url} alt={asset.name} />
                              {/* Display other asset details as needed */}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No OpenSea NFTs found</p>
            )}

            {/* Display Magic Eden NFTs */}
            {nftData.magicEdenData && nftData.magicEdenData.length > 0 ? (
              <div>
                <h3>Magic Eden Listings</h3>
                {nftData.magicEdenData.map((listing) => (
                  <div key={listing.id}>
                    <h4>NFT Name: {listing.name}</h4>
                    {/* Display other listing details as needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p>No Magic Eden NFTs found</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default About;
