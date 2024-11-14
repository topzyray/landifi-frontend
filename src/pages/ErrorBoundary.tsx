import { CgDanger } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ErrorBoundary = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentRoute = location.pathname.includes("/dashboard");

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
          <span className="text-red-600 break-all">
            {" "}
            {location.pathname}
          </span>{" "}
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
