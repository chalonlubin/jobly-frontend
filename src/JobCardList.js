import JobCard from "./JobCard";

function JobCardList({ jobs, from }) {
  return (
    <div className="JobCardList">
      {jobs.map((j) => {
        const company = from === "JobList" ? j.companyName : null;
        return <JobCard company={company} key={j.id} job={j} />;
      })}
    </div>
  );
}

export default JobCardList;
