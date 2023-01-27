import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** CompanyCard: Renders a card for a company
 *
 * Props: company
 * State: none
 *
 * App -> RouteList -> CompanyList -> CompanyCard
 **/
function CompanyCard({ company }) {
  return (
    <div className="d-flex justify-content-center card-deck">
      <div className="CompanyCard card mx-3 my-3">
        <div className="card-body mx-2">
            <h5>{company.name}</h5>
          {company.logoUrl && (
            <img
              className="float-end ms-5"
              src={company.logoUrl}
              alt={company.name}
            />
          )}
          <p className="fs-5 text-muted">{company.description}</p>
          <Link
            className="stretched-link"
            to={`/companies/${company.handle}`}
          ></Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
