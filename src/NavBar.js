import React from "react";
import { NavLink } from "react-router-dom";


function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
            <NavLink className="nav-link" to="/jobs">
              Jobs
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;