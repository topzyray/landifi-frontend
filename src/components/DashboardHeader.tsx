import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { RiFundsFill } from "react-icons/ri";
import { TbWorldUp } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardHeader = () => {
  const { logout } = useAuth();
  return (
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
              onClick={logout}
              className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <BiLogOut /> <span className="md:hidden lg:block">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
