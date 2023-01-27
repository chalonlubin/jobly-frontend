import JobCard from "./JobCard";

/** JobCardList: Renders a list of JobCards
 *
 * Props: jobs, from
 * State: none
 *
 * App -> { JobList, CompanyDetail } -> JobCardList -> JobCard
 **/
function JobCardList({ jobs, from }) {
  return (
    <div className="JobCardList row">
      {jobs.length === 0 ? (
        <p style={{ color: "white" }}>Sorry, no results were found!</p>
      ) : (
        jobs.map((j) => {
          const company = from === "JobList" ? j.companyName : null;
          return <JobCard company={company} key={j.id} job={j} />;
        })
      )}
    </div>
  );
}

export default JobCardList;
