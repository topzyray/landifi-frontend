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
import AddProperty from "./pages/dashboards/landlord/AddProperty.tsx";
import Overview from "./pages/dashboards/landlord/Overview.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/Protected.tsx";
import UnprotectedRoute from "./components/UnprotectedRoute.tsx";
import { GlobalProvider } from "./contexts/GlobalContext.tsx";

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
        path: "auth/login",
        element: (
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        ),
      },
      {
        path: "auth/register",
        element: (
          <UnprotectedRoute>
            <Register />
          </UnprotectedRoute>
        ),
      },
      {
        path: "auth/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "auth/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "auth/emailverification",
        element: <EmailVerification />,
      },
      {
        path: "auth/newemailverificationrequest",
        element: <NewEmailVerificationRequest />,
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
        path: "addproperty",
        element: <AddProperty />,
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
