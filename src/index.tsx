import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';

// Get the root div element from the html and start building our appliaction from here.
// Wrap the appliaction in BrowserRouter so we can use history API, and using StrictMode to display more potential probles and errors.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);