import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HOME_URL,
  LOGIN_URL,
  REGISTER_URL,
  ERROR_404,
  MOVIES_DETAIL_URL,
  ADMIN_URL,
  PROFILE_URL,
  RESERVE_URL,
  UPCOMING_MOVIES_URL,
  NOW_PLAYING_MOVIES_URL
} from "./constants/urls";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { Layout } from "./components/Layout/Layout";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { MovieDetailPage } from "./pages/MovieDetailPage/MovieDetailPage";
import { UserPage } from "./pages/UserPage/UserPage";
import { ReservePage } from "./pages/ReservePage/ReservePage";
import { UpComingPage } from "./pages/UpComingPage/UpComingPage";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path={HOME_URL}
            element={
              <HomePage />
            }
          />


          <Route path={UPCOMING_MOVIES_URL}
            element={
              <PublicRoute>
                <UpComingPage />
              </PublicRoute>
            }
          />

          <Route path={MOVIES_DETAIL_URL()}
            element={
              <PublicRoute>
                <MovieDetailPage />
              </PublicRoute>
            }
          />

          <Route path={REGISTER_URL}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route path={LOGIN_URL}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route path={RESERVE_URL}
            element={
              <PrivateRoute>
                <ReservePage />
              </PrivateRoute>
            }
          />

          <Route path={PROFILE_URL}
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />

          <Route
            path={ADMIN_URL}
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />

          <Route path={ERROR_404}
            element={
              <NotFoundPage />
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
)
