import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 flex justify-between items-center px-3 py-4 lg:px-[5rem]">
      <h1>
        <Link
          to="/"
          className="text-orange-700 font-bold text-lg hover:underline"
        >
          Landifi
        </Link>
      </h1>
      <nav>
        {user ? (
          <div className="flex items-center justify-center gap-4 w-[4rem] h-auto">
            <Link to={`/dashboard/${user.userType}`}>
              <FaRegCircleUser className="text-orange-500 text-2xl hover:shadow" />
            </Link>
            <p onClick={logout}>
              <MdLogout className="text-red-700 text-2xl hover:shadow hover:cursor-pointer" />
            </p>
          </div>
        ) : (
          <p className="bg-orange-700 text-white px-4 py-1.5 rounded hover:opacity-70">
            <Link to="auth/login">Login</Link>
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
