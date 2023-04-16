import React from "react";
import ReactDOM from "react-dom";
import Provider from "../Provider";

// import "./config/sentry";
// import "./config/firebase";

ReactDOM.render(
  <React.StrictMode>
    <Provider />
  </React.StrictMode>,
  document.getElementById("root")
);
