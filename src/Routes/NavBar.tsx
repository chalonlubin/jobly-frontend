import { useContext } from "react";
import UserContext from "../Users/userContext";

import { NavLink } from "react-router-dom";


/** NavBar: Navigation bar for site
 *
 * Props: logout (fn)
 * State: n/a
 *
 * Routelist -> NavBar
 **/
function NavBar({ logout }: any): JSX.Element{
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="logo512.png"
            alt="jobs icon"
            className="d-inline-block m-2"
            width="30"
            height="24"
          ></img>
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/companies">
                    Companies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobs">
                    Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" onClick={logout} to="/">
                    Log Out {user.username}
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signUp">
                    signUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
