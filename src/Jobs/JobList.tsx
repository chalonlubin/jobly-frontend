import { useState, useEffect } from "react";
import Job from "./JobCard";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchBar";
import Loader from "../Common/Loader";
import { JobInterface } from "../Types/Interfaces";

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
    <div className="JobList">
      <SearchForm searchFor={search} />
      <>
        {displayedJobs.length === 0 ? (
          <h4 className="m-3 p-2">Sorry, no results were found!</h4>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="container mx-auto">
              <h4 className="m-3 p-3 text-center">
                Select a company to see current job offerings.
              </h4>
              <div className="row">
                {displayedJobs.map((c: JobInterface) => (
                  <div key={c.id} className="col-12 col-md-6 col-lg-4">
                    <Job job={c} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn btn${
                      i + 1 === page ? "-primary" : "-secondary"
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
