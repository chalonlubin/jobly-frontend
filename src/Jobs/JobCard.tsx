import { JobPropsInterface } from "../Types/Interfaces";
import { useContext } from "react";
import UserContext from "../Users/userContext";

/** JobCard: Renders a single job card
 *
 * Props: job, company
 * State: none
 *
 * JobList -> JobCard
 * CompanyDetail -> JobCard
 **/
function Job({ job }: JobPropsInterface): JSX.Element {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  const { id, title, salary, equity, companyName } = job;

  return (
    <div className="job-card card shadow my-3 py-1">
      <div className="card-body">
        <h2 className="job-title card-title fs-4">{title}</h2>
        {companyName && (
          <p className="job-subtitle card-subtitle pb-4">{companyName}</p>
        )}
        <div className="d-flex justify-content-between">
          {salary && (
            <p className="card-text">Salary: ${salary.toLocaleString()}</p>
          )}
          <p className="card-text">
            Equity: {`${(Number(equity) * 100).toFixed(1)}%`}
          </p>
        </div>
        {hasAppliedToJob(id) ? (
          <button
            className="btn btn-sm btn-success position-absolute top-0 end-0 m-3"
            disabled
          >
            Applied
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-3 "
            onClick={() => applyToJob(id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default Job;
