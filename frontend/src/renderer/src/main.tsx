import "./index.css";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./providers";
import DonorListScreen from "./screens/DonorListScreen";
import LoginScreen from "./screens/LoginScreen";
import DonorScreen from "./screens/DonorScreen";
import DonationScreen from "./screens/DonationScreen";
import DonationListScreen from "./screens/DonationListScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { Navigate } from "react-router-dom";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route
          index={true}
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/donors" element={<DonorListScreen />} />
        <Route path="/donors/:donorId" element={<DonorScreen />} />
        <Route path="/donations" element={<DonationListScreen />} />
        <Route path="/donations/:donationId" element={<DonationScreen />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
