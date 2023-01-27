import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";


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

  console.log("token", token)
  console.log("user", user)

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const { username } = jwt_decode(token);
        const user = await JoblyApi.getUser(username);
        setUser(user);
      }
      if (token !== null) {
        JoblyApi.token = token;
        fetchUser();
      }
    },
    [token]
  );

  /** Signup user, store token in localStorage, update state */
  async function signup(signupData) {
    const token = await JoblyApi.registerUser(signupData);
    localStorage.setItem("token", token);
    setToken(token);
    toast('✅ Sign-up Successful!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  /** Login user, store token in localStorage, update state */
  async function login(loginData) {
    const token = await JoblyApi.loginUser(loginData);
    localStorage.setItem("token", token);
    setToken(token);
    toast('🚀 Login Successful!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
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
    toast('👍 Update Successful!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  /** Logout user, remove token from localStorage, update state */
  async function logout() {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      toast('👋 Logout Successful!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch(e) {
      console.log(e)
    }
    console.log("MADE IT TO LOGOUT!")

    return (<Navigate to="/"/>);
  }


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
