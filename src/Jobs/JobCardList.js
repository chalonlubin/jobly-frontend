import JobCard from "./JobCard";

/** Renders a list of JobCards.
 * Props:
 * - jobs: array of job objects
 * - from: string, either "JobList" or "CompanyDetail"
 *
 * State: none
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 * */
function JobCardList({ jobs, from }) {
  return (
    //TODO: Add no jobs found matching that search if no jobs are found.
    <div className="JobCardList row">
      {jobs.map((j) => {
        const company = from === "JobList" ? j.companyName : null;
        return <JobCard company={company} key={j.id} job={j} />;
      })}
    </div>
  );
}

export default JobCardList;
