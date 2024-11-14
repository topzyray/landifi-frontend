import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const ToggleTheme = () => {
  const { setToggleTheme } = useContext(GlobalContext);
  // console.log(toggleTheme);

  return (
    <label
      htmlFor="toggle"
      className="ml-5 relative bg-gray-200 hover:shadow-md w-16 h-8 rounded-full cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <input type="checkbox" id="toggle" className="sr-only peer" />
      <span
        onClick={() => setToggleTheme((prev) => !prev)}
        className="w-2/5 h-4/5 bg-[url('assets/icons/day.svg')] bg-cover bg-no-repeat bg-center absolute rounded-full left-1 top-1 peer-checked:bg-[url('assets/icons/night.svg')] peer-checked:left-8 transition-all duration-500"
      ></span>
    </label>
  );
};

export default ToggleTheme;
