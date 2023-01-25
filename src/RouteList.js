import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import NotFound from "./NotFound";

/**
 * RouteList: component to render routes
 *
 * Props:
 * - dogs: array of dog objects [{dog}, ...]
 *
 * State:
 * - none
 *
 * App -> RouteList
 */

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
