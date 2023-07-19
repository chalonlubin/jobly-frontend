import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "../Jobs/JobCardList";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";
import { CompanyInterface } from "../Types/Interfaces";

/** CompanyDetail: Renders company details and jobs
 *
 * Props: none
 * State: company, isLoading
 *
 * App -> RouteList -> CompanyDetail
 **/
function CompanyDetail(): JSX.Element {
  const { handle } = useParams<{ handle: string }>();

  const [company, setCompany] = useState<{
    data: CompanyInterface;
    isLoading: boolean;
  }>({
    data: {
      handle: "",
      name: "",
      description: "",
      numEmployees: 0,
      logoUrl: null,
      jobs: [],
    },
    isLoading: true,
  });

  useEffect(
    function fetchCompanyWhenMounted() {
      async function fetchCompany(): Promise<void> {
        const companyResult = await JoblyApi.getCompany(handle ?? "");
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

  if (company.isLoading) return <Loader />;

  return (
    <div className="container">
      <h2 className="company-title text-center p-2 m-2">{company.data.name}</h2>
      <p className="m-2 p-2 text-center">
        <em>{company.data.description}</em>
      </p>
      <JobCardList jobs={company.data.jobs ?? []} />
    </div>
  );
}

export default CompanyDetail;
