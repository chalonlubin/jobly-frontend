import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import RouteList from "./RouteList";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <NavBar />
        <RouteList/>
      </BrowserRouter>
    </div>
  );
}

export default App;
