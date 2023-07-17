import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextInterface } from "../Types/Interfaces"; // import UserContextInterface
import  UserContext  from "../Users/userContext"; // import userContext using destructuring

import Homepage from "../Common/Homepage";
import CompanyCardList from "../Companies/CompanyCardList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import SignUpForm from "../Users/SignUpForm";
import LoginForm from "../Users/LoginForm";
import ProfileForm from "../Users/ProfileForm";
import NotFoundPage from "../Common/NotFoundPage";
import { RoutePropsInterface } from "../Types/Interfaces";

/** RouteList: Routes for Jobly
 *
 * Props: signUp, login, update
 * State: n/a
 *
 * App -> RouteList -> Routes
 *
 * Routes:
 * - /: Homepage
 * - /companies: CompanyList
 * - /companies/:handle: CompanyDetail
 * - /jobs: JobList
 * - /profile: ProfileForm
 * - /signUp: signUpForm
 * - /login: LoginForm
 * - *: NotFoundPage
 *
 * If user is logged in, show all routes.
 * If not, show /signUp and /login.
 **/
function RouteList(props: RoutePropsInterface): JSX.Element {
  const userContextVal: UserContextInterface | null = useContext(UserContext);

  return (
    <Routes>
      {userContextVal?.user ? (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/companies" element={<CompanyCardList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route
            path="/profile"
            element={<ProfileForm updateUser={props.updateUser} />}
          />
          <Route path="/signUp" element={<Navigate to="/" />} />
          <Route path="/login" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signUp"
            element={<SignUpForm signUp={props.signUp} />}
          />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<LoginForm login={props.login} />} />
        </>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteList;