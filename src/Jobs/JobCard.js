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
    <div className="d-flex justify-content-center col-xs-12 col-sm-10 col-md-6 col-lg-6 ">
      <div className="Job card mx-4 my-4 col-md-3 col-sm-6 col-xs-12">
        <div className="card-body position-relative text-start">
          <h2 className="card-title fs-4 fw-bolder">{job.title}</h2>
          {company && (
            <p className="card-subtitle my-3 text-muted fs-5 ">{company}</p>
          )}
          {job.salary && (
            <p className="card-text font-monospace my-4">
              Salary: ${job.salary.toLocaleString()}
            </p>
          )}
          <p className="card-text font-monospace">
            Equity: {`${(job.equity * 100).toFixed(1)}%`}
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
