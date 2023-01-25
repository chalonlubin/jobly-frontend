import React, { useState } from "react";
import JobCardList from "./JobCardList";

const SAMPLE_COMPANY_WITH_JOBS = {
  handle: "mejia-scott-ryan",
  name: "Mejia, Scott and Ryan",
  description:
    "General traditional late situation discussion dog. Before best up strategy about direction.",
  numEmployees: null,
  logoUrl: "/logos/logo4.png",
  jobs: [
    {
      id: 28,
      title: "Research officer, government",
      salary: 167000,
      equity: "0",
    },
    {
      id: 33,
      title: "Museum/gallery conservator",
      salary: 82000,
      equity: "0",
    },
    {
      id: 44,
      title: "Therapist, occupational",
      salary: 82000,
      equity: null,
    },
  ],
};

function CompanyDetail() {
  return (
    <div className="CompanyDetail">
      <JobCardList jobs={SAMPLE_COMPANY_WITH_JOBS.jobs} />
    </div>
  );
}

export default CompanyDetail;
