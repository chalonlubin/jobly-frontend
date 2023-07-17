import { Link } from "react-router-dom";
import UserContext from "../Users/userContext";
import { useContext } from "react";

/** Homepage: Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Props: none
 * State: none
 *
 * App -> RouteList -> Homepage
 **/
function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <section className="hero center" style={{ height: "92.5vh" }}>
      <div className="p-2 d-flex-column">
        {!user && (
          <>
            <div className="btn btn-white btn-sm bg-white mb-3 text-success disabled">
              Build your future with us.
            </div>
            <h1 className="hero-c2a">Land your dream job with Jobly.</h1>
            <p className="py-1 fw-semibold">
              Accelerate your job search with Jobly. We take the pain out of
              applications.
            </p>
            <div className="d-flex gap-3 mt-4 justify-content-between">
              <Link className="btn btn-light btn-lg" to="/jobs">
                Explore Jobs
              </Link>
            </div>
            <div className="d-flex gap-3 mt-4 justify-content-evenly"></div>
          </>
        )}
        {user && (
          <>
            <div className="btn btn-white btn-sm bg-white mb-3 text-success disabled">
              Build your future with us.
            </div>
            <h3 className="hero-c2a">Welcome back, <br/> {user.firstName}!</h3>
            <div className="d-flex gap-3 mt-4 justify-content-between">
              <Link className="btn btn-light btn-lg" to="/jobs">
                The Search Continues!
              </Link>
            </div>
          </>
        )}
      </div>
      {/* <div>Photo here!</div> */}
    </section>
  );
}

export default Homepage;
