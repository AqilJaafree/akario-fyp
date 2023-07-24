import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import { Link, Route, Routes, Router } from "react-router-dom";
import Details from "./Details";


export default function NavBar() {
  return (
    <nav className="nav">
      <a href="/" className="site-name">
        Akario
      </a>
      <ul>
        <li>
          <a href="/Blogs">Blogs</a>
        </li>
        <li>
          <a href="/About">Listings</a>
        </li>
        <li>
          <a href="/Contact">Contact</a>
        </li>
       
      </ul>
    </nav>
  );
   return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <div className="App">
          {/* Your existing content in App.js */}
        </div>
      </div>
    </Router>
  );
}


