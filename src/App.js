import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";

//TODO: Need to fix the favicon.
// Giving error in console, tried to add a custom one but I broke it.

/**
 * App component that renders the navbar and routes.
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RouteList />
      </BrowserRouter>
    </div>
  );
}

export default App;
