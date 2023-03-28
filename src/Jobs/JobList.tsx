import React, { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchForm";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";
import TOAST_DEFAULTS from "../Helpers/toastSettings";

interface Job {
  id: number;
  title: string;
  salary: number;
  equity: number;
  companyHandle: string;
  companyName: string;
}

interface JobListStateInterface {
  jobList: Job[];
  isLoading: boolean;
  query: string | undefined;
}

/** JobList: Renders list of jobs
 *
 * Props: none
 * State: jobList, isLoading, query
 *
 * App -> JobList -> { JobCardList, SearchForm }
 **/
function JobList(): JSX.Element {
  const [jobs, setJobs] = useState<JobListStateInterface>({
    jobList: [],
    isLoading: true,
    query: "",
  });

  /** Fetches jobs when mounted from API, or when query has changed. */
  useEffect(
    function fetchJobsWhenMounted(): void {
      async function fetchJobs(): Promise<void> {
        try {
          const jobsResult = await JoblyApi.getJobs(jobs.query);
          setJobs((j) => ({
            ...j,
            jobList: jobsResult,
            isLoading: false,
          }));
        } catch (e) {
          toast("❌ Database error", TOAST_DEFAULTS);
        }
      }
      fetchJobs();
    },
    [jobs.query]
  );

  /** Search for jobs by title, setting job state with result. */
  function search(title: string): void {
    setJobs((c) => ({ ...c, query: title }));
  }

  if (jobs.isLoading) return <Loader />;

  return (
    <div className="JobList">
      <SearchForm searchFor={search} />
      <div className="row"></div>
      <JobCardList from={"JobList"} jobs={jobs.jobList} />
    </div>
  );
}

export default JobList;
