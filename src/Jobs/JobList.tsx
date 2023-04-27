import { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchForm";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";
import TOAST_DEFAULTS from "../Helpers/toastSettings";
import { JobInterface } from "../Types/Interfaces";

/** JobList: Renders list of jobs
 *
 * Props: none
 * State: jobList, isLoading, query
 *
 * App ->  JobList -> JobCardList -> JobCard
 * App -> CompanyDetail -> JobCardList -> JobCard
 **/
function JobList(): JSX.Element {
  const [jobList, setJobList] = useState<JobInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  /** Fetches jobs when mounted from API, or when query has changed. */
  useEffect(
    function fetchJobsWhenMounted(): void {
      async function fetchJobs(): Promise<void> {
        try {
          setIsLoading(true);
          const jobsResult = await JoblyApi.getJobs(query);
          setJobList(jobsResult);
        } catch (e) {
          toast("❌ Database error", TOAST_DEFAULTS);
        } finally {
          setIsLoading(false);
        }
      }
      fetchJobs();
    },
    [query]
  );


  /** Search for jobs by title, setting job state with result. */
  function search(title: string): void {
    setQuery(title);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="JobList">
      <SearchForm searchFor={search} />
      <div className="row"></div>
      <JobCardList jobs={jobList} />
    </div>
  );
}

export default JobList;
