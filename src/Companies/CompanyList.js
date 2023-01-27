import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "../Common/SearchForm";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";
import TOAST_DEFAULTS  from "../Helpers/toastSettings";
import "./CompanyList.css";

/** CompanyList: Renders list of companies
 *
 * Props: none
 * State: companyList, isLoading, query
 *
 * App -> RouteList -> CompanyList
 **/
function CompanyList() {
  const [companies, setCompanies] = useState({
    companyList: [],
    isLoading: true,
    query: null,
  });

  useEffect(
    function fetchCompaniesWhenMounted() {
      async function fetchCompanies() {
        try {
          const companiesResult = await JoblyApi.getCompanies(companies.query);
          setCompanies((c) => ({
            ...c,
            companyList: companiesResult,
            isLoading: false,
          }));
        } catch (e) {
          // maybe do something else
          console.error(e);
        }
      }
      fetchCompanies();
    },
    [companies.query]
  );

  /** Search for companies by name */
  function search(name) {
    setCompanies((c) => ({ ...c, query: name }));
  }

  if (companies.isLoading) return <Loader />;

  return (
    <div className="CompanyList">
      <SearchForm search={search} />
      <div className="CompanyList-empty col-md-12 text-center mt-5 fs-2">
        {companies.companyList.length === 0 ? (
          <h4 className="m-3 p-3">Sorry, no results were found!</h4>
        ) : (
          <>
            <h4 className="m-3 p-3">
              Select a company to see current job offerings.
            </h4>
            {companies.companyList.map((c) => (
              <CompanyCard key={c.handle} company={c} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CompanyList;
