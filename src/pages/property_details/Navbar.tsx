import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-4">
      {[
        { id: "1", label: "Description", path: "" },
        { id: "2", label: "Owner", path: "landlord" },
      ].map((nav) => (
        <NavLink
          end={nav.label === "Description"}
          key={nav.id}
          to={nav.path}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
              : "py-4 text-sm font-medium text-gray-900"
          }
        >
          <span className="">{nav.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
