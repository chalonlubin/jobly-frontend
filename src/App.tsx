import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Routes/Navbar";
import RouteList from "./Routes/RouteList";
import UserContext from "./Users/userContext";
import Loader from "./Common/Loader";
import { useAuth } from "./Helpers/useAuth";

/** Jobly application.
 *
 * State:
 *
 *  - token - authentication JWT for logged in users, required to be set for most API calls.
 *  It is initially read from localStorage and synced via useLocalStorage Hook.
 *
 *  - user -  {username, firstName, lastName, email, applications, isAdmin}
 *  This is passed around via context.
 *
 *  - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 *  - isLoading - toggles loader view
 *
 * App -> Navbar, RouteList
 *
 **/

function App(): JSX.Element {
  const {
    user,
    isLoading,
    signUp,
    login,
    guestLogin,
    updateUser,
    hasAppliedToJob,
    applyToJob,
    logout,
  } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <div className="App">
      <UserContext.Provider value={{ user, hasAppliedToJob, applyToJob }}>
        <BrowserRouter>
          <ToastContainer />
          <Navbar logout={logout} guestLogin={guestLogin} />
          <RouteList signUp={signUp} login={login} updateUser={updateUser} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
