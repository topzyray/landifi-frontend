import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen pt-16 px-3 lg:px-[5rem] dark:bg-[#1E1E1E] dark:text-[#E0E0E0]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
