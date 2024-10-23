import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth/Auth.tsx";
import Home from "./pages/Home.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import EmailVerification from "./pages/auth/EmailVerification.tsx";
import Notification from "./components/Notification.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Notification />
  </StrictMode>
);
