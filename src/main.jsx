import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";
import "./styles/global.css"; // atau index.css kamu sendiri

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
