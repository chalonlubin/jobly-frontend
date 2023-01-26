import React from "react";
import { NavLink } from "react-router-dom";

/** Renders the navbar.
 *
 * Props: none
 *
 * State: none
 *
 * App -> NavBar
 *
 * */
function NavBar() {
  //TODO: Add light/dark mode.
  // Will require state so I wanted to touch base with you first
  return (
    <nav className="navbar fixed navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid fs-5">
        <NavLink className="navbar-brand" to="/">
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mx-auto">
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
            <NavLink className="nav-link" to="/jobs">
              Jobs
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
