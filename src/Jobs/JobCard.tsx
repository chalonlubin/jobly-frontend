import "./JobCard.css";
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


        <div className="Job card shadow-sm mx-4 my-4">
          <div className="card-body position-relative">
            <h2 className="card-title fs-5 fw-bold">{title}</h2>
            {companyName && (
              <p className="card-subtitle mb-3 text-muted fs-6">{companyName}</p>
            )}
            <div className="d-flex justify-content-between">
              {salary && (
                <p className="card-text">
                  Salary: ${salary.toLocaleString()}
                </p>
              )}
              <p className="card-text">
                Equity: {`${(Number(equity) * 100).toFixed(1)}%`}
              </p>
            </div>
            {hasAppliedToJob(id) ? (
              <button
                className="btn btn-sm btn-outline-success position-absolute bottom-0 end-0 m-3"
                disabled
              >
                Applied
              </button>
            ) : (
              <button
                className="btn btn-sm btn-danger position-absolute bottom-0 end-0 m-3"
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
