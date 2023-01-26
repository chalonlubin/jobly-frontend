import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import errorContext from "./Common/errorContext";

/**
 * App component that renders the navbar and routes.
 */
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const { username } = jwt_decode(token);
        const user = await JoblyApi.getUser(token, username);

        setUser(user);
      }
      if (token) {
        fetchUser();
        JoblyApi.token = token;
      }
    },
    [token]
  );

  /** Signup for site. */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.registerUser(signupData);
      setToken(token);
    } catch (e) {
      setErrors(e);
    }
  }

  /** Login to site. */
  async function login(loginData) {
    try {
      const token = await JoblyApi.loginUser(loginData);
      setToken(token);
    } catch (e) {
      setErrors(e);
    }
  }

  /** Update user profile. */
  async function update(updateData) {
    const { username, firstName, lastName, email } = updateData;
    console.log("user", user);
    const res = await JoblyApi.updateUser(token, username, {
      firstName,
      lastName,
      email,
    });
    setUser((u) => res);
  }

  /** Logout of site. */
  async function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <errorContext.Provider value={errors}>
          <BrowserRouter>
            <NavBar logout={logout} />
            <RouteList
              signup={signup}
              login={login}
              update={update}
              errors={errors}
            />
          </BrowserRouter>
        </errorContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
