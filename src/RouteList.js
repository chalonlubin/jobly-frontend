
import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Homepage from "./Homepage"
import Companies from "./Companies";
import Jobs from "./Jobs";
import Company from "./Company"
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
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:company" element={<Company />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default RouteList;