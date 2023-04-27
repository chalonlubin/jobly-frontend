import JobCard from "./JobCard";
import { JobsInterface } from "../Types/Interfaces";


/** JobCardList: Renders a list of JobCards
 *
 * Props: jobs, from
 * State: none
 *
 * App -> { JobList, CompanyDetail } -> JobCardList -> JobCard
 **/
function JobCardList({ jobs }: JobsInterface ): JSX.Element{

  return (
    <div className="JobCardList row">
      {jobs.length === 0 ? (
        <div className="JobCardList-empty col-md-12 text-center mt-5 fs-2">
          <h4 className="m-3 p-3">Sorry, no results were found!</h4>
        </div>
      ) : (
        jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })
      )}
    </div>
  );
}

export default JobCardList;
