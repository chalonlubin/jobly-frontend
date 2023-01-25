import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter} from "react-router-dom";
import {useState, useEffect} from "react"
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./Helpers/api";
import jwt from 'jsonwebtoken';

const CHALON_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc0Njg1MDgyfQ.o5xkB0pNM7SHir_1Ql0UH4D_nzJW8eUmYzXiZP9bMs4";
const CHALON_USERNAME = "test";

/**
 * App component that renders the navbar and routes.
 */
function App() {
  const [token, setToken] = useState(CHALON_TOKEN);
  const [user, setUser] = useState(CHALON_USERNAME);


  //signup
  async function signUp(signUpData) {
    const res = await JoblyApi.registerUser(signUpData);

    setToken(res.data);
  }


  useEffect(
    function fetchUserWhenTokenUpdated() {
  async function fetchUser () {
    const decodedToken = jwt.decode(token);
    console.log("decoded:", decodedToken)

    // const res = await JoblyApi.getUser(token, decodedToken.username)
  }
  }, [token])


  //login
  //logout
  //setUser

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <RouteList token={token} user={user} />
      </BrowserRouter>
    </div>
  );
}

export default App;
