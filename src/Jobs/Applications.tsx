import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "../Helpers/api";
import { UserStateInterface, ApplicationInterface, JobInterface } from "../Types/Interfaces"; // Make sure to import the appropriate interfaces
import UserContext from "../Users/userContext";

const AppliedJobs = () => {
  const { user } = useContext<UserStateInterface>(UserContext);
  const [userApplications, setUserApplications] = useState<ApplicationInterface[]>([]);

  useEffect(() => {
    const fetchUserApplications = async () => {
      const username = user.username;
      try {
        const applications = await JoblyApi.getUserApplications(username);

        // Map over the applications and fetch the job details for each application
        const populatedApplications = await Promise.all(
          applications.map(async (application) => {
            const job = await JoblyApi.getJobs(application:number); // Assuming jobId is the ID of the job the user applied to
            return {
              ...application,
              title: job.title,
              companyName: job.companyName,
              applied: job.applied,
            };
          })
        );

        setUserApplications(populatedApplications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserApplications();
  }, [user.username]);

  return (
    <div>
      <h2>Jobs Applied:</h2>
      <ul>
        {userApplications.map((application) => (
          <li key={application.jobId}>
            <p>Job Title: {application.title}</p>
            <p>Company: {application.companyName}</p>
            <p>Active: {application.applied}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
