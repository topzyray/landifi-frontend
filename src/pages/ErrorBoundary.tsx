import { CgDanger } from "react-icons/cg";
import {
  isRouteErrorResponse,
  Link,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

type ErrorType = {
  status: number;
  data: string;
  error: string;
  statusText: string;
};

const ErrorBoundary = () => {
  const [errorObject, setErrorObject] = useState({
    message: "Something went wrong",
    status: 500,
  });
  const { user } = useAuth();
  const error = useRouteError() as ErrorType;
  const location = useLocation();
  const currentRoute = location.pathname.includes("/dashboard");

  // if (isRouteErrorResponse(error)) {
  //   if (error.status === 404) {
  //     setErrorObject((prev) => ({
  //       ...prev,
  //       message: "This page doesn't exist!",
  //       status: 404,
  //     }));
  //   }

  //   if (error.status === 401) {
  //     setErrorObject((prev) => ({
  //       ...prev,
  //       message: "You aren't authorized to see this",
  //       status: 401,
  //     }));
  //   }

  //   if (error.status === 503) {
  //     setErrorObject((prev) => ({
  //       ...prev,
  //       message: "Looks like our API is down",
  //       status: 503,
  //     }));
  //   }

  //   if (error.status === 418) {
  //     setErrorObject((prev) => ({
  //       ...prev,
  //       message: "🫖",
  //       status: 418,
  //     }));
  //   }
  // }

  return (
    <div className="h-screen w-full flex justify-center items-center px-4">
      <div className="w-full max-w-[25rem] flex flex-col justify-center items-center gap-4 text-center input">
        <h1 className="text-center">
          <Link
            to="/"
            className="text-orange-700 font-bold text-lg hover:underline uppercase"
          >
            Landifi
          </Link>
        </h1>
        <span>
          <CgDanger className="text-4xl text-red-600" />
        </span>
        <h1 className="text-lg sm:text-xl font-semibold">
          Path:
          <span className="text-red-600 break-all"> {location.pathname}</span>{" "}
          not found.
        </h1>
        <h1 className="text-lg sm:text-xl font-semibold">
          The page you are trying to access does not exist.
        </h1>
        <Link
          // to="/"
          to={
            currentRoute && user?.userType
              ? `/dashboard/${user?.userType}`
              : `/`
          }
          className="hover:underline hover:font-semibold text-base sm:text-lg"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
