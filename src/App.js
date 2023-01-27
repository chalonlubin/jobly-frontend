import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import TOAST_DEFAULTS from "./Helpers/toastSettings";
import Loader from "./Common/Loader";

//FIXME: add isLoading state to user? I think we do have to do this for most aysnc calls

// Another note: When traveling between pages, most errors occur when we use the url bar, we can see flashes of the screen we try to go to...
// Not sure the fix but I think if we implement a loader it may fix a lot of these issues. It could maybe have something to do with our token usage and how
// we access the information.. not sure.
// Also noticing that when we go to a random route when logged in, theres an odd delay then we hit the 404.

/** App
 *
 * Props: n/a
 * State: token, user
 *
 * App -> NavBar, RouteList
 *
 * Context: userContext
 * - user: { username, firstName, lastName, email }
 **/
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({ data: null, isLoading: true });

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const { username } = jwt_decode(token);
        try {
          const user = await JoblyApi.getUser(username);
          console.log(user);
          setUser((u) => ({ ...u, data: user }));
        } catch (e) {
          console.error(e);
        }
      }
      if (token) {
        JoblyApi.token = token;
        fetchUser();
      }
      setUser((u) => ({ ...u, isLoading: false }));
    },
    [token]
  );

  /** Signup user, store token in localStorage, update state */
  async function signup(signupData) {
    const token = await JoblyApi.registerUser(signupData);
    localStorage.setItem("token", token);
    setToken(token);
    toast("✅ Sign-up Successful!", TOAST_DEFAULTS);
  }

  /** Login user, store token in localStorage, update state */
  async function login(loginData) {
    const token = await JoblyApi.loginUser(loginData);
    localStorage.setItem("token", token);
    setToken(token);
    toast("🚀 Login Successful!", TOAST_DEFAULTS);
  }

  /** Update user, update state */
  async function update(updateData) {
    const { username, firstName, lastName, email } = updateData;
    const user = await JoblyApi.updateUser(username, {
      firstName,
      lastName,
      email,
    });
    setUser({ data: user, isLoading: false });
    toast("👍 Update Successful!", TOAST_DEFAULTS);
  }

  /** Logout user, remove token from localStorage, update state */
  async function logout() {
    try {
      setUser({ data: null, isLoading: false });
      setToken(null);
      localStorage.removeItem("token");
      toast("👋 Logout Successful!", TOAST_DEFAULTS);
    } catch (e) {
      console.log(e);
    }
    return <Navigate to="/" />;
  }

  if (user.isLoading) return <Loader />;

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <ToastContainer />
          <NavBar logout={logout} />
          <RouteList signup={signup} login={login} update={update} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
export { TOAST_DEFAULTS };
