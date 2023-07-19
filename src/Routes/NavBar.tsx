import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../Users/userContext";

/** NavBar: Navigation bar for site
 *
 * Props: logout (fn)
 * State: n/a
 *
 * Routelist -> Navbar
 **/
function Navbar({ logout, guestLogin }: any): JSX.Element {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-md bg-white">
      <div className="container-fluid">
        <NavLink className="logo navbar-brand" to="/">
          Jobly.
        </NavLink>
        <button
          className="navbar-toggler border shadow-sm"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-black"></span>
        </button>
        <div
          className="navbar-items collapse navbar-collapse "
          id="navbarTogglerDemo02"
        >
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
                    Log Out
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={guestLogin} to="/">
                    Guest Access
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signUp">
                    Sign Up
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

export default Navbar;
