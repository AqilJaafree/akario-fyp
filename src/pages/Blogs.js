import React, { useEffect, useState } from "react";

function Blogs() {
  const apiKey = "50a5acbeefe44f50bda54eee509fbdaa"; // Replace with your News API key
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNFTNews();
  }, []);

  async function fetchNFTNews() {
    const url = `https://newsapi.org/v2/everything?q=NFT&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        const fetchedArticles = data.articles;
        setArticles(fetchedArticles);
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return (
    <div>
      <h1>NFT Blog News</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>{article.source.name}</p>
          <p>{article.publishedAt}</p>
          <a href={article.url}>Read More</a>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Blogs;
