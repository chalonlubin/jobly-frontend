function Job({ job }) {
  return (
    <div className="Job">
      <p>{job.title}</p>
      {job.salary && <p>{job.salary}</p>}
      <p>{job.equity}</p>
    </div>
  );
}

export default Job;
