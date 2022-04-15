import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const firebaseConfig = require("./firebase.config.json");
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route exact path="*" element={<App firebase={app} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
