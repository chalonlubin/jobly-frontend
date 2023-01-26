import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import userContext from "../Users/userContext";
import Homepage from "../Common/Homepage";
import CompanyList from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import SignupForm from "../Users/SignupForm";
import LoginForm from "../Users/LoginForm";
import ProfileForm from "../Users/ProfileForm";
import Unauthorized from "../Common/Unauthorized";
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
 *      { Homepage, CompanyList, CompanyDetail, JobList,
 *        NotFound, SignupForm, LoginForm, ProfileForm
 *      }
 *
 * */
function RouteList({ signup, login, update }) {
  const user = useContext(userContext);
  console.log("🚀 ~ file: RouteList.js:30 ~ RouteList ~ user", user)

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {user ? (
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile" element={<ProfileForm update={update} />} />
          \
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="/login" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/companies" element={<Navigate to="/unauthorized" />} />
          <Route
            path="/companies/:handle"
            element={<Navigate to="/unauthorized" />}
          />
          <Route path="/jobs" element={<Navigate to="/unauthorized" />} />
          <Route path="/profile" element={<Navigate to="/unauthorized" />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
        </>
      )}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
