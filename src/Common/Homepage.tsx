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
            <h1 className="hero-c2a">Find your dream job with Jobly.</h1>
            <p className="py-1 fw-semibold">
              Accelerate your job search, where applying is the easiest part of
              the journey.
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
            <h3 className="p-3 m-3">Welcome back, {user.firstName}!</h3>
            <div className="d-flex justify-content-evenly">
              <Link
                className="btn btn-outline-light btn-lg opacity-75 m-4"
                to="/companies"
              >
                Companies
              </Link>
              <Link
                className="btn btn-outline-light btn-lg opacity-75 m-4"
                to="/jobs"
              >
                Jobs
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
