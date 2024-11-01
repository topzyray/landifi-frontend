import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useContext, useState } from "react";
import NavLinks from "./header/NavLinks";
import { SiInstagram } from "react-icons/si";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { GlobalContext } from "../contexts/GlobalContext";

const Header = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { logout, user } = useAuth();

  return (
    <header className="bg-white shadow sticky z-40 top-0 flex justify-between items-center px-3 py-4 lg:px-[5rem] uppercase">
      <h1 className="">
        <Link
          onClick={() => setShowNavModal(false)}
          to="/"
          className="text-orange-700 font-bold text-lg hover:underline uppercase"
        >
          Landifi
        </Link>
      </h1>

      {/* <div className="flex justify-end items-center flex-1"> */}
      <div
        onClick={() => setShowNavModal(!showNavModal)}
        className="md:hidden justify-center items-center cursor-pointer bg-white hover:bg-primary hover:rounded-lg"
      >
        {!showNavModal ? (
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
      {/* </div> */}

      {/* Medium and Large screen nav */}
      <ul className="hidden md:flex items-center gap-8 lg:gap-12 ">
        <li className="text-base font-medium hover:text-orange-600 cursor-pointer group relative">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "inline-flex flex-col items-center"
                : isActive
                ? "text-orange-600 inline-flex flex-col items-center"
                : "inline-flex flex-col items-center"
            }
          >
            Home
            <span className="absolute -bottom-0 group-hover:w-8 group-hover:h-1 group-active:w-8 group-active:h-1 bg-primary rounded-full"></span>
          </NavLink>
        </li>
        <NavLinks />
        <li className="text-base font-medium hover:text-orange-600 cursor-pointer group relative">
          <NavLink
            to="contact"
            className={({ isActive, isPending }) =>
              isPending
                ? "inline-flex flex-col items-center"
                : isActive
                ? "text-orange-600 inline-flex flex-col items-center"
                : "inline-flex flex-col items-center"
            }
          >
            Contact us
            <span className="absolute -bottom-0 group-hover:w-8 group-hover:h-1 group-active:w-8 group-active:h-1 bg-primary rounded-full"></span>
          </NavLink>
        </li>
      </ul>

      {/* Medium and large screen */}
      <nav className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center justify-center gap-4 w-[4rem] h-auto">
            <Link to={`/dashboard/${user.userType}`}>
              <FaRegCircleUser className="text-orange-600 text-2xl hover:shadow" />
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

      {showNavModal && (
        <div
          onClick={() => setShowNavModal(false)}
          className={
            showNavModal
              ? `md:hidden absolute h-screen w-full top-[3.9rem] left-0  overflow-y-auto shadow-xl ease-in duration-500 bg-black/70 backdrop-blur-none`
              : `left-[-100%] ease-out duration-500`
          }
        >
          <ul
            onClick={(e) => e.stopPropagation()}
            className="h-full max-w-max flex flex-col px-8 py-8 space-y-4 bg-[#ECECEC] uppercase"
          >
            <div className="flex flex-col justify-between gap-10">
              <div className="space-y-6">
                <li onClick={() => setShowNavModal(false)}>
                  <NavLink
                    to="/"
                    className="inline-flex text-sm hover:text-orange-600 cursor-pointer"
                  >
                    Home
                  </NavLink>
                </li>
                <NavLinks handleMenu={() => setShowNavModal(false)} />
                <li onClick={() => setShowNavModal(false)}>
                  <NavLink
                    to="/contact"
                    className="inline-flex text-sm hover:text-orange-600 cursor-pointer"
                  >
                    Contact
                  </NavLink>
                </li>
                <div className="pt-1 ">
                  <nav className="flex md:hidden items-center">
                    {user ? (
                      <div
                        onClick={() => setShowNavModal(false)}
                        className="flex items-center justify-center gap-4 w-[4rem] h-auto"
                      >
                        <Link to={`/dashboard/${user.userType}`}>
                          <FaRegCircleUser className="text-orange-600 text-2xl hover:shadow" />
                        </Link>
                        <p onClick={logout}>
                          <MdLogout className="text-red-700 text-2xl hover:shadow hover:cursor-pointer" />
                        </p>
                      </div>
                    ) : (
                      <p
                        onClick={() => setShowNavModal(false)}
                        className="btn btn-primary"
                      >
                        <Link to="auth/login">Login</Link>
                      </p>
                    )}
                  </nav>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start gap-4">
                <hr className="border border-gray-400 w-1/2" />
                <div className="flex gap-4">
                  <div className="group">
                    <NavLink
                      to="https://www.linkedin.com/in/landifi"
                      target="_blank"
                      onClick={() => setShowNavModal(false)}
                    >
                      <span className="bg-orange-600 text-white p-2 border rounded-full flex items-center justify-center group-hover:bg-light group-hover:border group-hover:border-oratext-orange-600 cursor-pointer transition-all ease-in-out duration-500">
                        <SlSocialLinkedin className="text-sm group-hover:text-orange-600" />
                      </span>
                    </NavLink>
                  </div>
                  <div className="group">
                    <NavLink
                      to="https://www.facebook.com/landifi"
                      target="_blank"
                      onClick={() => setShowNavModal(false)}
                    >
                      <span className="bg-orange-600 text-white p-2 border rounded-full flex items-center justify-center group-hover:bg-light group-hover:border group-hover:border-oratext-orange-600 cursor-pointer transition-all ease-in-out duration-500">
                        <SlSocialFacebook className="text-sm group-hover:text-orange-600" />
                      </span>
                    </NavLink>
                  </div>
                  <div className="group">
                    <NavLink
                      to="https://www.instagram.com/landifi"
                      target="_blank"
                      onClick={() => setShowNavModal(false)}
                    >
                      <span className="bg-orange-600 text-white p-2 border rounded-full flex items-center justify-center group-hover:bg-light group-hover:border group-hover:border-oratext-orange-600 cursor-pointer transition-all ease-in-out duration-500">
                        <SiInstagram className="text-sm group-hover:text-orange-600" />
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
