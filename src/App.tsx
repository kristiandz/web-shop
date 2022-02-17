import { CartContextProvider } from "./store/cart-context";
import WorkshopDetails from "./pages/WorkshopDetails";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorPage from "./pages/ErrorPage";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Home from "./pages/Home";
// Global CSS settings for the application, in the rest of the appliaction we are using local css modules and classNames
import './App.css';

function App() {

  const [isAuthorized, setAuthorize] = useState(true); // Authorization state, change to false if Login is enabled

  // Commented out to disable the login as it is not a part of this "sprint".
  // Basic auth works for testing, uncomment following lines to test.

  /*
  //localStorage. clear(); // No logout is implemented yet, this clears the cache (logout)
  const session = localStorage.getItem("username"); // Check localstorage for an existing user

  useEffect(() => {
    if (session != undefined)
      setAuthorize(true);
    else
      setAuthorize(false);
    // eslint-disable-next-line 
  }, []);
  */

  // Depending on the state, the app is rendering different pages
  if (isAuthorized) {
    return (
      // Provide context for the application when signed in by wrapping components with the context wrapper
      // If the route is not matched, render the ErrorPage
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="workshop-details" element={<WorkshopDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CartContextProvider>
    );
  }
  else {
    return (
      // Rendering login when the user is not authorized, passing the setState to change it from login page
      <Routes>
        <Route path="/" element={<Login login={setAuthorize} />} />
        <Route path="login" element={<Login login={setAuthorize} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }
}

export default App;
