import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import * as jose from "jose";

// const CHALON_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc0Njg1MDgyfQ.o5xkB0pNM7SHir_1Ql0UH4D_nzJW8eUmYzXiZP9bMs4";
// const CHALON_USERNAME = "test";

/**
 * App component that renders the navbar and routes.
 */
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const {username} = jose.decodeJwt(token);
        const res = await JoblyApi.getUser(token, username);

        setUser((u) => res);
      }
      if (token) fetchUser();
    },
    [token]
  );

  //signup
  async function signup(signupData) {
    const res = await JoblyApi.registerUser(signupData);
    setToken((t) => res);
  }

  //login
  async function login(loginData) {
    const res = await JoblyApi.loginUser(loginData);
    setToken((t) => res);
  }
  //logout
  async function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RouteList token={token} signup={signup} login={login} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
