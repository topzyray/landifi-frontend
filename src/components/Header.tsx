import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 flex justify-between px-3 py-4 lg:px-[5rem]">
      <h1>
        <Link to="/" className="text-orange-700 font-bold text-lg">
          Landifi
        </Link>
      </h1>
      <nav>
        <p>
          <Link to="auth/login">Login</Link>
        </p>
      </nav>
    </header>
  );
};

export default Header;
