import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import userContext from "./Users/userContext";
import jwt_decode from "jwt-decode";

// const CHALON_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc0Njg1MDgyfQ.o5xkB0pNM7SHir_1Ql0UH4D_nzJW8eUmYzXiZP9bMs4";
// const CHALON_USERNAME = "test";

/**
 * App component that renders the navbar and routes.
 */
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  //signup
  async function signup(signupData) {
    const res = await JoblyApi.registerUser(signupData);
    setToken((t) => res);
  }

  useEffect(
    function fetchUserWhenTokenUpdated() {
      async function fetchUser() {
        const decodedPayload = jwt_decode(token);
        const res = await JoblyApi.getUser(token, decodedPayload.username);

        setUser((u) => res);
      }
      if (token) fetchUser();
    },
    [token]
  );

  //login
  //logout
  //setUser

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <RouteList token={token} signup={signup} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
