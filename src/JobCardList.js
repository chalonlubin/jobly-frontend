import JobCard from "./JobCard";

function JobCardList({ jobs }) {
  return (
    <div className="JobCardList">
      {jobs.map((j) => (
        <JobCard job={j} />
      ))}
    </div>
  );
}

export default JobCardList;
