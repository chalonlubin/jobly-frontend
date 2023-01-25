import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(
    function fetchCompanyWhenMounted() {
      async function fetchCompany() {
        const companyResult = await JoblyApi.getCompany(handle);
        setCompany((c) => ({
          ...c,
          data: companyResult,
          isLoading: false,
        }));
      }
      fetchCompany();
    },
    [handle]
  );

  if (company.isLoading) return <i>Loading...</i>;

  console.log(company);

  return (
    <div className="CompanyDetail">
      <p>{company.data.name}</p>
      <p>{company.data.description}</p>
      <JobCardList from={CompanyDetail} jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetail;
