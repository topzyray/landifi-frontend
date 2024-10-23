import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="w-full pt-16 px-3 lg:px-[5rem]">
      {toggle ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
