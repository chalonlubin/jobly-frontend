import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import { Navigate } from "react-router-dom";

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

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const { username } = jwt_decode(token);
        const user = await JoblyApi.getUser(username);
        setUser(user);
      }
      if (token) {
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
  }

  /** Login user, store token in localStorage, update state */
  async function login(loginData) {
    const token = await JoblyApi.loginUser(loginData);
    localStorage.setItem("token", token);
    setToken(token);
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
  }

  /** Logout user, remove token from localStorage, update state */
  async function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RouteList signup={signup} login={login} update={update} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
