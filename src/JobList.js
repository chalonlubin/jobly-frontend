import React, { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";

function JobList() {
  const [jobs, setJobs] = useState({
    jobList: [],
    isLoading: true,
    query: "",
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

  function search(name) {
    setJobs((c) => ({ ...c, query: name }));
  }

  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div className="JobList">
      <SearchForm search={search} />
      <JobCardList from={"JobList"} jobs={jobs.jobList} search={search} />
    </div>
  );
}

export default JobList;
