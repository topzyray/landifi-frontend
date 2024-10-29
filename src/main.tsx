import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import EmailVerification from "./pages/auth/EmailVerification.tsx";
import Notification from "./components/Notification.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import NewEmailVerificationRequest from "./pages/auth/NewEmailVerificationRequest.tsx";
import LandlordDashboard from "./pages/dashboards/landlord/LandlordDashboard.tsx";
import AddProperty from "./pages/dashboards/landlord/AddLeaseProperty.tsx";
import Overview from "./pages/dashboards/landlord/Overview.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/Protected.tsx";
import UnprotectedRoute from "./components/UnprotectedRoute.tsx";
import { GlobalProvider } from "./contexts/GlobalContext.tsx";
import AuthLayout from "./pages/auth/Auth.tsx";
import Properties from "./pages/Properties.tsx";
import PropertyDetails from "./pages/PropertyDetails.tsx";
import AddLeaseProperty from "./pages/dashboards/landlord/AddLeaseProperty.tsx";
import AddSalesProperty from "./pages/dashboards/landlord/AddSalesProperty.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "properties/:propertyId",
        element: <PropertyDetails />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <UnprotectedRoute>
            <Register />
          </UnprotectedRoute>
        ),
      },
      {
        path: "forgotpassword",
        element: (
          <UnprotectedRoute>
            <ForgotPassword />
          </UnprotectedRoute>
        ),
      },
      {
        path: "resetpassword",
        element: (
          <UnprotectedRoute>
            <ResetPassword />
          </UnprotectedRoute>
        ),
      },
      {
        path: "emailverification",
        element: (
          <UnprotectedRoute>
            <EmailVerification />
          </UnprotectedRoute>
        ),
      },
      {
        path: "newemailverificationrequest",
        element: (
          <UnprotectedRoute>
            <NewEmailVerificationRequest />
          </UnprotectedRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard/landlord",
    element: (
      <ProtectedRoute requiredRole="landlord">
        <LandlordDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "leaseproperty",
        element: <AddLeaseProperty />,
      },
      {
        path: "sellproperty",
        element: <AddSalesProperty />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <RouterProvider router={router} />
        <Notification />
      </GlobalProvider>
    </AuthProvider>
  </StrictMode>
);
