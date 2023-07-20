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
    <section className="hero container center">
      <div className="p-2 d-flex-column">
        <div className="btn btn-outline-success bg-white btn-sm mb-3 text-success fw-bold disabled">
          Let's build your future together 🚀
        </div>
        {!user && (
          <>
            <h1 className="hero-c2a">Land the job of your dreams with Jobly.</h1>
            <p className="py-1 fw-semibold">
              Accelerate your search with one-click applications, pay transparency, and much more.
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
            <h3 className="hero-c2a">
              Welcome Back, <br /> {user.firstName} {user.lastName}!
            </h3>
            <div className="d-flex gap-3 mt-4 justify-content-between">
              <Link className="btn btn-light btn-lg fw-bold" to="/jobs">
              Continue the search 🙌
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
