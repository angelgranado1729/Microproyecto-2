import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HOME_URL,
  LOGIN_URL,
  REGISTER_URL,
  ERROR_404
} from "./constants/urls";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={HOME_URL} element={<LandingPage />} />
        <Route path={ERROR_404} element={<NotFoundPage />} />
        <Route path={LOGIN_URL} element={<LoginPage />} />
        <Route path={REGISTER_URL} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
