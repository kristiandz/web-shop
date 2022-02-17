import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContextProvider } from "./store/cart-context";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
// Global CSS settings for the application, in the rest of the appliaction we are using local css modules and classNames
import './App.css';

function App() {

  const [isAuthorized, setAuthorize] = useState(false); // Authorization state, default is false

  useEffect(() => {
    if (isAuthorized === false)
      setAuthorize(true);
    else
      setAuthorize(false);
    // eslint-disable-next-line 
  }, []);

  // Depending on the state, the app is rendering different pages
  if (isAuthorized) {
    return (
      // Provide context for the application when signed in by wrapping components with the context wrapper
      // If the route is not matched, render the ErrorPage
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CartContextProvider>
    );
  }
  else {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }
}

export default App;
