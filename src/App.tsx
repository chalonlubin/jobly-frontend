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
import {
  AppPropsInterface,
  SignupDataInterface,
  UserInterface,
  LoginDataInterface,
  UpdateDataInterface,
} from "./Interfaces/AppInterfaces";

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

function App(props: AppPropsInterface): JSX.Element {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_STORAGE_ID)
  );
  const [user, setUser] = useState<UserInterface | null>(null);
  const [applicationIds, setApplicationIds] = useState<Set<number>>(
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

  useEffect(
    function loadUserInfo(): void {
      async function getUser(): Promise<any> {
        if (token) {
          try {
            const { username } = jwt_decode(token) as { username: string };
            // Give token to API class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser: any = await JoblyApi.getUser(username);
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
  async function signup(signupData: SignupDataInterface): Promise<void> {
    const token: string = await JoblyApi.registerUser(signupData);
    localStorage.setItem(TOKEN_STORAGE_ID, token);
    setToken(token);
    toast("✅ Sign-up Successful!", TOAST_DEFAULTS);
  }

  /** Handles login.
   *
   * Will update local storage with token.
   */
  async function login(loginData: LoginDataInterface): Promise<void> {
    const token: string = await JoblyApi.loginUser(loginData);
    localStorage.setItem(TOKEN_STORAGE_ID, token);
    setToken(token);
    toast("🚀 Login Successful!", TOAST_DEFAULTS);
  }

  /** Handle user profile update */
  async function updateUser(updateData: UpdateDataInterface): Promise<void> {
    const { username, firstName, lastName, email } = updateData;
    const user: any = await JoblyApi.updateUser(username, {
      firstName,
      lastName,
      email,
    });
    setUser(user);
    toast("👍 Update Successful!", TOAST_DEFAULTS);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id: number): boolean {
    return applicationIds.has(id);
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
      <userContext.Provider
        value={{ user, setUser, hasAppliedToJob, applyToJob }}
      >
        <BrowserRouter>
          <ToastContainer />
          <NavBar logout={logout} />
          <RouteList signup={signup} login={login} updateUser={updateUser} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
