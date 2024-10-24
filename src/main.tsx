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
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
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
    element: <LandlordDashboard />,
    children: [
      {
        path: "overview",
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
    <RouterProvider router={router} />
    <Notification />
  </StrictMode>
);
