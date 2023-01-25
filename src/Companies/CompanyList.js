import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "../Common/SearchForm";
import JoblyApi from "../Helpers/api";

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
    query: null,
  });

  useEffect(
    function fetchCompaniesWhenMounted() {
      async function fetchCompanies() {
        //TODO: Try/catch in all api calls
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

  // TODO: consider making <Loading />
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
