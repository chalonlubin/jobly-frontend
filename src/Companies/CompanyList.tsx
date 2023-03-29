import { useState, useEffect } from "react";
import { CompanyInterface } from "../Types/Interfaces"
import CompanyCard from "./CompanyCard";
import SearchForm from "../Common/SearchForm";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";
import "./CompanyList.css";


/** CompanyList: Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * Props: none
 * State: companyList, isLoading, query
 *
 * App -> RouteList -> { CompanyList, SearchForm }
 **/
function CompanyList(): JSX.Element {
  const [companies, setCompanies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function getCompaniesOnMount(): void {
    searchFor();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function searchFor(name?: string): Promise<void> {
    setIsLoading(true);
    const result = await JoblyApi.getCompanies(name ? name : undefined);
    setCompanies(result);
    setIsLoading(false);
  }

  if (isLoading || !companies) return <Loader />;

  return (
    <div className="CompanyList">
      <SearchForm searchFor={searchFor} />
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
