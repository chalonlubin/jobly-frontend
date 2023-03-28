import "./JobCard.css";
import { JobPropsInterface } from "../Interfaces/AppInterfaces";

/** JobCard: Renders a single job card
 *
 * Props: job, company
 * State: none
 *
 * JobList -> JobCard
 * CompanyDetail -> JobCard
 **/
function Job({job}: JobPropsInterface): JSX.Element {

  const { title, salary, equity, companyName } = job;

  return (
    <div className="d-flex justify-content-center col-xs-12 col-sm-10 col-md-6 col-lg-6 ">
      <div className="Job card mx-4 my-4 col-md-3 col-sm-6 col-xs-12">
        <div className="card-body position-relative text-start">
          <h2 className="card-title fs-4 fw-bolder">{title}</h2>
          {companyName && (
            <p className="card-subtitle my-3 text-muted fs-5 ">{companyName}</p>
          )}
          {salary && (
            <p className="card-text font-monospace my-4">
              Salary: ${salary.toLocaleString()}
            </p>
          )}
          <p className="card-text font-monospace">
            Equity: {`${(Number(equity) * 100).toFixed(1)}%`}
          </p>
          {/* For applications later, we can toggle with two images */}
          {/* <img
            src="/apply.png"
            alt="apply"
            className="Job-icon m-3 position-absolute bottom-0 end-0"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Job;