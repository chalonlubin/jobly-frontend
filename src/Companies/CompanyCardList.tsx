import { useState, useEffect } from "react";
import { CompanyInterface } from "../Types/Interfaces";
import CompanyCard from "./CompanyCard";
import SearchForm from "../Common/SearchBar";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";


function CompanyList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyInterface[]>([]);
  const [query, setQuery] = useState<string>(" ");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(
    function searchFor(): void {
      async function fetchCompanies(): Promise<void> {
        const result = await JoblyApi.getCompanies(query);
        setCompanies(result);
      }
      fetchCompanies();
    },
    [query]
  );

  function search(name: string): void {
    setQuery(name);
    setPage(1);
  }

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  if (!companies) return <Loader />;

  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const displayedCompanies = companies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="company-list">
      <SearchForm searchFor={search} />
      <div className="col-md-12 text-center mt-2 fs-2">
        {displayedCompanies.length === 0 ? (
          <div className="heading-minor">Sorry, no results were found!</div>
        ) : (
          <>
            <div className="heading-minor">
              Select a company to see current job offerings.
            </div>
            {displayedCompanies.map((c: CompanyInterface) => (
              <CompanyCard key={c.handle} company={c} />
            ))}
            <div className="mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`btn btn${i + 1 === page ? "-primary" : "-secondary"} m-1`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )};

export default CompanyList;





