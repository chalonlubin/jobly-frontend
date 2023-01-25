import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Common/Homepage";
import CompanyList from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import NotFound from "../Common/NotFound";


/** Routes for Jobly app.
 *
 * Props:
 * - none
 *
 * State:
 * - none
 *
 * App -> Routes ->
 *      { Homepage, CompanyList, CompanyDetail, JobList, NotFound }
 *
 * */
function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
