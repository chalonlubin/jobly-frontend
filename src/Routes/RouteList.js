import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../Common/Homepage";
import CompanyList from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import NotFound from "../Common/NotFound";
import SignupForm from "../Users/SignupForm";
import LoginForm from "../Users/LoginForm";
import ProfileForm from "../Users/ProfileForm";
import userContext from "../Users/userContext";

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
function RouteList({ signup, login, update, errors }) {
  const { user } = useContext(userContext);

  // TODO: use if blocks to block off routes based on user context
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {user && (
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile" element={<ProfileForm update={update} />} />
        </>
      )}
      <Route
        path="/signup"
        element={!user ? <SignupForm signup={signup} /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!user ? <LoginForm login={login} /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
