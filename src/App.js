import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import Loader from "./Common/Loader";
import TOAST_DEFAULTS from "./Helpers/toastSettings";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * State:
 *
 *  - token - authentication JWT for logged in users, required to be set for most API calls.
 *  It is initally read from localStorage and synced via useLocalStorage Hook.
 *
 *  - user -  {username, firstName, lastName, email, applications, isAdmin}
 *  This is passed around via context.
 *
 *  - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 *  - isLoading - controls loader view
 *
 * App -> NavBar, RouteList
 *
 **/
function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_ID));
  const [user, setUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [isLoading, setIsLoading] = useState(true);

  console.debug(
    "App",
    "applicationIds=",
    applicationIds,
    "currentUser=",
    user,
    "token=",
    token
  );

  useEffect(
    function loadUserInfo() {
      async function getUser() {
        if (token) {
          try {
            const { username } = jwt_decode(token);
            // Give token to API class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getUser(username);

            setUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
            setIsLoading(false);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            toast("❌ Database error", TOAST_DEFAULTS);
            setUser(null);
            setIsLoading(false);
          }
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
      getUser();
    },
    [token]
  );

  /** Handles signup.
   *
   * Automatically logs user in by setting token upon signup.
   * */
  async function signup(signupData) {
    const token = await JoblyApi.registerUser(signupData);
    localStorage.setItem(TOKEN_STORAGE_ID, token);
    setToken(token);
    toast("✅ Sign-up Successful!", TOAST_DEFAULTS);
  }

  /** Handles login.
   *
   * Will update local storage with token.
   */
  async function login(loginData) {
    const token = await JoblyApi.loginUser(loginData);
    localStorage.setItem(TOKEN_STORAGE_ID, token);
    setToken(token);
    toast("🚀 Login Successful!", TOAST_DEFAULTS);
  }

  /** Handle user profile update */
  async function updateUser(updateData) {
    const { username, firstName, lastName, email } = updateData;
    const user = await JoblyApi.updateUser(username, {
      firstName,
      lastName,
      email,
    });
    setUser(user);
    toast("👍 Update Successful!", TOAST_DEFAULTS);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(user.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
    toast("👌 Application Successful", TOAST_DEFAULTS);
  }

  /** Handle logout */
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast("👋 Logout Successful!", TOAST_DEFAULTS);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="App">
      <userContext.Provider
        value={{ user, setUser, hasAppliedToJob, applyToJob }}
      >
        <BrowserRouter>
          <ToastContainer />
          <NavBar logout={logout} />
          <RouteList
            signup={signup}
            login={login}
            updateUser={updateUser}
            user={user}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
