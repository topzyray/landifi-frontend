import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { RiFundsFill } from "react-icons/ri";
import { TbWorldUp } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import DashboardHeader from "../../../components/DashboardHeader";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

const LandlordDashboard = () => {
  const { logout, user } = useAuth();
  const { setShowNavModal } = useContext(GlobalContext);
  const date = new Date().toDateString();

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex justify-between items-center py-3 lg:py-4 px-3 md:px-6 lg:px-6 border-gray-200 border-b-2 lg:border-b-4">
        <div className="flex items-center gap-5">
          <h1 className="hidden md:block">
            <Link
              to="/dashboard/landlord"
              className="text-orange-700 font-bold text-lg uppercase"
            >
              Landifi
            </Link>
          </h1>
          <div className="font-semibold border border-gray-400 px-1 rounded">
            {date}
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
          <p className="font-semibold lg:text-lg border border-gray-400 px-1 rounded">
            {user?.firstName}
          </p>
          <NavLink to="/dashboard/landlord/profile">
            <p onClick={() => setShowNavModal(false)}>
              <FaRegCircleUser className="text-orange-500 text-2xl lg:text-3xl hover:shadow" />
            </p>
          </NavLink>
          <p onClick={logout}>
            <MdLogout className="text-red-700 text-2xl lg:text-3xl hover:shadow hover:cursor-pointer" />
          </p>
        </div>
      </div>
      <div className="bg-white md:flex md:justify-between md:items-start w-full h-full">
        <DashboardHeader />
        <div className="md:border-x-4 h-full w-full flex flex-col gap-4 md:gap-8 ">
          <div className="overflow-scroll w-full h-full pt-4 md:pt-8 pb-[8rem] md:pb-28 px-3 md:px-6 lg:px-6">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block sticky shrink-0 h-full pt-8 px-4 bg-white text-primary">
          <div className="flex">
            <div className="relative flex flex-col gap-4">
              <ul className="flex flex-col gap-1.5 font-semibold">
                <NavLink
                  to="_"
                  className={({ isActive }) =>
                    isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                  }
                  end
                >
                  <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                    <BiSolidDashboard />{" "}
                    <span className="md:hidden lg:block">Placeholder 1</span>
                  </li>
                </NavLink>
                <NavLink
                  to="_"
                  className={({ isActive }) =>
                    isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                  }
                >
                  <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                    <RiFundsFill />{" "}
                    <span className="md:hidden lg:block">Placeholder 2</span>
                  </li>
                </NavLink>
                <NavLink
                  to="_"
                  className={({ isActive }) =>
                    isActive ? "bg-[#E4E4E4] text-text rounded-lg" : ""
                  }
                >
                  <li className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large">
                    <TbWorldUp />{" "}
                    <span className="md:hidden lg:block">Placeholder 3</span>
                  </li>
                </NavLink>
                <li
                  // onClick={handleSignOut}
                  className="dashboard-link md:dashboard-link-medium lg:dashboard-link-large text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  <BiLogOut />{" "}
                  <span className="md:hidden lg:block">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
