import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "../Jobs/JobCardList";
import JoblyApi from "../Helpers/api";

/** CompanyDetail component renders a company's details and jobs.
 *
 * Props:
 * - handle: string from url params (e.g. "/companies/:handle")
 *
 * State:
 * - company: object with keys {
 *      data: {handle, name, description, logoUrl, jobs}.
 *       isLoading: boolean
 *  }
 *
 * CompanyList -> CompanyCard -> CompanyDetail
 *
 * */
function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState({
    data: {},
    isLoading: true,
  });

  /** Fetch company details and jobs when component mounts
   * and when handle changes.
   * */
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

  return (
    <div className="CompanyDetail">
      <h5 className="text-uppercase mt-5 p-3 font-weight-bold fs-2">
        {company.data.name}
      </h5>
      <p className="font-italic">{company.data.description}</p>
      <JobCardList from={CompanyDetail} jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetail;
