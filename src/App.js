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
import TOAST_DEFAULTS from "./Helpers/toastSettings";
import Loader from "./Common/Loader";

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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        try {
          const { username } = jwt_decode(token);
          const user = await JoblyApi.getUser(username);
          setUser(user);
          setIsLoading(false);
        } catch (e) {
          toast("🚀 Database error", TOAST_DEFAULTS);
          console.error(e);
        }
      }
      if (token) {
        JoblyApi.token = token;
        fetchUser();
      } else {
        setIsLoading(false);
      }
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
    setUser(user);
    toast("👍 Update Successful!", TOAST_DEFAULTS);
  }

  /** Logout user, remove token from localStorage, update state */
  async function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast("👋 Logout Successful!", TOAST_DEFAULTS);
  }

  if (isLoading) return <Loader />;

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
