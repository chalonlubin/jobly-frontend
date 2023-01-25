function Job({ job, company }) {
  return (
    <div className="Job">
      <p>{job.title}</p>
      {company && <p>{company}</p>}
      {job.salary && <p>{job.salary}</p>}
      <p>{job.equity}</p>
    </div>
  );
}

export default Job;
