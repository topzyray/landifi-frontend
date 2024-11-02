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
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/Protected.tsx";
import UnprotectedRoute from "./components/UnprotectedRoute.tsx";
import { GlobalProvider } from "./contexts/GlobalContext.tsx";
import AuthLayout from "./pages/auth/Auth.tsx";
import Properties from "./pages/Properties.tsx";
import PropertyDetails from "./pages/PropertyDetails.tsx";
import AddLeaseProperty from "./pages/dashboards/landlord/AddLeaseProperty.tsx";
import AddSalesProperty from "./pages/dashboards/landlord/AddSalesProperty.tsx";
import UpdateLeaseProperty from "./pages/dashboards/landlord/UpdateLeaseProperty.tsx";
import UpdateSaleProperty from "./pages/dashboards/landlord/UpdateSaleProperty.tsx";
import PropertyDetailLayout from "./pages/property_details/PropertyDetailLayout.tsx";
import PropertyDescription from "./pages/property_details/Description.tsx";
import PropertyOwner from "./pages/property_details/Owner.tsx";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import LandlordProfile from "./pages/dashboards/landlord/LandlordProfile.tsx";
import LandlordPropertyDetails from "./pages/dashboards/landlord/LandlordPropertyDetails.tsx";
import TenantDashboard from "./pages/dashboards/client/TenantDashboard.tsx";
import TenantProfile from "./pages/dashboards/client/TenantProfile.tsx";
import TenantOverview from "./pages/dashboards/client/TenantOverview.tsx";
import LandlordOverview from "./pages/dashboards/landlord/LandlordOverview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
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
        children: [
          {
            path: "",
            element: <PropertyDetailLayout />,
            children: [
              {
                index: true,
                element: <PropertyDescription />,
              },
              {
                path: "landlord",
                element: <PropertyOwner />,
              },
            ],
          },
        ],
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
        element: <LandlordOverview />,
      },
      {
        path: "leaseproperty",
        element: <AddLeaseProperty />,
      },
      {
        path: "leaseproperty/update/:propertyId",
        element: <UpdateLeaseProperty />,
      },
      {
        path: "saleproperty",
        element: <AddSalesProperty />,
      },
      {
        path: "saleproperty/update/:propertyId",
        element: <UpdateSaleProperty />,
      },
      {
        path: "profile",
        element: <LandlordProfile />,
      },
      {
        path: "properties/:propertyId",
        element: <LandlordPropertyDetails />,
      },
    ],
  },
  {
    path: "dashboard/tenant",
    element: (
      <ProtectedRoute requiredRole="tenant">
        <TenantDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TenantOverview />,
      },
      {
        path: "profile",
        element: <TenantProfile />,
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
