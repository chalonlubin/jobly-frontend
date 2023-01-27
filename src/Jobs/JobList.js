import React, { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchForm";

/** JobList: Renders list of jobs
 *
 * Props: none
 * State: jobList, isLoading, query
 *
 * App -> JobList -> { JobCardList, SearchForm }
 **/
function JobList() {
  const [jobs, setJobs] = useState({
    jobList: [],
    isLoading: true,
    query: null,
  });

  useEffect(
    function fetchJobsWhenMounted() {
      async function fetchJobs() {
        const jobsResult = await JoblyApi.getJobs(jobs.query);
        setJobs((j) => ({
          ...j,
          jobList: jobsResult,
          isLoading: false,
        }));
      }
      fetchJobs();
    },
    [jobs.query]
  );

  // search for jobs by title
  function search(title) {
    setJobs((c) => ({ ...c, query: title }));
  }

  // add <Loading /> component
  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div className="JobList">
      <SearchForm search={search} />
      <div className="row"></div>
      <JobCardList from={"JobList"} jobs={jobs.jobList} search={search} />
    </div>
  );
}

export default JobList;
