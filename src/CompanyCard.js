import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`}>{company.name}</Link>
      <p>{company.description}</p>
      {company.logoUrl && <img src={company.logoUrl} alt={company.name} />}
    </div>
  );
}

export default CompanyCard;
