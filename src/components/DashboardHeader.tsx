import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { RiFundsFill } from "react-icons/ri";
import { TbWorldUp } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { FaSellcast } from "react-icons/fa6";

const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <>
      {/* Sidebar for medium screens and above */}
      <div className="hidden md:block sticky z-50 shrink-0 h-full pt-8 px-4 bg-white text-primary">
        <div className="flex">
          <div className="relative flex flex-col gap-4">
            <ul className="flex flex-col gap-1.5 font-semibold">
              <NavLink
                to="/dashboard/landlord"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
                end
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <BiSolidDashboard />{" "}
                  <span className=" lg:block">Overview</span>
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/landlord/leaseproperty"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <MdAddBox /> <span className=" lg:block">Lease property</span>
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/landlord/sellproperty"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <FaSellcast />{" "}
                  <span className=" lg:block">Sell property</span>
                </li>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <TbWorldUp /> <span className=" lg:block">Main Site</span>
                </li>
              </NavLink>
              {/* <li
                onClick={logout}
                className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <BiLogOut /> <span className="md:hidden lg:block">Logout</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className="md:hidden sticky top-0 z-50 flex justify-between py-2 px-3 border-b shadow bg-white opacity-100">
        <h1>
          <Link
            to="/dashboard/landlord"
            className="text-orange-700 font-bold text-lg"
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

        {/* Mobile menus */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className={
              menuOpen
                ? `md:hidden absolute h-screen w-full top-[2.9rem] left-0  overflow-y-auto shadow-xl   ease-in duration-500 bg-black/40 backdrop-blur-none`
                : `left-[-100%] ease-out duration-500`
            }
          >
            <ul
              onClick={(e) => e.stopPropagation()}
              className="h-full max-w-max flex flex-col pl-4 pr-10 py-6 space-y-4 bg-[#ECECEC]"
            >
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/dashboard/landlord"
                className={({ isActive }) => (isActive ? "underline" : "")}
                end
              >
                <li className="dashboard-link dashboard-link-small">
                  <BiSolidDashboard /> Overview
                </li>
              </NavLink>
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/dashboard/landlord/leaseproperty"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                <li className="dashboard-link dashboard-link-small">
                  <RiFundsFill /> Lease property
                </li>
              </NavLink>
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/dashboard/landlord/sellproperty"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                <li className="dashboard-link dashboard-link-small">
                  <RiFundsFill /> Sell property
                </li>
              </NavLink>
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                <li className="dashboard-link dashboard-link-small">
                  <TbWorldUp /> Main Site
                </li>
              </NavLink>
              {/* <li
                onClick={logout}
                className="dashboard-link dashboard-link-small text-red-500 hover:text-red-500 cursor-pointer"
              >
                <BiLogOut /> Logout
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader;
