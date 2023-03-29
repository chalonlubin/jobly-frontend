import { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchForm";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";
import TOAST_DEFAULTS from "../Helpers/toastSettings";
import { JobStateInterface } from "../Types/Interfaces";

/** JobList: Renders list of jobs
 *
 * Props: none
 * State: jobList, isLoading, query
 *
 * App ->  JobList -> JobCardList -> JobCard
 * App -> CompanyDetail -> JobCardList -> JobCard
 **/
function JobList(): JSX.Element {
  const [jobs, setJobs] = useState<JobStateInterface>({
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
      <JobCardList jobs={jobs.jobList} />
    </div>
  );
}

export default JobList;
