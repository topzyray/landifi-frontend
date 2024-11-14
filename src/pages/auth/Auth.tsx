import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen pt-16 px-3 lg:px-[5rem] ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
