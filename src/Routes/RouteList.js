import React, { useContext } from "react";
import userContext from "../Users/userContext";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "../Common/Homepage";
import CompanyList from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import SignupForm from "../Users/SignupForm";
import LoginForm from "../Users/LoginForm";
import ProfileForm from "../Users/ProfileForm";
import NotFoundPage from "../Common/NotFoundPage";

/** RouteList: Routes for Jobly
 *
 * Props: signup, login, update
 * State: n/a
 *
 * App -> RouteList
 *
 * Routes:
 * - /: Homepage
 * - /companies: CompanyList
 * - /companies/:handle: CompanyDetail
 * - /jobs: JobList
 * - /profile: ProfileForm
 * - /signup: SignupForm
 * - /login: LoginForm
 * - *: NotFoundPage
 *
 * If user is logged in, show all routes.
 * If not, show /signup and /login.
 **/
function RouteList({ signup, login, updateUser, isLoading }) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route
            path="/profile"
            element={<ProfileForm updateUser={updateUser} />}
          />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="/login" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
        </>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteList;
