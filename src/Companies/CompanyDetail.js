import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "../Jobs/JobCardList";
import JoblyApi from "../Helpers/api";
import Loader from "../Common/Loader";

/** CompanyDetail: Renders company details and jobs
 *
 * Props: none
 * State: company, isLoading
 *
 * App -> RouteList -> CompanyDetail
 **/
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

  if (company.isLoading) return <Loader />;

  return (
    <div className="CompanyDetail">
      <h4 className="text-uppercase m-3 p-3 font-weight-bold fs-2 text-white">
        {company.data.name}
      </h4>
      <p className="text-white m-2 p-2 fs-4 fst-italic text-center">{company.data.description}</p>
      <JobCardList from={CompanyDetail} jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetail;
