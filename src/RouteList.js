import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
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
      <Route path="/companies/:company" element={<CompanyDetail />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
