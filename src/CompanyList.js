import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

function CompanyList() {
  const [companies, setCompanies] = useState({
    companyList: [],
    isLoading: true,
    query: "",
  });

  useEffect(
    function fetchCompaniesWhenMounted() {
      async function fetchCompanies() {
        const companiesResult = await JoblyApi.getCompanies(companies.query);
        setCompanies((c) => ({
          ...c,
          companyList: companiesResult,
          isLoading: false,
        }));
      }
      fetchCompanies();
    },
    [companies.query]
  );

  function search(name) {
    setCompanies((c) => ({ ...c, query: name }));
  }

  if (companies.isLoading) return <i>Loading...</i>;

  return (
    <div className="CompanyList">
      <SearchForm search={search} />
      {companies.companyList.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;
