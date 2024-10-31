import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaRegCircleUser } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import NavLinks from './header/NavLinks';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <header className="bg-white shadow sticky z-40 top-0 flex justify-between items-center px-3 py-4 lg:px-[5rem]">
      <h1>
        <Link
          to="/"
          className="text-orange-700 font-bold text-lg hover:underline"
        >
          Landifi
        </Link>
      </h1>

      <div className="flex justify-end items-center flex-1">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden justify-center items-center cursor-pointer bg-white hover:bg-primary hover:rounded-lg"
        >
          {!menuOpen ? (
            <AiOutlineMenu
              size={30}
              className="text-orange-700 hover:text-white "
            />
          ) : (
            <AiOutlineClose
              className="text-orange-700 hover:text-white hover:rounded-lg p-1"
              size={30}
            />
          )}
        </div>
      </div>

      {/* Medium and Large screen nav */}
      <ul className="hidden md:flex items-center gap-8 lg:gap-12">
        <li className="text-base font-medium hover:text-primary-light cursor-pointer group relative">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? 'inline-flex flex-col items-center'
                : isActive
                ? 'text-primary-light inline-flex flex-col items-center'
                : 'inline-flex flex-col items-center'
            }
          >
            Home
            <span className="absolute -bottom-0 group-hover:w-8 group-hover:h-1 group-active:w-8 group-active:h-1 bg-primary rounded-full"></span>
          </NavLink>
        </li>
        <NavLinks />
        <li className="text-base font-medium hover:text-primary-light cursor-pointer group relative">
          <NavLink
            to="contact"
            className={({ isActive, isPending }) =>
              isPending
                ? 'inline-flex flex-col items-center'
                : isActive
                ? 'text-primary-light inline-flex flex-col items-center'
                : 'inline-flex flex-col items-center'
            }
          >
            Contact us
            <span className="absolute -bottom-0 group-hover:w-8 group-hover:h-1 group-active:w-8 group-active:h-1 bg-primary rounded-full"></span>
          </NavLink>
        </li>
      </ul>

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
          <p className="btn btn-primary">
            <Link to="auth/login">Login</Link>
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
