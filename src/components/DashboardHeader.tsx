import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { landlordDashboardNav, tenantDashboardNav } from "../utils/data";
import { GlobalContext } from "../contexts/GlobalContext";

const DashboardHeader = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { logout, user } = useAuth();
  return (
    <>
      {/* Sidebar for medium screens and above */}
      <div className="hidden md:block sticky z-50 shrink-0 h-full pt-8 px-4 bg-white text-primary">
        <div className="flex">
          <div className="relative flex flex-col gap-4">
            <ul className="flex flex-col gap-1.5 font-semibold uppercase">
              {(user && user.userType == "landlord"
                ? landlordDashboardNav
                : user && user.userType == "tenant"
                ? tenantDashboardNav
                : []
              ).map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                  }
                  end={link.end}
                >
                  <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                    {<link.icon />}{" "}
                    <span className=" lg:block">{link.label}</span>
                  </li>
                </NavLink>
              ))}

              <li
                onClick={logout}
                className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <BiLogOut /> <span className="lg:block">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className="md:hidden sticky top-0 z-50 flex justify-between py-2 px-3 border-b shadow bg-white opacity-100">
        <h1>
          <Link
            to="/dashboard/landlord"
            className="text-orange-700 font-bold text-lg uppercase"
          >
            Landifi
          </Link>
        </h1>
        <div className="flex justify-end items-center flex-1">
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
        </div>

        {/* Mobile menus */}
        {showNavModal && (
          <div
            onClick={() => setShowNavModal(false)}
            className={
              showNavModal
                ? `md:hidden absolute h-screen w-full top-[2.9rem] left-0  overflow-y-auto shadow-xl ease-in duration-500 bg-black/40 backdrop-blur-none`
                : `left-[-100%] ease-out duration-500`
            }
          >
            <ul
              onClick={(e) => e.stopPropagation()}
              className="h-full max-w-max flex flex-col pl-4 pr-10 py-6 space-y-4 bg-[#ECECEC] uppercase"
            >
              {(user && user.userType == "landlord"
                ? landlordDashboardNav
                : user && user.userType == "tenant"
                ? tenantDashboardNav
                : []
              ).map((link) => (
                <NavLink
                  key={link.id}
                  onClick={() => setShowNavModal(false)}
                  to={link.path}
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  end={link.end}
                >
                  <li className="dashboard-link dashboard-link-small">
                    {<link.icon />} {link.label}
                  </li>
                </NavLink>
              ))}
              <li
                onClick={logout}
                className="dashboard-link dashboard-link-small text-red-500 hover:text-red-500 cursor-pointer"
              >
                <BiLogOut /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader;
