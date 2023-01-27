import React from "react";
import "./JobCard.css";

/** JobCard: Renders a single job card
 *
 * Props: job, company
 * State: none
 *
 * JobList -> JobCard
 * CompanyDetail -> JobCard
 **/
function Job({ job, company }) {
  //TODO: Add a link to the company page via company name.
  return (
    <div className="d-flex justify-content-center col-xs-12 col-sm-10 col-md-6 col-lg-4 ">
      <div className="Job card mx-3 my-3 col-md-3 col-sm-6 col-xs-12">
        <div className="card-body text-center">
          <h5>{job.title}</h5>
          {company && <p className="text-uppercase text-italic">{company}</p>}
          {job.salary && <p>Salary: ${job.salary.toLocaleString()}</p>}
          <p>Equity: {`${(job.equity * 100).toFixed(1)}%`}</p>
        </div>
      </div>
    </div>
  );
}

export default Job;
