import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { RiFundsFill } from "react-icons/ri";
import { TbWorldUp } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const LandlordDashboard = () => {
  return (
    <div className="md:flex w-full h-screen">
      <div className="hidden md:block sticky z-50 shrink-0 h-full pt-8 px-4 bg-white text-primary">
        <div className="flex">
          <div className="relative flex flex-col gap-4">
            <ul className="flex flex-col gap-1.5 font-semibold">
              <NavLink
                to="/dashboard/landlord/overview"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
                end
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <BiSolidDashboard />{" "}
                  <span className="md:hidden lg:block">Overview</span>
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/landlord/addproperty"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <RiFundsFill />{" "}
                  <span className="md:hidden lg:block">Add property</span>
                </li>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <TbWorldUp />{" "}
                  <span className="md:hidden lg:block">Main Site</span>
                </li>
              </NavLink>
              <li
                // onClick={handleSignOut}
                className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <BiLogOut /> <span className="md:hidden lg:block">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-x-4 h-full w-full flex flex-col gap-4 md:gap-8 py-3 lg:py-8 mb-10 pl-4 pr-0 md:pl-6 lg:pl-6">
        <div className="overflow-auto h-full pb-0">
          <Outlet />
        </div>
      </div>
      <div className="hidden md:block sticky z-50 shrink-0 h-full pt-8 px-4 bg-white text-primary">
        <div className="flex">
          <div className="relative flex flex-col gap-4">
            <ul className="flex flex-col gap-1.5 font-semibold">
              <NavLink
                to="/dashboard/landlord/overview"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
                end
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <BiSolidDashboard />{" "}
                  <span className="md:hidden lg:block">Overview</span>
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/landlord/addproperty"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <RiFundsFill />{" "}
                  <span className="md:hidden lg:block">Add property</span>
                </li>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                }
              >
                <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                  <TbWorldUp />{" "}
                  <span className="md:hidden lg:block">Main Site</span>
                </li>
              </NavLink>
              <li
                // onClick={handleSignOut}
                className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <BiLogOut /> <span className="md:hidden lg:block">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
