import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="NotFound d-flex flex-column align-items-center justify-content-center mt-5">
      <h3>Error 401: Unauthorized</h3>
      <h3>
        <Link to="/">Go Home</Link>
      </h3>
    </div>
  );
}

export default Unauthorized;
