import { useState, useEffect } from "react";
import { CompanyInterface } from "../Types/Interfaces";
import CompanyCard from "./CompanyCard";
import SearchForm from "../Common/SearchForm";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";
import "./CompanyList.css";

function CompanyList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyInterface[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(
    function searchFor(): void {
      async function fetchCompanies(): Promise<void> {
        const result = await JoblyApi.getCompanies(query || undefined);
        setCompanies(result);
      }
      fetchCompanies();
    },
    [query]
  );

  function search(name: string): void {
    setQuery(name);
  }

  if (!companies) return <Loader />;

  return (
    <div className="CompanyList">
      <SearchForm searchFor={search} />
      <div className="CompanyList-empty col-md-12 text-center mt-2 fs-2">
        {companies.length === 0 ? (
          <h4 className="m-3 p-3">Sorry, no results were found!</h4>
        ) : (
          <>
            <h4 className="m-3 p-3">
              Select a company to see current job offerings.
            </h4>
            {companies.map((c: CompanyInterface) => (
              <CompanyCard key={c.handle} company={c} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CompanyList;





