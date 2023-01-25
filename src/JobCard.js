import React from "react";
import "./JobCard.css";

/** Renders a single job card.
 *  Props:
 * - job: object with keys {id, title, salary, equity}
 * - company: string
 *
 * State: none
 *
 * JobList -> JobCard
 *
 * */
function Job({ job, company }) {
  //TODO: Add a link to the company page via company name.
  // TODO: CSS - style cards to be grouped in rows of 3 or 4?
  return (
    <div className="d-flex justify-content-center card-deck">
      <div className="Job card mx-3 my-3 col-md-3 col-sm-6 col-xs-12">
        <div className="card-body text-center">
          <div className="card-header">
            <h6>{job.title}</h6>
          </div>
          {company && <p className="text-uppercase">{company}</p>}
          {job.salary && <p>Salary: ${job.salary.toLocaleString()}</p>}
          <p>Equity: {`${(job.equity * 100).toFixed(1)}%`}</p>
        </div>
      </div>
    </div>
  );
}

export default Job;
