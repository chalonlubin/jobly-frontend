function CompanyCard({ company }) {
  return (
    <div className="CompanyCard">
      <p>{company.name}</p>
      <p>{company.description}</p>
      {company.logoUrl && <img src={company.logoUrl} alt={company.name} />}
    </div>
  );
}

export default CompanyCard;
