import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
      <span style={{ color: "white" }}> | </span>
      <NavLink
        to="/summaries"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Summary
      </NavLink>
      <span style={{ color: "white" }}> | </span>
      <NavLink
        to="/list"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        List
      </NavLink>
    </nav>
  );
};

export default Nav;
