import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/">
          <strong>Home</strong>
        </Link>
        <span style={{ color: "white" }}>|</span>
        <Link to="/summaries">
          <strong>Summary</strong>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
