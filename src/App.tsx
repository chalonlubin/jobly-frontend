import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import UserContext from "./Users/userContext";
import Loader from "./Common/Loader";
import TOAST_DEFAULTS from "./Helpers/toastSettings";
import { UserInterface } from "./Types/Interfaces";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID: string = "jobly-token";

/** Jobly application.
 *
 * State:
 *
 *  - token - authentication JWT for logged in users, required to be set for most API calls.
 *  It is initially read from localStorage and synced via useLocalStorage Hook.
 *
 *  - user -  {username, firstName, lastName, email, applications, isAdmin}
 *  This is passed around via context.
 *
 *  - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 *  - isLoading - toggles loader view
 *
 * App -> NavBar, RouteList
 *
 **/

function App(): JSX.Element {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_STORAGE_ID)
  );
  const [user, setUser] = useState<UserInterface | null>(null);
  const [applicationIds, setApplicationIds] = useState<Set<number | null>>(
    new Set<number>([])
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.debug(
    "App",
    "applicationIds=",
    applicationIds,
    "currentUser=",
    user,
    "token=",
    token
  );

  useEffect(() => {
    async function getUser(): Promise<void> {
      try {
        if (token) {
          const { username } = jwt_decode(token) as { username: string };
          // Give token to API class so it can use it to call the API.
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getUser(username);
          setUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        toast("❌ Database error", TOAST_DEFAULTS);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [token]);

  /** Handles signUp.
   *
   * Automatically logs user in by setting token upon signUp.
   * */
  async function signUp(signUpData: UserInterface): Promise<void> {
    try {
      const token = await JoblyApi.registerUser(signUpData);
      setToken(token);
      toast("✅ Sign-up Successful!", TOAST_DEFAULTS);
      localStorage.setItem(TOKEN_STORAGE_ID, token);
    } catch (err) {
      console.error("App signUp: problem signing up", err);
      toast("❌ Failed to sign up. Please try again later.", TOAST_DEFAULTS);
    }
  }

  /** Handles login.
   *
   * Will update local storage with token.
   */
  async function login(loginData: UserInterface): Promise<void> {
    try {
      const token = await JoblyApi.loginUser(loginData);
      setToken(token);
      toast("🚀 Login Successful!", TOAST_DEFAULTS);
      localStorage.setItem(TOKEN_STORAGE_ID, token);
    } catch (err) {
      console.error("App login: problem logging in", err);
      toast("❌ Failed to login. Please try again later.", TOAST_DEFAULTS);
    }
  }

  /** Handle user profile update */
  async function updateUser(updateData: UserInterface): Promise<void> {
    try {
      const { username, firstName, lastName, email } = updateData;
      const updatedUser: UserInterface = await JoblyApi.updateUser(username, {
        firstName,
        lastName,
        email,
      });
      setUser(updatedUser);
      toast("👍 Update Successful!", TOAST_DEFAULTS);
    } catch (err) {
      console.error("App updateUser: problem updating user", err);
      toast(
        "❌ Failed to update user. Please try again later.",
        TOAST_DEFAULTS
      );
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id: number): boolean {
    return applicationIds?.has(id) ?? false;
  }

  /** Handles applying to a job
   *
   *  If user has not applied, make API call and update set of application IDs.
   *
   * If user has applied, return with toast message.
   *
   * */
  function applyToJob(id: number) {
    if (!user) {
      return toast("❌ You need to be logged in to apply.", TOAST_DEFAULTS);
    }
    if (hasAppliedToJob(id))
      return toast("👌 You've already applied.", TOAST_DEFAULTS);

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
      <UserContext.Provider
        value={{ user, setUser, hasAppliedToJob, applyToJob }}
      >
        <BrowserRouter>
          <ToastContainer />
          <NavBar logout={logout} />
          <RouteList signUp={signUp} login={login} updateUser={updateUser} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
