import { useState, useEffect } from "react";
import Job from "./JobCard";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchBar";
import Loader from "../Common/Loader";
import { JobInterface } from "../Types/Interfaces";

/** JobList: Renders entire list of jobs
 *
 * Props: none
 * State: jobs, query, page
 *
 * App -> { JobList, CompanyDetail } -> JobCardList -> JobCard
 **/
function JobList(): JSX.Element {
  const [jobs, setJobList] = useState<JobInterface[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 50;

  useEffect(
    function searchFor(): void {
      async function fetchJobs(): Promise<void> {
        const result = await JoblyApi.getJobs(query);
        setJobList(result);
      }
      fetchJobs();
    },
    [query]
  );

  function search(title: string): void {
    setQuery(title);
    setPage(1);
  }

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  if (!jobs) return <Loader />;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const displayedJobs = jobs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="container">
      <SearchForm searchFor={search} />
      <>
        {displayedJobs.length === 0 ? (
          <h2 className="heading-minor center">
            Sorry, no results were found....
          </h2>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="container mx-auto">
              <h2 className="heading-minor center p-3 m-3">
                Apply with the click of a button!
              </h2>
              <div className="row">
                {displayedJobs.map((c: JobInterface) => (
                  <div key={c.id} className="col-md-12 col-lg-6">
                    <Job job={c} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn btn${
                      i + 1 === page ? "-success" : "-outline-success"
                    } m-1`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default JobList;
