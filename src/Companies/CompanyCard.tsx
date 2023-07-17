import { Link } from "react-router-dom";
import { CompanyInterface } from "../Types/Interfaces";

interface CompanyPropsInterface {
  company: CompanyInterface;
}

/** CompanyCard: Renders a card for a company
 *
 * Props: company
 * State: none
 *
 * App -> RouteList -> CompanyList -> CompanyCard
 **/
function CompanyCard({ company }: CompanyPropsInterface): JSX.Element {
  return (
    <div className="d-flex justify-content-center card-deck">
      <div className="company-card card shadow my-3 py-1">
        <div className="card-body m-1 ">
          <div className="company-title fs-4">{company.name}</div>
          <div className="company-image float-sm-none float-md-end p-2">
          {company.logoUrl && (
            <img
              src={company.logoUrl}
              alt={company.name}
              width={140}
              height={100}
            />
          )}
          </div>
          <p className="company-describe text-sm-center text-md-start p-2">
            {company.description}
          </p>
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
