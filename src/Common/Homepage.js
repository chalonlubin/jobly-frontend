import "./Homepage.css";
import { Link } from "react-router-dom";
import userContext from "../Users/userContext";
import { useContext } from "react";

/** Renders the homepage.
 *
 * Props: none
 *
 * State: none
 *
 * App -> Homepage
 *
 * */
function Homepage() {
  const { user } = useContext(userContext);

  return (
    <section className="Homepage">
      <div className="Homepage-content">
        <h1 className="Homepage-title"> Jobly </h1>
        <h2 className="Homepage-subtitle"> Not your average job finder. </h2>
        {!user && (
          <div className="signuplogin d-flex justify-content-evenly">
            <Link className="btn btn-outline-light opacity-75 m-4" to="/login">
              Log in
            </Link>
            <Link className="btn btn-outline-light opacity-75 m-4" to="/signup">
              Sign up
            </Link>
          </div>
        )}
        {user && <p>Welcome back, {user.username}!</p>}
      </div>
    </section>
  );
}

export default Homepage;
