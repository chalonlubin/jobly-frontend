import { Link } from "react-router-dom";
import "./CompanyCard.css";


/** Renders a card for a company.
 *
 * Props:
 * - company: object with keys {handle, name, description, logoUrl}
 *
 * State: none
 *
 * CompanyList -> CompanyCard
 *
 * */
function CompanyCard({ company }) {
  return (
    <div className="d-flex justify-content-center card-deck">
      <div className="CompanyCard card mx-3 my-3">
        <div className="card-body text-center">
          <div className="card-header">
            <h5>{company.name}</h5>
          </div>
          <p>{company.description}</p>
          {company.logoUrl && (
            <img
              className="d-none d-sm-block mx-auto"
              src={company.logoUrl}
              alt={company.name}
            />
          )}
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
