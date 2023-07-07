import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
// import { AiOutlineShoppingCart } from "react-icons/ai";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(true);
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> CELLPHONES </Link>
          </span>
        </div>
        <div className="search-form">
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search for..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch className="icon-search" />
          </form>
        </div>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
