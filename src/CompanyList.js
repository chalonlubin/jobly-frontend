import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

/** CompanyList component renders a list of companies.
 *
 * Props:
 * - None
 *
 * State:
 * - companies: object with keys {
 *     companyList: array of company objects,
 *     isLoading: boolean,
 *     query: string
 * }
 *
 * App -> CompanyList -> CompanyCard
 *
 * */
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

  // search for companies by name
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
