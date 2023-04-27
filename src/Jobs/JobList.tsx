import { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "../Helpers/api";
import SearchForm from "../Common/SearchForm";
import Loader from "../Common/Loader";
import { JobInterface } from "../Types/Interfaces";

function JobList(): JSX.Element {
  const [jobList, setJobList] = useState<JobInterface[]>([]);
  const [query, setQuery] = useState<string>("");

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
  }

  if (!jobList) return <Loader />;

  return (
    <div className="JobList">
      <SearchForm searchFor={search} />
      <div className="row"></div>
      <JobCardList jobs={jobList} />
    </div>
  );
}

export default JobList;


